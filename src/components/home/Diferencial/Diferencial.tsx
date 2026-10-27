import { Section } from "@/components/ui/Section/Section";
import {
  Descricao,
  Item,
  Lista,
  Numero,
  TituloItem,
} from "./Diferencial.styles";

const diferenciais = [
  {
    numero: "0",
    titulo: "Impressoras",
    descricao: "Sem bobina, sem manutenção, sem ticket molhado ou perdido. O operador só precisa do celular.",
  },
  {
    numero: "0",
    titulo: "Dados pessoais pedidos",
    descricao: "Nada de e-mail ou telefone. A entrada fica mais rápida e a Murel guarda menos dado pessoal.",
  },
  {
    numero: "2",
    titulo: "Formas de levar o ticket",
    descricao: "Foto da tela do operador ou leitura do QR Code, que abre o ticket público do cliente.",
  },
];

export function Diferencial() {
  return (
    <Section
      id="diferencial"
      titulo="Sem papel e sem cadastro do cliente."
      lede="Na entrada, o operador registra só os dados do carro: placa, modelo e cor. O ticket é digital e fica com o cliente."
    >
      <Lista>
        {diferenciais.map((item) => (
          <Item key={item.titulo}>
            <Numero aria-hidden="true">{item.numero}</Numero>
            <TituloItem>
              {item.numero} {item.titulo.toLowerCase()}
            </TituloItem>
            <Descricao>{item.descricao}</Descricao>
          </Item>
        ))}
      </Lista>
    </Section>
  );
}
