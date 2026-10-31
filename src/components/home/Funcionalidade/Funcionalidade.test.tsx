import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesao } from "@/lib/config";
import { renderComTema } from "@/test/render";
import type { Funcionalidade as FuncionalidadeDados } from "@/types/funcionalidade";
import { Funcionalidade } from "./Funcionalidade";

const dados: FuncionalidadeDados = {
  id: "patio",
  rotulo: "Pátio",
  resumo: "Quem está no pátio agora.",
  titulo: "Veja o pátio inteiro",
  descricao: "Todos os veículos presentes, em uma tela.",
  itens: ["Busca por placa", "Filtro por tipo"],
  telas: [{ imagem: { src: "/a.webp", width: 1280, height: 800 }, alt: "Lista do pátio" }],
};

describe("Funcionalidade", () => {
  it("mostra título, descrição, itens e tela", () => {
    renderComTema(<Funcionalidade dados={dados} />);
    expect(screen.getByRole("heading", { level: 2, name: "Veja o pátio inteiro" })).toBeInTheDocument();
    expect(screen.getByText("Todos os veículos presentes, em uma tela.")).toBeInTheDocument();
    expect(screen.getByText("Busca por placa")).toBeInTheDocument();
    expect(screen.getByText("Filtro por tipo")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Lista do pátio" })).toBeInTheDocument();
  });

  it("usa o id da área como âncora da seção", () => {
    const { container } = renderComTema(<Funcionalidade dados={dados} />);
    expect(container.querySelector("section#patio")).not.toBeNull();
  });

  it("leva a chamada para o fluxo de adesão", () => {
    renderComTema(<Funcionalidade dados={dados} />);
    expect(screen.getByRole("link", { name: "Ir para adesão" })).toHaveAttribute("href", urlAdesao);
  });
});
