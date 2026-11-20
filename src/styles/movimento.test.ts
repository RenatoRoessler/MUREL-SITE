import { describe, expect, it } from "vitest";
import { css } from "styled-components";
import { brilho, comCursorFino, comMovimento, desenhar, girar, revelar, tremor } from "./movimento";

describe("movimento", () => {
  it("envolve o bloco na preferência por menos movimento", () => {
    const texto = comMovimento(css`
      opacity: 0;
    `).toString();

    expect(texto).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(texto).toContain("opacity: 0;");
  });

  it("restringe os efeitos de cursor a mouse e a quem aceita movimento", () => {
    const texto = comCursorFino(css`
      opacity: 1;
    `).toString();

    expect(texto).toContain("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    expect(texto).toContain("opacity: 1;");
  });

  it("exporta os keyframes compartilhados", () => {
    for (const quadros of [revelar, brilho, desenhar, tremor, girar]) {
      expect(quadros.getName()).toBeTruthy();
    }
  });
});
