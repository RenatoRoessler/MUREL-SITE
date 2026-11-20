"use client";

import styled, { css, keyframes } from "styled-components";
import { comMovimento } from "@/styles/movimento";

const entrarVindoDaDireita = keyframes`
  from {
    opacity: 0;
    transform: translateX(24px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const entrarVindoDaEsquerda = keyframes`
  from {
    opacity: 0;
    transform: translateX(-24px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

export const Abas = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]}px;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
`;

/* Fundo amarelo que desliza entre as abas. Só aparece depois da primeira medição (data-pilula): até lá vale o
   fundo da própria aba ativa, que depois fica transparente. */
export const Pilula = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--pilula-w, 0);
  height: var(--pilula-h, 0);
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.amarelo};
  transform: translate(var(--pilula-x, 0), var(--pilula-y, 0));
  opacity: 0;
  pointer-events: none;

  [data-pilula="pronta"] > & {
    opacity: 1;
  }

  ${({ theme }) =>
    comMovimento(css`
      transition:
        transform ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
        width ${theme.motion.duracao.media}ms ${theme.motion.curva.saida};
    `)}
`;

export const Aba = styled.button`
  position: relative;
  z-index: 1;
  /* No celular as cinco abas quebram em duas linhas e cada linha reparte o espaço; a partir de sm ficam
     numa linha, no tamanho do texto. */
  flex: 1 1 auto;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.space[3]}px;
  border: 1px solid ${({ theme }) => theme.colors.bordaControle};
  border-radius: ${({ theme }) => theme.radii.full};
  background: transparent;
  color: ${({ theme }) => theme.colors.giz};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 0 0 auto;
    padding: 0 ${({ theme }) => theme.space[4]}px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.amarelo};
  }

  &[aria-selected="true"] {
    border-color: ${({ theme }) => theme.colors.amarelo};
    background: ${({ theme }) => theme.colors.amarelo};
    color: ${({ theme }) => theme.colors.asfalto};
  }

  [data-pilula="pronta"] > &[aria-selected="true"] {
    background: transparent;
  }
`;

export const Painel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]}px;

  &[hidden] {
    display: none;
  }

  /* O painel novo entra deslizando do lado para onde a troca andou. Não há saída animada do anterior: ele só
     some (hidden), então a altura é sempre a do painel novo e nunca aparece um quadro em branco. */
  ${({ theme }) =>
    comMovimento(css`
      &[data-entrando="proximo"] {
        animation: ${entrarVindoDaDireita} ${theme.motion.duracao.media}ms ${theme.motion.curva.saida} backwards;
      }

      &[data-entrando="anterior"] {
        animation: ${entrarVindoDaEsquerda} ${theme.motion.duracao.media}ms ${theme.motion.curva.saida} backwards;
      }
    `)}
`;

export const Resumo = styled.p`
  max-width: 62ch;
  color: ${({ theme }) => theme.colors.nevoa};
`;
