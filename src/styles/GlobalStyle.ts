"use client";

import { createGlobalStyle, css } from "styled-components";
import { comMovimento } from "./movimento";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    /* O fundo fica no html (e o body é transparente) para o FundoVivo, atrás do conteúdo, aparecer. */
    background: ${({ theme }) => theme.colors.asfalto};
    color-scheme: dark;
    scroll-behavior: smooth;
    scroll-padding-top: ${({ theme }) => theme.layout.headerHeight};
  }

  body {
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.giz};
    font-family: ${({ theme }) => theme.fontFamilies.sans};
    font-size: 16px;
    line-height: 1.6;
    padding-inline: max(16px, env(safe-area-inset-left, 0px));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3 {
    text-wrap: balance;
    letter-spacing: -0.02em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.amarelo};
    outline-offset: 3px;
  }

  /* Texto selecionado na cor da marca. */
  ::selection {
    background: ${({ theme }) => theme.colors.amarelo};
    color: ${({ theme }) => theme.colors.asfalto};
  }

  /* O anel de foco do teclado se afasta do elemento em vez de aparecer de uma vez. */
  ${({ theme }) =>
    comMovimento(css`
      :where(a, button, input, select, textarea, summary, [tabindex]) {
        outline-offset: 0;
        transition: outline-offset ${theme.motion.duracao.rapida}ms ${theme.motion.curva.padrao};
      }

      :where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
        outline-offset: 3px;
      }
    `)}

  /* Transição entre páginas (ViewTransition): curta e discreta. */
  ${({ theme }) =>
    comMovimento(css`
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation-duration: ${theme.motion.duracao.media}ms;
        animation-timing-function: ${theme.motion.curva.saida};
      }
    `)}

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;
