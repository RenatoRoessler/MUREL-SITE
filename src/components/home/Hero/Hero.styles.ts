"use client";

import styled, { css, keyframes } from "styled-components";
import { comCursorFino, comMovimento, desenhar, revelar } from "@/styles/movimento";

export const Topo = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[6]}px;
  align-items: center;
  padding-block: 48px 64px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.15fr 0.85fr;
    gap: ${({ theme }) => theme.space[7]}px;
    /* Mais justo embaixo: a faixa de diferenciais aparece inteira na primeira tela (1280x800). */
    padding-block: 48px 40px;
  }
`;

// Entrada em sequência ao carregar, só com CSS: o conteúdo já é clicável desde o início. Título, subtítulo,
// chamadas e garantias entram um depois do outro.
const ATRASOS_DE_ENTRADA = [0, 120, 240, 360];

export const Texto = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  justify-items: start;

  ${({ theme }) =>
    comMovimento(css`
      > * {
        animation: ${revelar} ${theme.motion.duracao.lenta}ms ${theme.motion.curva.saida} backwards;
      }

      ${ATRASOS_DE_ENTRADA.map(
        (atraso, indice) => css`
          > *:nth-child(${indice + 1}) {
            animation-delay: ${atraso}ms;
          }
        `,
      )}
    `)}
`;

export const Titulo = styled.h1`
  font-size: clamp(40px, 8vw, 84px);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  line-height: 0.98;
  letter-spacing: -0.035em;

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.amarelo};
  }

  /* Sublinhado que se desenha da esquerda para a direita (fundo, para acompanhar a quebra de linha). */
  ${({ theme }) =>
    comMovimento(css`
      em {
        background: linear-gradient(${theme.colors.amarelo}, ${theme.colors.amarelo}) no-repeat 0 100% / 100% 0.09em;
        box-decoration-break: clone;
        animation: ${desenhar} 600ms ${theme.motion.curva.saida} 500ms backwards;
      }
    `)}
`;

export const Subtitulo = styled.p`
  max-width: 52ch;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.nevoa};

  strong {
    color: ${({ theme }) => theme.colors.giz};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const Chamadas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]}px;
  margin-top: ${({ theme }) => theme.space[2]}px;
`;

export const Marca = styled.div`
  display: flex;
  justify-content: center;
`;

const flutuar = keyframes`
  from {
    translate: 0 0;
  }

  to {
    translate: 0 var(--deslocamento);
  }
`;

/* Par de celulares sobrepostos em ângulo leve: o pátio atrás e o ticket na frente. No celular o par entra pela
   base do Hero, cortado com degradê para sugerir que há mais. */
export const Aparelhos = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 330px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000 62%, transparent);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 480px;
    height: 540px;
    overflow: visible;
    mask-image: none;
  }

  ${({ theme }) =>
    comMovimento(css`
      animation: ${revelar} ${theme.motion.duracao.lenta}ms ${theme.motion.curva.saida} 300ms backwards;
    `)}

  /* Só com mouse e em tela larga: o conjunto inclina até 6° (theme.motion.cursor.inclinacao) para onde o cursor está (--rx e --ry,
     de -1 a 1) e cada camada fica numa profundidade, então as telas e o brilho se mexem em ritmos
     diferentes. */
  ${({ theme }) =>
    comCursorFino(css`
      @media (min-width: ${theme.breakpoints.lg}) {
        transform-style: preserve-3d;
        transform: perspective(1000px) rotateX(calc(var(--ry, 0) * ${-theme.motion.cursor.inclinacao}deg))
          rotateY(calc(var(--rx, 0) * ${theme.motion.cursor.inclinacao}deg));
        transition: transform ${theme.motion.duracao.rapida}ms ${theme.motion.curva.padrao};

        /* Brilho à frente: uma luz suave que anda no sentido oposto ao do cursor. */
        &::after {
          content: "";
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          background: radial-gradient(closest-side, rgb(255 255 255 / 0.07), transparent);
          transform: translateZ(90px) translate(calc(var(--rx, 0) * -28px), calc(var(--ry, 0) * -28px));
          transition: transform ${theme.motion.duracao.rapida}ms ${theme.motion.curva.padrao};
          pointer-events: none;
        }
      }
    `)}
`;

export const Aparelho = styled.div<{ $posicao: "fundo" | "frente" }>`
  position: absolute;
  top: ${({ $posicao }) => ($posicao === "fundo" ? "52px" : "84px")};
  left: ${({ $posicao }) => ($posicao === "fundo" ? "6%" : "38%")};
  width: 170px;
  transform: rotate(${({ $posicao }) => ($posicao === "fundo" ? "-5deg" : "4deg")});
  z-index: ${({ $posicao }) => ($posicao === "fundo" ? 1 : 2)};
  filter: drop-shadow(0 18px 30px rgb(0 0 0 / 0.45));

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    top: ${({ $posicao }) => ($posicao === "fundo" ? "16px" : "80px")};
    left: ${({ $posicao }) => ($posicao === "fundo" ? "0" : "44%")};
    width: 200px;
  }

  ${({ $posicao, theme }) =>
    comCursorFino(css`
      @media (min-width: ${theme.breakpoints.lg}) {
        transform: rotate(${$posicao === "fundo" ? "-5deg" : "4deg"}) translateZ(${$posicao === "fundo" ? "-30px" : "40px"});
      }
    `)}

  /* Profundidade: as duas telas sobem em ritmos diferentes conforme a página rola (a da frente, mais). Só onde o
     navegador sabe ligar animação à rolagem; nos outros, ficam paradas. Usa a propriedade translate, que não
     briga com o transform da rotação. */
  ${({ $posicao }) =>
    comMovimento(css`
      @supports (animation-timeline: scroll()) {
        --deslocamento: ${$posicao === "fundo" ? "-20px" : "-50px"};
        animation: ${flutuar} linear both;
        animation-timeline: scroll(root);
        animation-range: 0 600px;
      }
    `)}
`;
