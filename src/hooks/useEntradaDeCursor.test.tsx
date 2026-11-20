import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { simularMatchMedia } from "@/test/matchMedia";
import { useEntradaDeCursor } from "./useEntradaDeCursor";

const aoMover = vi.fn();
const aoSair = vi.fn();

function Alvo() {
  const ref = useRef<HTMLDivElement>(null);
  useEntradaDeCursor(ref, { aoMover, aoSair });
  return <div ref={ref} data-testid="alvo" />;
}

describe("useEntradaDeCursor", () => {
  beforeEach(() => {
    aoMover.mockClear();
    aoSair.mockClear();
    vi.stubGlobal("requestAnimationFrame", (funcao: FrameRequestCallback) => {
      funcao(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("acompanha o cursor com mouse", () => {
    simularMatchMedia({ cursorFino: true });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");

    fireEvent.pointerMove(alvo, { clientX: 30, clientY: 12 });
    expect(aoMover).toHaveBeenCalledWith({ x: 30, y: 12 }, alvo);

    fireEvent.pointerLeave(alvo);
    expect(aoSair).toHaveBeenCalledWith(alvo);
  });

  it("não faz nada em aparelho sem mouse", () => {
    simularMatchMedia({ cursorFino: false });
    const { getByTestId } = render(<Alvo />);

    fireEvent.pointerMove(getByTestId("alvo"), { clientX: 5, clientY: 5 });
    expect(aoMover).not.toHaveBeenCalled();
  });

  it("não faz nada com preferência por menos movimento", () => {
    simularMatchMedia({ cursorFino: true, menosMovimento: true });
    const { getByTestId } = render(<Alvo />);

    fireEvent.pointerMove(getByTestId("alvo"), { clientX: 5, clientY: 5 });
    expect(aoMover).not.toHaveBeenCalled();
  });

  it("para de ouvir ao desmontar", () => {
    simularMatchMedia({ cursorFino: true });
    const { getByTestId, unmount } = render(<Alvo />);
    const alvo = getByTestId("alvo");
    unmount();

    fireEvent.pointerMove(alvo, { clientX: 1, clientY: 1 });
    expect(aoMover).not.toHaveBeenCalled();
  });
});
