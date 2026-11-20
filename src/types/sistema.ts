import type { StaticImageData } from "next/image";

export type IdPerfil = "cliente" | "operador" | "lavador" | "conveniado" | "gestor";

// Pequenos acontecimentos decorativos que se repetem sobre o print de uma tela, para mostrar o sistema em uso.
// `x` e `y` são a posição em % da imagem; `atraso` (ms) deslocam o evento dentro do ciclo.
export type EventoVivo = { x: number; y: number; atraso?: number } & (
  | { tipo: "toque" }
  | { tipo: "aviso"; texto: string }
);

export type TelaPerfil = {
  id: string;
  imagem: StaticImageData;
  alt: string;
  titulo: string;
  explicacao: string;
  vida?: EventoVivo[];
};

export type PerfilSistema = {
  id: IdPerfil;
  rotulo: string;
  resumo: string;
  telas: TelaPerfil[];
};
