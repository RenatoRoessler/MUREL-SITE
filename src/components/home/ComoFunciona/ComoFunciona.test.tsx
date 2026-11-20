import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { ComoFunciona } from "./ComoFunciona";

describe("ComoFunciona", () => {
  it("lista os passos na ordem do fluxo", () => {
    renderComTema(<ComoFunciona />);
    const titulos = screen.getAllByRole("heading", { level: 3 }).map((titulo) => titulo.textContent);
    expect(titulos).toEqual(["Entrada", "Foto da tela", "Aponta a câmera", "Acompanha", "Saída"]);
  });

  it("tem quatro etapas, e a segunda é uma escolha entre duas opções", () => {
    const { container } = renderComTema(<ComoFunciona />);
    const etapas = Array.from(container.querySelectorAll("ol > li"));
    expect(etapas).toHaveLength(4);

    const escolha = etapas[1];
    expect(within(escolha as HTMLElement).getByText("Passo 2 · escolha uma")).toBeInTheDocument();
    const opcoes = within(within(escolha as HTMLElement).getByRole("list")).getAllByRole("listitem");
    expect(opcoes.map((opcao) => within(opcao).getByRole("heading").textContent)).toEqual(["Foto da tela", "Aponta a câmera"]);
    expect(within(opcoes[0]).getByText("Passo 2a")).toBeInTheDocument();
    expect(within(opcoes[1]).getByText("Passo 2b")).toBeInTheDocument();
  });

  it("mostra as duas formas de levar o ticket", () => {
    renderComTema(<ComoFunciona />);
    expect(screen.getByText(/fotografa a tela/i)).toBeInTheDocument();
    expect(screen.getByText(/QR Code abre uma página pública/i)).toBeInTheDocument();
  });

  it("reforça que não há impressora nem dados do cliente", () => {
    renderComTema(<ComoFunciona />);
    expect(screen.getByText(/Sem impressora\. Sem e-mail e sem telefone do cliente\./)).toBeInTheDocument();
  });
});
