"use client";

import styled from "styled-components";

export const Ferramentas = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[3]}px;
  max-width: 820px;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
`;

export const CampoDeBusca = styled.div`
  display: grid;
  flex: 1 1 260px;
  gap: ${({ theme }) => theme.space[1]}px;
`;

export const RotuloDaBusca = styled.label`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const Busca = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.space[3]}px;
  border: 1px solid ${({ theme }) => theme.colors.bordaControle};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.asfalto};
  color: ${({ theme }) => theme.colors.giz};
  font: inherit;
`;

export const Contagem = styled.p`
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 14px;
`;

export const Grupos = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]}px;
  max-width: 820px;
`;

export const TituloDoGrupo = styled.h3`
  margin-bottom: ${({ theme }) => theme.space[1]}px;
  color: ${({ theme }) => theme.colors.amarelo};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const SemResultado = styled.p`
  max-width: 62ch;
  padding-block: ${({ theme }) => theme.space[3]}px;
  color: ${({ theme }) => theme.colors.nevoa};

  a {
    color: ${({ theme }) => theme.colors.giz};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
