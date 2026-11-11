import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { ofertaEmPromocao } from "@/test/oferta";
import { renderComTema } from "@/test/render";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("tem um único h1 com a proposta de valor", () => {
    renderComTema(<Hero teste={ofertaEmPromocao.teste} />);
    const titulos = screen.getAllByRole("heading", { level: 1 });
    expect(titulos).toHaveLength(1);
    expect(titulos[0]).toHaveTextContent("Seu pátio sob controle.");
  });

  it("diz o que a Murel faz e o diferencial", () => {
    renderComTema(<Hero teste={ofertaEmPromocao.teste} />);
    expect(screen.getByText(/estacionamentos, valets e lava-rápidos/i)).toBeInTheDocument();
    expect(screen.getByText(/sem impressora e sem pedir e-mail ou telefone/i)).toBeInTheDocument();
  });

  it("destaca o teste grátis e mantém o contato com a equipe", () => {
    renderComTema(<Hero teste={ofertaEmPromocao.teste} />);
    expect(screen.getByRole("link", { name: "Comece com 1 mês grátis" })).toHaveAttribute(
      "href",
      urlAdesaoTeste,
    );
    expect(screen.getByRole("link", { name: "Falar com a equipe" })).toHaveAttribute("href", "#contato");
  });

  it("não cita duração do teste quando o back-end não informa", () => {
    renderComTema(<Hero teste={null} />);
    expect(screen.getByRole("link", { name: "Comece grátis" })).toHaveAttribute("href", urlAdesaoTeste);
    expect(screen.queryByText(/por \d+ m/)).not.toBeInTheDocument();
  });

  it("mostra as garantias do teste abaixo das chamadas", () => {
    renderComTema(<Hero teste={ofertaEmPromocao.teste} />);
    const lista = screen.getByRole("list", { name: "Condições do mês grátis" });
    expect(within(lista).getAllByRole("listitem")).toHaveLength(3);
  });
});
