"use client";

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin-inline: auto;
`;

export const Faixa = styled.section`
  padding-block: 56px;
  border-top: 2px dashed ${({ theme }) => theme.colors.faixaCinza};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: 88px;
  }
`;

export const Cabecalho = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  margin-bottom: ${({ theme }) => theme.space[5]}px;
`;

export const Titulo = styled.h2`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  line-height: 1.1;
`;

export const Lede = styled.p`
  max-width: 62ch;
  color: ${({ theme }) => theme.colors.nevoa};
`;
