"use client";

import { type RefObject, useId, useRef } from "react";
import { Carro } from "./Simbolo.styles";
import { useAnimacaoDoCarro } from "./useAnimacaoDoCarro";

const AMARELO_FAIXA = "#FFC20E";
// Luzes do carro no logo animado: da marca, fixas (como o amarelo do carro).
const LUZ_FAROL = "#FFF6CC";
const LUZ_FAROL_PONTO = "#FFF8DA";
const LUZ_FREIO = "#FF3B3B";
const LUZ_FREIO_PONTO = "#FF5A5A";
const LUZ_RE = "#FFFFFF";

// Sozinho e animado, o desenho ganha a faixa da rua abaixo das vagas (28 unidades): o carro passa por ela.
const VIEWBOX = "0 0 240 160";
const VIEWBOX_COM_RUA = "0 0 240 188";

// Elementos que a animação move e acende (ver useAnimacaoDoCarro).
export interface CarroRefs {
  carro: RefObject<SVGGElement | null>;
  freio: RefObject<SVGGElement | null>;
  re: RefObject<SVGGElement | null>;
  facho: RefObject<SVGPathElement | null>;
}

type SimboloProps = {
  className?: string;
  // Sozinho (ex.: o topo da página): o carro sai da vaga, vai embora e volta, duas vezes, e termina estacionado.
  // Passar o mouse ou tocar no símbolo para a animação. Sem animação com movimento reduzido.
  animado?: boolean;
  titulo?: string;
  // Uso interno do LogoMurel animado: ele roda a animação e o símbolo só desenha o carro com as luzes.
  carro?: CarroRefs;
  svgRef?: RefObject<SVGSVGElement | null>;
  // Logos pequenos (menos de 40px de altura): só o facho e os halos, sem os pontos de luz.
  luzesSimples?: boolean;
};

function LuzesDoCarro({ refs: { facho, freio, re }, simples }: { refs: CarroRefs; simples: boolean }) {
  const idFacho = useId();
  const idBrilho = useId();

  return (
    <g data-luz="" aria-hidden="true">
      <defs>
        <radialGradient id={idFacho} cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor={LUZ_FAROL} stopOpacity="0.55" />
          <stop offset="1" stopColor={LUZ_FAROL} stopOpacity="0" />
        </radialGradient>
        <filter id={idBrilho} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation={simples ? 1.1 : 2.2} />
        </filter>
      </defs>
      <path ref={facho} d="M105 62L93 11H147L135 62Z" fill={`url(#${idFacho})`} opacity="0" />
      {!simples && (
        <>
          <circle cx="110" cy="65" r="2.4" fill={LUZ_FAROL_PONTO} />
          <circle cx="130" cy="65" r="2.4" fill={LUZ_FAROL_PONTO} />
        </>
      )}
      <g ref={freio} opacity="0">
        <rect x="106" y="122.25" width="8" height="3.5" rx="1.75" fill={LUZ_FREIO} filter={`url(#${idBrilho})`} />
        <rect x="126" y="122.25" width="8" height="3.5" rx="1.75" fill={LUZ_FREIO} filter={`url(#${idBrilho})`} />
        {!simples && (
          <>
            <rect x="106" y="122.25" width="8" height="3.5" rx="1.75" fill={LUZ_FREIO_PONTO} />
            <rect x="126" y="122.25" width="8" height="3.5" rx="1.75" fill={LUZ_FREIO_PONTO} />
          </>
        )}
      </g>
      <g ref={re} opacity="0">
        <rect x="115.5" y="123.5" width="9" height="3" rx="1.5" fill={LUZ_RE} filter={`url(#${idBrilho})`} />
        {!simples && <rect x="115.5" y="123.5" width="9" height="3" rx="1.5" fill={LUZ_RE} />}
      </g>
    </g>
  );
}

export function Simbolo({
  className,
  animado = false,
  titulo = "Símbolo Murel: três vagas formando um M, com um carro na vaga do meio",
  carro,
  svgRef,
  luzesSimples = false,
}: SimboloProps) {
  const idMascara = useId();
  const proprioSvg = useRef<SVGSVGElement>(null);
  // Sozinho, o próprio símbolo roda a animação; dentro do LogoMurel, quem roda é o logo.
  const sozinho = animado && !carro;
  const animacao = useAnimacaoDoCarro({ ativo: sozinho, area: proprioSvg, simbolo: proprioSvg });
  const refsDoCarro = carro ?? (sozinho ? animacao.refs : undefined);

  const interacao = sozinho
    ? {
        onPointerEnter: (evento: React.PointerEvent) => {
          if (evento.pointerType === "mouse") animacao.parar();
        },
        onPointerDown: () => {
          animacao.parar();
        },
      }
    : {};

  return (
    <svg
      ref={svgRef ?? proprioSvg}
      className={className}
      viewBox={sozinho ? VIEWBOX_COM_RUA : VIEWBOX}
      role="img"
      aria-label={titulo}
      overflow={sozinho ? "hidden" : "visible"}
      {...interacao}
    >
      <mask id={idMascara} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="160">
        <rect width="240" height="160" fill="#fff" />
        <path
          d="M108 87H132L129.5 76Q120 72.5 110.5 76Z"
          fill="#000"
          stroke="#000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M110 112H130L128 119Q120 121 112 119Z"
          fill="#000"
          stroke="#000"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </mask>
      <path
        d="M20 140V24H220V140M82 24V140M158 24V140"
        fill="none"
        stroke={AMARELO_FAIXA}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Carro ref={refsDoCarro?.carro} data-carro={refsDoCarro ? "" : undefined}>
        <rect x="102" y="62" width="36" height="66" rx="12" fill={AMARELO_FAIXA} mask={`url(#${idMascara})`} />
        {refsDoCarro && <LuzesDoCarro refs={refsDoCarro} simples={luzesSimples} />}
      </Carro>
    </svg>
  );
}
