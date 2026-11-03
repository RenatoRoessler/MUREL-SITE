import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { urlWhatsapp } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { BotaoWhatsapp } from "./BotaoWhatsapp";

type Entrada = { isIntersecting: boolean; boundingClientRect: { top: number } };

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
    expect(observadores).toHaveLength(1);
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
    expect(observadores).toHaveLength(0);
  });

  it("desconecta o observador ao desmontar", () => {
    const { unmount } = renderComSecao();
    unmount();
    expect(observadores[0].desconectado).toBe(true);
  });
});
