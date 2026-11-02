import { describe, expect, it } from "vitest";
import { areasDoSistema, calcularCondicoes, planos } from "./Planos.data";

describe("planos", () => {
  it("lista os quatro planos em ordem de prazo, com os valores por mês", () => {
    expect(planos.map(({ nome, meses, centavosPorMes }) => [nome, meses, centavosPorMes])).toEqual([
      ["Mensal", 1, 14990],
      ["Trimestral", 3, 13490],
      ["Semestral", 6, 11990],
      ["Anual", 12, 7990],
    ]);
  });

  it("usa os tipos de adesão do sistema (1 a 4) e deixa o Trial de fora", () => {
    expect(planos.map((plano) => plano.tipo)).toEqual([1, 2, 3, 4]);
  });

  it("recomenda só o plano Anual", () => {
    expect(planos.filter((plano) => plano.recomendado).map((plano) => plano.nome)).toEqual(["Anual"]);
  });
});

describe("calcularCondicoes", () => {
  const [mensal, ...demais] = planos;

  it("calcula o total do período em centavos", () => {
    expect([mensal, ...demais].map((plano) => calcularCondicoes(plano, mensal).totalCentavos)).toEqual([
      14990, 40470, 71940, 95880,
    ]);
  });

  it("calcula a economia sobre o plano mensal em centavos", () => {
    expect([mensal, ...demais].map((plano) => calcularCondicoes(plano, mensal).economiaCentavos)).toEqual([
      0, 4500, 18000, 84000,
    ]);
  });

  it("arredonda o percentual de economia para inteiro", () => {
    expect([mensal, ...demais].map((plano) => calcularCondicoes(plano, mensal).economiaPercentual)).toEqual([
      0, 10, 20, 47,
    ]);
  });
});

describe("areasDoSistema", () => {
  it("tem as 13 áreas, cada uma com título e descrição", () => {
    expect(areasDoSistema).toHaveLength(13);
    for (const area of areasDoSistema) {
      expect(area.titulo.trim()).not.toBe("");
      expect(area.descricao.trim()).not.toBe("");
    }
  });

  it("não cita o que o sistema ainda não tem", () => {
    const texto = areasDoSistema.map((area) => `${area.titulo} ${area.descricao}`).join(" ");
    expect(texto).not.toMatch(/relat[óo]rio|nfs-?e|avaria|\btag\b|auditoria|redefini|resetar|reset de senha|permiss[õo]es por m[óo]dulo/i);
  });
});
