"use client";

import styled from "styled-components";

export const ListaPlanos = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.space[4]}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ItemPlano = styled.li`
  display: grid;
`;

export const NotaTeste = styled.p`
  margin-top: ${({ theme }) => theme.space[4]}px;
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
  text-align: center;
`;

export const Incluso =styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]}px;
  margin-top: ${({ theme }) => theme.space[6]}px;
`;

export const TituloIncluso = styled.h3`
  font-size: clamp(22px, 3vw, 28px);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.02em;
  line-height: 1.15;
`;

export const TextoIncluso = styled.p`
  max-width: 62ch;
  margin-top: ${({ theme }) => theme.space[1]}px;
  color: ${({ theme }) => theme.colors.nevoa};
`;

export const Areas = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[5]}px;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Area = styled.li`
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: ${({ theme }) => theme.space[2]}px;
  align-items: start;

  svg {
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.amarelo};
  }
`;

export const NomeArea = styled.strong`
  display: block;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const DescricaoArea = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.nevoa};
  font-size: 15px;
  line-height: 1.5;
`;

export const Duvida = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]}px;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.space[6]}px;
  padding: ${({ theme }) => theme.space[4]}px;
  background: ${({ theme }) => theme.colors.asfalto2};
  border-radius: ${({ theme }) => theme.radii.xl};
`;

export const TextoDuvida = styled.div`
  display: grid;
  flex: 1 1 320px;
  gap: ${({ theme }) => theme.space[1]}px;

  strong {
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.3;
  }

  span {
    color: ${({ theme }) => theme.colors.nevoa};
  }
`;
