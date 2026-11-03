"use client";

import styled from "styled-components";

export const ListaGarantias = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[4]}px;
  list-style: none;
`;

export const ItemGarantia = styled.li`
  display: inline-flex;
  gap: ${({ theme }) => theme.space[1]}px;
  align-items: center;
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
  line-height: 1.4;

  svg {
    flex: none;
    color: ${({ theme }) => theme.colors.amarelo};
  }
`;
