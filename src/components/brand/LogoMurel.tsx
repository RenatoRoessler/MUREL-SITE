"use client";

import { type Ref, useImperativeHandle, useRef } from "react";
import { Logo } from "./LogoMurel.styles";
import { Simbolo } from "./Simbolo";
import { useAnimacaoDoCarro } from "./useAnimacaoDoCarro";

// Abaixo desta altura os pontos de luz do carro teriam menos de 1px: ficam só o facho e os halos.
const ALTURA_LUZES_DETALHADAS = 40;

export interface LogoHandle {
  // Para a animação e põe o carro na vaga. Devolve true se estava animando (o link usa isso para não navegar).
  parar: () => boolean;
}

type LogoMurelProps = {
  tamanho?: number;
  // O carro sai da vaga, vai embora (por baixo da palavra) e volta, duas vezes, e termina estacionado.
  animado?: boolean;
  // Com animação, passar o mouse ou tocar no logo a para. Desligue quando o logo está dentro de um link que
  // controla a parada pelo `ref` (o Header).
  pararAoInteragir?: boolean;
  ref?: Ref<LogoHandle>;
};

export function LogoMurel({ tamanho = 24, animado = false, pararAoInteragir = true, ref }: LogoMurelProps) {
  const area = useRef<HTMLSpanElement>(null);
  const simbolo = useRef<SVGSVGElement>(null);
  const { refs, parar } = useAnimacaoDoCarro({ ativo: animado, area, simbolo });

  useImperativeHandle(ref, () => ({ parar }), [parar]);

  const interacao =
    animado && pararAoInteragir
      ? {
          onPointerEnter: (evento: React.PointerEvent) => {
            if (evento.pointerType === "mouse") parar();
          },
          onPointerDown: () => {
            parar();
          },
        }
      : {};

  return (
    <Logo ref={area} $tamanho={tamanho} $animado={animado} aria-label="Murel" {...interacao}>
      <Simbolo
        titulo="Símbolo Murel"
        svgRef={simbolo}
        carro={animado ? refs : undefined}
        luzesSimples={tamanho < ALTURA_LUZES_DETALHADAS}
      />
      <span aria-hidden="true">murel</span>
    </Logo>
  );
}
