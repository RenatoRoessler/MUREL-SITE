import { describe, expect, it } from "vitest";
import { fimDoLancamento, rotuloFimDoLancamento } from "./Lancamento";
import { areasDoSistema, planoMensal } from "./Planos.data";

describe("planoMensal", () => {
  it("tem o preço de tabela, o de lançamento e os meses de lançamento", () => {
    expect(planoMensal.centavosPorMes).toBe(9990);
    expect(planoMensal.centavosLancamento).toBe(6990);
    expect(planoMensal.mesesDeLancamento).toBe(12);
  });

  it("usa o tipo de adesão Mensal (1)", () => {
    expect(planoMensal.tipo).toBe(1);
  });
});

describe("fim do lançamento", () => {
  it("é 01/07/2027 00:00 em Brasília e o rótulo mostra 30/06/2027", () => {
    expect(fimDoLancamento.toISOString()).toBe("2027-07-01T03:00:00.000Z");
    expect(rotuloFimDoLancamento).toBe("30/06/2027");
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
