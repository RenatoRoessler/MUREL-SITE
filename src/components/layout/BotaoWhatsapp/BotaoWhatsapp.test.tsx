import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { urlWhatsapp } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { BotaoWhatsapp } from "./BotaoWhatsapp";

type Entrada = { isIntersecting: boolean; boundingClientRect: { top: number }; target?: Element };

let observadores: ObservadorFalso[] = [];

class ObservadorFalso {
  observados: Element[] = [];
  desconectado = false;

  constructor(
    private readonly aoObservar: (entradas: Entrada[]) => void,
    readonly opcoes?: IntersectionObserverInit,
  ) {
    observadores.push(this);
  }

  observe(alvo: Element) {
    this.observados.push(alvo);
  }

  disconnect() {
    this.desconectado = true;
  }

  disparar(entrada: Entrada) {
    this.aoObservar([entrada]);
  }
}

function dispararSecao(entrada: Entrada) {
  act(() => observadores[0].disparar(entrada));
}

const naTela = { isIntersecting: true, boundingClientRect: { top: 400 } };
const abaixoDaTela = { isIntersecting: false, boundingClientRect: { top: 2000 } };
const acimaDaTela = { isIntersecting: false, boundingClientRect: { top: -300 } };

function renderComSecao() {
  const secao = document.createElement("section");
  secao.id = "perguntas";
  document.body.append(secao);
  return { secao, ...renderComTema(<BotaoWhatsapp />) };
}

beforeEach(() => {
  observadores = [];
  vi.stubGlobal("IntersectionObserver", ObservadorFalso);
});

afterEach(() => {
  document.getElementById("perguntas")?.remove();
  vi.unstubAllGlobals();
});

describe("BotaoWhatsapp", () => {
  it("abre a conversa do WhatsApp em nova aba, de forma segura", () => {
    renderComSecao();
    dispararSecao(naTela);
    const link = screen.getByRole("link", { name: /WhatsApp/ });
    expect(link).toHaveAttribute("href", urlWhatsapp);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("tem nome acessível que começa pelo rótulo visível e avisa a nova aba", () => {
    renderComSecao();
    dispararSecao(naTela);
    const link = screen.getByRole("link", { name: /^Estamos online!/ });
    expect(link).toHaveAccessibleName(/abre em nova aba/);
    expect(screen.getByText("Estamos online!")).toBeVisible();
  });

  it("fica fixo na tela e recebe foco por teclado", () => {
    renderComSecao();
    dispararSecao(naTela);
    const link = screen.getByRole("link", { name: /WhatsApp/ });
    expect(getComputedStyle(link).position).toBe("fixed");
    link.focus();
    expect(link).toHaveFocus();
  });

  it("começa oculto, fora da árvore de acessibilidade e da ordem de tab", () => {
    const { container } = renderComSecao();
    expect(screen.queryByRole("link", { name: /WhatsApp/ })).not.toBeInTheDocument();
    const link = container.querySelector("a")!;
    expect(link).toHaveAttribute("href", urlWhatsapp);
    expect(getComputedStyle(link).visibility).toBe("hidden");
    expect(getComputedStyle(link).pointerEvents).toBe("none");
  });

  it("observa a seção #perguntas, que conta como alcançada a 85% da altura da tela", () => {
    const { secao } = renderComSecao();
    expect(observadores[0].observados).toEqual([secao]);
    expect(observadores[0].opcoes?.rootMargin).toBe("0px 0px -15% 0px");
  });

  it("aparece quando a seção entra na tela", () => {
    renderComSecao();
    dispararSecao(naTela);
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
  });

  it("continua visível quando a seção já ficou acima da tela", () => {
    renderComSecao();
    dispararSecao(naTela);
    dispararSecao(acimaDaTela);
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
  });

  it("some de novo ao voltar para cima da seção", () => {
    renderComSecao();
    dispararSecao(naTela);
    dispararSecao(abaixoDaTela);
    expect(screen.queryByRole("link", { name: /WhatsApp/ })).not.toBeInTheDocument();
  });

  it("fica visível se a seção #perguntas não existir", () => {
    renderComTema(<BotaoWhatsapp />);
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
    expect(observadores.filter((observador) => observador.observados.length > 0)).toHaveLength(0);
  });

  it("desconecta o observador ao desmontar", () => {
    const { unmount } = renderComSecao();
    unmount();
    expect(observadores[0].desconectado).toBe(true);
  });

  it("só pulsa o anel quando o botão aparece, e só se o aparelho aceita movimento", () => {
    const { container } = renderComSecao();
    const circulo = () => container.querySelector("a > span:last-child")!;
    const classeOculto = circulo().className;

    dispararSecao(naTela);
    expect(circulo().className).not.toBe(classeOculto);

    const css = Array.from(document.querySelectorAll("style"))
      .map((estilo) => estilo.textContent)
      .join("");
    expect(css).toContain("scale(1.7)");
    expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
  });

  it("some dentro da seção de Contato, que já tem a chamada do WhatsApp, e volta depois", () => {
    const contato = document.createElement("section");
    contato.id = "contato";
    document.body.append(contato);
    renderComSecao();

    dispararSecao(naTela);
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toBeVisible();

    act(() => observadores[1].disparar({ ...naTela, target: contato }));
    expect(screen.queryByRole("link", { name: /WhatsApp/ })).not.toBeInTheDocument();

    act(() => observadores[1].disparar({ ...abaixoDaTela, target: contato }));
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
    contato.remove();
  });

  it("depois de alguns segundos, o rótulo encolhe e fica só o ícone", () => {
    vi.useFakeTimers();
    try {
      renderComSecao();
      dispararSecao(naTela);
      const rotulo = screen.getByText("Estamos online!");
      const antes = rotulo.className;

      act(() => {
        vi.advanceTimersByTime(6000);
      });
      expect(screen.getByText("Estamos online!").className).not.toBe(antes);
      expect(getComputedStyle(screen.getByText("Estamos online!")).opacity).toBe("0");
    } finally {
      vi.useRealTimers();
    }
  });

  it("sobe acima da barra fixa quando ela está na tela", () => {
    renderComSecao();
    dispararSecao(naTela);
    const css = Array.from(document.querySelectorAll("style"))
      .map((estilo) => estilo.textContent)
      .join("");
    expect(css).toMatch(/var\(--barra-fixa,\s*0px\)/);
  });
});
