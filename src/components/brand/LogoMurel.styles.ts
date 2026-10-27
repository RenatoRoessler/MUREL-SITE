"use client";

import styled from "styled-components";

export const Logo = styled.span<{ $tamanho: number }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $tamanho }) => Math.round($tamanho * 0.3)}px;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  font-size: ${({ $tamanho }) => $tamanho}px;
  letter-spacing: -0.04em;
  line-height: 1;

  svg {
    width: ${({ $tamanho }) => Math.round($tamanho * 1.5)}px;
    height: auto;
  }
`;
