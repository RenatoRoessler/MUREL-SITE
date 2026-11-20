import { describe, expect, it } from "vitest";
import { perfilInicial, perfis } from "./Sistema.data";

describe("perfis do sistema", () => {
  it("tem Cliente, Operador, Lavador, Conveniado e Gestor, nessa ordem", () => {
    expect(perfis.map((perfil) => perfil.id)).toEqual(["cliente", "operador", "lavador", "conveniado", "gestor"]);
  });

  it("abre no perfil Operador", () => {
    expect(perfilInicial).toBe("operador");
    expect(perfis.some((perfil) => perfil.id === perfilInicial)).toBe(true);
  });

  it("tem o número de telas combinado por perfil", () => {
    const total = Object.fromEntries(perfis.map((perfil) => [perfil.id, perfil.telas.length]));
    expect(total).toEqual({ cliente: 1, operador: 7, lavador: 2, conveniado: 2, gestor: 12 });
  });

  it("dá a cada perfil rótulo e resumo", () => {
    for (const perfil of perfis) {
      expect(perfil.rotulo.trim()).not.toBe("");
      expect(perfil.resumo.trim()).not.toBe("");
    }
  });

  it("dá a cada tela imagem, texto alternativo, título e explicação", () => {
    for (const perfil of perfis) {
      for (const tela of perfil.telas) {
        expect(tela.imagem.src).toBeTruthy();
        expect(tela.alt.trim()).not.toBe("");
        expect(tela.titulo.trim()).not.toBe("");
        expect(tela.explicacao.trim()).not.toBe("");
      }
    }
  });

  it("não repete id de tela nem texto alternativo dentro do mesmo perfil", () => {
    for (const perfil of perfis) {
      const ids = perfil.telas.map((tela) => tela.id);
      const alts = perfil.telas.map((tela) => tela.alt);
      expect(new Set(ids).size).toBe(ids.length);
      expect(new Set(alts).size).toBe(alts.length);
    }
  });

  it("não usa emoji nos textos", () => {
    const emoji = /\p{Extended_Pictographic}/u;
    for (const perfil of perfis) {
      expect(emoji.test(perfil.resumo)).toBe(false);
      for (const tela of perfil.telas) {
        expect(emoji.test(tela.titulo + tela.explicacao + tela.alt)).toBe(false);
      }
    }
  });

  it("não traz dado pessoal nos textos (CPF, CNPJ, e-mail ou telefone)", () => {
    const padroes = [/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/, /\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/, /\S+@\S+\.\S+/, /\(?\d{2}\)?\s?9?\d{4}-?\d{4}/];
    for (const perfil of perfis) {
      for (const tela of perfil.telas) {
        const texto = `${perfil.resumo} ${tela.titulo} ${tela.explicacao} ${tela.alt}`;
        for (const padrao of padroes) {
          expect(texto).not.toMatch(padrao);
        }
      }
    }
  });
});
