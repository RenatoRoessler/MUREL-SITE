import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { urlAcesso } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { Header } from "./Header";

describe("Header", () => {
  it("leva ao sistema pelo botão 'Acessar o sistema'", () => {
    renderComTema(<Header />);
    expect(screen.getByRole("link", { name: "Acessar o sistema" })).toHaveAttribute("href", urlAcesso);
  });

  it("não tem botão de adesão", () => {
    renderComTema(<Header />);
    expect(screen.queryByRole("link", { name: /adesão/i, hidden: true })).not.toBeInTheDocument();
  });

  it("tem os links de seção e o atalho para o conteúdo", () => {
    renderComTema(<Header />);
    expect(screen.getByRole("link", { name: "Como funciona", hidden: true })).toHaveAttribute("href", "#como-funciona");
    expect(screen.getByRole("link", { name: "Perguntas", hidden: true })).toHaveAttribute("href", "#perguntas");
    expect(screen.getByRole("link", { name: "Contato", hidden: true })).toHaveAttribute("href", "#contato");
    expect(screen.getByRole("link", { name: "Ir para o conteúdo" })).toHaveAttribute("href", "#conteudo");
  });

  it("abre e fecha o menu pelo teclado", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    const botao = screen.getByRole("button", { name: "Abrir menu" });
    expect(botao).toHaveAttribute("aria-expanded", "false");

    botao.focus();
    await usuario.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");

    await usuario.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("fecha o menu ao escolher uma seção", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));
    await usuario.click(screen.getByRole("link", { name: "Contato" }));
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeInTheDocument();
  });
});
