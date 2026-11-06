"use client";

import { Button } from "@/components/ui/Button/Button";
import { Garantias } from "@/components/ui/Garantias/Garantias";
import { urlAdesaoComPlano } from "@/lib/config";
import type { Plano } from "@/types/plano";
import {
  Cartao,
  Chamada,
  Nome,
  PorMes,
  Preco,
  Regra,
  Riscado,
  Selo,
  SoLeitor,
  Topo,
  Valor,
} from "./CartaoPlano.styles";
import { rotuloFimDoLancamento } from "./Lancamento";
import { garantiasPlano, rotuloGarantiasPlano } from "./Planos.data";
import { useLancamentoVigente } from "./useLancamentoVigente";

const formatadorReais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const formatarReais = (centavos: number) => formatadorReais.format(centavos / 100);

type CartaoPlanoProps = {
  plano: Plano;
};

export function CartaoPlano({ plano }: CartaoPlanoProps) {
  const lancamento = useLancamentoVigente();
  const tabela = formatarReais(plano.centavosPorMes);
  const promocional = formatarReais(plano.centavosLancamento);

  return (
    <Cartao>
      <Topo>
        <Nome>{plano.nome}</Nome>
        {lancamento ? <Selo>Preço de lançamento · assine até {rotuloFimDoLancamento}</Selo> : null}
      </Topo>
      <Preco>
        {lancamento ? (
          <>
            <Riscado>
              <SoLeitor>de </SoLeitor>
              <s>{tabela}</s>
              <SoLeitor> por </SoLeitor>
            </Riscado>
            <Valor>{promocional}</Valor>
          </>
        ) : (
          <Valor>{tabela}</Valor>
        )}
        <PorMes>/mês</PorMes>
      </Preco>
      {lancamento ? (
        <Regra>
          {promocional}/mês nos primeiros {plano.mesesDeLancamento} meses; depois, {tabela}/mês.
        </Regra>
      ) : null}
      <Garantias itens={garantiasPlano} rotulo={rotuloGarantiasPlano} />
      <Chamada>
        <Button href={urlAdesaoComPlano(plano.tipo)}>Assinar o plano mensal</Button>
      </Chamada>
    </Cartao>
  );
}
