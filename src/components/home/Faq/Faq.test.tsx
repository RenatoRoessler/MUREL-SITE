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

  it("responde as dúvidas sobre o teste grátis", () => {
    renderComTema(<Faq />);
    for (const pergunta of [
      "Preciso cadastrar cartão de crédito para testar?",
      "O teste tem todas as funcionalidades?",
      "O que acontece depois dos 30 dias?",
      "O que eu cadastrar no teste continua valendo se eu assinar?",
      "Posso cancelar quando quiser?",
    ]) {
      expect(screen.getByText(pergunta, { selector: "summary" })).toBeInTheDocument();
    }
  });

  it("mostra as perguntas do teste depois de “Quanto custa?”", () => {
    const titulos = perguntas.map((item) => item.pergunta);
    expect(titulos.indexOf("Preciso cadastrar cartão de crédito para testar?")).toBe(
      titulos.indexOf("Quanto custa?") + 1,
    );
  });

  it("“Como eu começo?” cita o teste e mantém o formulário de contato", () => {
    const comeco = perguntas.find((item) => item.pergunta === "Como eu começo?");
    expect(comeco?.resposta).toMatch(/teste grátis/i);
    expect(comeco?.resposta).toMatch(/formulário de contato/i);
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

  it("a resposta sobre preço aponta para a seção Planos e mantém o contato para dúvidas", () => {
    const preco = perguntas.find((item) => item.pergunta === "Quanto custa?");
    expect(preco?.resposta).toMatch(/seção Planos/i);
    expect(preco?.resposta).toMatch(/formulário de contato/i);
  });
});
