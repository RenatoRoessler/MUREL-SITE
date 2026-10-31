import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesao } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("tem um único h1 com a proposta de valor", () => {
    renderComTema(<Hero />);
    const titulos = screen.getAllByRole("heading", { level: 1 });
    expect(titulos).toHaveLength(1);
    expect(titulos[0]).toHaveTextContent("Seu pátio sob controle.");
  });

  it("diz o que a Murel faz e o diferencial", () => {
    renderComTema(<Hero />);
    expect(screen.getByText(/estacionamentos, valets e lava-rápidos/i)).toBeInTheDocument();
    expect(screen.getByText(/sem impressora e sem pedir e-mail ou telefone/i)).toBeInTheDocument();
  });

  it("destaca a chamada para a adesão e mantém o contato com a equipe", () => {
    renderComTema(<Hero />);
    expect(screen.getByRole("link", { name: "Ir para adesão" })).toHaveAttribute("href", urlAdesao);
    expect(screen.getByRole("link", { name: "Falar com a equipe" })).toHaveAttribute("href", "#contato");
  });
});
