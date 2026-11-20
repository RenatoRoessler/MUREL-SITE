"use client";

import { type KeyboardEvent, useRef } from "react";

type Orientacao = "horizontal" | "vertical";

// Navegação de listas de abas ou de itens por teclado: setas, Home e End, com volta ao início e ao fim.
// Quem usa registra cada elemento com `registrar(indice)` e liga `aoTeclar(evento, indice)` ao onKeyDown.
export function useNavegacaoPorSetas<T extends HTMLElement>(
  total: number,
  aoSelecionar: (indice: number) => void,
  orientacao: Orientacao = "horizontal",
) {
  const elementos = useRef<(T | null)[]>([]);

  const selecionar = (indice: number) => {
    const alvo = (indice + total) % total;
    aoSelecionar(alvo);
    elementos.current[alvo]?.focus();
  };

  const registrar = (indice: number) => (elemento: T | null) => {
    elementos.current[indice] = elemento;
  };

  const aoTeclar = (evento: KeyboardEvent<T>, indice: number) => {
    const [anterior, proximo] = orientacao === "horizontal" ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
    const destinos: Record<string, number> = {
      [proximo]: indice + 1,
      [anterior]: indice - 1,
      Home: 0,
      End: total - 1,
    };
    if (!(evento.key in destinos)) return;
    evento.preventDefault();
    selecionar(destinos[evento.key]);
  };

  return { registrar, aoTeclar };
}
