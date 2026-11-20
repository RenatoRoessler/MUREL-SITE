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

  it("tem um carro decorativo, escondido do leitor de tela, que não entra na lista de passos", () => {
    const { container } = renderComTema(<ComoFunciona />);
    const carro = container.querySelector("span[aria-hidden='true'] > svg")!.parentElement!;
    expect(carro).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("ol > li")).toHaveLength(4);
    expect(within(container as HTMLElement).queryByText(/carro percorre/i)).not.toBeInTheDocument();
  });

  it("anima a pista só com movimento permitido e onde há unidades de contêiner", () => {
    renderComTema(<ComoFunciona />);
    const css = Array.from(document.querySelectorAll("style"))
      .map((estilo) => estilo.textContent)
      .join("");
    expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(css).toContain("@supports (width: 1cqw)");
    expect(css).toContain("container-type:inline-size");
    expect(css).toMatch(/\[data-estado="visivel"\]\s*>[^{]*::before\s*\{[^}]*clip-path:\s*inset\(0\)/);
  });
});
