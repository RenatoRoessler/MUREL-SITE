"use client";

import styled from "styled-components";

export const Cartao = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]}px;
  width: 100%;
  max-width: 480px;
  margin-inline: auto;
  padding: ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 2px solid ${({ theme }) => theme.colors.amarelo};
  border-radius: ${({ theme }) => theme.radii.xl};
`;

export const Topo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[2]}px;
`;

export const Nome = styled.h3`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.02em;
  line-height: 1.15;
`;

export const Selo = styled.span`
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.amarelo};
  color: ${({ theme }) => theme.colors.asfalto};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  line-height: 16px;
  text-transform: uppercase;
`;

export const Preco = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${({ theme }) => theme.space[1]}px ${({ theme }) => theme.space[2]}px;
`;

export const Riscado = styled.span`
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 20px;
  font-variant-numeric: tabular-nums;
`;

export const Valor = styled.span`
  font-size: 44px;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
`;

export const PorMes = styled.span`
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
`;

export const Regra = styled.p`
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
  line-height: 1.4;
  font-variant-numeric: tabular-nums;
`;

// Lido por leitor de tela e escondido da vista: dá sentido ao preço riscado.
export const SoLeitor = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

export const Chamada = styled.div`
  padding-top: ${({ theme }) => theme.space[4]}px;
  border-top: 1.5px dashed ${({ theme }) => theme.colors.faixaCinza};

  & > a {
    width: 100%;
  }
`;
