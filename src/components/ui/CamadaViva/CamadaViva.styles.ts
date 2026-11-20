"use client";

import styled, { css, keyframes } from "styled-components";
import { comMovimento } from "@/styles/movimento";

const tocar = keyframes`
  0%, 60% {
    opacity: 0;
    scale: 0.3;
  }

  66% {
    opacity: 0.9;
    scale: 0.6;
  }

  86%, 100% {
    opacity: 0;
    scale: 1.5;
  }
`;

const avisar = keyframes`
  0%, 8% {
    opacity: 0;
    translate: -50% -8cqw;
  }

  16%, 42% {
    opacity: 1;
    translate: -50% 0;
  }

  50%, 100% {
    opacity: 0;
    translate: -50% -4cqw;
  }
`;

/* Camada decorativa sobre o print: não pega clique, não é lida por leitor de tela e só existe com movimento
   permitido. As medidas usam cqw (largura da própria camada), então tudo acompanha o tamanho da tela. Pausada
   enquanto fora da vista (data-ativo). */
export const Camada = styled.div`
  display: none;

  ${({ theme }) =>
    comMovimento(css`
      display: block;
      position: absolute;
      inset: 9px;
      overflow: hidden;
      border-radius: 29px;
      container-type: inline-size;
      pointer-events: none;

      > * {
        position: absolute;
        left: calc(var(--x) * 1%);
        top: calc(var(--y) * 1%);
        animation-duration: ${theme.motion.ciclo.lento}ms;
        animation-delay: var(--atraso, 0ms);
        animation-iteration-count: infinite;
        animation-play-state: paused;
        opacity: 0;
      }

      &[data-ativo="true"] > * {
        animation-play-state: running;
      }
    `)}

  @media print {
    display: none;
  }
`;

export const Toque = styled.span`
  width: 14cqw;
  height: 14cqw;
  margin: -7cqw 0 0 -7cqw;
  border: 0.8cqw solid ${({ theme }) => theme.colors.amarelo};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.farol};
  animation-name: ${tocar};
  animation-timing-function: ${({ theme }) => theme.motion.curva.saida};
`;

export const Aviso = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 1.6cqw;
  padding: 1.6cqw 3.4cqw;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.asfalto};
  color: ${({ theme }) => theme.colors.giz};
  font-size: 3.6cqw;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 1.5cqw 4cqw rgb(0 0 0 / 0.35);
  translate: -50% 0;
  animation-name: ${avisar};
  animation-timing-function: ${({ theme }) => theme.motion.curva.saida};

  &::before {
    content: "";
    width: 2.2cqw;
    height: 2.2cqw;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.ok};
  }
`;
