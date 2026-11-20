import { fireEvent, screen, within } from "@testing-library/react";
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
    expect(screen.getAllByRole("tab").map((aba) => aba.textContent)).toEqual(["Cliente", "Operador", "Lavador", "Conveniado", "Gestor"]);
  });

  it("abre no Operador e mostra as 7 telas dele em um carrossel", () => {
    renderComTema(<Sistema />);
    const painel = screen.getByRole("tabpanel", { name: "Operador" });
    expect(painel).toBeVisible();
    expect(screen.getByRole("tab", { name: "Operador" })).toHaveAttribute("aria-selected", "true");
    expect(within(painel).getByRole("region", { name: "Telas do perfil Operador" })).toBeInTheDocument();
    expect(within(painel).getAllByRole("group", { name: /^Tela \d+ de 7$/ })).toHaveLength(7);
  });

  it("mostra a fila de serviços no Lavador e o carimbo no Conveniado", () => {
    renderComTema(<Sistema />);

    fireEvent.click(screen.getByRole("tab", { name: "Lavador" }));
    const lavador = screen.getByRole("tabpanel", { name: "Lavador" });
    expect(lavador).toBeVisible();
    expect(within(lavador).getByRole("heading", { level: 3, name: "Fila de serviços" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Conveniado" }));
    const conveniado = screen.getByRole("tabpanel", { name: "Conveniado" });
    expect(conveniado).toBeVisible();
    expect(within(conveniado).getByRole("heading", { level: 3, name: "Carimbar o ticket" })).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "Experimente no seu pátio" })).toHaveAttribute("href", urlAdesaoTeste);
  });
});
