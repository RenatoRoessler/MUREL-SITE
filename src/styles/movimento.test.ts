import { describe, expect, it } from "vitest";
import { css } from "styled-components";
import { brilho, comMovimento, revelar } from "./movimento";

describe("movimento", () => {
  it("envolve o bloco na preferência por menos movimento", () => {
    const texto = comMovimento(css`
      opacity: 0;
    `).toString();

    expect(texto).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(texto).toContain("opacity: 0;");
  });

  it("exporta os keyframes compartilhados", () => {
    expect(revelar.getName()).toBeTruthy();
    expect(brilho.getName()).toBeTruthy();
  });
});
