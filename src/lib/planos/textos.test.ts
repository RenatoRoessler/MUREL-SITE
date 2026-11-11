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
    expect(tituloTeste(teste)).toBe("1 mês grátis, com o sistema completo");
    expect(botaoTeste(teste)).toBe("Comece com 1 mês grátis");
    expect(garantiaTestePlano(teste)).toBe("1º mês grátis");
    expect(notaTestePlano(teste)).toBe("O plano começa com 1 mês grátis. Você só paga a partir do 2º mês.");
    expect(fraseTesteContato(teste)).toBe("Use o sistema completo por 1 mês, sem cartão e sem compromisso.");
  });

  it("usam o plural", () => {
    expect(tituloTeste({ duracaoMeses: 3 })).toBe("3 meses grátis, com o sistema completo");
    expect(botaoTeste({ duracaoMeses: 3 })).toBe("Comece com 3 meses grátis");
  });

  it("saem sem número quando a duração é desconhecida", () => {
    expect(tituloTeste(null)).toBe("Mês grátis, com o sistema completo");
    expect(botaoTeste(null)).toBe("Comece grátis");
    for (const texto of [garantiaTestePlano(null), notaTestePlano(null), fraseTesteContato(null)]) {
      expect(texto).not.toMatch(/\d/);
    }
  });
});
