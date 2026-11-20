"use client";

import styled from "styled-components";

// Algarismos de largura igual e largura mínima do valor final: a contagem não mexe no layout em volta.
export const Numero = styled.span<{ $largura: number }>`
  display: inline-block;
  min-width: ${({ $largura }) => $largura}ch;
  font-variant-numeric: tabular-nums;
`;
