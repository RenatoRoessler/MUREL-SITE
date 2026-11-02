import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { CartaoPlano } from "./CartaoPlano";
import { areasDoSistema, calcularCondicoes, planos } from "./Planos.data";
import {
  Area,
  Areas,
  DescricaoArea,
  Duvida,
  Incluso,
  ItemPlano,
  ListaPlanos,
  NomeArea,
  TextoDuvida,
  TextoIncluso,
  TituloIncluso,
} from "./Planos.styles";

const [planoMensal] = planos;

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

export function Planos() {
  return (
    <Section
      id="planos"
      titulo="Escolha como quer pagar. O sistema é o mesmo."
      lede="Todas as funcionalidades estão em todos os planos. O que muda é o tempo de compromisso e o valor por mês."
    >
      <ListaPlanos>
        {planos.map((plano) => (
          <ItemPlano key={plano.tipo}>
            <CartaoPlano plano={plano} condicoes={calcularCondicoes(plano, planoMensal)} />
          </ItemPlano>
        ))}
      </ListaPlanos>

      <Incluso>
        <div>
          <TituloIncluso>Tudo isso em todos os planos</TituloIncluso>
          <TextoIncluso>
            Sem módulo extra e sem limite de funcionalidade por plano: quem assina o mensal usa o mesmo
            sistema de quem assina o anual.
          </TextoIncluso>
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
          <strong>Em dúvida sobre qual plano escolher?</strong>
          <span>Conte como é o seu pátio e a gente ajuda a escolher.</span>
        </TextoDuvida>
        <Button href="#contato" variante="ghost">
          Falar com a equipe
        </Button>
      </Duvida>
    </Section>
  );
}
