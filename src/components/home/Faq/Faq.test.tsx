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
      titulos.indexOf("Quanto custa?") + 2,
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

  it("a resposta sobre preço cita o lançamento, o prazo e o preço de tabela, sem os planos que saíram", () => {
    const preco = perguntas.find((item) => item.pergunta === "Quanto custa?");
    expect(preco?.resposta).toMatch(/R\$ 69,90/);
    expect(preco?.resposta).toMatch(/R\$ 99,90/);
    expect(preco?.resposta).toMatch(/30\/06\/2027/);
    expect(preco?.resposta).toMatch(/seção Planos/i);
    expect(preco?.resposta).toMatch(/formulário de contato/i);
    expect(preco?.resposta).not.toMatch(/trimestral|semestral|anual/i);
  });

  it("explica o que acontece depois dos 12 meses, logo após “Quanto custa?”, sem prometer aviso", () => {
    const titulos = perguntas.map((item) => item.pergunta);
    const pergunta = "O que acontece depois dos 12 meses do preço de lançamento?";
    expect(titulos.indexOf(pergunta)).toBe(titulos.indexOf("Quanto custa?") + 1);
    const resposta = perguntas.find((item) => item.pergunta === pergunta)?.resposta ?? "";
    expect(resposta).toMatch(/R\$ 99,90/);
    expect(resposta).not.toMatch(/\d+ dias/);
  });

  it("o fim do teste fala em assinar, não em escolher plano", () => {
    const fim = perguntas.find((item) => item.pergunta === "O que acontece depois dos 30 dias?");
    expect(fim?.resposta).toMatch(/você assina/);
    expect(fim?.resposta).not.toMatch(/escolhe um plano/);
  });
});
