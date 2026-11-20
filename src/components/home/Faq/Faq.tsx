import { Revelar } from "@/components/ui/Revelar/Revelar";
import { Section } from "@/components/ui/Section/Section";
import type { OfertaPlanos } from "@/types/plano";
import { montarPerguntas } from "./Faq.data";
import { Item, Lista, Pergunta, Resposta } from "./Faq.styles";

type FaqProps = {
  oferta: OfertaPlanos | null;
};

export function Faq({ oferta }: FaqProps) {
  return (
    <Section id="perguntas" revelar titulo="Perguntas frequentes">
      <Revelar as={Lista} modo="filhos">
        {montarPerguntas(oferta).map((item) => (
          <Item key={item.pergunta}>
            <Pergunta>{item.pergunta}</Pergunta>
            <Resposta>{item.resposta}</Resposta>
          </Item>
        ))}
      </Revelar>
    </Section>
  );
}
