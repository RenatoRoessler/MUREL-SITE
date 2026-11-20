"use client";

import styled, { css } from "styled-components";
import { comCursorFino } from "@/styles/movimento";

// Duas camadas sobre o cartão, sem pegar clique: um brilho no fundo (atrás do conteúdo) e outro só na borda,
// ambos centrados no cursor (--x e --y). Em repouso e sem mouse ficam apagados.
export const Base = styled.div`
  position: relative;
  isolation: isolate;

  ${({ theme }) =>
    comCursorFino(css`
      &::before,
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity ${theme.motion.duracao.media}ms ${theme.motion.curva.padrao};
      }

      &::before {
        z-index: -1;
        background: radial-gradient(
          circle ${theme.motion.cursor.raio}px at var(--x, 50%) var(--y, 50%),
          ${theme.colors.farol},
          transparent 70%
        );
      }

      &::after {
        border: 1px solid transparent;
        background: radial-gradient(
            circle ${theme.motion.cursor.raio}px at var(--x, 50%) var(--y, 50%),
            ${theme.colors.farolBorda},
            transparent 70%
          )
          border-box;
        mask:
          linear-gradient(#000 0 0) padding-box,
          linear-gradient(#000 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
      }

      &:hover::before,
      &:hover::after {
        opacity: 1;
      }
    `)}
`;
