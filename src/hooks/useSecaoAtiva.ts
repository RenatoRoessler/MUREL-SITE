"use client";

import { useState, useSyncExternalStore } from "react";

// Faixa central e estreita da tela: a seção que a cruza é a "ativa". Estreita, para vizinhas não disputarem.
const MARGEM_CENTRAL = "-45% 0px -50% 0px";

function criarLoja(ids: readonly string[]) {
  const naFaixa = new Set<string>();
  let ativa: string | null = null;

  return {
    assinar(avisar: () => void) {
      if (typeof IntersectionObserver === "undefined") return () => {};

      const observador = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            const id = (entrada.target as Element | undefined)?.id;
            if (!id) continue;
            if (entrada.isIntersecting) naFaixa.add(id);
            else naFaixa.delete(id);
          }
          // Entre duas seções (nenhuma na faixa) mantém a última: o destaque não pisca.
          const proxima = ids.find((id) => naFaixa.has(id)) ?? ativa;
          if (proxima === ativa) return;
          ativa = proxima;
          avisar();
        },
        { rootMargin: MARGEM_CENTRAL },
      );

      for (const id of ids) {
        const elemento = document.getElementById(id);
        if (elemento) observador.observe(elemento);
      }

      return () => {
        observador.disconnect();
        naFaixa.clear();
        ativa = null;
      };
    },
    ler: () => ativa,
    lerNoServidor: () => null,
  };
}

// Devolve o id da seção que ocupa a faixa central da tela (ou null antes de qualquer seção).
export function useSecaoAtiva(ids: readonly string[]): string | null {
  const [loja] = useState(() => criarLoja(ids));
  return useSyncExternalStore(loja.assinar, loja.ler, loja.lerNoServidor);
}
