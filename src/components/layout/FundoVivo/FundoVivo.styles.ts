"use client";

import styled, { css, keyframes } from "styled-components";
import { comMovimento } from "@/styles/movimento";

const derivar = keyframes`
  from {
    transform: translate3d(-3%, -2%, 0);
  }

  to {
    transform: translate3d(3%, 2%, 0);
  }
`;

// Ruído discreto (SVG inline, 160 px) para tirar o aspecto chapado do fundo.
const graoDeRuido =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Fundo da página: dois brilhos largos de asfalto2 que derivam bem devagar e um grão por cima (3%). Fica fixo
// atrás de tudo e é maior que a tela, para a deriva nunca mostrar borda. O contraste do texto vem de asfalto2,
// que já atinge AA com giz, névoa e amarelo.
export const Fundo = styled.div`
  position: fixed;
  inset: -10%;
  z-index: -1;
  pointer-events: none;
  background-image:
    radial-gradient(60vmax 60vmax at 15% 12%, ${({ theme }) => theme.colors.asfalto2}, transparent 70%),
    radial-gradient(50vmax 50vmax at 85% 88%, ${({ theme }) => theme.colors.asfalto2}, transparent 70%);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${graoDeRuido};
    opacity: 0.03;
  }

  ${({ theme }) =>
    comMovimento(css`
      will-change: transform;
      animation: ${derivar} ${theme.motion.ciclo.fundo}ms ease-in-out infinite alternate;
    `)}

  @media print {
    display: none;
  }
`;
