import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoComPlano } from "@/lib/config";
import { planoMensalEmPromocao } from "@/test/oferta";
import { renderComTema } from "@/test/render";
import type { PlanoPago } from "@/types/plano";
import { CartaoPlano } from "./CartaoPlano";

const teste = { duracaoMeses: 1 };

const semPromocao: PlanoPago = { ...planoMensalEmPromocao, valorAtual: 99.9, promocao: null };
const promocaoSemData: PlanoPago = { ...planoMensalEmPromocao, promocao: { fim: null } };

describe("CartaoPlano", () => {
  describe("em promoção, com data de fim", () => {
    it("mostra o preço de tabela riscado e o atual em destaque", () => {
      renderComTema(<CartaoPlano plano={planoMensalEmPromocao} teste={teste} />);
      expect(screen.getByRole("heading", { level: 3, name: "Mensal" })).toBeInTheDocument();
      expect(screen.getByText("R$ 99,90").tagName).toBe("S");
      expect(screen.getByText("R$ 69,90")).toBeInTheDocument();
    });

    it("dá contexto ao preço riscado para leitor de tela", () => {
      const { container } = renderComTema(<CartaoPlano plano={planoMensalEmPromocao} teste={teste} />);
      const texto = (container.querySelector("p")?.textContent ?? "").replace(/\s/g, " ");
      expect(texto).toBe("de R$ 99,90 por R$ 69,90/mês");
    });

    it("mostra o selo com a data e a regra até o fim da promoção", () => {
      renderComTema(<CartaoPlano plano={planoMensalEmPromocao} teste={teste} />);
      expect(screen.getByText("Preço de lançamento · assine até 30/06/2027")).toBeInTheDocument();
      expect(
        screen.getByText(/R\$\s69,90\/mês até 30\/06\/2027; depois, R\$\s99,90\/mês\./),
      ).toBeInTheDocument();
      expect(screen.queryByText(/12 meses/)).not.toBeInTheDocument();
    });
  });

  describe("em promoção, sem data de fim", () => {
    it("mantém o riscado e o preço atual, sem nenhuma data", () => {
      const { container } = renderComTema(<CartaoPlano plano={promocaoSemData} teste={teste} />);
      expect(screen.getByText("R$ 99,90").tagName).toBe("S");
      expect(screen.getByText("R$ 69,90")).toBeInTheDocument();
      expect(screen.getByText("Preço de lançamento")).toBeInTheDocument();
      expect(container.textContent).not.toMatch(/\d{2}\/\d{2}\/\d{4}|assine até|; depois/);
    });
  });

  describe("sem promoção", () => {
    it("mostra só o preço atual, sem riscado, selo nem regra", () => {
      const { container } = renderComTema(<CartaoPlano plano={semPromocao} teste={teste} />);
      expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
      expect(container.querySelector("s")).toBeNull();
      expect(screen.queryByText(/Preço de lançamento/)).not.toBeInTheDocument();
      expect(screen.queryByText(/; depois/)).not.toBeInTheDocument();
      expect(screen.queryByText("R$ 69,90")).not.toBeInTheDocument();
    });
  });

  it("lista as garantias do plano, com a duração do teste do back-end", () => {
    renderComTema(<CartaoPlano plano={planoMensalEmPromocao} teste={teste} />);
    expect(screen.getByText("Todas as funcionalidades")).toBeInTheDocument();
    expect(screen.getByText("Sem fidelidade")).toBeInTheDocument();
    expect(screen.getByText("1 mês grátis para testar")).toBeInTheDocument();
  });

  it("não cita duração do teste quando o back-end não informa", () => {
    const { container } = renderComTema(<CartaoPlano plano={planoMensalEmPromocao} teste={null} />);
    expect(container.textContent).not.toMatch(/mês grátis|30 dias/);
  });

  it("leva à adesão com o tipo do plano, em qualquer estado", () => {
    for (const plano of [planoMensalEmPromocao, promocaoSemData, semPromocao]) {
      const { unmount } = renderComTema(<CartaoPlano plano={plano} teste={teste} />);
      expect(screen.getByRole("link", { name: "Assinar o plano mensal" })).toHaveAttribute(
        "href",
        urlAdesaoComPlano(1),
      );
      unmount();
    }
  });
});
