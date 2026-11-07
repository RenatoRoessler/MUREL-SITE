import type { OfertaPlanos, PlanoPago } from "@/types/plano";

export const planoMensalEmPromocao: PlanoPago = {
  tipo: 1,
  nome: "Mensal",
  valorTabela: 99.9,
  valorAtual: 69.9,
  promocao: { fim: "2027-06-30" },
};

export const ofertaEmPromocao: OfertaPlanos = {
  planos: [planoMensalEmPromocao],
  teste: { duracaoMeses: 1 },
};

export const ofertaPromocaoSemData: OfertaPlanos = {
  planos: [{ ...planoMensalEmPromocao, promocao: { fim: null } }],
  teste: { duracaoMeses: 1 },
};

export const ofertaSemPromocao: OfertaPlanos = {
  planos: [{ ...planoMensalEmPromocao, valorAtual: 99.9, promocao: null }],
  teste: { duracaoMeses: 1 },
};
