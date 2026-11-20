"use client";

import { type RefObject } from "react";
import { useEntradaDeCursor } from "./useEntradaDeCursor";

function acender({ x, y }: { x: number; y: number }, elemento: HTMLElement) {
  elemento.style.setProperty("--x", `${x}px`);
  elemento.style.setProperty("--y", `${y}px`);
}

function apagar(elemento: HTMLElement) {
  elemento.style.removeProperty("--x");
  elemento.style.removeProperty("--y");
}

// Luz de farol: grava a posição do cursor em --x e --y do elemento (só com mouse e sem "menos movimento").
// O visual fica todo no CSS, que lê essas variáveis.
export function useLuzDeFarol(ref: RefObject<HTMLElement | null>) {
  useEntradaDeCursor(ref, { aoMover: acender, aoSair: apagar });
}
