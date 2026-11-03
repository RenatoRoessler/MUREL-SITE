import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { urlAcesso, urlAdesaoTeste } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { Header } from "./Header";

describe("Header", () => {
  it("leva ao sistema pelo botão 'Acessar o sistema'", () => {
    renderComTema(<Header />);
    // O botão do header só aparece de md para cima (o jsdom não avalia media queries).
    const acessos = screen.getAllByRole("link", { name: "Acessar o sistema", hidden: true });
    expect(acessos).toHaveLength(2);
    for (const acesso of acessos) {
      expect(acesso).toHaveAttribute("href", urlAcesso);
    }
  });

  it("leva ao teste grátis pelo botão 'Testar grátis'", () => {
    renderComTema(<Header />);
    expect(screen.getByRole("link", { name: "Testar grátis" })).toHaveAttribute("href", urlAdesaoTeste);
  });

  it("mostra o acesso ao sistema também no menu aberto", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Header />);
    const menu = document.getElementById("menu-principal")!;
    expect(within(menu).queryByRole("link", { name: "Acessar o sistema" })).not.toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Abrir menu" }));
    const acesso = within(menu).getByRole("link", { name: "Acessar o sistema" });
    expect(acesso).toHaveAttribute("href", urlAcesso);
    expect(within(menu).getAllByRole("link").at(-1)).toBe(acesso);
  });

  it("tem os links de seção e o atalho para o conteúdo", () => {
    renderComTema(<Header />);
    expect(screen.getByRole("link", { name: "Sistema", hidden: true })).toHaveAttribute("href", "#sistema");
    expect(screen.getByRole("link", { name: "Como funciona", hidden: true })).toHaveAttribute("href", "#como-funciona");
    expect(screen.getByRole("link", { name: "Planos", hidden: true })).toHaveAttribute("href", "#planos");
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
