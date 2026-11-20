"use client";

import styled from "styled-components";

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

export const Links = styled.ul`
  display: grid;
  list-style: none;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${({ theme }) => theme.colors.giz};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Contato = styled(Coluna)`
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${({ theme }) => theme.colors.giz};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Acoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]}px;
`;
