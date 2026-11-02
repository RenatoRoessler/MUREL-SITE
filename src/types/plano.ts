export const TipoPlanoAdesao = {
  Trial: 0,
  Mensal: 1,
  Trimestral: 2,
  Semestral: 3,
  Anual: 4,
} as const;

export type TipoPlanoAdesao = (typeof TipoPlanoAdesao)[keyof typeof TipoPlanoAdesao];

// Planos vendidos na seção: o Trial (0) existe no sistema, mas não é oferecido no site.
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
