import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { ComoFunciona } from "./ComoFunciona";

describe("ComoFunciona", () => {
  it("lista os passos na ordem do fluxo", () => {
    renderComTema(<ComoFunciona />);
    const itens = within(screen.getByRole("list")).getAllByRole("listitem");
    const titulos = itens.map((item) => within(item).getByRole("heading").textContent);
    expect(titulos).toEqual(["Entrada", "Foto da tela", "Aponta a câmera", "Acompanha", "Saída"]);
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
