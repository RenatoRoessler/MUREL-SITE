import { Section } from "@/components/ui/Section/Section";
import {
  Descricao,
  Marcador,
  Passo,
  Passos,
  Reforco,
  TituloPasso,
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

export function ComoFunciona() {
  return (
    <Section
      id="como-funciona"
      titulo="Do carro que entra ao carro que sai"
      lede="O ticket é 100% digital. O cliente leva de duas formas, a que for mais fácil para ele."
    >
      <Passos>
        {passos.map((passo) => (
          <Passo key={passo.marcador}>
            <Marcador>Passo {passo.marcador}</Marcador>
            <TituloPasso>{passo.titulo}</TituloPasso>
            <Descricao>{passo.descricao}</Descricao>
          </Passo>
        ))}
      </Passos>
      <Reforco>Sem impressora. Sem e-mail e sem telefone do cliente.</Reforco>
    </Section>
  );
}
