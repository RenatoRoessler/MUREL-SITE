import { act, createEvent, fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { urlAcesso, urlAdesaoTeste } from "@/lib/config";
import { simularIntersectionObserver } from "@/test/intersectionObserver";
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

describe("Header: menu do celular", () => {
  it("fecha com Esc e devolve o foco ao botão do menu", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document, { key: "Escape" });
    const botao = screen.getByRole("button", { name: "Abrir menu" });
    expect(botao).toHaveAttribute("aria-expanded", "false");
    expect(botao).toHaveFocus();
  });

  it("fecha com um toque fora do header, mas não com um toque dentro do menu", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));

    fireEvent.pointerDown(document.getElementById("menu-principal")!);
    expect(screen.getByRole("button", { name: "Fechar menu" })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeInTheDocument();
  });

  it("esmaece a página com um fundo enquanto o menu está aberto", async () => {
    const usuario = userEvent.setup();
    const { container } = renderComTema(<Header />);
    const fundo = container.querySelector("a + div[aria-hidden='true']")!;
    expect(getComputedStyle(fundo).visibility).toBe("hidden");

    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(getComputedStyle(fundo).visibility).toBe("visible");
  });

  it("Esc e toque fora não fazem nada com o menu fechado", () => {
    renderComTema(<Header />);
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.pointerDown(document.body);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Header: seção ativa", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  const link = (secao: string) => document.querySelector(`a[href="#${secao}"]`)!;

  it("destaca o link da seção em que a pessoa está, com aria-current", () => {
    const observadores = simularIntersectionObserver();
    const planos = document.createElement("section");
    planos.id = "planos";
    const perguntas = document.createElement("section");
    perguntas.id = "perguntas";
    document.body.append(planos, perguntas);
    renderComTema(<Header />);
    expect(link("planos")).not.toHaveAttribute("aria-current");

    act(() => observadores[0].emitir(planos, true));
    expect(link("planos")).toHaveAttribute("aria-current", "location");
    expect(link("perguntas")).not.toHaveAttribute("aria-current");

    act(() => observadores[0].emitir(planos, false));
    act(() => observadores[0].emitir(perguntas, true));
    expect(link("planos")).not.toHaveAttribute("aria-current");
    expect(link("perguntas")).toHaveAttribute("aria-current", "location");
  });

  it("move o traço do desktop para o link ativo, por variáveis CSS", () => {
    const observadores = simularIntersectionObserver();
    const planos = document.createElement("section");
    planos.id = "planos";
    document.body.append(planos);
    renderComTema(<Header />);
    const menu = document.getElementById("menu-principal")!;
    expect(menu.style.getPropertyValue("--traco-l")).toBe("0px");

    Object.defineProperty(link("planos"), "offsetLeft", { value: 120, configurable: true });
    Object.defineProperty(link("planos"), "offsetWidth", { value: 64, configurable: true });
    act(() => observadores[0].emitir(planos, true));
    expect(menu.style.getPropertyValue("--traco-x")).toBe("120px");
    expect(menu.style.getPropertyValue("--traco-l")).toBe("64px");
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
