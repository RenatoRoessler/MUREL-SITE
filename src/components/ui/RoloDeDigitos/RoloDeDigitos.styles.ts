"use client";

import styled, { css } from "styled-components";
import { comMovimento } from "@/styles/movimento";

export const Janela = styled.span`
  display: inline-block;
  height: 1em;
  overflow: hidden;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  vertical-align: top;
`;

// A coluna tem os dígitos de 0 a 9, um embaixo do outro. O estado normal já mostra o dígito certo (sem JavaScript,
// sem movimento e na impressão). Com movimento, e com JavaScript, ela começa no 9 e rola até o valor quando o
// bloco que a contém (o que tem data-estado, do Revelar) aparece na tela.
export const Coluna = styled.span<{ $valor: number }>`
  display: flex;
  flex-direction: column;
  transform: translateY(${({ $valor }) => -$valor}em);

  span {
    display: block;
    height: 1em;
    line-height: 1;
  }

  @media screen and (scripting: enabled) {
    ${({ theme, $valor }) =>
      comMovimento(css`
        [data-estado="pendente"] & {
          transform: translateY(-9em);
        }

        [data-estado="visivel"] & {
          transition: transform ${theme.motion.duracao.lenta * 2}ms ${theme.motion.curva.saida};
          transform: translateY(${-$valor}em);
        }
      `)}
  }
`;
