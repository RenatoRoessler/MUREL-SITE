"use client";

import { useEffect, useRef, useState } from "react";
import { formatarReais } from "@/lib/planos/formatar";
import { Numero } from "./ContadorDePreco.styles";

const DURACAO_EM_MS = 800;

type ContadorDePrecoProps = {
  // Valor final, em reais.
  valor: number;
  // O mesmo valor, já formatado pelo servidor: é o que aparece sem JavaScript, com "menos movimento" e no fim.
  texto: string;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

function podeAnimar() {
  return (
    typeof IntersectionObserver !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

// Preço que conta de zero até o valor quando entra na tela. O texto final vem sempre do servidor.
export function ContadorDePreco({ valor, texto }: ContadorDePrecoProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [exibido, setExibido] = useState<string | null>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || !podeAnimar()) return;

    let quadro = 0;
    // Esconde o valor final só quando a contagem vai mesmo acontecer.
    const zerar = requestAnimationFrame(() => setExibido(formatarReais(0)));

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        let inicio: number | null = null;

        const passo = (agora: number) => {
          inicio ??= agora;
          const progresso = Math.min((agora - inicio) / DURACAO_EM_MS, 1);
          if (progresso >= 1) {
            setExibido(null);
            return;
          }
          setExibido(formatarReais(valor * easeOutExpo(progresso)));
          quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    observador.observe(elemento);

    return () => {
      cancelAnimationFrame(zerar);
      cancelAnimationFrame(quadro);
      observador.disconnect();
    };
  }, [valor]);

  return (
    <Numero ref={ref} $largura={texto.length}>
      {exibido ?? texto}
    </Numero>
  );
}
