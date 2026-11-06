"use client";

import styled, { css } from "styled-components";

/* Moldura de aparelho: celular para telas em retrato, notebook para telas em paisagem. */
export const Moldura = styled.figure`
  display: block;
`;

export const Corpo = styled.div<{ $retrato: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.asfalto3};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.bordaControle};

  ${({ $retrato }) =>
    $retrato
      ? css`
          padding: 9px;
          border-radius: 38px;

          /* Pílula do alto-falante e da câmera. */
          &::before {
            content: "";
            position: absolute;
            top: 9px;
            left: 50%;
            z-index: 1;
            width: 64px;
            height: 7px;
            border-radius: 4px;
            background: ${({ theme }) => theme.colors.asfalto};
            transform: translateX(-50%);
          }
        `
      : css`
          padding: 10px 10px 12px;
          border-radius: 14px 14px 4px 4px;
        `}
`;

/* O visor é a área da tela: focável e rolável, para o teclado rolar telas largas no celular. */
export const Visor = styled.div<{ $retrato: boolean }>`
  overflow-x: auto;
  border-radius: ${({ $retrato }) => ($retrato ? "29px" : "6px")};
  background: ${({ theme }) => theme.colors.asfalto2};

  img {
    display: block;
    width: 100%;
    height: auto;

    ${({ $retrato, theme }) =>
      $retrato
        ? css``
        : css`
            min-width: 720px;

            @media (min-width: ${theme.breakpoints.md}) {
              min-width: 0;
            }
          `}
  }
`;

export const Base = styled.div`
  position: relative;
  height: 14px;
  background: ${({ theme }) => theme.colors.asfalto3};
  border-radius: 0 0 14px 14px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.bordaControle};

  /* Recorte central da base, onde o dedo levanta a tampa. */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 110px;
    height: 5px;
    border-radius: 0 0 8px 8px;
    background: ${({ theme }) => theme.colors.faixaCinza};
    transform: translateX(-50%);
  }
`;
