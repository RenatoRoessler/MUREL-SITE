import { Button } from "@/components/ui/Button/Button";
import { Garantias } from "@/components/ui/Garantias/Garantias";
import { urlAdesaoTeste } from "@/lib/config";
import { garantiasTeste, rotuloGarantiasTeste } from "./TesteGratis.data";
import { Descricao, Faixa, Rotulo, Texto, Titulo } from "./TesteGratis.styles";

export function TesteGratis() {
  return (
    <Faixa aria-labelledby="teste-gratis-titulo">
      <Texto>
        <Rotulo>Comece sem pagar nada</Rotulo>
        <Titulo id="teste-gratis-titulo">Teste grátis por 30 dias</Titulo>
        <Descricao>
          Use o sistema completo no seu pátio, sem cadastrar cartão. Nada é cobrado automaticamente: no
          fim do teste, você escolhe o plano que fizer mais sentido.
        </Descricao>
        <Garantias itens={garantiasTeste} rotulo={rotuloGarantiasTeste} />
      </Texto>
      <Button href={urlAdesaoTeste}>Começar meu teste grátis</Button>
    </Faixa>
  );
}
