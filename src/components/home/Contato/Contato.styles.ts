"use client";

import styled, { css, type DefaultTheme, keyframes } from "styled-components";
import { comMovimento, girar, tremor } from "@/styles/movimento";

export const Whatsapp = styled.div`
  display: grid;
  justify-items: start;
  gap: ${({ theme }) => theme.space[2]}px;
  max-width: 720px;

  h3 {
    font-size: 20px;
  }

  p {
    color: ${({ theme }) => theme.colors.nevoa};
  }

  a {
    color: ${({ theme }) => theme.colors.giz};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Formulario = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  max-width: 720px;
`;

export const Grade = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

/* Campos de texto ($flutuante): com movimento, o rótulo descansa dentro do campo e sobe para a faixa de cima ao
   receber foco ou ter conteúdo. O espaço do rótulo é o mesmo nos dois estados (a faixa de cima fica reservada),
   então o formulário não muda de altura. Sem movimento, o rótulo fica sempre em cima, como sempre foi. */
export const Campo = styled.div<{ $flutuante?: boolean }>`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  align-content: start;

  ${({ $flutuante, theme }) =>
    $flutuante &&
    comMovimento(css`
      label {
        position: absolute;
        top: 0;
        left: 14px;
        z-index: 1;
        max-width: calc(100% - 28px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: none;
        transform: translateY(39px);
        transition:
          transform ${theme.motion.duracao.media}ms ${theme.motion.curva.saida},
          font-size ${theme.motion.duracao.media}ms ${theme.motion.curva.saida};
      }

      /* A faixa do rótulo fica reservada acima do campo. */
      padding-top: 26px;

      &:focus-within label,
      &:has(input:not(:placeholder-shown)) label,
      &:has(input:-webkit-autofill) label {
        left: 0;
        max-width: 100%;
        transform: none;
      }
    `)}
`;

export const Rotulo = styled.label`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const Opcional = styled.span`
  color: ${({ theme }) => theme.colors.nevoa};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const baseEntrada = `
  width: 100%;
  min-height: 48px;
  padding: 10px 14px;
  font: inherit;
`;

/* Campo com erro treme uma vez (3 idas e vindas curtas) quando o erro aparece. */
const tremerAoErrar = ({ theme }: { theme: DefaultTheme }) =>
  comMovimento(css`
    &[aria-invalid="true"] {
      animation: ${tremor} ${theme.motion.duracao.media}ms ease-in-out 1;
    }
  `);

export const Entrada = styled.input<{ $invalido?: boolean }>`
  ${baseEntrada}
  ${tremerAoErrar}
  color: ${({ theme }) => theme.colors.giz};
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 1px solid
    ${({ theme, $invalido }) => ($invalido ? theme.colors.alerta : theme.colors.bordaControle)};
  border-radius: ${({ theme }) => theme.radii.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.nevoa};
  }
`;

export const Selecao = styled.select<{ $invalido?: boolean }>`
  ${baseEntrada}
  ${tremerAoErrar}
  color: ${({ theme }) => theme.colors.giz};
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 1px solid
    ${({ theme, $invalido }) => ($invalido ? theme.colors.alerta : theme.colors.bordaControle)};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const AreaTexto = styled.textarea<{ $invalido?: boolean }>`
  ${baseEntrada}
  ${tremerAoErrar}
  min-height: 140px;
  resize: vertical;
  color: ${({ theme }) => theme.colors.giz};
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 1px solid
    ${({ theme, $invalido }) => ($invalido ? theme.colors.alerta : theme.colors.bordaControle)};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const MensagemErro = styled.p`
  color: ${({ theme }) => theme.colors.alerta};
  font-size: 14px;
`;

export const Resumo = styled.div`
  padding: ${({ theme }) => theme.space[3]}px;
  border: 1px solid ${({ theme }) => theme.colors.alerta};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.asfalto2};

  h3 {
    font-size: 16px;
    margin-bottom: ${({ theme }) => theme.space[1]}px;
  }

  ul {
    padding-left: ${({ theme }) => theme.space[4]}px;
  }

  a {
    text-decoration: underline;
  }
`;

export const Aviso = styled.p`
  max-width: 62ch;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.nevoa};
`;

/* O aviso de "um dos dois" ocupa a largura toda da grade de e-mail e telefone, logo abaixo dos dois campos. */
export const AvisoDoPar = styled(Aviso)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
  }
`;

export const Armadilha = styled.div`
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const Rodape = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]}px;
`;

/* Indicador de carregamento do botão de enviar. */
export const Carregando = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: ${({ theme }) => theme.space[2]}px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;

  ${comMovimento(css`
    animation: ${girar} 700ms linear infinite;
  `)}
`;

const desenharTraco = keyframes`
  from {
    stroke-dashoffset: 1;
  }

  to {
    stroke-dashoffset: 0;
  }
`;

const surgirSelo = keyframes`
  from {
    transform: scale(0.6);
    opacity: 0;
  }

  to {
    transform: none;
    opacity: 1;
  }
`;

/* Círculo com check que se desenha ao confirmar o envio. Sem movimento, já aparece pronto. */
export const SeloOk = styled.svg`
  width: 48px;
  height: 48px;
  fill: none;
  stroke: ${({ theme }) => theme.colors.ok};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;

  circle,
  path {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
  }

  ${({ theme }) =>
    comMovimento(css`
      animation: ${surgirSelo} ${theme.motion.duracao.lenta}ms ${theme.motion.curva.elastica} backwards;

      circle {
        animation: ${desenharTraco} 600ms ${theme.motion.curva.saida} backwards;
      }

      path {
        animation: ${desenharTraco} 400ms ${theme.motion.curva.saida} 400ms backwards;
      }
    `)}
`;

export const Confirmacao = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]}px;
  max-width: 720px;
  padding: ${({ theme }) => theme.space[5]}px;
  border: 1px solid ${({ theme }) => theme.colors.ok};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.asfalto2};

  h3 {
    font-size: 22px;
  }

  p {
    color: ${({ theme }) => theme.colors.nevoa};
  }
`;
