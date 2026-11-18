"use client";

import styled from "styled-components";
import { FADE_PARADA_MS } from "./useAnimacaoDoCarro";

// Grupo do carro. Animado, quem move é o useAnimacaoDoCarro (atributo transform); aqui ficam só o fade da parada
// e a impressão, que sai sempre em repouso: a propriedade transform vence o atributo e põe o carro na vaga.
export const Carro = styled.g`
  &[data-carro] {
    transition: opacity ${FADE_PARADA_MS}ms ease;
  }

  @media print {
    &[data-carro] {
      visibility: visible !important;
      opacity: 1 !important;
      transform: none !important;
    }

    [data-luz] {
      display: none;
    }
  }
`;
