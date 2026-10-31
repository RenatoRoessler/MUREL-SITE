"use client";

import styled from "styled-components";

export const Flutuante = styled.a`
  position: fixed;
  right: max(${({ theme }) => theme.space[3]}px, env(safe-area-inset-right, 0px));
  bottom: max(${({ theme }) => theme.space[3]}px, env(safe-area-inset-bottom, 0px));
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
  color: ${({ theme }) => theme.colors.asfalto};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: ${({ theme }) => theme.space[4]}px;
    bottom: ${({ theme }) => theme.space[4]}px;
  }
`;

export const Rotulo = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.35);
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
  white-space: nowrap;
  transition: background-color 0.15s ease-out;

  ${Flutuante}:hover & {
    background: ${({ theme }) => theme.colors.whatsappEscuro};
  }
`;

export const Circulo = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.whatsapp};
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.35);
  font-size: 32px;
  transition: background-color 0.15s ease-out;

  ${Flutuante}:hover & {
    background: ${({ theme }) => theme.colors.whatsappEscuro};
  }
`;
