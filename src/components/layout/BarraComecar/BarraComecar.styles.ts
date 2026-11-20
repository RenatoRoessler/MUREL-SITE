"use client";

import styled, { createGlobalStyle, css } from "styled-components";
import { comMovimento } from "@/styles/movimento";

// Enquanto a barra está na tela, publica a altura dela para outras peças (o botão do WhatsApp sobe acima dela).
// Só vale abaixo de `md`: de `md` para cima a barra não existe.
export const AlturaDaBarra = createGlobalStyle<{ $ativa: boolean }>`
  ${({ $ativa, theme }) =>
    $ativa &&
    css`
      @media not all and (min-width: ${theme.breakpoints.md}) {
        :root {
          --barra-fixa: ${theme.layout.barraFixa};
        }
      }
    `}
`;

export const Barra = styled.aside<{ $visivel: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.barraFixa};
  padding: ${({ theme }) => theme.space[2]}px max(${({ theme }) => theme.space[3]}px, env(safe-area-inset-right, 0px))
    calc(${({ theme }) => theme.space[2]}px + env(safe-area-inset-bottom, 0px))
    max(${({ theme }) => theme.space[3]}px, env(safe-area-inset-left, 0px));
  background: ${({ theme }) => theme.colors.asfalto2};
  border-top: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  box-shadow: 0 -8px 24px rgb(0 0 0 / 0.3);
  /* Escondida fica fora do Tab e do leitor de tela (o visibility só some depois da saída). */
  visibility: ${({ $visivel }) => ($visivel ? "visible" : "hidden")};
  transform: translateY(${({ $visivel }) => ($visivel ? "0" : "100%")});

  & > a {
    width: 100%;
  }

  ${({ theme, $visivel }) =>
    comMovimento(css`
      transition:
        transform ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
        visibility 0s linear ${$visivel ? 0 : theme.motion.duracao.media}ms;
    `)}

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  @media print {
    display: none;
  }
`;
