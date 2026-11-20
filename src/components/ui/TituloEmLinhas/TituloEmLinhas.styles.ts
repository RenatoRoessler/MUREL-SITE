"use client";

import styled, { css, keyframes } from "styled-components";

const subirLinha = keyframes`
  from {
    transform: translateY(110%);
  }

  to {
    transform: none;
  }
`;

// Texto lido por leitor de tela e escondido da vista: as linhas visuais abaixo são aria-hidden.
export const SoLeitor = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

// Cada linha é uma máscara: o texto sobe de dentro dela. A folga embaixo evita cortar as hastes das letras.
export const Linha = styled.span`
  display: block;
  overflow: clip;
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
`;

// Só esconde e anima quando o título está dentro de um Revelar (a seção revela o cabeçalho): sem ele, ou sem
// JavaScript, ou com "menos movimento", as linhas ficam na posição final.
export const TextoDaLinha = styled.span<{ $indice: number }>`
  display: block;

  @media screen and (scripting: enabled) and (prefers-reduced-motion: no-preference) {
    ${({ $indice, theme }) => css`
      [data-estado="pendente"] & {
        transform: translateY(110%);
      }

      [data-estado="visivel"] & {
        animation: ${subirLinha} ${theme.motion.duracao.lenta}ms ${theme.motion.curva.saida} backwards;
        animation-delay: ${$indice * theme.motion.intervalo}ms;
      }
    `}
  }
`;
