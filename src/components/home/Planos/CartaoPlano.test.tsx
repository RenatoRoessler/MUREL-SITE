import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { urlAdesaoComPlano } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { CartaoPlano } from "./CartaoPlano";
import { fimDoLancamento } from "./Lancamento";
import { planoMensal } from "./Planos.data";

const antesDoPrazo = new Date(fimDoLancamento.getTime() - 24 * 60 * 60 * 1000);
const depoisDoPrazo = new Date(fimDoLancamento.getTime() + 1);

function renderizarEm(data: Date) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(data);
  return renderComTema(<CartaoPlano plano={planoMensal} />);
}

describe("CartaoPlano", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("com o lançamento vigente", () => {
    it("mostra o preço de tabela riscado e o de lançamento em destaque", () => {
      renderizarEm(antesDoPrazo);
      expect(screen.getByRole("heading", { level: 3, name: "Mensal" })).toBeInTheDocument();
      expect(screen.getByText("R$ 99,90").tagName).toBe("S");
      expect(screen.getByText("R$ 69,90")).toBeInTheDocument();
    });

    it("dá contexto ao preço riscado para leitor de tela", () => {
      const { container } = renderizarEm(antesDoPrazo);
      const texto = (container.querySelector("p")?.textContent ?? "").replace(/\s/g, " ");
      expect(texto).toBe("de R$ 99,90 por R$ 69,90/mês");
    });

    it("mostra o selo com o prazo e a regra dos 12 meses", () => {
      renderizarEm(antesDoPrazo);
      expect(screen.getByText("Preço de lançamento · assine até 30/06/2027")).toBeInTheDocument();
      expect(
        screen.getByText(/R\$\s69,90\/mês nos primeiros 12 meses; depois, R\$\s99,90\/mês\./),
      ).toBeInTheDocument();
    });
  });

  describe("com o lançamento encerrado", () => {
    it("mostra só o preço de tabela, sem riscado, selo nem regra dos 12 meses", () => {
      const { container } = renderizarEm(depoisDoPrazo);
      expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
      expect(container.querySelector("s")).toBeNull();
      expect(screen.queryByText(/Preço de lançamento/)).not.toBeInTheDocument();
      expect(screen.queryByText(/primeiros 12 meses/)).not.toBeInTheDocument();
      expect(screen.queryByText("R$ 69,90")).not.toBeInTheDocument();
    });
  });

  it("lista as garantias do plano", () => {
    renderizarEm(antesDoPrazo);
    expect(screen.getByText("Todas as funcionalidades")).toBeInTheDocument();
    expect(screen.getByText("Sem fidelidade")).toBeInTheDocument();
    expect(screen.getByText("30 dias grátis para testar")).toBeInTheDocument();
  });

  it("leva à adesão com o tipo Mensal nos dois estados", () => {
    const { unmount } = renderizarEm(antesDoPrazo);
    expect(screen.getByRole("link", { name: "Assinar o plano mensal" })).toHaveAttribute(
      "href",
      urlAdesaoComPlano(1),
    );
    unmount();

    renderizarEm(depoisDoPrazo);
    expect(screen.getByRole("link", { name: "Assinar o plano mensal" })).toHaveAttribute(
      "href",
      urlAdesaoComPlano(1),
    );
  });
});
