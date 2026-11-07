import { TipoPlanoAdesao, type OfertaPlanos, type PlanoPago, type TesteGratis, type TipoPlanoPago } from "@/types/plano";

type PlanoDaApi = {
  tipoPeriodoPlano: number;
  tipoPeriodoPlanoDescricao: string;
  validadeDuracaoMeses: number;
  valor: number;
  valorAtual: number;
  emPromocao: boolean;
  promocaoFim: string | null;
  ordemExibicao: number;
};

const ehObjeto = (valor: unknown): valor is Record<string, unknown> =>
  typeof valor === "object" && valor !== null;

const ehNumero = (valor: unknown): valor is number => typeof valor === "number" && Number.isFinite(valor);

function lerPlano(item: unknown): PlanoDaApi | null {
  if (!ehObjeto(item)) return null;
  const { tipoPeriodoPlano, tipoPeriodoPlanoDescricao, validadeDuracaoMeses, valor, valorAtual, emPromocao, promocaoFim, ordemExibicao } = item;
  if (
    !ehNumero(tipoPeriodoPlano) ||
    typeof tipoPeriodoPlanoDescricao !== "string" ||
    !ehNumero(validadeDuracaoMeses) ||
    !ehNumero(valor) ||
    !ehNumero(valorAtual) ||
    typeof emPromocao !== "boolean" ||
    !ehNumero(ordemExibicao)
  ) {
    return null;
  }
  return {
    tipoPeriodoPlano,
    tipoPeriodoPlanoDescricao,
    validadeDuracaoMeses,
    valor,
    valorAtual,
    emPromocao,
    promocaoFim: typeof promocaoFim === "string" ? promocaoFim : null,
    ordemExibicao,
  };
}

const tiposPagos: readonly number[] = [
  TipoPlanoAdesao.Mensal,
  TipoPlanoAdesao.Trimestral,
  TipoPlanoAdesao.Semestral,
  TipoPlanoAdesao.Anual,
];

const dataNoInicio = /^\d{4}-\d{2}-\d{2}/;

function mapearPlanoPago(plano: PlanoDaApi): PlanoPago {
  const emPromocao = plano.emPromocao && plano.valorAtual < plano.valor;
  return {
    tipo: plano.tipoPeriodoPlano as TipoPlanoPago,
    nome: plano.tipoPeriodoPlanoDescricao,
    valorTabela: plano.valor,
    valorAtual: plano.valorAtual,
    promocao: emPromocao
      ? { fim: plano.promocaoFim && dataNoInicio.test(plano.promocaoFim) ? plano.promocaoFim.slice(0, 10) : null }
      : null,
  };
}

function mapearTeste(plano: PlanoDaApi): TesteGratis | null {
  return Number.isInteger(plano.validadeDuracaoMeses) && plano.validadeDuracaoMeses > 0
    ? { duracaoMeses: plano.validadeDuracaoMeses }
    : null;
}

// Converte a resposta de GET /api/v1/Plano na oferta do site. Devolve null sem nenhum plano pago.
export function mapearOferta(json: unknown): OfertaPlanos | null {
  if (!Array.isArray(json)) return null;

  const planos: PlanoDaApi[] = [];
  for (const item of json) {
    const plano = lerPlano(item);
    if (plano) planos.push(plano);
  }

  let teste: TesteGratis | null = null;
  const pagos: PlanoDaApi[] = [];
  for (const plano of planos) {
    if (plano.tipoPeriodoPlano === TipoPlanoAdesao.Trial) {
      teste = mapearTeste(plano);
    } else if (tiposPagos.includes(plano.tipoPeriodoPlano)) {
      pagos.push(plano);
    } else {
      console.warn(`Plano com tipoPeriodoPlano desconhecido ignorado: ${plano.tipoPeriodoPlano}`);
    }
  }

  if (pagos.length === 0) return null;

  return {
    planos: pagos.sort((a, b) => a.ordemExibicao - b.ordemExibicao).map(mapearPlanoPago),
    teste,
  };
}
