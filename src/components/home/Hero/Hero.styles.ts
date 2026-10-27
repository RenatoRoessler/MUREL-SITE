"use client";

import styled from "styled-components";

export const Topo = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[6]}px;
  align-items: center;
  padding-block: 48px 64px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.15fr 0.85fr;
    gap: ${({ theme }) => theme.space[7]}px;
    padding-block: 88px 104px;
  }
`;

export const Texto = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  justify-items: start;
`;

export const Titulo = styled.h1`
  font-size: clamp(40px, 8vw, 84px);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  line-height: 0.98;
  letter-spacing: -0.035em;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.amarelo};
  }
`;

export const Subtitulo = styled.p`
  max-width: 52ch;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.nevoa};

  strong {
    color: ${({ theme }) => theme.colors.giz};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const Chamadas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]}px;
  margin-top: ${({ theme }) => theme.space[2]}px;
`;

export const Marca = styled.div`
  display: flex;
  justify-content: center;

  svg {
    width: clamp(200px, 60%, 380px);
    height: auto;
  }
`;
