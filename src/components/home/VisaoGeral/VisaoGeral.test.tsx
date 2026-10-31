import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { VisaoGeral } from "./VisaoGeral";

const areas = [
  { id: "patio", rotulo: "Pátio", resumo: "Quem está no pátio agora." },
  { id: "caixa-precos", rotulo: "Caixa e preços", resumo: "Dinheiro e tabelas." },
] as const;

describe("VisaoGeral", () => {
  it("tem um link âncora para cada área", () => {
    renderComTema(<VisaoGeral areas={[...areas]} />);
    expect(screen.getByRole("link", { name: /Pátio/ })).toHaveAttribute("href", "#patio");
    expect(screen.getByRole("link", { name: /Caixa e preços/ })).toHaveAttribute("href", "#caixa-precos");
  });
});
