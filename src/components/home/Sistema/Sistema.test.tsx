import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { Sistema } from "./Sistema";
import { perfis } from "./Sistema.data";

describe("Sistema", () => {
  it("é a seção #sistema, com título e uma aba por perfil", () => {
    const { container } = renderComTema(<Sistema />);
    expect(container.querySelector("section#sistema")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Tudo o que o pátio precisa, no mesmo sistema." })).toBeInTheDocument();
    expect(screen.getAllByRole("tab").map((aba) => aba.textContent)).toEqual(["Cliente", "Operador", "Gestor"]);
  });

  it("abre no Gestor e mostra as 9 telas dele em um carrossel", () => {
    renderComTema(<Sistema />);
    const painel = screen.getByRole("tabpanel", { name: "Gestor" });
    expect(painel).toBeVisible();
    expect(within(painel).getByRole("region", { name: "Telas do perfil Gestor" })).toBeInTheDocument();
    expect(within(painel).getAllByRole("group", { name: /^Tela \d+ de 9$/ })).toHaveLength(9);
    expect(within(painel).getByRole("heading", { level: 3, name: "Dashboard" })).toBeInTheDocument();
  });

  it("deixa no HTML as telas de todos os perfis, cada uma com texto alternativo", () => {
    renderComTema(<Sistema />);
    for (const perfil of perfis) {
      for (const tela of perfil.telas) {
        expect(screen.getAllByRole("img", { hidden: true }).some((img) => img.getAttribute("alt") === tela.alt)).toBe(true);
      }
    }
  });

  it("chama para o teste grátis ao fim da seção", () => {
    renderComTema(<Sistema />);
    expect(screen.getByRole("link", { name: "Testar grátis" })).toHaveAttribute("href", urlAdesaoTeste);
  });
});
