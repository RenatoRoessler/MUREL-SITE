import { act, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderComTema } from "@/test/render";
import { simularIntersectionObserver } from "@/test/intersectionObserver";
import { Revelar } from "./Revelar";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Revelar", () => {
  it("começa pendente e vira visível, uma vez, quando entra na tela", () => {
    const observadores = simularIntersectionObserver();
    renderComTema(<Revelar data-testid="alvo">Conteúdo</Revelar>);

    const alvo = screen.getByTestId("alvo");
    expect(alvo).toHaveAttribute("data-modo", "proprio");
    expect(alvo).toHaveAttribute("data-estado", "pendente");
    expect(observadores[0].alvo).toBe(alvo);

    act(() => observadores[0].mostrar());

    expect(alvo).toHaveAttribute("data-estado", "visivel");
    expect(observadores[0].desconectar).toHaveBeenCalled();
  });

  it("mantém o elemento escolhido em `as`, para não mudar a semântica do HTML", () => {
    simularIntersectionObserver();
    renderComTema(
      <Revelar as="ul" modo="filhos" aria-label="Lista">
        <li>Um</li>
        <li>Dois</li>
      </Revelar>,
    );

    const lista = screen.getByRole("list", { name: "Lista" });
    expect(lista.tagName).toBe("UL");
    expect(lista).toHaveAttribute("data-modo", "filhos");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("só esconde o conteúdo na tela, com JavaScript e sem preferência por menos movimento", () => {
    simularIntersectionObserver();
    renderComTema(<Revelar>Conteúdo</Revelar>);

    const css = Array.from(document.querySelectorAll("style"))
      .map((estilo) => estilo.textContent)
      .join("");

    expect(css).toContain("@media screen and (scripting: enabled) and (prefers-reduced-motion: no-preference)");
  });

  it("mostra o conteúdo mesmo sem IntersectionObserver", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    renderComTema(<Revelar data-testid="alvo">Conteúdo</Revelar>);

    await vi.waitFor(() => expect(screen.getByTestId("alvo")).toHaveAttribute("data-estado", "visivel"));
  });
});
