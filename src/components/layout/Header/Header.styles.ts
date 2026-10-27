"use client";

import styled from "styled-components";

export const PularConteudo = styled.a`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 20;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.amarelo};
  color: ${({ theme }) => theme.colors.asfalto};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transform: translateY(-200%);

  &:focus {
    transform: none;
  }
`;

export const Barra = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.asfalto};
  border-bottom: 1px solid ${({ theme }) => theme.colors.asfalto3};
`;

export const Linha = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]}px;
  min-height: ${({ theme }) => theme.layout.headerHeight};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin-inline: auto;
`;

export const Marca = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
`;

export const Navegacao = styled.nav<{ $aberto: boolean }>`
  display: ${({ $aberto }) => ($aberto ? "grid" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  gap: ${({ theme }) => theme.space[1]}px;
  padding: ${({ theme }) => theme.space[3]}px 16px ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.asfalto3};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    position: static;
    gap: ${({ theme }) => theme.space[4]}px;
    padding: 0;
    background: none;
    border: 0;
  }
`;

export const LinkSecao = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.giz};
  }
`;

export const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
`;

export const BotaoMenu = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1.5px solid ${({ theme }) => theme.colors.bordaControle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: transparent;
  color: ${({ theme }) => theme.colors.giz};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
