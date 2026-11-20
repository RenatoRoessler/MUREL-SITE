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
