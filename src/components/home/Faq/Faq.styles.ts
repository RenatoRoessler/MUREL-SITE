"use client";

import styled, { css } from "styled-components";
import { comMovimento } from "@/styles/movimento";

export const Lista = styled.div`
  display: grid;
  max-width: 820px;
`;

export const Item = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.faixaCinza};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  }

  /* A altura da resposta anima de 0 até o tamanho natural. Onde o navegador não suporta, abre e fecha direto. */
  ${({ theme }) =>
    comMovimento(css`
      @supports (interpolate-size: allow-keywords) {
        interpolate-size: allow-keywords;

        &::details-content {
          height: 0;
          overflow: clip;
          transition:
            height ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
            content-visibility ${theme.motion.duracao.media}ms allow-discrete;
        }

        &[open]::details-content {
          height: auto;
        }
      }
    `)}
`;

export const Pergunta = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]}px;
  min-height: 56px;
  padding-block: ${({ theme }) => theme.space[2]}px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: "+";
    flex: 0 0 auto;
    font-family: ${({ theme }) => theme.fontFamilies.mono};
    font-size: 24px;
    color: ${({ theme }) => theme.colors.amarelo};
  }

  /* O mesmo "+" gira 45° e vira "×" quando aberto. */
  details[open] > &::after {
    transform: rotate(45deg);
  }

  ${({ theme }) =>
    comMovimento(css`
      &::after {
        transition: transform ${theme.motion.duracao.media}ms ${theme.motion.curva.saida};
      }
    `)}

  &:hover {
    color: ${({ theme }) => theme.colors.amarelo};
  }
`;

export const Resposta = styled.p`
  max-width: 62ch;
  padding-bottom: ${({ theme }) => theme.space[4]}px;
  color: ${({ theme }) => theme.colors.nevoa};
`;
