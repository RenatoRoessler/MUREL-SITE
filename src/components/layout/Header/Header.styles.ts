"use client";

import styled, { css } from "styled-components";
import { comMovimento, revelar } from "@/styles/movimento";

export const PularConteudo = styled.a`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 20;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.amarelo};
  color: ${({ theme }) => theme.colors.asfalto};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transform: translateY(-200%);

  &:focus {
    transform: none;
  }
`;

// No topo da página o header é transparente (o fundo da página já é asfalto); depois de rolar, ganha fundo
// translúcido com desfoque e sombra, para o conteúdo passar por baixo sem brigar com os links.
export const Barra = styled.header<{ $rolado: boolean }>`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme, $rolado }) =>
    $rolado ? `color-mix(in srgb, ${theme.colors.asfalto} 80%, transparent)` : "transparent"};
  border-bottom: 1px solid ${({ theme, $rolado }) => ($rolado ? theme.colors.asfalto3 : "transparent")};
  box-shadow: ${({ $rolado }) => ($rolado ? "0 8px 24px rgb(0 0 0 / 0.28)" : "none")};
  backdrop-filter: ${({ $rolado }) => ($rolado ? "blur(12px)" : "none")};

  ${({ theme }) =>
    comMovimento(css`
      transition:
        background-color ${theme.motion.duracao.media}ms ${theme.motion.curva.padrao},
        border-color ${theme.motion.duracao.media}ms ${theme.motion.curva.padrao},
        box-shadow ${theme.motion.duracao.media}ms ${theme.motion.curva.padrao};
    `)}
`;

export const Linha = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]}px;
  min-height: ${({ theme }) => theme.layout.headerHeight};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin-inline: auto;
`;

export const Marca = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
`;

// Abaixo de lg o menu fica sempre no layout e aparece com fade e descida; fechado, `visibility: hidden` o tira
// da ordem de tab e da árvore de acessibilidade (a visibilidade só some depois da transição).
export const Navegacao = styled.nav<{ $aberto: boolean }>`
  display: grid;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  gap: ${({ theme }) => theme.space[1]}px;
  padding: ${({ theme }) => theme.space[3]}px 16px ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.asfalto3};
  opacity: ${({ $aberto }) => ($aberto ? 1 : 0)};
  transform: translateY(${({ $aberto }) => ($aberto ? 0 : -8)}px);
  visibility: ${({ $aberto }) => ($aberto ? "visible" : "hidden")};
  pointer-events: ${({ $aberto }) => ($aberto ? "auto" : "none")};

  ${({ theme, $aberto }) =>
    comMovimento(css`
      transition:
        opacity ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
        transform ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
        visibility 0s linear ${$aberto ? 0 : theme.motion.duracao.media}ms;

      /* Os links entram um depois do outro quando o menu abre. */
      ${$aberto &&
      css`
        > a {
          animation: ${revelar} ${theme.motion.duracao.media}ms ${theme.motion.curva.saida} backwards;
        }

        ${Array.from(
          { length: 6 },
          (_, indice) => css`
            > a:nth-child(${indice + 1}) {
              animation-delay: ${theme.motion.duracao.rapida + indice * theme.motion.intervalo}ms;
            }
          `,
        )}
      `}
    `)}

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    position: static;
    gap: ${({ theme }) => theme.space[4]}px;
    padding: 0;
    background: none;
    border: 0;
    opacity: 1;
    transform: none;
    visibility: visible;
    pointer-events: auto;
    transition: none;

    > a {
      animation: none;
    }
  }
`;

export const LinkSecao = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.giz};
  }
`;

// Só no menu aberto (abaixo de lg): de lg para cima o acesso fica em `AcessoDesktop`.
export const LinkAcessoMenu = styled(LinkSecao)`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
`;

// Abaixo de lg o acesso vai para o menu, para o "Começar grátis" caber no header.
export const AcessoDesktop = styled.span`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: inline-flex;
  }
`;

export const BotaoMenu = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1.5px solid ${({ theme }) => theme.colors.bordaControle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: transparent;
  color: ${({ theme }) => theme.colors.giz};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;
