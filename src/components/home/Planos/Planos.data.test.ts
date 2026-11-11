import { describe, expect, it } from "vitest";
import { areasDoSistema, montarGarantiasPlano } from "./Planos.data";

describe("montarGarantiasPlano", () => {
  it("lista as três garantias, com a duração do teste do back-end", () => {
    expect(montarGarantiasPlano({ duracaoMeses: 1 })).toEqual([
      "Todas as funcionalidades",
      "Sem fidelidade",
      "1º mês grátis",
    ]);
  });

  it("não cita número quando a duração é desconhecida", () => {
    expect(montarGarantiasPlano(null).join(" ")).not.toMatch(/\d/);
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
