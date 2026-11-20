"use client";

import { type RefObject } from "react";
import { useEntradaDeCursor } from "./useEntradaDeCursor";

const limitar = (valor: number) => Math.max(-1, Math.min(1, valor));

function inclinar({ x, y }: { x: number; y: number }, elemento: HTMLElement) {
  const largura = elemento.offsetWidth || 1;
  const altura = elemento.offsetHeight || 1;
  elemento.style.setProperty("--rx", String(limitar((x / largura) * 2 - 1)));
  elemento.style.setProperty("--ry", String(limitar((y / altura) * 2 - 1)));
}

function endireitar(elemento: HTMLElement) {
  elemento.style.removeProperty("--rx");
  elemento.style.removeProperty("--ry");
}

// Inclinação 3D: grava a posição do cursor, de -1 a 1 (centro = 0), em --rx e --ry. O CSS decide o quanto inclinar.
export function useInclinacao(ref: RefObject<HTMLElement | null>) {
  useEntradaDeCursor(ref, { aoMover: inclinar, aoSair: endireitar });
}
