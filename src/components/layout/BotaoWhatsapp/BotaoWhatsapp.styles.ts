"use client";

import styled, { css, keyframes } from "styled-components";
import { comMovimento } from "@/styles/movimento";

const duracaoAparicao = "0.3s";

// Oculto com `visibility: hidden`: sai da ordem de tab e da árvore de acessibilidade sozinho.
export const Flutuante = styled.a<{ $visivel: boolean; $compacto: boolean }>`
  position: fixed;
  right: max(${({ theme }) => theme.space[3]}px, env(safe-area-inset-right, 0px));
  /* Sobe acima da barra fixa de "Começar grátis" quando ela está na tela (--barra-fixa). */
  bottom: calc(max(${({ theme }) => theme.space[3]}px, env(safe-area-inset-bottom, 0px)) + var(--barra-fixa, 0px));
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme, $compacto }) => ($compacto ? 0 : theme.space[2])}px;
  color: ${({ theme }) => theme.colors.asfalto};
  opacity: ${({ $visivel }) => ($visivel ? 1 : 0)};
  transform: translateY(${({ $visivel }) => ($visivel ? 0 : 24)}px);
  visibility: ${({ $visivel }) => ($visivel ? "visible" : "hidden")};
  pointer-events: ${({ $visivel }) => ($visivel ? "auto" : "none")};
  /* Ao sumir, o visibility espera a transição terminar. */
  transition:
    opacity ${duracaoAparicao} ease-out,
    transform ${duracaoAparicao} ease-out,
    visibility 0s linear ${({ $visivel }) => ($visivel ? "0s" : duracaoAparicao)};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: ${({ theme }) => theme.space[4]}px;
    bottom: calc(${({ theme }) => theme.space[4]}px + var(--barra-fixa, 0px));
  }
`;

export const Rotulo = styled.span<{ $compacto: boolean }>`
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
  overflow: hidden;
  max-width: ${({ $compacto }) => ($compacto ? "0" : "260px")};
  padding-inline: ${({ $compacto }) => ($compacto ? "0" : "18px")};
  opacity: ${({ $compacto }) => ($compacto ? 0 : 1)};
  transition: background-color 0.15s ease-out;

  /* Depois do anel, o rótulo encolhe devagar e fica só o círculo. */
  ${({ theme }) =>
    comMovimento(css`
      transition:
        background-color 0.15s ease-out,
        max-width ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
        padding-inline ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
        opacity ${theme.motion.duracao.media}ms ${theme.motion.curva.padrao};
    `)}

  ${Flutuante}:hover & {
    background: ${({ theme }) => theme.colors.whatsappEscuro};
  }
`;

const anel = keyframes`
  from {
    transform: scale(1);
    opacity: 0.7;
  }

  to {
    transform: scale(1.7);
    opacity: 0;
  }
`;

export const Circulo = styled.span<{ $visivel: boolean }>`
  position: relative;
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

  /* Anel que chama atenção quando o botão aparece: 3 pulsos e para (uma vez por aparição). */
  ${({ theme, $visivel }) =>
    $visivel &&
    comMovimento(css`
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 2px solid ${theme.colors.whatsapp};
        border-radius: inherit;
        opacity: 0;
        pointer-events: none;
        animation: ${anel} 1.6s ${theme.motion.curva.padrao} 0.6s 3;
      }
    `)}

  ${Flutuante}:hover & {
    background: ${({ theme }) => theme.colors.whatsappEscuro};
  }
`;
