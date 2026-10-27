import { Section } from "@/components/ui/Section/Section";
import { perguntas } from "./Faq.data";
import { Item, Lista, Pergunta, Resposta } from "./Faq.styles";

export function Faq() {
  return (
    <Section id="perguntas" titulo="Perguntas frequentes">
      <Lista>
        {perguntas.map((item) => (
          <Item key={item.pergunta}>
            <Pergunta>{item.pergunta}</Pergunta>
            <Resposta>{item.resposta}</Resposta>
          </Item>
        ))}
      </Lista>
    </Section>
  );
}
