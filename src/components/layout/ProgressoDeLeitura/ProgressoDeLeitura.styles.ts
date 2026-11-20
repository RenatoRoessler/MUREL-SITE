"use client";

import styled, { keyframes } from "styled-components";

const preencher = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`;

// Linha fina no topo da tela que cresce com a leitura da página. É só um acréscimo: sem suporte a linha do tempo
// de rolagem, ou com "menos movimento", não aparece. Fica acima do header.
export const Linha = styled.div`
  display: none;

  @supports (animation-timeline: scroll()) {
    @media screen and (prefers-reduced-motion: no-preference) {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 30;
      height: 3px;
      background: ${({ theme }) => theme.colors.amarelo};
      transform-origin: left center;
      transform: scaleX(0);
      pointer-events: none;
      animation: ${preencher} linear both;
      animation-timeline: scroll(root block);
    }
  }
`;
