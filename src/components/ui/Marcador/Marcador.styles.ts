"use client";

import styled, { css, keyframes } from "styled-components";
import { comMovimento } from "@/styles/movimento";

const marcar = keyframes`
  from {
    background-size: 0% 100%;
  }

  to {
    background-size: 100% 100%;
  }
`;

// Marca-texto amarelo (a 35%) que se desenha da esquerda para a direita. O texto mantém a cor de sempre. Sem
// movimento, o marca-texto já aparece completo.
export const Marca = styled.mark`
  padding-inline: 0.1em;
  border-radius: 3px;
  color: inherit;
  background: linear-gradient(rgb(255 194 14 / 0.35), rgb(255 194 14 / 0.35)) no-repeat 0 0 / 100% 100%;
  box-decoration-break: clone;

  ${({ theme }) =>
    comMovimento(css`
      animation: ${marcar} ${theme.motion.duracao.media}ms ${theme.motion.curva.saida} backwards;
    `)}
`;
