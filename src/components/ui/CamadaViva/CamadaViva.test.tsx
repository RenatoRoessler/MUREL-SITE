import { act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { simularIntersectionObserver } from "@/test/intersectionObserver";
import { renderComTema } from "@/test/render";
import type { EventoVivo } from "@/types/sistema";
import { CamadaViva } from "./CamadaViva";

const eventos: EventoVivo[] = [
  { tipo: "toque", x: 50, y: 90 },
  { tipo: "aviso", texto: "Lavagem pronta", x: 50, y: 60, atraso: 1200 },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CamadaViva", () => {
  it("não renderiza nada sem eventos", () => {
    simularIntersectionObserver();
    const { container } = renderComTema(<CamadaViva />);
    expect(container).toBeEmptyDOMElement();

    const vazio = renderComTema(<CamadaViva eventos={[]} />);
    expect(vazio.container).toBeEmptyDOMElement();
  });

  it("é decorativa: escondida de leitores de tela, com um elemento por evento", () => {
    simularIntersectionObserver();
    const { container } = renderComTema(<CamadaViva eventos={eventos} />);
    const camada = container.firstElementChild as HTMLElement;

    expect(camada).toHaveAttribute("aria-hidden", "true");
    expect(camada.children).toHaveLength(2);
    expect((camada.children[1] as HTMLElement).style.getPropertyValue("--atraso")).toBe("1200ms");
  });

  it("só anda enquanto está na tela", () => {
    const observadores = simularIntersectionObserver();
    const { container } = renderComTema(<CamadaViva eventos={eventos} />);
    const camada = container.firstElementChild as HTMLElement;
    expect(camada).toHaveAttribute("data-ativo", "false");

    act(() => observadores[0].emitir(camada, true));
    expect(camada).toHaveAttribute("data-ativo", "true");

    act(() => observadores[0].emitir(camada, false));
    expect(camada).toHaveAttribute("data-ativo", "false");
  });
});
