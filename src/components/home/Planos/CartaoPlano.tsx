import { Button } from "@/components/ui/Button/Button";
import { Garantias } from "@/components/ui/Garantias/Garantias";
import { urlAdesaoComPlano } from "@/lib/config";
import { formatarDataIso, formatarReais } from "@/lib/planos/formatar";
import type { PlanoPago, TesteGratis } from "@/types/plano";
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
import { montarGarantiasPlano, rotuloGarantiasPlano } from "./Planos.data";

type CartaoPlanoProps = {
  plano: PlanoPago;
  teste: TesteGratis | null;
};

export function CartaoPlano({ plano, teste }: CartaoPlanoProps) {
  const tabela = formatarReais(plano.valorTabela);
  const atual = formatarReais(plano.valorAtual);
  const fim = plano.promocao?.fim ? formatarDataIso(plano.promocao.fim) : null;

  return (
    <Cartao>
      <Topo>
        <Nome>{plano.nome}</Nome>
        {plano.promocao ? (
          <Selo>{fim ? `Preço de lançamento · assine até ${fim}` : "Preço de lançamento"}</Selo>
        ) : null}
      </Topo>
      <Preco>
        {plano.promocao ? (
          <>
            <Riscado>
              <SoLeitor>de </SoLeitor>
              <s>{tabela}</s>
              <SoLeitor> por </SoLeitor>
            </Riscado>
            <Valor>{atual}</Valor>
          </>
        ) : (
          <Valor>{atual}</Valor>
        )}
        <PorMes>/mês</PorMes>
      </Preco>
      {plano.promocao && fim ? (
        <Regra>
          {atual}/mês até {fim}; depois, {tabela}/mês.
        </Regra>
      ) : null}
      <Garantias itens={montarGarantiasPlano(teste)} rotulo={rotuloGarantiasPlano} />
      <Chamada>
        <Button href={urlAdesaoComPlano(plano.tipo)}>Assinar o plano {plano.nome.toLowerCase()}</Button>
      </Chamada>
    </Cartao>
  );
}
