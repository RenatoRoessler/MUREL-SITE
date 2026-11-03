import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Planos } from "./Planos";
import { areasDoSistema } from "./Planos.data";

describe("Planos", () => {
  it("é a seção #planos, com o título da seção", () => {
    const { container } = renderComTema(<Planos />);
    expect(container.querySelector("section#planos")).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "Escolha como quer pagar. O sistema é o mesmo." }),
    ).toBeInTheDocument();
  });

  it("lista os quatro planos, do mensal ao anual", () => {
    renderComTema(<Planos />);
    const lista = screen.getByRole("link", { name: "Aderir ao plano mensal" }).closest("ul")!;
    const nomes = within(lista)
      .getAllByRole("heading", { level: 3 })
      .map((titulo) => titulo.textContent);
    expect(nomes).toEqual(["Mensal", "Trimestral", "Semestral", "Anual"]);
  });

  it("leva cada plano à adesão com o seu tipo", () => {
    renderComTema(<Planos />);
    const tipos = [
      ["Aderir ao plano mensal", "1"],
      ["Aderir ao plano trimestral", "2"],
      ["Aderir ao plano semestral", "3"],
      ["Aderir ao plano anual", "4"],
    ];
    for (const [nome, tipo] of tipos) {
      expect(screen.getByRole("link", { name: nome }).getAttribute("href")).toMatch(
        new RegExp(`/adesao\\?tipoPlanoAdesao=${tipo}$`),
      );
    }
  });

  it("apresenta o teste grátis antes dos planos, sem tratá-lo como um quinto plano", () => {
    renderComTema(<Planos />);
    const faixa = screen.getByRole("heading", { level: 3, name: "Teste grátis por 30 dias" });
    const primeiroPlano = screen.getByRole("link", { name: "Aderir ao plano mensal" });
    expect(faixa.compareDocumentPosition(primeiroPlano) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href") ?? "");
    const aderir = screen.getAllByRole("link", { name: /^Aderir ao plano/ });
    expect(aderir).toHaveLength(4);
    for (const link of aderir) {
      expect(link.getAttribute("href")).not.toMatch(/tipoPlanoAdesao=0$/);
    }
    expect(hrefs.filter((href) => href.endsWith("tipoPlanoAdesao=0"))).toHaveLength(1);
  });

  it("avisa que todos os planos começam com 30 dias grátis", () => {
    renderComTema(<Planos />);
    expect(screen.getByText(/Todos os planos começam com 30 dias grátis/)).toBeInTheDocument();
  });

  it("mostra as 13 áreas do sistema como incluídas em todos os planos", () => {
    renderComTema(<Planos />);
    expect(screen.getByRole("heading", { level: 3, name: "Tudo isso em todos os planos" })).toBeInTheDocument();
    for (const area of areasDoSistema) {
      expect(screen.getByText(area.titulo)).toBeInTheDocument();
    }
    expect(areasDoSistema).toHaveLength(13);
  });

  it("não cita o que o sistema ainda não tem", () => {
    const { container } = renderComTema(<Planos />);
    expect(container.textContent).not.toMatch(/relat[óo]rios|nfs-?e|avarias|pagamento por tag|auditoria/i);
  });

  it("oferece falar com a equipe pelo formulário de contato", () => {
    renderComTema(<Planos />);
    expect(screen.getByRole("link", { name: "Falar com a equipe" })).toHaveAttribute("href", "#contato");
  });
});
