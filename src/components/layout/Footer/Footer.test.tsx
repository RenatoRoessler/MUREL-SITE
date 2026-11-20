import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAcesso, urlAdesao, urlWhatsapp } from "@/lib/config";
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

  it("repete a chamada para a adesão", () => {
    renderComTema(<Footer />);
    expect(screen.getByRole("link", { name: "Ir para adesão" })).toHaveAttribute("href", urlAdesao);
  });

  it("traz os atalhos das seções da página", () => {
    renderComTema(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Seções da página no rodapé" });
    expect(within(nav).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Sistema", "#sistema"],
      ["Como funciona", "#como-funciona"],
      ["Planos", "#planos"],
      ["Perguntas", "#perguntas"],
      ["Contato", "#contato"],
    ]);
  });

  it("sem os endereços de termos e privacidade, não mostra a coluna Legal", () => {
    renderComTema(<Footer enderecoDosTermos={null} enderecoDaPrivacidade={null} />);
    expect(screen.queryByRole("navigation", { name: "Documentos legais" })).not.toBeInTheDocument();
    expect(screen.queryByText("Termos de uso")).not.toBeInTheDocument();
  });

  it("com os endereços, mostra termos de uso e política de privacidade", () => {
    renderComTema(<Footer enderecoDosTermos="https://murel.com.br/termos" enderecoDaPrivacidade="https://murel.com.br/privacidade" />);
    const nav = screen.getByRole("navigation", { name: "Documentos legais" });
    expect(within(nav).getByRole("link", { name: "Termos de uso" })).toHaveAttribute("href", "https://murel.com.br/termos");
    expect(within(nav).getByRole("link", { name: "Política de privacidade" })).toHaveAttribute("href", "https://murel.com.br/privacidade");
  });

  it("mostra só o documento que tem endereço", () => {
    renderComTema(<Footer enderecoDosTermos="https://murel.com.br/termos" enderecoDaPrivacidade={null} />);
    expect(screen.getByRole("link", { name: "Termos de uso" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Política de privacidade" })).not.toBeInTheDocument();
  });
});
