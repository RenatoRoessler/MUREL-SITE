"use client";

import styled from "styled-components";
import { CartaoComFarol } from "@/components/ui/CartaoComFarol/CartaoComFarol";

/* Um só bloco, com a única borda amarela da seção: no topo a faixa do mês grátis, abaixo o plano. */
export const Bloco = styled(CartaoComFarol)`
  width: 100%;
  max-width: 600px;
  margin-inline: auto;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.asfalto2};
  border: 2px solid ${({ theme }) => theme.colors.amarelo};
  border-radius: ${({ theme }) => theme.radii.xl};
`;
