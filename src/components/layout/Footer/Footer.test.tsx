import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAcesso, urlWhatsapp } from "@/lib/config";
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

  it("mostra o WhatsApp como forma de contato", () => {
    renderComTema(<Footer />);
    const link = screen.getByRole("link", { name: "WhatsApp: (19) 99221-5384" });
    expect(link).toHaveAttribute("href", urlWhatsapp);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("repete o botão de acesso ao sistema", () => {
    renderComTema(<Footer />);
    expect(screen.getByRole("link", { name: "Acessar o sistema" })).toHaveAttribute("href", urlAcesso);
  });
});
