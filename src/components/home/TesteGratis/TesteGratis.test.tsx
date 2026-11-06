import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { TesteGratis } from "./TesteGratis";

describe("TesteGratis", () => {
  it("anuncia o teste grátis por 30 dias", () => {
    renderComTema(<TesteGratis />);
    expect(screen.getByRole("heading", { level: 3, name: "Teste grátis por 30 dias" })).toBeInTheDocument();
    expect(screen.getByText("Comece sem pagar nada")).toBeInTheDocument();
  });

  it("lista as três garantias do teste", () => {
    renderComTema(<TesteGratis />);
    const lista = screen.getByRole("list", { name: "Condições do teste grátis" });
    expect(within(lista).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Todas as funcionalidades",
      "Sem cartão de crédito",
      "Sem compromisso",
    ]);
  });

  it("diz que no fim do teste a pessoa decide se quer assinar, sem falar em escolher plano", () => {
    const { container } = renderComTema(<TesteGratis />);
    expect(container.textContent).toContain("você decide se quer assinar");
    expect(container.textContent).not.toMatch(/escolhe o plano/);
  });

  it("leva o botão à adesão com o tipo do teste", () => {
    renderComTema(<TesteGratis />);
    const link = screen.getByRole("link", { name: "Começar meu teste grátis" });
    expect(link).toHaveAttribute("href", urlAdesaoTeste);
    expect(link.getAttribute("href")).toMatch(/\/adesao\?tipoPlanoAdesao=0$/);
  });
});
