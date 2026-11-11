import { Button } from "@/components/ui/Button/Button";
import { Garantias } from "@/components/ui/Garantias/Garantias";
import { urlAdesaoTeste } from "@/lib/config";
import { tituloTeste } from "@/lib/planos/textos";
import type { TesteGratis as TesteGratisDoPlano } from "@/types/plano";
import { garantiasTeste, rotuloGarantiasTeste } from "./TesteGratis.data";
import { Descricao, Faixa, Rotulo, Texto, Titulo } from "./TesteGratis.styles";

type TesteGratisProps = {
  teste: TesteGratisDoPlano | null;
};

export function TesteGratis({ teste }: TesteGratisProps) {
  return (
    <Faixa aria-labelledby="teste-gratis-titulo">
      <Texto>
        <Rotulo>Comece sem pagar nada</Rotulo>
        <Titulo id="teste-gratis-titulo">{tituloTeste(teste)}</Titulo>
        <Descricao>
          Use o sistema completo no seu pátio, sem cadastrar cartão. Nada é cobrado automaticamente:
          depois de 30 dias, você decide se quer continuar.
        </Descricao>
        <Garantias itens={garantiasTeste} rotulo={rotuloGarantiasTeste} />
      </Texto>
      <Button href={urlAdesaoTeste}>Começar meu mês grátis</Button>
    </Faixa>
  );
}
