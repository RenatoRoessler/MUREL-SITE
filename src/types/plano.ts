export const TipoPlanoAdesao = {
  Trial: 0,
  Mensal: 1,
  Trimestral: 2,
  Semestral: 3,
  Anual: 4,
} as const;

export type TipoPlanoAdesao = (typeof TipoPlanoAdesao)[keyof typeof TipoPlanoAdesao];

// Planos vendidos na seção: o Trial (0) não é um cartão de plano, é a chamada do teste grátis.
export type TipoPlanoVendido = Exclude<TipoPlanoAdesao, typeof TipoPlanoAdesao.Trial>;

export type Plano = {
  tipo: TipoPlanoVendido;
  nome: string;
  meses: 1 | 3 | 6 | 12;
  centavosPorMes: number;
  recomendado?: boolean;
};

export type AreaDoSistema = {
  titulo: string;
  descricao: string;
};
