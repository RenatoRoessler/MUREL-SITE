"use client";

import styled from "styled-components";

export const Moldura = styled.figure`
  border: 1px solid ${({ theme }) => theme.colors.faixaCinza};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.asfalto2};

  /* No celular a tela mantém um tamanho legível e rola na horizontal dentro da moldura. */
  overflow-x: auto;

  img {
    display: block;
    width: 100%;
    min-width: 720px;
    height: auto;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      min-width: 0;
    }
  }
`;
