export const TipoPlanoAdesao = {
  Trial: 0,
  Mensal: 1,
  Trimestral: 2,
  Semestral: 3,
  Anual: 4,
} as const;

export type TipoPlanoAdesao = (typeof TipoPlanoAdesao)[keyof typeof TipoPlanoAdesao];

// O sistema (GIPE) ainda aceita os tipos 2 a 4, mas o site vende só o Mensal.
export type Plano = {
  tipo: typeof TipoPlanoAdesao.Mensal;
  nome: string;
  centavosPorMes: number;
  centavosLancamento: number;
  mesesDeLancamento: number;
};

export type AreaDoSistema = {
  titulo: string;
  descricao: string;
};
