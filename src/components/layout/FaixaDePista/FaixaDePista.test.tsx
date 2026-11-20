import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { FaixaDePista } from "./FaixaDePista";

describe("FaixaDePista", () => {
  it("é decorativa: escondida de leitores de tela e sem texto", () => {
    renderComTema(<FaixaDePista />);

    const faixa = screen.getByTestId("faixa-de-pista");
    expect(faixa).toHaveAttribute("aria-hidden", "true");
    expect(faixa).toBeEmptyDOMElement();
  });
});
