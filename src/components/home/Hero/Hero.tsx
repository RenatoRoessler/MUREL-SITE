import { Simbolo } from "@/components/brand/Simbolo";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Section/Section.styles";
import { urlAdesao } from "@/lib/config";
import { Chamadas, Marca, Subtitulo, Texto, Titulo, Topo } from "./Hero.styles";

export function Hero() {
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
            <Button href={urlAdesao}>Ir para adesão</Button>
            <Button href="#contato" variante="ghost">
              Falar com a equipe
            </Button>
          </Chamadas>
        </Texto>
        <Marca>
          <Simbolo animado />
        </Marca>
      </Topo>
    </Container>
  );
}
