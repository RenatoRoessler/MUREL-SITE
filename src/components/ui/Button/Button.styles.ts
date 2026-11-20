"use client";

import styled, { css } from "styled-components";
import { brilho, comMovimento } from "@/styles/movimento";

export type VarianteBotao = "primary" | "ghost" | "whatsapp" | "escuro";
export type TamanhoBotao = "md" | "sm";

type EstiloBotao = { $variante: VarianteBotao; $tamanho: TamanhoBotao; $brilho?: boolean };

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
    color 0.15s ease-out,
    transform 0.15s ease-out;

  ${comMovimento(css`
    &:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: scale(0.97);
    }
  `)}

  /* Faixa de luz que cruza o botão 3 vezes (a cada 6s) e para: chama atenção sem ficar piscando. */
  ${({ $brilho, theme }) =>
    $brilho &&
    comMovimento(css`
      position: relative;
      overflow: hidden;
      isolation: isolate;

      &::after {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        z-index: -1;
        width: 40%;
        background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.45), transparent);
        animation: ${brilho} 6s ${theme.motion.curva.padrao} 1s 3 backwards;
        pointer-events: none;
      }
    `)}

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
      case "escuro":
        return css`
          background: ${theme.colors.asfalto};
          color: ${theme.colors.amarelo};
          border: 1.5px solid ${theme.colors.asfalto};

          &:hover {
            background: ${theme.colors.asfalto3};
            border-color: ${theme.colors.asfalto3};
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
