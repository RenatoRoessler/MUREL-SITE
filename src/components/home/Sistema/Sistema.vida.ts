import type { EventoVivo } from "@/types/sistema";

// Eventos "vivos" das telas (posições em % do print). Também usados no topo da página.
export const vidaDoPatio: EventoVivo[] = [
  { tipo: "aviso", texto: "Novo veículo no pátio", x: 50, y: 36, atraso: 0 },
  { tipo: "toque", x: 50, y: 93.4, atraso: 0 },
];
export const vidaDoTicket: EventoVivo[] = [
  { tipo: "aviso", texto: "Lavagem pronta", x: 50, y: 66, atraso: 1200 },
  { tipo: "toque", x: 50, y: 94.8, atraso: 0 },
];
export const vidaDaFila: EventoVivo[] = [{ tipo: "toque", x: 50, y: 71.1, atraso: 0 }];
