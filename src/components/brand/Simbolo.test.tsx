import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { LogoMurel } from "./LogoMurel";
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
