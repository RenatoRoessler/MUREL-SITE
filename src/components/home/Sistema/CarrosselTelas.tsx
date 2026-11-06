"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Controles, Item, Ponto, Pontos, Regiao, Seta, Setas, SoLeitor, Trilho } from "./CarrosselTelas.styles";

export type SlideCarrossel = {
  id: string;
  conteudo: ReactNode;
};

type CarrosselTelasProps = {
  rotulo: string;
  slides: SlideCarrossel[];
  estreito?: boolean;
};

export function CarrosselTelas({ rotulo, slides, estreito = false }: CarrosselTelasProps) {
  const trilho = useRef<HTMLDivElement>(null);
  const itens = useRef<(HTMLDivElement | null)[]>([]);
  const quadro = useRef(0);
  const [atual, setAtual] = useState(0);
  const total = slides.length;

  const calcularAtual = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 && el.scrollLeft > 0) {
      setAtual(total - 1);
      return;
    }
    let maisPerto = 0;
    let menorDistancia = Number.POSITIVE_INFINITY;
    itens.current.forEach((item, indice) => {
      if (!item) return;
      const distancia = Math.abs(item.offsetLeft - el.scrollLeft);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisPerto = indice;
      }
    });
    setAtual(maisPerto);
  }, [total]);

  useEffect(() => () => cancelAnimationFrame(quadro.current), []);

  const aoRolar = () => {
    cancelAnimationFrame(quadro.current);
    quadro.current = requestAnimationFrame(calcularAtual);
  };

  const irPara = (indice: number) => {
    const destino = Math.min(Math.max(indice, 0), total - 1);
    const item = itens.current[destino];
    setAtual(destino);
    trilho.current?.scrollTo({ left: item ? item.offsetLeft : 0 });
  };

  return (
    <Regiao role="region" aria-roledescription="carrossel" aria-label={rotulo}>
      <Trilho ref={trilho} tabIndex={0} onScroll={aoRolar} aria-label={`${rotulo}: rolagem horizontal`}>
        {slides.map((slide, indice) => (
          <Item
            key={slide.id}
            ref={(el) => {
              itens.current[indice] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Tela ${indice + 1} de ${total}`}
            $estreito={estreito}
          >
            {slide.conteudo}
          </Item>
        ))}
      </Trilho>
      {total > 1 ? (
        <Controles>
          <Pontos aria-hidden="true">
            {slides.map((slide, indice) => (
              <Ponto key={slide.id} $ativo={indice === atual} />
            ))}
          </Pontos>
          <SoLeitor role="status">{`Tela ${atual + 1} de ${total}`}</SoLeitor>
          <Setas>
            <Seta type="button" onClick={() => irPara(atual - 1)} disabled={atual === 0} aria-label="Tela anterior">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </Seta>
            <Seta type="button" onClick={() => irPara(atual + 1)} disabled={atual === total - 1} aria-label="Próxima tela">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Seta>
          </Setas>
        </Controles>
      ) : null}
    </Regiao>
  );
}
