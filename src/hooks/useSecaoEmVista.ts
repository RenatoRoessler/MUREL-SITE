"use client";

import { useState, useSyncExternalStore } from "react";

function criarLoja(ids: readonly string[], margem: string) {
  const naTela = new Set<string>();
  let visivel = false;

  return {
    assinar(avisar: () => void) {
      if (typeof IntersectionObserver === "undefined") return () => {};

      const observador = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            const id = (entrada.target as Element | undefined)?.id;
            if (!id) continue;
            if (entrada.isIntersecting) naTela.add(id);
            else naTela.delete(id);
          }
          const proximo = naTela.size > 0;
          if (proximo === visivel) return;
          visivel = proximo;
          avisar();
        },
        { rootMargin: margem },
      );

      for (const id of ids) {
        const elemento = document.getElementById(id);
        if (elemento) observador.observe(elemento);
      }

      return () => {
        observador.disconnect();
        naTela.clear();
        visivel = false;
      };
    },
    ler: () => visivel,
    lerNoServidor: () => false,
  };
}

// Diz se alguma das seções (pelos ids) está na tela. No servidor, e sem IntersectionObserver, devolve false.
// A lista de ids e a margem são lidas só na primeira renderização.
export function useSecaoEmVista(ids: readonly string[], margem = "0px"): boolean {
  const [loja] = useState(() => criarLoja(ids, margem));
  return useSyncExternalStore(loja.assinar, loja.ler, loja.lerNoServidor);
}
