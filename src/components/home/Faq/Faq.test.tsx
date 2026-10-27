import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { perguntas } from "./Faq.data";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("mostra as perguntas combinadas no PRD", () => {
    renderComTema(<Faq />);
    expect(screen.getByText(/tipo de negócio/i)).toBeInTheDocument();
    expect(screen.getByText(/comprar impressora/i)).toBeInTheDocument();
    expect(screen.getByText(/dados do cliente/i)).toBeInTheDocument();
    expect(screen.getByText(/celular/i, { selector: "summary" })).toBeInTheDocument();
    expect(screen.getByText(/como eu começo/i)).toBeInTheDocument();
  });

  it("abre e fecha a resposta por teclado", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Faq />);
    const resumo = screen.getByText("Preciso comprar impressora?");
    const detalhes = resumo.closest("details");
    expect(detalhes).not.toHaveAttribute("open");

    await usuario.click(resumo);
    expect(detalhes).toHaveAttribute("open");
    await usuario.click(resumo);
    expect(detalhes).not.toHaveAttribute("open");
  });

  it("a resposta sobre preço orienta a falar com a equipe, sem valores", () => {
    const preco = perguntas.find((item) => item.pergunta === "Quanto custa?");
    expect(preco?.resposta).toMatch(/formulário de contato/i);
    expect(preco?.resposta).not.toMatch(/R\$|\d/);
  });
});
