import { Button } from "@/components/ui/Button/Button";
import { urlAdesaoComPlano } from "@/lib/config";
import type { Plano } from "@/types/plano";
import type { CondicoesPlano } from "./Planos.data";
import {
  Cartao,
  Chamada,
  Condicoes,
  Economia,
  Nome,
  PorMes,
  Preco,
  Selo,
  Topo,
  Total,
  Valor,
} from "./CartaoPlano.styles";

const formatadorReais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const formatarReais = (centavos: number) => formatadorReais.format(centavos / 100);

type CartaoPlanoProps = {
  plano: Plano;
  condicoes: CondicoesPlano;
};

export function CartaoPlano({ plano, condicoes }: CartaoPlanoProps) {
  const destaque = plano.recomendado === true;
  const textoTotal =
    plano.meses === 1
      ? "Cobrado todo mês"
      : `${formatarReais(condicoes.totalCentavos)} a cada ${plano.meses} meses`;

  return (
    <Cartao $destaque={destaque}>
      <Topo>
        <Nome>{plano.nome}</Nome>
        {destaque ? <Selo>Mais econômico</Selo> : null}
      </Topo>
      <Preco>
        <Valor>{formatarReais(plano.centavosPorMes)}</Valor>
        <PorMes>/mês</PorMes>
      </Preco>
      <Condicoes>
        <Total>{textoTotal}</Total>
        {condicoes.economiaCentavos > 0 ? (
          <Economia>
            Economia de {formatarReais(condicoes.economiaCentavos)} ({condicoes.economiaPercentual}%)
          </Economia>
        ) : null}
      </Condicoes>
      <Chamada>
        <Button
          href={urlAdesaoComPlano(plano.tipo)}
          variante={destaque ? "primary" : "ghost"}
          aria-label={`Aderir ao plano ${plano.nome.toLowerCase()}`}
        >
          Aderir ao plano
        </Button>
      </Chamada>
    </Cartao>
  );
}
