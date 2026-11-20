import { Simbolo } from "@/components/brand/Simbolo";
import patio from "@/assets/telas/operador/patio.webp";
import ticket from "@/assets/telas/operador/ticket.webp";
import { BotaoMagnetico } from "@/components/ui/Button/BotaoMagnetico";
import { Button } from "@/components/ui/Button/Button";
import { Garantias } from "@/components/ui/Garantias/Garantias";
import { TelaSistema } from "@/components/ui/TelaSistema/TelaSistema";
import { Container } from "@/components/ui/Section/Section.styles";
import { urlAdesaoTeste } from "@/lib/config";
import { botaoTeste } from "@/lib/planos/textos";
import type { TesteGratis } from "@/types/plano";
import { vidaDoPatio, vidaDoTicket } from "../Sistema/Sistema.vida";
import { garantiasTeste, rotuloGarantiasTeste } from "../TesteGratis/TesteGratis.data";
import { AparelhosInterativos } from "./AparelhosInterativos";
import { Apoio, Aparelho, Chamadas, Marca, Subtitulo, Texto, Titulo, Topo } from "./Hero.styles";

const tamanhosDoAparelho = "(min-width: 1024px) 240px, 170px";

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
            <BotaoMagnetico>
              <Button href={urlAdesaoTeste} brilho>{botaoTeste(teste)}</Button>
            </BotaoMagnetico>
            <Button href="#contato" variante="ghost">
              Falar com a equipe
            </Button>
          </Chamadas>
          <Garantias itens={garantiasTeste} rotulo={rotuloGarantiasTeste} />
        </Texto>
        <Marca>
          <AparelhosInterativos>
            <Aparelho $posicao="fundo">
              <TelaSistema
                imagem={patio}
                alt="Tela do pátio no celular, com as vagas ocupadas e a lista de veículos com o tempo de permanência."
                sizes={tamanhosDoAparelho}
                focavel={false}
                prioridade
                vida={vidaDoPatio}
              />
            </Aparelho>
            <Aparelho $posicao="frente">
              <TelaSistema
                imagem={ticket}
                alt="Ticket de um veículo no celular, com a permanência, o valor até agora e o serviço de lavagem na fila."
                sizes={tamanhosDoAparelho}
                focavel={false}
                vida={vidaDoTicket}
              />
            </Aparelho>
            <Apoio>
              <Simbolo animado />
            </Apoio>
          </AparelhosInterativos>
        </Marca>
      </Topo>
    </Container>
  );
}
