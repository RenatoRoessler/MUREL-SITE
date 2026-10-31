import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Funcionalidades } from "./Funcionalidades";
import { funcionalidades } from "./Funcionalidades.data";

describe("Funcionalidades", () => {
  it("renderiza uma seção por área, com o id esperado", () => {
    const { container } = renderComTema(<Funcionalidades />);
    expect(funcionalidades.map((f) => f.id)).toEqual([
      "patio",
      "caixa-precos",
      "mensalistas",
      "conveniadas",
      "tema",
    ]);
    for (const { id } of funcionalidades) {
      expect(container.querySelector(`section#${id}`)).not.toBeNull();
    }
  });

  it("cada área tem ao menos uma tela com texto alternativo", () => {
    for (const area of funcionalidades) {
      expect(area.telas.length).toBeGreaterThan(0);
      for (const tela of area.telas) {
        expect(tela.alt.trim()).not.toBe("");
      }
    }
  });
});
