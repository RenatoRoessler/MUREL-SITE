export const TipoPlanoAdesao = {
  Trial: 0,
  Mensal: 1,
  Trimestral: 2,
  Semestral: 3,
  Anual: 4,
} as const;

export type TipoPlanoAdesao = (typeof TipoPlanoAdesao)[keyof typeof TipoPlanoAdesao];

export type TipoPlanoPago = Exclude<TipoPlanoAdesao, typeof TipoPlanoAdesao.Trial>;

// Espelha o que o site usa de GET /api/v1/Plano. Valores em reais, como o back-end envia.
export type PlanoPago = {
  tipo: TipoPlanoPago;
  nome: string;
  valorTabela: number;
  valorAtual: number;
  // "fim" é a data "AAAA-MM-DD" de promocaoFim, ou null quando o back-end não informa.
  promocao: { fim: string | null } | null;
};

export type TesteGratis = { duracaoMeses: number };

export type OfertaPlanos = {
  planos: PlanoPago[];
  teste: TesteGratis | null;
};

export type AreaDoSistema = {
  titulo: string;
  descricao: string;
};
