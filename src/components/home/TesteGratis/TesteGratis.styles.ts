"use client";

import styled from "styled-components";

export const Faixa = styled.aside`
  display: grid;
  gap: ${({ theme }) => theme.space[4]}px;
  margin-bottom: ${({ theme }) => theme.space[5]}px;
  padding: ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 2px solid ${({ theme }) => theme.colors.amarelo};
  border-radius: ${({ theme }) => theme.radii.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
    gap: ${({ theme }) => theme.space[5]}px;
    align-items: center;
    padding: ${({ theme }) => theme.space[5]}px;
  }
`;

export const Texto = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  justify-items: start;
`;

export const Rotulo = styled.span`
  color: ${({ theme }) => theme.colors.amarelo};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const Titulo = styled.h3`
  font-size: clamp(22px, 3vw, 28px);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.02em;
  line-height: 1.15;
`;

export const Descricao = styled.p`
  max-width: 62ch;
  color: ${({ theme }) => theme.colors.nevoa};
`;
