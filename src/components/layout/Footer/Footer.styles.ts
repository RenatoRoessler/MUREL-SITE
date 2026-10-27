"use client";

import styled from "styled-components";

export const Base = styled.footer`
  padding-block: 40px 64px;
  border-top: 2px dashed ${({ theme }) => theme.colors.faixaCinza};
`;

export const Linha = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]}px;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin-inline: auto;
`;

export const Contato = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]}px;
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${({ theme }) => theme.colors.giz};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Acoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]}px;
`;
