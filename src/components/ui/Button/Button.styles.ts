"use client";

import styled, { css } from "styled-components";

export type VarianteBotao = "primary" | "ghost" | "whatsapp";
export type TamanhoBotao = "md" | "sm";

type EstiloBotao = { $variante: VarianteBotao; $tamanho: TamanhoBotao };

export const estiloBotao = css<EstiloBotao>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ $tamanho }) => ($tamanho === "sm" ? "44px" : "48px")};
  padding: ${({ $tamanho }) => ($tamanho === "sm" ? "8px 16px" : "12px 24px")};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-family: inherit;
  font-size: ${({ $tamanho }) => ($tamanho === "sm" ? "14px" : "16px")};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.15s ease-out,
    border-color 0.15s ease-out,
    color 0.15s ease-out;

  ${({ $variante, theme }) => {
    switch ($variante) {
      case "primary":
        return css`
          background: ${theme.colors.amarelo};
          color: ${theme.colors.asfalto};
          border: 1.5px solid ${theme.colors.amarelo};

          &:hover {
            background: ${theme.colors.amareloEscuro};
            border-color: ${theme.colors.amareloEscuro};
          }
        `;
      case "whatsapp":
        return css`
          gap: ${theme.space[2]}px;
          background: ${theme.colors.whatsapp};
          color: ${theme.colors.asfalto};
          border: 1.5px solid ${theme.colors.whatsapp};

          &:hover {
            background: ${theme.colors.whatsappEscuro};
            border-color: ${theme.colors.whatsappEscuro};
          }
        `;
      default:
        return css`
          background: transparent;
          color: ${theme.colors.giz};
          border: 1.5px solid ${theme.colors.bordaControle};

          &:hover {
            border-color: ${theme.colors.amarelo};
            color: ${theme.colors.amarelo};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BotaoLink = styled.a<EstiloBotao>`
  ${estiloBotao}
`;

export const BotaoAcao = styled.button<EstiloBotao>`
  ${estiloBotao}
`;
