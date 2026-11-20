"use client";

import styled, { css } from "styled-components";
import { revelar } from "@/styles/movimento";

// A partir do 6º filho o atraso para de crescer, para a fila não demorar em listas longas.
const MAXIMO_DE_ATRASOS = 5;

const atrasosEmFila = css`
  ${({ theme }) => css`
    > *:nth-child(n + ${MAXIMO_DE_ATRASOS + 1}) {
      animation-delay: ${MAXIMO_DE_ATRASOS * theme.motion.intervalo}ms;
    }

    ${Array.from({ length: MAXIMO_DE_ATRASOS }, (_, indice) => css`
      > *:nth-child(${indice + 1}) {
        animation-delay: ${indice * theme.motion.intervalo}ms;
      }
    `)}
  `}
`;

const entrada = css`
  animation: ${revelar} ${({ theme }) => theme.motion.duracao.lenta}ms ${({ theme }) => theme.motion.curva.saida} backwards;
`;

// O conteúdo só fica escondido na tela, com JavaScript e sem preferência por menos movimento. Sem JavaScript,
// com "menos movimento" ou na impressão, o CSS nunca esconde nada. A animação usa `backwards` (e não
// `transition`): terminada, o elemento volta ao estilo natural e o hover dos cards segue livre.
export const Alvo = styled.div`
  @media screen and (scripting: enabled) and (prefers-reduced-motion: no-preference) {
    &[data-modo="proprio"][data-estado="pendente"] {
      opacity: 0;
    }

    &[data-modo="proprio"][data-estado="visivel"] {
      ${entrada}
    }

    &[data-modo="filhos"][data-estado="pendente"] > * {
      opacity: 0;
    }

    &[data-modo="filhos"][data-estado="visivel"] > * {
      ${entrada}
    }

    &[data-modo="filhos"][data-estado="visivel"] {
      ${atrasosEmFila}
    }
  }
`;
