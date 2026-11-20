"use client";

import styled from "styled-components";

export const Grade = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]}px ${({ theme }) => theme.space[4]}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Grupo = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  align-content: start;
`;

export const TituloGrupo = styled.h4`
  padding-bottom: ${({ theme }) => theme.space[2]}px;
  border-bottom: 1.5px dashed ${({ theme }) => theme.colors.faixaCinza};
  color: ${({ theme }) => theme.colors.amarelo};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const ListaAreas = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  list-style: none;
`;

export const Acordeao = styled.div`
  display: grid;
  border-top: 1px solid ${({ theme }) => theme.colors.faixaCinza};
`;

export const Contagem = styled.span`
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const Detalhe = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.faixaCinza};

  & > ul {
    padding-bottom: ${({ theme }) => theme.space[3]}px;
  }
`;

export const Resumo = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]}px;
  min-height: 52px;
  color: ${({ theme }) => theme.colors.giz};
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  & > span:first-child {
    margin-right: auto;
  }

  &::after {
    content: "+";
    color: ${({ theme }) => theme.colors.amarelo};
    font-family: ${({ theme }) => theme.fontFamilies.mono};
    font-size: 24px;
  }

  details[open] > &::after {
    content: "\\2212";
  }
`;
