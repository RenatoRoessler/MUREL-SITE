import { describe, expect, it } from "vitest";
import { dividirEmLinhas } from "./useLinhasDoTitulo";

// O jsdom não faz layout: simula o topo de cada palavra pelo texto que o Range cobre.
function simularLayout(topos: Record<string, number>) {
  const original = document.createRange.bind(document);
  document.createRange = () => {
    const faixa = original();
    let inicio = 0;
    let fim = 0;
    let no: Node | null = null;
    faixa.setStart = (alvo, deslocamento) => {
      no = alvo;
      inicio = deslocamento;
    };
    faixa.setEnd = (_alvo, deslocamento) => {
      fim = deslocamento;
    };
    faixa.getClientRects = () => {
      const palavra = (no?.textContent ?? "").slice(inicio, fim);
      const topo = topos[palavra];
      return (topo === undefined ? [] : [{ top: topo }]) as unknown as DOMRectList;
    };
    return faixa;
  };
  return () => {
    document.createRange = original;
  };
}

function titulo(texto: string) {
  const elemento = document.createElement("h2");
  elemento.textContent = texto;
  return elemento;
}

describe("dividirEmLinhas", () => {
  it("agrupa as palavras pela linha em que cada uma caiu", () => {
    const restaurar = simularLayout({ Sem: 0, papel: 0, e: 0, sem: 40, cadastro: 40, do: 40, cliente: 40 });
    try {
      expect(dividirEmLinhas(titulo("Sem papel e sem cadastro do cliente"), "Sem papel e sem cadastro do cliente")).toEqual([
        "Sem papel e",
        "sem cadastro do cliente",
      ]);
    } finally {
      restaurar();
    }
  });

  it("devolve null quando o título cabe em uma linha só", () => {
    const restaurar = simularLayout({ Planos: 0, simples: 0 });
    try {
      expect(dividirEmLinhas(titulo("Planos simples"), "Planos simples")).toBeNull();
    } finally {
      restaurar();
    }
  });

  it("devolve null quando não há como medir (sem layout)", () => {
    expect(dividirEmLinhas(titulo("Sem layout aqui"), "Sem layout aqui")).toBeNull();
  });

  it("devolve null quando o título não é texto corrido", () => {
    const elemento = document.createElement("h2");
    elemento.innerHTML = "<span>Já dividido</span>";
    expect(dividirEmLinhas(elemento, "Já dividido")).toBeNull();
  });
});
