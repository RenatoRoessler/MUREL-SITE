import { describe, expect, it } from "vitest";
import { perfilInicial, perfis } from "./Sistema.data";

describe("perfis do sistema", () => {
  it("tem Cliente, Operador e Gestor, nessa ordem", () => {
    expect(perfis.map((perfil) => perfil.id)).toEqual(["cliente", "operador", "gestor"]);
  });

  it("abre no perfil Gestor", () => {
    expect(perfilInicial).toBe("gestor");
    expect(perfis.some((perfil) => perfil.id === perfilInicial)).toBe(true);
  });

  it("tem o número de telas combinado: 1 do cliente, 7 do operador e 9 do gestor", () => {
    const total = Object.fromEntries(perfis.map((perfil) => [perfil.id, perfil.telas.length]));
    expect(total).toEqual({ cliente: 1, operador: 7, gestor: 9 });
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
});
