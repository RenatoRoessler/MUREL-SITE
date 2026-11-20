import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { FundoVivo } from "./FundoVivo";

describe("FundoVivo", () => {
  it("é decorativo: escondido de leitores de tela e sem texto", () => {
    renderComTema(<FundoVivo />);

    const fundo = screen.getByTestId("fundo-vivo");
    expect(fundo).toHaveAttribute("aria-hidden", "true");
    expect(fundo).toBeEmptyDOMElement();
  });
});
