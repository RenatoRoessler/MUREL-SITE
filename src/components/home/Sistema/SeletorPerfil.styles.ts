"use client";

import styled from "styled-components";

export const Abas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]}px;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
`;

export const Aba = styled.button`
  /* No celular as três abas dividem a linha; a partir de sm voltam ao tamanho do texto. */
  flex: 1 1 0;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.space[2]}px;
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
`;

export const Painel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]}px;

  &[hidden] {
    display: none;
  }
`;

export const Resumo = styled.p`
  max-width: 62ch;
  color: ${({ theme }) => theme.colors.nevoa};
`;
