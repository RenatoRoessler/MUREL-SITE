"use client";

import styled, { keyframes } from "styled-components";

const estaciona = keyframes`
  from { transform: translateY(46px); }
  to { transform: none; }
`;

export const Carro = styled.g<{ $animado: boolean }>`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${({ $animado }) => ($animado ? estaciona : "none")} 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both 0.2s;
  }
`;
