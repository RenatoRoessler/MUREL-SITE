"use client";

import styled, { css } from "styled-components";

// Faixa da rua do carro animado abaixo do símbolo, em fração da altura (28 de 160 unidades do viewBox).
const RUA_ABAIXO = 28 / 160;

export const Logo = styled.span<{ $tamanho: number; $animado?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $tamanho }) => Math.round($tamanho * 0.3)}px;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  font-size: ${({ $tamanho }) => $tamanho}px;
  letter-spacing: -0.04em;
  line-height: 1;

  svg {
    width: ${({ $tamanho }) => Math.round($tamanho * 1.5)}px;
    height: auto;
  }

  /* Animado: o carro só aparece dentro do logo, estendido para baixo até a rua (a faixa ocupa espaço, para o
     carro nunca passar por cima do que vem abaixo). O símbolo fica por cima da palavra. */
  ${({ $animado, $tamanho }) =>
    $animado &&
    css`
      overflow: hidden;
      padding-bottom: ${Math.ceil($tamanho * RUA_ABAIXO)}px;

      svg {
        position: relative;
        z-index: 1;
      }
    `}
`;
