import { act, createEvent, fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { urlAcesso, urlAdesaoTeste } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { Header } from "./Header";

describe("Header", () => {
  it("leva ao sistema pelo botão 'Acessar o sistema'", async () => {
    renderComTema(<Header />);
    // O menu fechado fica invisível (e sem nome acessível); abre para enxergar os dois acessos.
    await userEvent.setup().click(screen.getByRole("button", { name: "Abrir menu" }));
    // O botão do header só aparece de lg para cima (o jsdom não avalia media queries).
    const acessos = screen.getAllByRole("link", { name: "Acessar o sistema", hidden: true });
    expect(acessos).toHaveLength(2);
    for (const acesso of acessos) {
      expect(acesso).toHaveAttribute("href", urlAcesso);
    }
  });

  it("leva ao teste grátis pelo botão 'Começar grátis'", () => {
    renderComTema(<Header />);
    expect(screen.getByRole("link", { name: "Começar grátis" })).toHaveAttribute("href", urlAdesaoTeste);
  });

  it("mostra o acesso ao sistema também no menu aberto", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    const menu = document.getElementById("menu-principal")!;
    expect(within(menu).queryByRole("link", { name: "Acessar o sistema" })).not.toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));
    const acesso = within(menu).getByRole("link", { name: "Acessar o sistema" });
    expect(acesso).toHaveAttribute("href", urlAcesso);
    expect(within(menu).getAllByRole("link").at(-1)).toBe(acesso);
  });

  it("tem os links de seção e o atalho para o conteúdo", async () => {
    renderComTema(<Header />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("link", { name: "Sistema", hidden: true })).toHaveAttribute("href", "#sistema");
    expect(screen.getByRole("link", { name: "Como funciona", hidden: true })).toHaveAttribute("href", "#como-funciona");
    expect(screen.getByRole("link", { name: "Planos", hidden: true })).toHaveAttribute("href", "#planos");
    expect(screen.getByRole("link", { name: "Perguntas", hidden: true })).toHaveAttribute("href", "#perguntas");
    expect(screen.getByRole("link", { name: "Contato", hidden: true })).toHaveAttribute("href", "#contato");
    expect(screen.getByRole("link", { name: "Ir para o conteúdo" })).toHaveAttribute("href", "#conteudo");
  });

  it("abre e fecha o menu pelo teclado", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    const botao = screen.getByRole("button", { name: "Abrir menu" });
    expect(botao).toHaveAttribute("aria-expanded", "false");

    botao.focus();
    await usuario.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");

    await usuario.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("fecha o menu ao escolher uma seção", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));
    await usuario.click(screen.getByRole("link", { name: "Contato" }));
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeInTheDocument();
  });
});

describe("Header: fundo ao rolar", () => {
  afterEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  });

  function rolarPara(posicao: number) {
    Object.defineProperty(window, "scrollY", { value: posicao, configurable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
  }

  it("fica sem sombra no topo e ganha sombra e desfoque depois de rolar", () => {
    renderComTema(<Header />);
    const barra = screen.getByRole("banner");
    expect(getComputedStyle(barra).boxShadow).toBe("none");

    rolarPara(120);
    expect(getComputedStyle(barra).boxShadow).not.toBe("none");

    rolarPara(0);
    expect(getComputedStyle(barra).boxShadow).toBe("none");
  });

  it("esconde o menu fechado da ordem de tab sem tirá-lo do layout", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    const menu = document.getElementById("menu-principal")!;
    expect(getComputedStyle(menu).visibility).toBe("hidden");

    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(getComputedStyle(menu).visibility).toBe("visible");
  });
});

describe("Header: logo animado", () => {
  let quadros: FrameRequestCallback[];

  beforeEach(() => {
    quadros = [];
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      quadros.push(callback);
      return quadros.length;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function clicar(link: HTMLElement) {
    const evento = createEvent.click(link);
    fireEvent(link, evento);
    return evento.defaultPrevented;
  }

  it("durante a animação o clique só para; o clique seguinte segue o link", () => {
    renderComTema(<Header />);
    const marca = screen.getByRole("link", { name: "Murel, início da página" });

    expect(quadros.length).toBeGreaterThan(0);
    expect(clicar(marca)).toBe(true);
    expect(clicar(marca)).toBe(false);
    expect(marca).toHaveAttribute("href", "#topo");
  });

  it("o foco e o mouse param a animação, e o clique segue o link", () => {
    renderComTema(<Header />);
    const marca = screen.getByRole("link", { name: "Murel, início da página" });

    fireEvent.focus(marca);
    expect(clicar(marca)).toBe(false);
  });

  it("toque não para antes do clique (o primeiro clique só para)", () => {
    renderComTema(<Header />);
    const marca = screen.getByRole("link", { name: "Murel, início da página" });

    fireEvent.pointerEnter(marca, { pointerType: "touch" });
    fireEvent.pointerDown(marca, { pointerType: "touch" });
    expect(clicar(marca)).toBe(true);
  });
});
