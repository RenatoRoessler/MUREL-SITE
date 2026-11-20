"use client";

import styled, { css, keyframes } from "styled-components";

const desenharNaRolagem = keyframes`
  from {
    clip-path: inset(0 0 100% 0);
  }

  to {
    clip-path: inset(0);
  }
`;

// Faixa tracejada de pista, colada à esquerda da tela, só a partir de 1280 px (onde há margem livre ao lado do
// conteúdo). Fica atrás de tudo e nunca pega clique. Com suporte a linha do tempo de rolagem ela se desenha
// conforme a página desce; sem suporte (ou com "menos movimento") fica inteira, apagada.
export const Faixa = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: block;
    position: fixed;
    inset: 0 auto 0 24px;
    z-index: -1;
    width: 4px;
    pointer-events: none;
    opacity: 0.35;
    background: repeating-linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.amarelo} 0 28px,
      transparent 28px 56px
    );
  }

  @media print {
    display: none;
  }

  @supports (animation-timeline: scroll()) {
    @media (min-width: 1280px) and (prefers-reduced-motion: no-preference) {
      ${css`
        opacity: 0.6;
        animation: ${desenharNaRolagem} linear both;
        animation-timeline: scroll(root block);
      `}
    }
  }
`;
