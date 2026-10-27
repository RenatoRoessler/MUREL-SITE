"use client";

import styled from "styled-components";

export const Passos = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Passo = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  align-content: start;
  padding: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[4]}px;
  border: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  border-radius: ${({ theme }) => theme.radii.lg};
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
