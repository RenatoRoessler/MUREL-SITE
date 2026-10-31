"use client";

import styled from "styled-components";

export const Lista = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const Cartao = styled.a`
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  align-content: start;
  height: 100%;
  padding: ${({ theme }) => theme.space[3]}px;
  border: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.asfalto2};
  color: inherit;
  text-decoration: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.amarelo};
  }
`;

export const Rotulo = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Resumo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.nevoa};
`;
