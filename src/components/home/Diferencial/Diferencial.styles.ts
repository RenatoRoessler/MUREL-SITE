"use client";

import styled from "styled-components";

export const Lista = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.space[4]}px;
  }
`;

/* Três cartões, com o número grande no topo. */
export const Item = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  align-content: start;
  padding: ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  border-radius: ${({ theme }) => theme.radii.xl};
`;

export const Numero = styled.span`
  font-size: clamp(64px, 9vw, 96px);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.04em;
  line-height: 1;
  color: ${({ theme }) => theme.colors.amarelo};
`;

export const TituloItem = styled.h3`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Descricao = styled.p`
  color: ${({ theme }) => theme.colors.nevoa};
`;
