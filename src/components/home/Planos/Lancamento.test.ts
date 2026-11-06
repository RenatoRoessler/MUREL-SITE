import { describe, expect, it } from "vitest";
import { fimDoLancamento, lancamentoVigente } from "./Lancamento";

describe("lancamentoVigente", () => {
  const fim = fimDoLancamento.getTime();

  it("vale até um milissegundo antes de 01/07/2027 00:00 em Brasília", () => {
    expect(lancamentoVigente(fim - 1)).toBe(true);
  });

  it("encerra no instante do fim e depois dele", () => {
    expect(lancamentoVigente(fim)).toBe(false);
    expect(lancamentoVigente(fim + 1)).toBe(false);
  });

  it("ainda vale em 30/06/2027 às 23:59 em Brasília", () => {
    expect(lancamentoVigente(new Date("2027-06-30T23:59:00-03:00").getTime())).toBe(true);
  });

  it("aceita outro fim de lançamento", () => {
    const outroFim = new Date("2030-01-01T00:00:00-03:00");
    expect(lancamentoVigente(outroFim.getTime() - 1, outroFim)).toBe(true);
    expect(lancamentoVigente(outroFim.getTime(), outroFim)).toBe(false);
  });
});
