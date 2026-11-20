import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { notaTestePlano } from "@/lib/planos/textos";
import type { OfertaPlanos } from "@/types/plano";
import { BlocoOferta } from "./BlocoOferta";
import { GruposDoPlano } from "./GruposDoPlano";
import { gruposDeAreas } from "./Planos.data";
import { Duvida, Incluso, NotaTeste, TextoDuvida, TextoIncluso, TituloIncluso } from "./Planos.styles";

type PlanosProps = {
  oferta: OfertaPlanos | null;
};

export function Planos({ oferta }: PlanosProps) {
  const teste = oferta?.teste ?? null;

  return (
    <Section
      id="planos"
      revelar
      titulo="Um plano, tudo incluso, sem fidelidade."
      lede="Sem módulo extra, sem limite de vagas e sem multa para cancelar."
    >
      <BlocoOferta plano={oferta?.planos[0] ?? null} teste={teste} />
      {oferta ? <NotaTeste>{notaTestePlano(teste)}</NotaTeste> : null}

      <Incluso>
        <div>
          <TituloIncluso>Tudo isso incluso no plano</TituloIncluso>
          <TextoIncluso>Nenhuma destas áreas é cobrada à parte.</TextoIncluso>
        </div>
        <GruposDoPlano grupos={gruposDeAreas} />
      </Incluso>

      <Duvida>
        <TextoDuvida>
          <strong>Ficou com dúvida?</strong>
          <span>Conte como é o seu pátio e a gente responde.</span>
        </TextoDuvida>
        <Button href="#contato" variante="ghost">
          Falar com a equipe
        </Button>
      </Duvida>
    </Section>
  );
}
