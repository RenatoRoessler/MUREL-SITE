"use client";

import styled from "styled-components";

export const Cartao = styled.article<{ $destaque: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]}px;
  padding: ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border: ${({ $destaque }) => ($destaque ? "2px" : "1.5px")} solid
    ${({ $destaque, theme }) => ($destaque ? theme.colors.amarelo : theme.colors.faixaCinza)};
  border-radius: ${({ theme }) => theme.radii.xl};
`;

export const Topo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]}px;
  min-height: 28px;
`;

export const Nome = styled.h3`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.02em;
  line-height: 1.15;
`;

export const Selo = styled.span`
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.amarelo};
  color: ${({ theme }) => theme.colors.asfalto};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  line-height: 16px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const Preco = styled.p`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.space[1]}px;
`;

export const Valor = styled.span`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
`;

export const PorMes = styled.span`
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
`;

export const Condicoes = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  font-size: 15px;
  line-height: 1.4;
`;

export const Total = styled.p`
  color: ${({ theme }) => theme.colors.nevoa};
  font-variant-numeric: tabular-nums;
`;

export const Economia = styled.p`
  color: ${({ theme }) => theme.colors.ok};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-variant-numeric: tabular-nums;
`;

export const Chamada = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space[4]}px;
  border-top: 1.5px dashed ${({ theme }) => theme.colors.faixaCinza};

  & > a {
    width: 100%;
  }
`;
