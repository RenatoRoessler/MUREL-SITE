import { Revelar } from "@/components/ui/Revelar/Revelar";
import { Section } from "@/components/ui/Section/Section";
import {
  Bifurcacao,
  Carro,
  Conteudo,
  Descricao,
  Escolha,
  Etapa,
  Marcador,
  Opcoes,
  Passo,
  Pista,
  Reforco,
  TituloPasso,
  Trilho,
} from "./ComoFunciona.styles";

export const passos = [
  {
    marcador: "1",
    titulo: "Entrada",
    descricao: "O operador registra placa, modelo e cor do carro. A tela mostra os dados da entrada e um QR Code.",
  },
  {
    marcador: "2a",
    titulo: "Foto da tela",
    descricao: "O cliente fotografa a tela. A foto já é o ticket, com o QR Code para dar baixa na saída.",
  },
  {
    marcador: "2b",
    titulo: "Aponta a câmera",
    descricao: "O QR Code abre uma página pública do ticket. Não precisa de login nem de cadastro.",
  },
  {
    marcador: "3",
    titulo: "Acompanha",
    descricao: "Na página, o cliente vê o tempo de permanência, o valor até agora e quando o preço muda de faixa.",
  },
  {
    marcador: "4",
    titulo: "Saída",
    descricao: "O operador lê o QR Code, da foto ou da página, e dá baixa no ticket com o valor calculado.",
  },
];

type DadosDoPasso = (typeof passos)[number];

function CartaoDoPasso({ passo }: { passo: DadosDoPasso }) {
  return (
    <Passo>
      <Marcador>Passo {passo.marcador}</Marcador>
      <TituloPasso>{passo.titulo}</TituloPasso>
      <Descricao>{passo.descricao}</Descricao>
    </Passo>
  );
}

// Os passos com o mesmo número (2a e 2b) são alternativas: formam uma só etapa, com duas opções.
const etapas = passos.reduce<DadosDoPasso[][]>((grupos, passo) => {
  const numero = Number.parseInt(passo.marcador, 10);
  const anterior = grupos.at(-1);
  if (anterior && Number.parseInt(anterior[0].marcador, 10) === numero) anterior.push(passo);
  else grupos.push([passo]);
  return grupos;
}, []);

export function ComoFunciona() {
  return (
    <Section
      id="como-funciona"
      revelar
      titulo="Do carro que entra ao carro que sai"
      lede="O ticket é 100% digital. O cliente leva de duas formas, a que for mais fácil para ele."
    >
      <Pista>
        <Revelar as={Trilho} modo="filhos">
          {etapas.map((grupo) => (
            <Etapa key={grupo[0].marcador}>
              <Conteudo>
                {grupo.length === 1 ? (
                  <CartaoDoPasso passo={grupo[0]} />
                ) : (
                  <Bifurcacao>
                    <Escolha>Passo {Number.parseInt(grupo[0].marcador, 10)} · escolha uma</Escolha>
                    <Opcoes>
                      {grupo.map((passo) => (
                        <li key={passo.marcador}>
                          <CartaoDoPasso passo={passo} />
                        </li>
                      ))}
                    </Opcoes>
                  </Bifurcacao>
                )}
              </Conteudo>
            </Etapa>
          ))}
        </Revelar>
        <Carro aria-hidden="true">
          <svg viewBox="0 0 32 16" fill="none">
            <rect x="1" y="1" width="30" height="14" rx="6" fill="currentColor" />
            <rect x="17" y="3" width="8" height="10" rx="2" fill="#0E1729" />
            <circle cx="29" cy="4.5" r="1.4" fill="#FFF6CC" />
            <circle cx="29" cy="11.5" r="1.4" fill="#FFF6CC" />
          </svg>
        </Carro>
      </Pista>
      <Revelar as={Reforco}>Sem impressora. Sem e-mail e sem telefone do cliente.</Revelar>
    </Section>
  );
}
