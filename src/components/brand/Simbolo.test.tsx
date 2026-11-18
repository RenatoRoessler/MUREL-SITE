import { act, createRef } from "react";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderComTema } from "@/test/render";
import { LogoMurel, type LogoHandle } from "./LogoMurel";
import { Simbolo } from "./Simbolo";

describe("marca", () => {
  it("o símbolo tem rótulo acessível", () => {
    renderComTema(<Simbolo />);
    expect(screen.getByRole("img", { name: /três vagas formando um M/i })).toBeInTheDocument();
  });

  it("instâncias diferentes usam máscaras com ids diferentes", () => {
    const { container } = renderComTema(
      <>
        <Simbolo />
        <Simbolo />
      </>,
    );
    const ids = [...container.querySelectorAll("mask")].map((m) => m.id);
    expect(new Set(ids).size).toBe(2);
  });

  it("o logotipo é identificado como Murel", () => {
    renderComTema(<LogoMurel />);
    expect(screen.getByLabelText("Murel")).toBeInTheDocument();
  });
});

describe("marca animada", () => {
  let quadros: FrameRequestCallback[];

  function simularMovimento(reduzido: boolean) {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: reduzido && query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  }

  beforeEach(() => {
    quadros = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      quadros.push(callback);
      return quadros.length;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sem animação o símbolo é o de sempre, sem luzes e sem a faixa da rua", () => {
    simularMovimento(false);
    const { container } = renderComTema(<LogoMurel />);

    expect(quadros).toHaveLength(0);
    expect(container.querySelector("[data-luz]")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 240 160");
  });

  it("o logo animado anima e desenha as luzes; com movimento reduzido, não", () => {
    simularMovimento(false);
    const { container, unmount } = renderComTema(<LogoMurel animado />);
    expect(quadros.length).toBeGreaterThan(0);
    expect(container.querySelector("[data-luz]")).toBeInTheDocument();
    expect(screen.getByLabelText("Murel")).toBeInTheDocument();
    unmount();

    quadros = [];
    simularMovimento(true);
    renderComTema(<LogoMurel animado />);
    expect(quadros).toHaveLength(0);
  });

  it("o símbolo sozinho animado ganha a faixa da rua e para ao tocar", () => {
    simularMovimento(false);
    const { container } = renderComTema(<Simbolo animado />);
    const svg = container.querySelector("svg") as SVGSVGElement;

    expect(svg).toHaveAttribute("viewBox", "0 0 240 188");
    expect(quadros.length).toBeGreaterThan(0);

    const agendados = quadros.length;
    act(() => {
      fireEvent.pointerDown(svg);
      quadros.at(-1)?.(16);
    });
    expect(quadros).toHaveLength(agendados);
  });

  it("parar pelo ref devolve true durante a animação e false depois", () => {
    simularMovimento(false);
    const ref = createRef<LogoHandle>();
    renderComTema(<LogoMurel animado ref={ref} />);

    let parou = false;
    act(() => {
      parou = ref.current?.parar() ?? false;
    });
    expect(parou).toBe(true);
    expect(ref.current?.parar()).toBe(false);
  });

  it("no fim da sequência o carro está na vaga", () => {
    simularMovimento(false);
    const { container } = renderComTema(<LogoMurel animado />);
    const carro = container.querySelector("[data-carro]");

    act(() => {
      let agora = 0;
      for (let i = 0; i < 600; i += 1) {
        quadros.at(-1)?.(agora);
        agora += 50;
      }
    });
    expect(carro?.getAttribute("transform")).toBe("translate(0.00 0.00) rotate(0.00 120 95)");
  });
});
