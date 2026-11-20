import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { simularMatchMedia } from "@/test/matchMedia";
import { useLuzDeFarol } from "./useLuzDeFarol";

function Alvo() {
  const ref = useRef<HTMLDivElement>(null);
  useLuzDeFarol(ref);
  return <div ref={ref} data-testid="alvo" />;
}

describe("useLuzDeFarol", () => {
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

  it("grava a posição do cursor e limpa ao sair", () => {
    simularMatchMedia({ cursorFino: true });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");

    fireEvent.pointerMove(alvo, { clientX: 40, clientY: 25 });
    expect(alvo.style.getPropertyValue("--x")).toBe("40px");
    expect(alvo.style.getPropertyValue("--y")).toBe("25px");

    fireEvent.pointerLeave(alvo);
    expect(alvo.style.getPropertyValue("--x")).toBe("");
  });

  it("não grava nada sem mouse", () => {
    simularMatchMedia({ cursorFino: false });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");

    fireEvent.pointerMove(alvo, { clientX: 40, clientY: 25 });
    expect(alvo.style.getPropertyValue("--x")).toBe("");
  });
});
