import { Revelar } from "@/components/ui/Revelar/Revelar";
import type { PlanoPago, TesteGratis as TesteGratisDoPlano } from "@/types/plano";
import { TesteGratis } from "../TesteGratis/TesteGratis";
import { Bloco } from "./BlocoOferta.styles";
import { CartaoPlano } from "./CartaoPlano";
import { PlanoIndisponivel } from "./PlanoIndisponivel";

type BlocoOfertaProps = {
  plano: PlanoPago | null;
  teste: TesteGratisDoPlano | null;
};

// Teste grátis e plano em um bloco só. Sem plano (contingência), a faixa do mês grátis continua e o corpo
// avisa que os valores não carregaram.
export function BlocoOferta({ plano, teste }: BlocoOfertaProps) {
  return (
    <Revelar as={Bloco}>
      <TesteGratis teste={teste} />
      {plano ? <CartaoPlano plano={plano} teste={teste} /> : <PlanoIndisponivel />}
    </Revelar>
  );
}
