import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { SeletorPerfil } from "./SeletorPerfil";

const perfis = [
  { id: "cliente" as const, rotulo: "Cliente", resumo: "Resumo do cliente.", conteudo: <p>Telas do cliente</p> },
  { id: "operador" as const, rotulo: "Operador", resumo: "Resumo do operador.", conteudo: <p>Telas do operador</p> },
  { id: "gestor" as const, rotulo: "Gestor", resumo: "Resumo do gestor.", conteudo: <p>Telas do gestor</p> },
];

function montar() {
  return renderComTema(<SeletorPerfil perfis={perfis} inicial="gestor" rotulo="Perfil de usuário" />);
}

describe("SeletorPerfil", () => {
  it("tem uma lista de abas com nome e uma aba por perfil", () => {
    montar();
    expect(screen.getByRole("tablist", { name: "Perfil de usuário" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab").map((aba) => aba.textContent)).toEqual(["Cliente", "Operador", "Gestor"]);
  });

  it("abre no perfil inicial, com só uma aba na ordem de tabulação", () => {
    montar();
    expect(screen.getByRole("tab", { name: "Gestor" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Gestor" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Cliente" })).toHaveAttribute("tabindex", "-1");
  });

  it("mantém os três painéis no HTML e esconde os inativos", () => {
    const { container } = montar();
    const paineis = container.querySelectorAll('[role="tabpanel"]');
    expect(paineis).toHaveLength(3);
    expect(screen.getByRole("tabpanel", { name: "Gestor" })).toBeVisible();
    expect(screen.getByText("Telas do cliente")).not.toBeVisible();
    expect(screen.getByText("Telas do operador")).not.toBeVisible();
  });

  it("liga cada aba ao seu painel", () => {
    montar();
    const aba = screen.getByRole("tab", { name: "Operador" });
    const painel = document.getElementById(aba.getAttribute("aria-controls") ?? "");
    expect(painel).toHaveAttribute("aria-labelledby", aba.id);
  });

  it("troca de perfil ao clicar na aba", () => {
    montar();
    fireEvent.click(screen.getByRole("tab", { name: "Operador" }));
    expect(screen.getByRole("tab", { name: "Operador" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Telas do operador")).toBeVisible();
    expect(screen.getByText("Telas do gestor")).not.toBeVisible();
    expect(screen.getByText("Resumo do operador.")).toBeVisible();
  });

  it("troca de perfil e move o foco com as setas, voltando ao início no fim da lista", () => {
    montar();
    const gestor = screen.getByRole("tab", { name: "Gestor" });
    fireEvent.keyDown(gestor, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Cliente" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Cliente" })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole("tab", { name: "Cliente" }), { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { name: "Gestor" })).toHaveAttribute("aria-selected", "true");
  });

  it("vai à primeira e à última aba com Home e End", () => {
    montar();
    fireEvent.keyDown(screen.getByRole("tab", { name: "Gestor" }), { key: "Home" });
    expect(screen.getByRole("tab", { name: "Cliente" })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(screen.getByRole("tab", { name: "Cliente" }), { key: "End" });
    expect(screen.getByRole("tab", { name: "Gestor" })).toHaveAttribute("aria-selected", "true");
  });
});
