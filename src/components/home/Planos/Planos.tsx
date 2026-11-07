import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { notaTestePlano } from "@/lib/planos/textos";
import type { OfertaPlanos } from "@/types/plano";
import { TesteGratis } from "../TesteGratis/TesteGratis";
import { CartaoPlano } from "./CartaoPlano";
import { areasDoSistema } from "./Planos.data";
import { PlanoIndisponivel } from "./PlanoIndisponivel";
import {
  Area,
  Areas,
  DescricaoArea,
  Duvida,
  Incluso,
  NomeArea,
  NotaTeste,
  TextoDuvida,
  TextoIncluso,
  TituloIncluso,
} from "./Planos.styles";

function Marca() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PlanosProps = {
  oferta: OfertaPlanos | null;
};

export function Planos({ oferta }: PlanosProps) {
  const teste = oferta?.teste ?? null;

  return (
    <Section
      id="planos"
      titulo="Um plano, tudo incluso, sem fidelidade."
      lede="Sem módulo extra, sem limite de vagas e sem multa para cancelar."
    >
      <TesteGratis teste={teste} />

      {oferta ? (
        <>
          {oferta.planos.map((plano) => (
            <CartaoPlano key={plano.tipo} plano={plano} teste={teste} />
          ))}
          <NotaTeste>{notaTestePlano(teste)}</NotaTeste>
        </>
      ) : (
        <PlanoIndisponivel />
      )}

      <Incluso>
        <div>
          <TituloIncluso>Tudo isso incluso no plano</TituloIncluso>
          <TextoIncluso>Nenhuma destas áreas é cobrada à parte.</TextoIncluso>
        </div>
        <Areas>
          {areasDoSistema.map((area) => (
            <Area key={area.titulo}>
              <Marca />
              <div>
                <NomeArea>{area.titulo}</NomeArea>
                <DescricaoArea>{area.descricao}</DescricaoArea>
              </div>
            </Area>
          ))}
        </Areas>
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
