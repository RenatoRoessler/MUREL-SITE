"use client";

import { type RefObject, useEffect } from "react";

const CONSULTA = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type Ponto = { x: number; y: number };

type Opcoes = {
  // Chamada no máximo uma vez por quadro, com a posição do cursor em px dentro do elemento.
  aoMover: (ponto: Ponto, elemento: HTMLElement) => void;
  // Chamada quando o cursor sai do elemento.
  aoSair: (elemento: HTMLElement) => void;
};

// Base dos efeitos que seguem o cursor: só liga com mouse e sem preferência por menos movimento, e agrupa as
// escritas em um requestAnimationFrame por quadro. `aoMover` e `aoSair` devem ser estáveis (useCallback ou módulo).
export function useEntradaDeCursor(ref: RefObject<HTMLElement | null>, { aoMover, aoSair }: Opcoes) {
  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || typeof window.matchMedia !== "function" || !window.matchMedia(CONSULTA).matches) return;

    let quadro = 0;
    let agendado = false;
    let ultimo: Ponto | null = null;

    const mover = (evento: PointerEvent) => {
      const caixa = elemento.getBoundingClientRect();
      ultimo = { x: evento.clientX - caixa.left, y: evento.clientY - caixa.top };
      if (agendado) return;
      agendado = true;
      quadro = requestAnimationFrame(() => {
        agendado = false;
        if (ultimo) aoMover(ultimo, elemento);
      });
    };

    const sair = () => {
      if (agendado) cancelAnimationFrame(quadro);
      agendado = false;
      ultimo = null;
      aoSair(elemento);
    };

    elemento.addEventListener("pointermove", mover, { passive: true });
    elemento.addEventListener("pointerleave", sair);

    return () => {
      if (agendado) cancelAnimationFrame(quadro);
      elemento.removeEventListener("pointermove", mover);
      elemento.removeEventListener("pointerleave", sair);
    };
  }, [ref, aoMover, aoSair]);
}
