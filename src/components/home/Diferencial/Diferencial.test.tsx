import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Diferencial } from "./Diferencial";

describe("Diferencial", () => {
  it("mantém o título, o texto de apoio e os três cartões com os mesmos textos", () => {
    renderComTema(<Diferencial />);
    expect(screen.getByRole("heading", { level: 2, name: "Sem papel e sem cadastro do cliente." })).toBeInTheDocument();
    expect(screen.getByText(/o operador registra só os dados do carro/)).toBeInTheDocument();

    const itens = screen.getAllByRole("listitem");
    expect(itens).toHaveLength(3);
    expect(itens.map((item) => within(item).getByRole("heading", { level: 3 }).textContent)).toEqual([
      "0 impressoras",
      "0 dados pessoais pedidos",
      "2 formas de levar o ticket",
    ]);
    expect(screen.getByText(/Sem bobina, sem manutenção/)).toBeInTheDocument();
    expect(screen.getByText(/Nada de e-mail ou telefone/)).toBeInTheDocument();
    expect(screen.getByText(/Foto da tela do operador ou leitura do QR Code/)).toBeInTheDocument();
  });

  it("mostra cada número em um rolo de dígitos decorativo, sem repetir o valor para o leitor de tela", () => {
    const { container } = renderComTema(<Diferencial />);
    const numeros = Array.from(container.querySelectorAll("li > span[aria-hidden='true']"));
    expect(numeros).toHaveLength(3);
    for (const numero of numeros) expect(numero.textContent).toBe("0123456789");
  });
});
