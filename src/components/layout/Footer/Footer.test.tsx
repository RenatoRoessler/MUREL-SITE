import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAcesso } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("mostra o e-mail de contato e o link para o formulário", () => {
    renderComTema(<Footer />);
    expect(screen.getByRole("link", { name: "contato@murel.com.br" })).toHaveAttribute(
      "href",
      "mailto:contato@murel.com.br",
    );
    expect(screen.getByRole("link", { name: /formulário/i })).toHaveAttribute("href", "#contato");
  });

  it("repete o botão de acesso ao sistema", () => {
    renderComTema(<Footer />);
    expect(screen.getByRole("link", { name: "Acessar o sistema" })).toHaveAttribute("href", urlAcesso);
  });
});
