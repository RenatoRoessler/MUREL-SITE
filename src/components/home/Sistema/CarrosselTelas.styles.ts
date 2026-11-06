"use client";

import styled, { css } from "styled-components";

export const Regiao = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
`;

/* Rolagem horizontal nativa com encaixe: funciona por gesto, teclado e sem JavaScript. */
export const Trilho = styled.div`
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.space[3]}px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  padding-bottom: ${({ theme }) => theme.space[2]}px;

  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }
`;

export const Item = styled.div<{ $estreito: boolean }>`
  flex: 0 0 88%;
  min-width: 0;
  scroll-snap-align: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-basis: ${({ $estreito }) => ($estreito ? "620px" : "82%")};
    max-width: ${({ $estreito }) => ($estreito ? "620px" : "880px")};
  }
`;

export const Controles = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]}px;
`;

export const Pontos = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
`;

export const Ponto = styled.span<{ $ativo: boolean }>`
  height: 8px;
  width: ${({ $ativo }) => ($ativo ? "26px" : "8px")};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $ativo }) => ($ativo ? theme.colors.amarelo : theme.colors.faixaCinza)};

  @media (prefers-reduced-motion: no-preference) {
    transition:
      width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.25s;
  }
`;

export const Setas = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]}px;
  margin-left: auto;
`;

export const Seta = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.bordaControle};
  border-radius: ${({ theme }) => theme.radii.full};
  background: transparent;
  color: ${({ theme }) => theme.colors.giz};
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.amarelo};
    color: ${({ theme }) => theme.colors.amarelo};
  }

  ${({ theme }) => css`
    &:disabled {
      border-color: ${theme.colors.faixaCinza};
      color: ${theme.colors.faixaCinza};
      cursor: default;
    }
  `}
`;

export const SoLeitor = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
