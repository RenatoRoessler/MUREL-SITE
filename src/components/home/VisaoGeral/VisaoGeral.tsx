import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { urlAdesaoTeste } from "@/lib/config";
import type { Funcionalidade } from "@/types/funcionalidade";
import { Cartao, Chamada, Lista, Resumo, Rotulo } from "./VisaoGeral.styles";

type VisaoGeralProps = {
  areas: Pick<Funcionalidade, "id" | "rotulo" | "resumo">[];
};

export function VisaoGeral({ areas }: VisaoGeralProps) {
  return (
    <Section
      id="sistema"
      titulo="Tudo o que o pátio precisa, no mesmo sistema."
      lede="Veja cada área com telas reais do sistema. Toque numa delas para ir direto."
    >
      <Lista>
        {areas.map((area) => (
          <li key={area.id}>
            <Cartao href={`#${area.id}`}>
              <Rotulo>{area.rotulo}</Rotulo>
              <Resumo>{area.resumo}</Resumo>
            </Cartao>
          </li>
        ))}
      </Lista>
      <Chamada>
        <Button href={urlAdesaoTeste}>Testar grátis</Button>
      </Chamada>
    </Section>
  );
}
