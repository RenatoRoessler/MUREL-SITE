import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoComPlano } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { CartaoPlano } from "./CartaoPlano";
import { calcularCondicoes, planos } from "./Planos.data";

const [mensal, trimestral, , anual] = planos;

function renderizar(plano: (typeof planos)[number]) {
  return renderComTema(<CartaoPlano plano={plano} condicoes={calcularCondicoes(plano, mensal)} />);
}

describe("CartaoPlano", () => {
  it("mostra nome, valor por mês, total do período e economia", () => {
    renderizar(trimestral);
    expect(screen.getByRole("heading", { level: 3, name: "Trimestral" })).toBeInTheDocument();
    expect(screen.getByText("R$ 134,90")).toBeInTheDocument();
    expect(screen.getByText("R$ 404,70 a cada 3 meses")).toBeInTheDocument();
    expect(screen.getByText("Economia de R$ 45,00 (10%)")).toBeInTheDocument();
  });

  it("no plano mensal não mostra economia e diz que a cobrança é todo mês", () => {
    renderizar(mensal);
    expect(screen.getByText("R$ 149,90")).toBeInTheDocument();
    expect(screen.getByText("Cobrado todo mês")).toBeInTheDocument();
    expect(screen.queryByText(/economia/i)).not.toBeInTheDocument();
  });

  it("leva à adesão com o tipo do plano e cita o plano no nome do botão", () => {
    renderizar(anual);
    expect(screen.getByRole("link", { name: "Aderir ao plano anual" })).toHaveAttribute(
      "href",
      urlAdesaoComPlano(4),
    );
  });

  it("destaca só o plano recomendado, com selo em texto", () => {
    const { unmount } = renderizar(anual);
    expect(screen.getByText("Mais econômico")).toBeInTheDocument();
    expect(screen.getByText("Economia de R$ 840,00 (47%)")).toBeInTheDocument();
    unmount();

    renderizar(trimestral);
    expect(screen.queryByText("Mais econômico")).not.toBeInTheDocument();
  });
});
