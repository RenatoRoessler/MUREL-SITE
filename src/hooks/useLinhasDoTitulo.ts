"use client";

import { type RefObject, useEffect, useState } from "react";

const DEBOUNCE_EM_MS = 150;

// Lê, no elemento já desenhado, em que linha visual cada palavra do texto caiu, e devolve o texto quebrado nas
// mesmas linhas. Devolve null quando não dá para medir (sem layout, sem nó de texto ou uma linha só).
export function dividirEmLinhas(elemento: HTMLElement, texto: string): string[] | null {
  const no = elemento.firstChild;
  if (!no || no.nodeType !== Node.TEXT_NODE || typeof document.createRange !== "function") return null;

  const linhas: string[] = [];
  let topoAtual: number | null = null;
  let inicio = 0;

  for (const palavra of texto.split(" ")) {
    const fim = inicio + palavra.length;
    const faixa = document.createRange();
    if (typeof faixa.getClientRects !== "function") return null;
    faixa.setStart(no, inicio);
    faixa.setEnd(no, fim);
    const retangulo = faixa.getClientRects()[0];
    inicio = fim + 1;
    if (!retangulo) return null;

    if (topoAtual === null || Math.abs(retangulo.top - topoAtual) > 2) {
      linhas.push(palavra);
      topoAtual = retangulo.top;
    } else {
      linhas[linhas.length - 1] += ` ${palavra}`;
    }
  }

  return linhas.length > 1 ? linhas : null;
}

// Linhas visuais do título, medidas depois que as fontes carregam e refeitas quando a largura da janela muda.
// Enquanto não houver medida, devolve null e o título fica como texto corrido.
export function useLinhasDoTitulo(ref: RefObject<HTMLElement | null>, texto: string) {
  const [linhas, setLinhas] = useState<string[] | null>(null);
  const [versao, setVersao] = useState(0);

  // Medir só funciona com o título como texto corrido: depois de cada nova versão ele já voltou a ser texto.
  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    let cancelado = false;
    const medir = () => {
      if (!cancelado) setLinhas(dividirEmLinhas(elemento, texto));
    };

    if (document.fonts?.ready) void document.fonts.ready.then(medir);
    else medir();

    return () => {
      cancelado = true;
    };
  }, [ref, texto, versao]);

  useEffect(() => {
    let temporizador: ReturnType<typeof setTimeout> | undefined;
    let largura = window.innerWidth;

    const aoRedimensionar = () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        if (window.innerWidth === largura) return;
        largura = window.innerWidth;
        setLinhas(null);
        setVersao((atual) => atual + 1);
      }, DEBOUNCE_EM_MS);
    };

    window.addEventListener("resize", aoRedimensionar);
    return () => {
      clearTimeout(temporizador);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  return linhas;
}
