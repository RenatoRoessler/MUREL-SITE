"use client";

import styled, { css } from "styled-components";
import { comMovimento } from "@/styles/movimento";

/* O fluxo é uma pista: de cima para baixo no celular e da esquerda para a direita no desktop, ligada por uma
   faixa tracejada. O passo 2 é uma escolha: abre em duas opções dentro de uma moldura tracejada. */
export const Trilho = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  margin-left: 12px;
  padding-left: ${({ theme }) => theme.space[4]}px;
  border-left: 2px dashed ${({ theme }) => theme.colors.amarelo};
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: 0;
    margin-left: 0;
    padding-left: 0;
    border-left: 0;
  }
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
