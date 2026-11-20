import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { simularMatchMedia } from "@/test/matchMedia";
import { useInclinacao } from "./useInclinacao";

function Alvo() {
  const ref = useRef<HTMLDivElement>(null);
  useInclinacao(ref);
  return <div ref={ref} data-testid="alvo" />;
}

function medido(elemento: HTMLElement) {
  Object.defineProperty(elemento, "offsetWidth", { configurable: true, value: 200 });
  Object.defineProperty(elemento, "offsetHeight", { configurable: true, value: 100 });
}

describe("useInclinacao", () => {
  beforeEach(() => {
    vi.stubGlobal("requestAnimationFrame", (funcao: FrameRequestCallback) => {
      funcao(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normaliza o cursor entre -1 e 1 e zera ao sair", () => {
    simularMatchMedia({ cursorFino: true });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");
    medido(alvo);

    fireEvent.pointerMove(alvo, { clientX: 200, clientY: 0 });
    expect(alvo.style.getPropertyValue("--rx")).toBe("1");
    expect(alvo.style.getPropertyValue("--ry")).toBe("-1");

    fireEvent.pointerMove(alvo, { clientX: 100, clientY: 50 });
    expect(alvo.style.getPropertyValue("--rx")).toBe("0");

    fireEvent.pointerLeave(alvo);
    expect(alvo.style.getPropertyValue("--rx")).toBe("");
  });

  it("fica parado sem mouse", () => {
    simularMatchMedia({ cursorFino: false });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");

    fireEvent.pointerMove(alvo, { clientX: 10, clientY: 10 });
    expect(alvo.style.getPropertyValue("--rx")).toBe("");
  });
});
