"use client";

import styled from "styled-components";

/* No desktop com JavaScript: lista de telas à esquerda e a tela grande à direita. Nos outros casos, só o
   carrossel (a lista fica escondida e nada muda). */
export const Conjunto = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]}px;

  @media (min-width: 1024px) and (scripting: enabled) {
    grid-template-columns: 280px minmax(0, 1fr);
    gap: ${({ theme }) => theme.space[5]}px;
    align-items: start;
  }
`;

export const Lista = styled.nav`
  display: none;

  @media (min-width: 1024px) and (scripting: enabled) {
    display: grid;
    gap: ${({ theme }) => theme.space[1]}px;
    align-content: start;
  }
`;

export const ItemDaLista = styled.button`
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: ${({ theme }) => theme.space[2]}px;
  align-items: center;
  min-height: 48px;
  padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[3]}px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: transparent;
  color: ${({ theme }) => theme.colors.nevoa};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-align: left;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.giz};
    border-color: ${({ theme }) => theme.colors.faixaCinza};
  }

  &[aria-current="true"] {
    color: ${({ theme }) => theme.colors.giz};
    background: ${({ theme }) => theme.colors.asfalto2};
    border-color: ${({ theme }) => theme.colors.amarelo};
  }
`;

export const Numero = styled.span`
  color: ${({ theme }) => theme.colors.amarelo};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 13px;
`;
