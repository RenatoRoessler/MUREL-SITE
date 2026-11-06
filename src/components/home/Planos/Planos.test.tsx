import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Planos } from "./Planos";
import { areasDoSistema } from "./Planos.data";

describe("Planos", () => {
  it("é a seção #planos, com o título da seção", () => {
    const { container } = renderComTema(<Planos />);
    expect(container.querySelector("section#planos")).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "Um plano, tudo incluso, sem fidelidade." }),
    ).toBeInTheDocument();
  });

  it("tem um único plano, o mensal", () => {
    renderComTema(<Planos />);
    expect(screen.getByRole("heading", { level: 3, name: "Mensal" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /^Assinar o plano/ })).toHaveLength(1);
  });

  it("leva o plano à adesão com o tipo Mensal (1)", () => {
    renderComTema(<Planos />);
    expect(screen.getByRole("link", { name: "Assinar o plano mensal" }).getAttribute("href")).toMatch(
      /\/adesao\?tipoPlanoAdesao=1$/,
    );
  });

  it("apresenta o teste grátis antes do plano, com o tipo Trial (0)", () => {
    renderComTema(<Planos />);
    const faixa = screen.getByRole("heading", { level: 3, name: "Teste grátis por 30 dias" });
    const plano = screen.getByRole("link", { name: "Assinar o plano mensal" });
    expect(faixa.compareDocumentPosition(plano) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href") ?? "");
    expect(hrefs.filter((href) => href.endsWith("tipoPlanoAdesao=0"))).toHaveLength(1);
  });

  it("avisa, no singular, que o plano começa com 30 dias grátis", () => {
    renderComTema(<Planos />);
    expect(screen.getByText(/O plano começa com 30 dias grátis/)).toBeInTheDocument();
    expect(screen.queryByText(/Todos os planos/)).not.toBeInTheDocument();
  });

  it("mostra as 13 áreas do sistema como incluídas no plano", () => {
    renderComTema(<Planos />);
    expect(screen.getByRole("heading", { level: 3, name: "Tudo isso incluso no plano" })).toBeInTheDocument();
    for (const area of areasDoSistema) {
      expect(screen.getByText(area.titulo)).toBeInTheDocument();
    }
    expect(areasDoSistema).toHaveLength(13);
  });

  it("não cita os planos que saíram nem os preços antigos", () => {
    const { container } = renderComTema(<Planos />);
    expect(container.textContent).not.toMatch(/trimestral|semestral|anual|economia|mais econ[ôo]mico/i);
    expect(container.textContent).not.toMatch(/149,90|134,90|119,90|79,90/);
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
