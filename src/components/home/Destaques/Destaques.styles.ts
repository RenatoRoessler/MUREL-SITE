"use client";

import styled from "styled-components";

export const Faixa = styled.section`
  padding-block: ${({ theme }) => theme.space[4]}px;
  border-block: 1px solid ${({ theme }) => theme.colors.asfalto3};
  background: ${({ theme }) => theme.colors.asfalto2};
`;

export const Lista = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[3]}px;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Destaque = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.3;

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.amarelo};
  }
`;
