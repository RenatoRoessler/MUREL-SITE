import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { TesteGratis } from "./TesteGratis";

describe("TesteGratis", () => {
  it("anuncia o teste grátis com a duração vinda do back-end", () => {
    renderComTema(<TesteGratis teste={{ duracaoMeses: 1 }} />);
    expect(screen.getByRole("heading", { level: 3, name: "1 mês grátis, com o sistema completo" })).toBeInTheDocument();
    expect(screen.getByText("Comece sem pagar nada")).toBeInTheDocument();
  });

  it("não cita duração quando o back-end não informa", () => {
    renderComTema(<TesteGratis teste={null} />);
    expect(screen.getByRole("heading", { level: 3, name: "Mês grátis, com o sistema completo" })).toBeInTheDocument();
  });

  it("lista as três garantias do teste", () => {
    renderComTema(<TesteGratis teste={{ duracaoMeses: 1 }} />);
    const lista = screen.getByRole("list", { name: "Condições do mês grátis" });
    expect(within(lista).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Todas as funcionalidades",
      "Sem cartão de crédito",
      "Sem compromisso",
    ]);
  });

  it("diz que depois de 30 dias a pessoa decide se quer continuar, sem falar em escolher plano", () => {
    const { container } = renderComTema(<TesteGratis teste={{ duracaoMeses: 1 }} />);
    expect(container.textContent).toContain("você decide se quer continuar");
    expect(container.textContent).not.toMatch(/escolhe o plano/);
  });

  it("leva o botão à adesão com o tipo do teste", () => {
    renderComTema(<TesteGratis teste={{ duracaoMeses: 1 }} />);
    const link = screen.getByRole("link", { name: "Começar meu mês grátis" });
    expect(link).toHaveAttribute("href", urlAdesaoTeste);
    expect(link.getAttribute("href")).toMatch(/\/adesao\?tipoPlanoAdesao=0$/);
  });
});
