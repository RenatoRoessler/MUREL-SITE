"use client";

import styled from "styled-components";

export const Bloco = styled.div<{ $invertido: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space[5]}px;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: ${({ $invertido }) => ($invertido ? "7fr 5fr" : "5fr 7fr")};
    gap: ${({ theme }) => theme.space[6]}px;
  }
`;

export const Texto = styled.div<{ $invertido: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  align-content: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: ${({ $invertido }) => ($invertido ? 2 : 1)};
  }
`;

export const Itens = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  list-style: none;
`;

export const Item = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.space[4]}px;

  &::before {
    content: "";
    position: absolute;
    top: 0.65em;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.colors.amarelo};
  }
`;

export const Telas = styled.div<{ $invertido: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: ${({ $invertido }) => ($invertido ? 1 : 2)};
  }
`;

export const Chamada = styled.div`
  margin-top: ${({ theme }) => theme.space[2]}px;
`;
