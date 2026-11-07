import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ofertaEmPromocao, ofertaPromocaoSemData, ofertaSemPromocao } from "@/test/oferta";
import { renderComTema } from "@/test/render";
import type { OfertaPlanos } from "@/types/plano";
import { Faq } from "./Faq";
import { montarPerguntas } from "./Faq.data";

const texto = (valor: string) => valor.replace(/\s/g, " ");

const resposta = (oferta: OfertaPlanos | null, pergunta: string) =>
  texto(montarPerguntas(oferta).find((item) => item.pergunta === pergunta)?.resposta ?? "");

const titulos = (oferta: OfertaPlanos | null) => montarPerguntas(oferta).map((item) => item.pergunta);

describe("Faq", () => {
  it("mostra as perguntas combinadas no PRD", () => {
    renderComTema(<Faq oferta={ofertaEmPromocao} />);
    expect(screen.getByText(/tipo de negócio/i)).toBeInTheDocument();
    expect(screen.getByText(/comprar impressora/i)).toBeInTheDocument();
    expect(screen.getByText(/dados do cliente/i)).toBeInTheDocument();
    expect(screen.getByText(/celular/i, { selector: "summary" })).toBeInTheDocument();
    expect(screen.getByText(/como eu começo/i)).toBeInTheDocument();
  });

  it("responde as dúvidas sobre o teste grátis", () => {
    renderComTema(<Faq oferta={ofertaEmPromocao} />);
    for (const pergunta of [
      "Preciso cadastrar cartão de crédito para testar?",
      "O teste tem todas as funcionalidades?",
      "O que acontece quando o teste termina?",
      "O que eu cadastrar no teste continua valendo se eu assinar?",
      "Posso cancelar quando quiser?",
    ]) {
      expect(screen.getByText(pergunta, { selector: "summary" })).toBeInTheDocument();
    }
  });

  it("abre e fecha a resposta por teclado", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Faq oferta={ofertaEmPromocao} />);
    const resumo = screen.getByText("Preciso comprar impressora?");
    const detalhes = resumo.closest("details");
    expect(detalhes).not.toHaveAttribute("open");

    await usuario.click(resumo);
    expect(detalhes).toHaveAttribute("open");
    await usuario.click(resumo);
    expect(detalhes).not.toHaveAttribute("open");
  });

  it("“Como eu começo?” cita o teste e mantém o formulário de contato", () => {
    const comeco = resposta(ofertaEmPromocao, "Como eu começo?");
    expect(comeco).toMatch(/teste grátis/i);
    expect(comeco).toMatch(/formulário de contato/i);
  });

  it("o fim do teste fala em assinar, não em escolher plano, e não depende da duração", () => {
    const fim = resposta(ofertaEmPromocao, "O que acontece quando o teste termina?");
    expect(fim).toMatch(/você assina/);
    expect(fim).not.toMatch(/escolhe um plano/);
  });

  describe("“Quanto custa?”", () => {
    it("com promoção e data, cita o preço atual, a data de promocaoFim e o preço de tabela", () => {
      const preco = resposta(ofertaEmPromocao, "Quanto custa?");
      expect(preco).toMatch(/R\$ 69,90 por mês no lançamento, até 30\/06\/2027/);
      expect(preco).toMatch(/R\$ 99,90 por mês/);
      expect(preco).toMatch(/seção Planos/i);
      expect(preco).toMatch(/formulário de contato/i);
      expect(preco).not.toMatch(/trimestral|semestral|anual|12 meses/i);
    });

    it("com promoção sem data, não cita data nenhuma", () => {
      const preco = resposta(ofertaPromocaoSemData, "Quanto custa?");
      expect(preco).toMatch(/R\$ 69,90 por mês no lançamento/);
      expect(preco).toMatch(/R\$ 99,90/);
      expect(preco).not.toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it("sem promoção, cita só o preço atual", () => {
      const preco = resposta(ofertaSemPromocao, "Quanto custa?");
      expect(preco).toMatch(/R\$ 99,90 por mês\./);
      expect(preco).not.toMatch(/lançamento/);
    });

    it("na contingência, não cita valor e manda falar com a equipe", () => {
      const preco = resposta(null, "Quanto custa?");
      expect(preco).not.toMatch(/R\$|\d/);
      expect(preco).toMatch(/formulário de contato/i);
    });
  });

  describe("fim do preço de lançamento", () => {
    const pergunta = "O que acontece quando o preço de lançamento acaba?";

    it("aparece logo após “Quanto custa?”, com a data e o preço de tabela", () => {
      const lista = titulos(ofertaEmPromocao);
      expect(lista.indexOf(pergunta)).toBe(lista.indexOf("Quanto custa?") + 1);
      const texto = resposta(ofertaEmPromocao, pergunta);
      expect(texto).toMatch(/30\/06\/2027/);
      expect(texto).toMatch(/R\$ 99,90/);
      expect(texto).not.toMatch(/\d+ dias|12 meses/);
    });

    it("fica de fora sem data de fim, sem promoção ou na contingência", () => {
      expect(titulos(ofertaPromocaoSemData)).not.toContain(pergunta);
      expect(titulos(ofertaSemPromocao)).not.toContain(pergunta);
      expect(titulos(null)).not.toContain(pergunta);
    });
  });
});
