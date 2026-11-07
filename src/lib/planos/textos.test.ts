import { describe, expect, it } from "vitest";
import {
  botaoTeste,
  fraseTesteContato,
  garantiaTestePlano,
  notaTestePlano,
  tituloTeste,
} from "./textos";

describe("textos da duração do teste", () => {
  it("citam a duração em meses quando o back-end informa", () => {
    const teste = { duracaoMeses: 1 };
    expect(tituloTeste(teste)).toBe("Teste grátis por 1 mês");
    expect(botaoTeste(teste)).toBe("Testar grátis por 1 mês");
    expect(garantiaTestePlano(teste)).toBe("1 mês grátis para testar");
    expect(notaTestePlano(teste)).toBe("O plano começa com 1 mês grátis. Você só paga depois do teste.");
    expect(fraseTesteContato(teste)).toBe("Use o sistema completo por 1 mês, sem cartão e sem compromisso.");
  });

  it("usam o plural", () => {
    expect(tituloTeste({ duracaoMeses: 3 })).toBe("Teste grátis por 3 meses");
    expect(botaoTeste({ duracaoMeses: 3 })).toBe("Testar grátis por 3 meses");
  });

  it("saem sem número quando a duração é desconhecida", () => {
    expect(tituloTeste(null)).toBe("Teste grátis");
    expect(botaoTeste(null)).toBe("Testar grátis");
    for (const texto of [garantiaTestePlano(null), notaTestePlano(null), fraseTesteContato(null)]) {
      expect(texto).not.toMatch(/\d/);
    }
  });
});
