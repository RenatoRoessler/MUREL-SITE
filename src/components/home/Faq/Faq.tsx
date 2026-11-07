import { Section } from "@/components/ui/Section/Section";
import type { OfertaPlanos } from "@/types/plano";
import { montarPerguntas } from "./Faq.data";
import { Item, Lista, Pergunta, Resposta } from "./Faq.styles";

type FaqProps = {
  oferta: OfertaPlanos | null;
};

export function Faq({ oferta }: FaqProps) {
  return (
    <Section id="perguntas" titulo="Perguntas frequentes">
      <Lista>
        {montarPerguntas(oferta).map((item) => (
          <Item key={item.pergunta}>
            <Pergunta>{item.pergunta}</Pergunta>
            <Resposta>{item.resposta}</Resposta>
          </Item>
        ))}
      </Lista>
    </Section>
  );
}
