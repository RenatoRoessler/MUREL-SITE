"use client";

import styled, { css } from "styled-components";
import { comMovimento } from "@/styles/movimento";

export const Base = styled.footer`
  padding-block: 40px 64px;
  border-top: 2px dashed ${({ theme }) => theme.colors.faixaCinza};
`;

/* Quatro colunas no desktop (marca e contato, seções, legal, ações). Sem os endereços de termos e privacidade a
   coluna "Legal" não existe e as outras ocupam o espaço. */
export const Grade = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]}px ${({ theme }) => theme.space[4]}px;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
`;

export const Coluna = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  align-content: start;
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
`;

export const Titulo = styled.h2`
  margin-bottom: ${({ theme }) => theme.space[1]}px;
  color: ${({ theme }) => theme.colors.amarelo};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

/* Link do rodapé: sublinhado de sempre; ao passar o mouse ou receber foco, o texto vai para o amarelo e uma
   linha amarela se desenha da esquerda para a direita. Sem movimento, só a troca de cor. */
const linkDoRodape = css`
  a {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${({ theme }) => theme.colors.giz};
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => theme.colors.amarelo};
    }
  }

  ${({ theme }) =>
    comMovimento(css`
      a::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: calc(50% - 0.95em);
        left: 0;
        height: 2px;
        background: ${theme.colors.amarelo};
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform ${theme.motion.duracao.media}ms ${theme.motion.curva.saida};
        pointer-events: none;
      }

      a:hover::after,
      a:focus-visible::after {
        transform: scaleX(1);
      }
    `)}
`;

export const Links = styled.ul`
  display: grid;
  list-style: none;

  ${linkDoRodape}
`;

export const Contato = styled(Coluna)`
  ${linkDoRodape}
`;

export const Acoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]}px;
`;
