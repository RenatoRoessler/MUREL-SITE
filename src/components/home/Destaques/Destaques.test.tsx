import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Destaques } from "./Destaques";

describe("Destaques", () => {
  it("mostra os quatro diferenciais, com o mês grátis do back-end", () => {
    renderComTema(<Destaques teste={{ duracaoMeses: 1 }} />);
    const itens = within(screen.getByRole("region", { name: "Diferenciais da Murel" })).getAllByRole("listitem");
    expect(itens.map((item) => item.textContent)).toEqual([
      "Sem impressora",
      "Ticket 100% digital",
      "Sem cadastro do cliente",
      "1º mês grátis",
    ]);
  });

  it("não cita número do teste quando o back-end não informa", () => {
    renderComTema(<Destaques teste={null} />);
    expect(screen.getByText("Mês grátis antes de assinar")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Diferenciais da Murel" }).textContent).not.toMatch(/\d+º/);
  });
});
