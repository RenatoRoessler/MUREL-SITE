import { Section } from "@/components/ui/Section/Section";
import type { OfertaPlanos } from "@/types/plano";
import { agruparPerguntas, montarPerguntas } from "./Faq.data";
import { PerguntasFaq } from "./PerguntasFaq";

type FaqProps = {
  oferta: OfertaPlanos | null;
};

export function Faq({ oferta }: FaqProps) {
  return (
    <Section id="perguntas" revelar fundo="alternado" titulo="Perguntas frequentes">
      <PerguntasFaq grupos={agruparPerguntas(montarPerguntas(oferta))} />
    </Section>
  );
}
