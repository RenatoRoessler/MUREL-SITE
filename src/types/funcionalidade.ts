import type { StaticImageData } from "next/image";

export type TelaSistema = {
  imagem: StaticImageData;
  alt: string;
};

export type IdFuncionalidade = "patio" | "caixa-precos" | "mensalistas" | "conveniadas" | "tema";

export type Funcionalidade = {
  id: IdFuncionalidade;
  rotulo: string;
  resumo: string;
  titulo: string;
  descricao: string;
  itens: string[];
  telas: TelaSistema[];
};
