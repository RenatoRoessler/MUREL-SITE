import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { ProgressoDeLeitura } from "./ProgressoDeLeitura";

describe("ProgressoDeLeitura", () => {
  it("é decorativa: escondida de leitores de tela e sem texto", () => {
    renderComTema(<ProgressoDeLeitura />);

    const barra = screen.getByTestId("progresso-de-leitura");
    expect(barra).toHaveAttribute("aria-hidden", "true");
    expect(barra).toBeEmptyDOMElement();
  });
});
