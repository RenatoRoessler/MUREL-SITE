"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    color-scheme: dark;
    scroll-behavior: smooth;
    scroll-padding-top: ${({ theme }) => theme.layout.headerHeight};
  }

  body {
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.asfalto};
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

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;
