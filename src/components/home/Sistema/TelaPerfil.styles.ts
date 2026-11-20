"use client";

import styled from "styled-components";

export const Slide = styled.article<{ $retrato: boolean }>`
  display: grid;
  /* A coluna não cresce com a imagem: a tela larga rola dentro da moldura, não empurra o texto. */
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space[4]}px;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${({ $retrato }) => ($retrato ? "minmax(0, 300px) minmax(0, 1fr)" : "minmax(0, 1fr)")};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: ${({ $retrato }) => ($retrato ? "minmax(0, 300px) minmax(0, 1fr)" : "minmax(0, 7fr) minmax(0, 5fr)")};
    gap: ${({ theme }) => theme.space[5]}px;
  }

  /* No painel do desktop (lista de telas ao lado), a tela cresce: o celular chega a 360 px e a tela larga ocupa
     a coluna toda, com o texto embaixo. */
  @media (min-width: 1024px) and (scripting: enabled) {
    grid-template-columns: ${({ $retrato }) => ($retrato ? "minmax(0, 360px) minmax(0, 1fr)" : "minmax(0, 1fr)")};
    align-items: ${({ $retrato }) => ($retrato ? "center" : "start")};
  }
`;

/* Em retrato, a tela do celular ocupa uma coluna estreita e centralizada no celular. */
export const Imagem = styled.div<{ $retrato: boolean }>`
  width: 100%;
  max-width: ${({ $retrato }) => ($retrato ? "300px" : "none")};
  margin-inline: ${({ $retrato }) => ($retrato ? "auto" : "0")};

  @media (min-width: 1024px) and (scripting: enabled) {
    max-width: ${({ $retrato }) => ($retrato ? "360px" : "none")};
  }
`;

export const Texto = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  align-content: center;
`;

export const Titulo = styled.h3`
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  line-height: 1.2;
  text-wrap: balance;
`;

export const Explicacao = styled.p`
  max-width: 52ch;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.giz};
`;
