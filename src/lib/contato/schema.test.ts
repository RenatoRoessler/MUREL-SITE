import { describe, expect, it } from "vitest";
import { validarContato } from "./schema";

const valido = {
  nome: "Maria Souza",
  patio: "Estacionamento Central",
  tipo: "estacionamento",
  email: "maria@exemplo.com.br",
  telefone: "",
  mensagem: "Quero conhecer o sistema para o meu pátio.",
};

describe("validarContato", () => {
  it("aceita dados completos", () => {
    const resultado = validarContato(valido);
    expect(resultado.sucesso).toBe(true);
  });

  it("aceita só telefone como meio de retorno", () => {
    const resultado = validarContato({ ...valido, email: "", telefone: "(11) 99999-9999" });
    expect(resultado.sucesso).toBe(true);
  });

  it("aceita pátio e tipo vazios", () => {
    const resultado = validarContato({ ...valido, patio: "", tipo: "" });
    expect(resultado.sucesso).toBe(true);
  });

  it("remove espaços nas pontas", () => {
    const resultado = validarContato({ ...valido, nome: "  Maria  " });
    expect(resultado.sucesso && resultado.dados.nome).toBe("Maria");
  });

  it("exige nome e mensagem", () => {
    const resultado = validarContato({ ...valido, nome: " ", mensagem: "" });
    expect(resultado.sucesso).toBe(false);
    if (!resultado.sucesso) {
      expect(resultado.erros.nome).toBeDefined();
      expect(resultado.erros.mensagem).toBeDefined();
    }
  });

  it("exige ao menos um meio de retorno", () => {
    const resultado = validarContato({ ...valido, email: "", telefone: "" });
    expect(resultado.sucesso).toBe(false);
    if (!resultado.sucesso) expect(resultado.erros.email).toMatch(/e-mail ou um telefone/);
  });

  it("recusa e-mail inválido", () => {
    const resultado = validarContato({ ...valido, email: "maria@" });
    expect(resultado.sucesso).toBe(false);
    if (!resultado.sucesso) expect(resultado.erros.email).toBeDefined();
  });

  it("recusa telefone curto ou longo demais", () => {
    for (const telefone of ["12345", "1234567890123456"]) {
      const resultado = validarContato({ ...valido, email: "", telefone });
      expect(resultado.sucesso).toBe(false);
      if (!resultado.sucesso) expect(resultado.erros.telefone).toBeDefined();
    }
  });

  it("recusa tipo de negócio fora da lista", () => {
    const resultado = validarContato({ ...valido, tipo: "outro" });
    expect(resultado.sucesso).toBe(false);
    if (!resultado.sucesso) expect(resultado.erros.tipo).toBeDefined();
  });

  it("respeita os limites de tamanho", () => {
    const longo = validarContato({ ...valido, mensagem: "a".repeat(2001), nome: "a".repeat(101) });
    expect(longo.sucesso).toBe(false);
    if (!longo.sucesso) {
      expect(longo.erros.mensagem).toBeDefined();
      expect(longo.erros.nome).toBeDefined();
    }
    const curto = validarContato({ ...valido, mensagem: "oi" });
    expect(curto.sucesso).toBe(false);
  });
});
