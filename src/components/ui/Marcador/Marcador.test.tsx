import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Marcador, trechosDestacados } from "./Marcador";

describe("trechosDestacados", () => {
  it("devolve o texto inteiro, sem destaque, quando não há termo", () => {
    expect(trechosDestacados("Quanto custa?", "")).toEqual([{ texto: "Quanto custa?", destaque: false }]);
    expect(trechosDestacados("Quanto custa?", "   ")).toEqual([{ texto: "Quanto custa?", destaque: false }]);
  });

  it("marca o termo sem diferenciar maiúsculas nem acentos, mantendo o texto original", () => {
    expect(trechosDestacados("Preço do plano mensal", "PRECO")).toEqual([
      { texto: "Preço", destaque: true },
      { texto: " do plano mensal", destaque: false },
    ]);
  });

  it("marca todas as ocorrências", () => {
    expect(trechosDestacados("plano a plano", "plano").filter((trecho) => trecho.destaque)).toHaveLength(2);
  });

  it("encontra termo sem acento em texto acentuado e vice-versa", () => {
    expect(trechosDestacados("Instalação", "instalacao")[0]).toEqual({ texto: "Instalação", destaque: true });
    expect(trechosDestacados("Instalacao", "instalação")[0]).toEqual({ texto: "Instalacao", destaque: true });
  });

  it("não marca nada quando o termo não aparece", () => {
    expect(trechosDestacados("Quanto custa?", "pix")).toEqual([{ texto: "Quanto custa?", destaque: false }]);
  });
});

describe("Marcador", () => {
  it("destaca o termo com <mark> sem mudar o texto lido", () => {
    const { container } = renderComTema(<p><Marcador texto="Preço do plano mensal" termo="plano" /></p>);

    expect(screen.getByText("plano").tagName).toBe("MARK");
    expect(container.textContent).toBe("Preço do plano mensal");
  });

  it("sem termo, é só o texto", () => {
    const { container } = renderComTema(<p><Marcador texto="Preço do plano" termo="" /></p>);

    expect(container.querySelector("mark")).toBeNull();
    expect(container.textContent).toBe("Preço do plano");
  });
});
