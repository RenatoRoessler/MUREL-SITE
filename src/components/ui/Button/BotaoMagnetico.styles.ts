"use client";

import styled, { css } from "styled-components";
import { comCursorFino } from "@/styles/movimento";

// Casca do botão magnético. Usa a propriedade `translate` (o botão tem o próprio transform de hover e clique) e
// não muda o tamanho: só o desenho anda poucos pixels. Ao sair do alcance volta com um retorno elástico.
export const Casca = styled.span`
  display: inline-flex;

  ${({ theme }) =>
    comCursorFino(css`
      transition: translate ${theme.motion.duracao.lenta}ms ${theme.motion.curva.elastica};

      &[data-magnetico="ativo"] {
        translate: var(--mx, 0) var(--my, 0);
        transition-duration: ${theme.motion.duracao.rapida}ms;
        transition-timing-function: ${theme.motion.curva.padrao};
      }
    `)}
`;
