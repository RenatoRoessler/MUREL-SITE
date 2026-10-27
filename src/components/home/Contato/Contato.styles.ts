"use client";

import styled from "styled-components";

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

export const Campo = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  align-content: start;
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

export const Entrada = styled.input<{ $invalido?: boolean }>`
  ${baseEntrada}
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
  color: ${({ theme }) => theme.colors.giz};
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 1px solid
    ${({ theme, $invalido }) => ($invalido ? theme.colors.alerta : theme.colors.bordaControle)};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const AreaTexto = styled.textarea<{ $invalido?: boolean }>`
  ${baseEntrada}
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
