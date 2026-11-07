import { Simbolo } from "@/components/brand/Simbolo";
import { Button } from "@/components/ui/Button/Button";
import { Garantias } from "@/components/ui/Garantias/Garantias";
import { Container } from "@/components/ui/Section/Section.styles";
import { urlAdesaoTeste } from "@/lib/config";
import { botaoTeste } from "@/lib/planos/textos";
import type { TesteGratis } from "@/types/plano";
import { garantiasTeste, rotuloGarantiasTeste } from "../TesteGratis/TesteGratis.data";
import { Chamadas, Marca, Subtitulo, Texto, Titulo, Topo } from "./Hero.styles";

type HeroProps = {
  teste: TesteGratis | null;
};

export function Hero({ teste }: HeroProps) {
  return (
    <Container>
      <Topo id="topo" aria-labelledby="hero-titulo">
        <Texto>
          <Titulo id="hero-titulo">
            Seu pátio <em>sob controle.</em>
          </Titulo>
          <Subtitulo>
            O sistema de quem cuida de carro: <strong>estacionamentos, valets e lava-rápidos</strong>.
            Avulso, mensalista e conveniado no mesmo pátio, sem impressora e sem pedir e-mail ou
            telefone do cliente. O ticket é 100% digital.
          </Subtitulo>
          <Chamadas>
            <Button href={urlAdesaoTeste}>{botaoTeste(teste)}</Button>
            <Button href="#contato" variante="ghost">
              Falar com a equipe
            </Button>
          </Chamadas>
          <Garantias itens={garantiasTeste} rotulo={rotuloGarantiasTeste} />
        </Texto>
        <Marca>
          <Simbolo animado />
        </Marca>
      </Topo>
    </Container>
  );
}
