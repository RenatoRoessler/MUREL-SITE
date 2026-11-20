"use client";

import { css, keyframes, type RuleSet } from "styled-components";
import { theme } from "./theme";

// Todo movimento do site passa por aqui: com a preferência do aparelho por menos movimento, nada roda.
export function comMovimento(bloco: RuleSet<object>) {
  return css`
    @media (prefers-reduced-motion: no-preference) {
      ${bloco}
    }
  `;
}

// Efeitos que seguem o cursor: só com mouse (hover e ponteiro fino) e sem preferência por menos movimento.
export function comCursorFino(bloco: RuleSet<object>) {
  return css`
    @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
      ${bloco}
    }
  `;
}

// Entrada padrão: sobe `theme.motion.distancia` enquanto aparece.
export const revelar = keyframes`
  from {
    opacity: 0;
    transform: translateY(${theme.motion.distancia}px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

// Faixa de luz que cruza botões e selos.
export const brilho = keyframes`
  0% {
    transform: translateX(-120%) skewX(-20deg);
  }

  25%, 100% {
    transform: translateX(320%) skewX(-20deg);
  }
`;

// Entrada só de opacidade (respostas que abrem, por exemplo).
export const aparecer = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// Linha que se desenha da esquerda para a direita (sublinhados em `background-size`).
export const desenhar = keyframes`
  from {
    background-size: 0% 0.09em;
  }

  to {
    background-size: 100% 0.09em;
  }
`;

// Tremor curto de um campo com erro.
export const tremor = keyframes`
  0%, 100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-4px);
  }

  75% {
    transform: translateX(4px);
  }
`;

// Giro contínuo (indicador de carregamento).
export const girar = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
