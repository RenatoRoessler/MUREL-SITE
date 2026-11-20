"use client";

import styled from "styled-components";

/* As abas só existem com JavaScript: sem ele, os três painéis aparecem um depois do outro e nada fica escondido. */
export const ListaDeAbas = styled.div`
  display: none;

  @media (scripting: enabled) {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space[2]}px;
    margin-bottom: ${({ theme }) => theme.space[4]}px;
  }
`;

export const Aba = styled.button`
  flex: 1 1 auto;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.space[3]}px;
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
  gap: ${({ theme }) => theme.space[3]}px;
  max-width: 720px;
  margin-bottom: ${({ theme }) => theme.space[5]}px;

  &:last-child {
    margin-bottom: 0;
  }

  /* Só o painel da aba ativa aparece (com JavaScript); os outros ficam montados, para o formulário manter o
     que foi digitado. */
  @media (scripting: enabled) {
    margin-bottom: 0;

    &[data-ativo="false"] {
      display: none;
    }
  }
`;
