"use client";

import styled from "styled-components";

export const Lista = styled.div`
  display: grid;
  max-width: 820px;
`;

export const Item = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.faixaCinza};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  }
`;

export const Pergunta = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]}px;
  min-height: 56px;
  padding-block: ${({ theme }) => theme.space[2]}px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: "+";
    flex: 0 0 auto;
    font-family: ${({ theme }) => theme.fontFamilies.mono};
    font-size: 24px;
    color: ${({ theme }) => theme.colors.amarelo};
  }

  details[open] > &::after {
    content: "\\2212";
  }

  &:hover {
    color: ${({ theme }) => theme.colors.amarelo};
  }
`;

export const Resposta = styled.p`
  max-width: 62ch;
  padding-bottom: ${({ theme }) => theme.space[4]}px;
  color: ${({ theme }) => theme.colors.nevoa};
`;
