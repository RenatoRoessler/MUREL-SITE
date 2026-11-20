import { Container } from "@/components/ui/Section/Section.styles";
import { garantiaTestePlano } from "@/lib/planos/textos";
import type { TesteGratis } from "@/types/plano";
import { Destaque, Faixa, Lista } from "./Destaques.styles";

type DestaquesProps = {
  teste: TesteGratis | null;
};

function Marca() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Prova rápida logo abaixo do Hero, só com frases que o site já usa.
export function Destaques({ teste }: DestaquesProps) {
  const itens = ["Sem impressora", "Ticket 100% digital", "Sem cadastro do cliente", garantiaTestePlano(teste)];

  return (
    <Faixa aria-label="Diferenciais da Murel">
      <Container>
        <Lista>
          {itens.map((item) => (
            <Destaque key={item}>
              <Marca />
              {item}
            </Destaque>
          ))}
        </Lista>
      </Container>
    </Faixa>
  );
}
