import { fireEvent, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderComTema } from "@/test/render";
import { GruposDoPlano } from "./GruposDoPlano";
import { areasDoSistema, gruposDeAreas } from "./Planos.data";

function simularTela(larga: boolean) {
  vi.stubGlobal("matchMedia", (consulta: string) => ({
    matches: larga,
    media: consulta,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("GruposDoPlano", () => {
  it("sem matchMedia, mostra os quatro grupos abertos e as 16 áreas", () => {
    renderComTema(<GruposDoPlano grupos={gruposDeAreas} />);
    expect(screen.getAllByRole("heading", { level: 4 }).map((titulo) => titulo.textContent)).toEqual([
      "Pátio",
      "Dinheiro",
      "Clientes",
      "Equipe e empresa",
    ]);
    expect(screen.getAllByRole("listitem")).toHaveLength(areasDoSistema.length);
  });

  it("em tela larga, todos os grupos ficam abertos", () => {
    simularTela(true);
    renderComTema(<GruposDoPlano grupos={gruposDeAreas} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(areasDoSistema.length);
    expect(document.querySelectorAll("details")).toHaveLength(0);
  });

  it("no celular, vira acordeão com o primeiro grupo aberto", () => {
    simularTela(false);
    const { container } = renderComTema(<GruposDoPlano grupos={gruposDeAreas} />);
    const detalhes = Array.from(container.querySelectorAll("details"));
    expect(detalhes).toHaveLength(4);
    expect(detalhes.map((detalhe) => detalhe.open)).toEqual([true, false, false, false]);
    expect(within(detalhes[0]).getByText("Entrada e saída de veículos")).toBeInTheDocument();
  });

  it("no celular, abre um grupo pelo resumo", () => {
    simularTela(false);
    const { container } = renderComTema(<GruposDoPlano grupos={gruposDeAreas} />);
    const dinheiro = screen.getByText("Dinheiro").closest("details")!;
    expect(dinheiro.open).toBe(false);

    dinheiro.open = true;
    fireEvent(dinheiro, new Event("toggle"));
    expect(container.querySelectorAll("details[open]")).toHaveLength(2);
  });

  it("no celular, o resumo mostra o sinal de abrir e fechar", () => {
    simularTela(false);
    renderComTema(<GruposDoPlano grupos={gruposDeAreas} />);
    const css = Array.from(document.querySelectorAll("style"))
      .map((estilo) => estilo.textContent)
      .join("");
    expect(css).toMatch(/content:"\+"/);
  });

  it("no celular, cada grupo mostra quantas áreas tem", () => {
    simularTela(false);
    const { container } = renderComTema(<GruposDoPlano grupos={gruposDeAreas} />);
    const resumos = Array.from(container.querySelectorAll("summary")).map((resumo) => resumo.textContent);
    expect(resumos).toEqual(["Pátio3 áreas", "Dinheiro5 áreas", "Clientes4 áreas", "Equipe e empresa4 áreas"]);
  });

  it("usa o singular quando o grupo tem uma área só", () => {
    simularTela(false);
    const { container } = renderComTema(<GruposDoPlano grupos={[{ titulo: "Único", areas: [areasDoSistema[0]] }]} />);
    expect(container.querySelector("summary")).toHaveTextContent("Único1 área");
  });
});
