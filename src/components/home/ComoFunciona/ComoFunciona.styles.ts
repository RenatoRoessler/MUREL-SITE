"use client";

import styled, { css, keyframes } from "styled-components";
import { comMovimento } from "@/styles/movimento";

// Faixa tracejada que se desenha de cima para baixo (celular).
const desenharNaVertical = keyframes`
  from {
    clip-path: inset(0 0 100% 0);
  }

  to {
    clip-path: inset(0);
  }
`;

// O carro percorre a pista e estaciona na última etapa. As posições são frações da largura da pista (100cqw):
// as quatro etapas têm a mesma largura, então os centros ficam perto de 12,5%, 37,5%, 62,5% e 87,5%.
const percorrer = keyframes`
  0% {
    opacity: 0;
    transform: translateX(calc(100cqw * 0.02));
  }

  8% {
    opacity: 1;
  }

  20%, 30% {
    opacity: 1;
    transform: translateX(calc(100cqw * 0.125 - 16px));
  }

  50%, 58% {
    opacity: 1;
    transform: translateX(calc(100cqw * 0.375 - 16px));
  }

  78%, 86% {
    opacity: 1;
    transform: translateX(calc(100cqw * 0.625 - 16px));
  }

  100% {
    opacity: 1;
    transform: translateX(calc(100cqw * 0.875 - 16px));
  }
`;

/* Pista que contém o trilho e o carro. */
export const Pista = styled.div`
  position: relative;
  container-type: inline-size;

  /* A rua do carro, logo abaixo das etapas (só onde o carro existe). */
  ${({ theme }) =>
    comMovimento(css`
      @media (min-width: ${theme.breakpoints.lg}) {
        @supports (width: 1cqw) {
          &::after {
            content: "";
            position: absolute;
            right: 0;
            left: 0;
            top: calc(100% + 20px);
            border-top: 2px dashed ${theme.colors.faixaCinza};
            pointer-events: none;
          }
        }
      }
    `)}
`;

/* O fluxo é uma pista: de cima para baixo no celular e da esquerda para a direita no desktop, ligada por uma
   faixa tracejada. O passo 2 é uma escolha: abre em duas opções dentro de uma moldura tracejada. */
export const Trilho = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  margin-left: 12px;
  padding-left: ${({ theme }) => theme.space[4]}px;
  border-left: 2px dashed ${({ theme }) => theme.colors.amarelo};
  list-style: none;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: 0;
    margin-left: 0;
    padding-left: 0;
    border-left: 0;
  }

  /* Com movimento (e JavaScript), a faixa do celular se desenha quando a seção aparece. */
  ${({ theme }) =>
    comMovimento(css`
      @media screen and (scripting: enabled) and (max-width: ${Number.parseInt(theme.breakpoints.lg, 10) - 1}px) {
        border-left-color: transparent;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -2px;
          border-left: 2px dashed ${theme.colors.amarelo};
          clip-path: inset(0 0 100% 0);
        }

        &[data-estado="visivel"]::before {
          animation: ${desenharNaVertical} 900ms ${theme.motion.curva.saida} 200ms forwards;
        }
      }
    `)}
`;

/* O carro (decorativo) anda na rua abaixo das etapas, sem passar por cima de nenhum texto. Só existe no desktop, com movimento permitido e onde há unidades de contêiner. */
export const Carro = styled.span`
  display: none;

  ${({ theme }) =>
    comMovimento(css`
      @media (min-width: ${theme.breakpoints.lg}) {
        @supports (width: 1cqw) {
          display: block;
          position: absolute;
          top: 100%;
          left: 0;
          width: 32px;
          height: 16px;
          margin-top: 12px;
          color: ${theme.colors.amarelo};
          opacity: 0;
          pointer-events: none;

          svg {
            display: block;
            width: 100%;
            height: 100%;
          }

          ${Trilho}[data-estado="visivel"] + & {
            animation: ${percorrer} 4000ms ${theme.motion.curva.padrao} 600ms both;
          }
        }
      }
    `)}
`;

export const Etapa = styled.li`
  position: relative;

  /* Ponto da pista, só no celular. */
  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: -${({ theme }) => theme.space[4] + 8}px;
    width: 14px;
    height: 14px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.colors.amarelo};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    flex: 1 1 0;
    align-items: center;
    min-width: 0;

    &::before {
      position: static;
      flex: none;
      width: 28px;
      height: 0;
      border-top: 2px dashed ${({ theme }) => theme.colors.amarelo};
      border-radius: 0;
      background: none;
    }

    &:first-child::before {
      display: none;
    }

    /* Com movimento (e JavaScript), cada trecho da pista se desenha, da esquerda para a direita, em sequência. */
    ${({ theme }) =>
      comMovimento(css`
        @media screen and (scripting: enabled) {
          &::before {
            clip-path: inset(0 100% 0 0);
          }

          [data-estado="visivel"] > &::before {
            clip-path: inset(0);
            transition: clip-path 600ms ${theme.motion.curva.saida};
          }

          [data-estado="visivel"] > &:nth-child(2)::before {
            transition-delay: 400ms;
          }

          [data-estado="visivel"] > &:nth-child(3)::before {
            transition-delay: 1400ms;
          }

          [data-estado="visivel"] > &:nth-child(4)::before {
            transition-delay: 2400ms;
          }
        }
      `)}
  }
`;

export const Conteudo = styled.div`
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 1;
  }
`;

export const Bifurcacao = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  padding: ${({ theme }) => theme.space[2]}px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[2]}px;
    border-inline: 2px dashed ${({ theme }) => theme.colors.amarelo};
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

export const Escolha = styled.p`
  color: ${({ theme }) => theme.colors.amarelo};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.08em;
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: center;
  }
`;

export const Opcoes = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  list-style: none;

  /* "ou" entre as duas opções: a alternativa fica clara sem depender de cor. */
  & > li + li::before {
    content: "ou";
    display: block;
    margin-bottom: ${({ theme }) => theme.space[2]}px;
    color: ${({ theme }) => theme.colors.amarelo};
    font-family: ${({ theme }) => theme.fontFamilies.mono};
    font-size: 12px;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const Passo = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  align-content: start;
  padding: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  border-radius: ${({ theme }) => theme.radii.lg};

  ${({ theme }) =>
    comMovimento(css`
      transition:
        transform ${theme.motion.duracao.rapida}ms ${theme.motion.curva.padrao},
        border-color ${theme.motion.duracao.rapida}ms ${theme.motion.curva.padrao},
        box-shadow ${theme.motion.duracao.rapida}ms ${theme.motion.curva.padrao};

      @media (hover: hover) {
        &:hover {
          transform: translateY(-4px);
          border-color: ${theme.colors.amarelo};
          box-shadow: 0 12px 28px rgb(0 0 0 / 0.35);
        }
      }
    `)}
`;

export const Marcador = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.amarelo};
`;

export const TituloPasso = styled.h3`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Descricao = styled.p`
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
`;

export const Reforco = styled.p`
  max-width: 62ch;
  margin-top: ${({ theme }) => theme.space[5]}px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;
