import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Garantias } from "./Garantias";

describe("Garantias", () => {
  it("lista os itens numa lista com o rótulo informado", () => {
    renderComTema(<Garantias itens={["Primeira", "Segunda"]} rotulo="Condições de teste" />);
    const lista = screen.getByRole("list", { name: "Condições de teste" });
    const itens = within(lista).getAllByRole("listitem");
    expect(itens.map((item) => item.textContent)).toEqual(["Primeira", "Segunda"]);
  });

  it("mantém os ícones como decorativos", () => {
    const { container } = renderComTema(<Garantias itens={["Primeira"]} rotulo="Condições" />);
    const icones = container.querySelectorAll("svg");
    expect(icones).toHaveLength(1);
    expect(icones[0]).toHaveAttribute("aria-hidden", "true");
  });
});
