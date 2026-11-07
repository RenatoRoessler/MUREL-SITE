import { afterEach, describe, expect, it, vi } from "vitest";
import { mapearOferta } from "./mapearOferta";

const trial = {
  planoAdesaoId: 1,
  plano: "TESTE GRATUITO",
  tipoPeriodoPlano: 0,
  tipoPeriodoPlanoDescricao: "Trial",
  validadeDuracaoMeses: 1,
  valor: 0,
  valorPromocional: null,
  diferencaPercentual: null,
  promocaoInicio: null,
  promocaoFim: null,
  emPromocao: false,
  valorAtual: 0,
  ordemExibicao: 1,
};

const mensal = {
  planoAdesaoId: 2,
  plano: "MENSAL",
  tipoPeriodoPlano: 1,
  tipoPeriodoPlanoDescricao: "Mensal",
  validadeDuracaoMeses: 1,
  valor: 99.9,
  valorPromocional: 69.9,
  diferencaPercentual: null,
  promocaoInicio: "2026-11-01T00:00:00",
  promocaoFim: "2027-06-30T00:00:00",
  emPromocao: true,
  valorAtual: 69.9,
  ordemExibicao: 2,
};

describe("mapearOferta", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("separa o teste do plano mensal em promoção (resposta de docs/input.md)", () => {
    expect(mapearOferta([trial, mensal])).toEqual({
      teste: { duracaoMeses: 1 },
      planos: [
        { tipo: 1, nome: "Mensal", valorTabela: 99.9, valorAtual: 69.9, promocao: { fim: "2027-06-30" } },
      ],
    });
  });

  it("não marca promoção quando emPromocao é false", () => {
    const oferta = mapearOferta([{ ...mensal, emPromocao: false, valorAtual: 99.9 }]);
    expect(oferta?.planos[0]).toMatchObject({ valorAtual: 99.9, promocao: null });
  });

  it("mantém a promoção sem data quando promocaoFim é nulo", () => {
    const oferta = mapearOferta([{ ...mensal, promocaoFim: null }]);
    expect(oferta?.planos[0].promocao).toEqual({ fim: null });
  });

  it("ignora a promoção quando o valor atual não é menor que o de tabela", () => {
    const oferta = mapearOferta([{ ...mensal, valorAtual: 99.9 }]);
    expect(oferta?.planos[0].promocao).toBeNull();
  });

  it("ordena os planos por ordemExibicao", () => {
    const anual = { ...mensal, tipoPeriodoPlano: 4, tipoPeriodoPlanoDescricao: "Anual", ordemExibicao: 1 };
    const oferta = mapearOferta([mensal, anual]);
    expect(oferta?.planos.map((plano) => plano.nome)).toEqual(["Anual", "Mensal"]);
  });

  it("descarta o item malformado sem derrubar os demais", () => {
    const semValor = { ...mensal, tipoPeriodoPlano: 2, valor: undefined };
    const oferta = mapearOferta([null, "texto", semValor, mensal]);
    expect(oferta?.planos).toHaveLength(1);
    expect(oferta?.planos[0].nome).toBe("Mensal");
  });

  it("descarta tipo desconhecido e avisa no console", () => {
    const aviso = vi.spyOn(console, "warn").mockImplementation(() => {});
    const oferta = mapearOferta([{ ...mensal, tipoPeriodoPlano: 9 }, mensal]);
    expect(oferta?.planos).toHaveLength(1);
    expect(aviso).toHaveBeenCalledOnce();
  });

  it("deixa o teste nulo quando a duração é inválida ou o Trial não vem", () => {
    expect(mapearOferta([{ ...trial, validadeDuracaoMeses: 0 }, mensal])?.teste).toBeNull();
    expect(mapearOferta([{ ...trial, validadeDuracaoMeses: 1.5 }, mensal])?.teste).toBeNull();
    expect(mapearOferta([mensal])?.teste).toBeNull();
  });

  it("devolve null quando não é lista ou não há plano pago", () => {
    expect(mapearOferta({})).toBeNull();
    expect(mapearOferta(null)).toBeNull();
    expect(mapearOferta([])).toBeNull();
    expect(mapearOferta([trial])).toBeNull();
  });
});
