import { describe, expect, it } from "vitest";
import { formatarDataIso, formatarReais, rotuloDuracaoMeses } from "./formatar";

const semEspacoEspecial = (texto: string) => texto.replace(/\s/g, " ");

describe("formatarReais", () => {
  it("usa o formato brasileiro, com os centavos recebidos", () => {
    expect(semEspacoEspecial(formatarReais(69.9))).toBe("R$ 69,90");
    expect(semEspacoEspecial(formatarReais(99.9))).toBe("R$ 99,90");
    expect(semEspacoEspecial(formatarReais(0))).toBe("R$ 0,00");
  });
});

describe("formatarDataIso", () => {
  it("lê a data como texto, sem deslocar o dia", () => {
    expect(formatarDataIso("2027-06-30T00:00:00")).toBe("30/06/2027");
    expect(formatarDataIso("2027-06-30")).toBe("30/06/2027");
  });

  it("devolve null quando não é uma data ISO", () => {
    expect(formatarDataIso("30/06/2027")).toBeNull();
    expect(formatarDataIso("")).toBeNull();
  });
});

describe("rotuloDuracaoMeses", () => {
  it("usa singular e plural", () => {
    expect(rotuloDuracaoMeses(1)).toBe("1 mês");
    expect(rotuloDuracaoMeses(3)).toBe("3 meses");
  });
});
