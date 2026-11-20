import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { simularMatchMedia } from "@/test/matchMedia";
import { useMagnetismo } from "./useMagnetismo";

function Alvo() {
  const ref = useRef<HTMLDivElement>(null);
  useMagnetismo(ref);
  return <div ref={ref} data-testid="alvo" />;
}

// Botão de 100x40 com o canto de cima em (100, 100): centro em (150, 120).
function posicionar(elemento: HTMLElement) {
  elemento.getBoundingClientRect = () =>
    ({ left: 100, top: 100, width: 100, height: 40, right: 200, bottom: 140, x: 100, y: 100, toJSON: () => ({}) }) as DOMRect;
}

describe("useMagnetismo", () => {
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

  it("puxa o botão na direção do cursor, com limite, quando ele chega perto", () => {
    simularMatchMedia({ cursorFino: true });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");
    posicionar(alvo);

    fireEvent.pointerMove(document, { clientX: 250, clientY: 120 });
    expect(alvo).toHaveAttribute("data-magnetico", "ativo");
    // (250 - 150) * 0.25 = 25, limitado a 6.
    expect(alvo.style.getPropertyValue("--mx")).toBe("6px");
    expect(alvo.style.getPropertyValue("--my")).toBe("0px");
  });

  it("solta o botão quando o cursor se afasta", () => {
    simularMatchMedia({ cursorFino: true });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");
    posicionar(alvo);

    fireEvent.pointerMove(document, { clientX: 210, clientY: 120 });
    expect(alvo).toHaveAttribute("data-magnetico", "ativo");

    fireEvent.pointerMove(document, { clientX: 900, clientY: 700 });
    expect(alvo).not.toHaveAttribute("data-magnetico");
    expect(alvo.style.getPropertyValue("--mx")).toBe("");
  });

  it("não faz nada sem mouse", () => {
    simularMatchMedia({ cursorFino: false });
    const { getByTestId } = render(<Alvo />);
    const alvo = getByTestId("alvo");
    posicionar(alvo);

    fireEvent.pointerMove(document, { clientX: 210, clientY: 120 });
    expect(alvo).not.toHaveAttribute("data-magnetico");
  });
});
