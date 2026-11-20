import type { StaticImageData } from "next/image";

export type IdPerfil = "cliente" | "operador" | "lavador" | "conveniado" | "gestor";

export type TelaPerfil = {
  id: string;
  imagem: StaticImageData;
  alt: string;
  titulo: string;
  explicacao: string;
};

export type PerfilSistema = {
  id: IdPerfil;
  rotulo: string;
  resumo: string;
  telas: TelaPerfil[];
};
