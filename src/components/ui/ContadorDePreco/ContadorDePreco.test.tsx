import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { simularIntersectionObserver } from "@/test/intersectionObserver";
import { simularMatchMedia } from "@/test/matchMedia";
import { renderComTema } from "@/test/render";
import { ContadorDePreco } from "./ContadorDePreco";

const texto = "R$ 69,90";

// Troca o relógio de quadros por um que avança só quando o teste manda.
function simularQuadros() {
  let tempo = 0;
  const fila = new Map<number, FrameRequestCallback>();
  let proximo = 1;
  vi.stubGlobal("requestAnimationFrame", (funcao: FrameRequestCallback) => {
    fila.set(proximo, funcao);
    return proximo++;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => fila.delete(id));
  return (ms: number) => {
    tempo += ms;
    const pendentes = [...fila.entries()];
    fila.clear();
    for (const [, funcao] of pendentes) funcao(tempo);
  };
}

describe("ContadorDePreco", () => {
  beforeEach(() => {
    simularMatchMedia({ cursorFino: true });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("mostra o valor final do servidor quando não há IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    renderComTema(<ContadorDePreco valor={69.9} texto={texto} />);

    expect(screen.getByText(texto)).toBeInTheDocument();
  });

  it("mostra o valor final com preferência por menos movimento", () => {
    simularMatchMedia({ menosMovimento: true });
    simularIntersectionObserver();
    renderComTema(<ContadorDePreco valor={69.9} texto={texto} />);

    expect(screen.getByText(texto)).toBeInTheDocument();
  });

  it("conta de zero até o valor e termina exatamente no texto do servidor", () => {
    const avancar = simularQuadros();
    const observadores = simularIntersectionObserver();
    renderComTema(<ContadorDePreco valor={69.9} texto={texto} />);

    act(() => avancar(16));
    expect(screen.getByText(/^R\$\s0,00$/)).toBeInTheDocument();

    act(() => observadores[0].mostrar());
    act(() => avancar(16));
    act(() => avancar(100));
    const meio = screen.getByText(/R\$/).textContent ?? "";
    expect(meio).not.toBe(texto);

    act(() => avancar(2000));
    expect(screen.getByText(texto)).toBeInTheDocument();
  });
});
