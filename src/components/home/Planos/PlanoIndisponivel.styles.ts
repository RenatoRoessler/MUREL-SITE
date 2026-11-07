"use client";

import styled from "styled-components";

export const Botoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]}px;
  padding-top: ${({ theme }) => theme.space[4]}px;
  border-top: 1.5px dashed ${({ theme }) => theme.colors.faixaCinza};

  & > a {
    width: 100%;
  }
`;
