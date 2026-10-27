"use client";

import styled from "styled-components";

export const Lista = styled.ul`
  display: grid;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Item = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  align-content: start;
  padding-block: ${({ theme }) => theme.space[4]}px;
  border-top: 2px dashed ${({ theme }) => theme.colors.faixaCinza};

  &:first-child {
    border-top: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-inline: ${({ theme }) => theme.space[4]}px;
    border-top: 0;
    border-left: 2px dashed ${({ theme }) => theme.colors.faixaCinza};

    &:first-child {
      padding-left: 0;
      border-left: 0;
    }
  }
`;

export const Numero = styled.span`
  font-size: 56px;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.03em;
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
