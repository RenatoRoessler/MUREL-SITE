import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { TelaSistema } from "@/components/ui/TelaSistema/TelaSistema";
import { urlAdesao } from "@/lib/config";
import type { Funcionalidade as FuncionalidadeDados } from "@/types/funcionalidade";
import { Bloco, Chamada, Item, Itens, Telas, Texto } from "./Funcionalidade.styles";

type FuncionalidadeProps = {
  dados: FuncionalidadeDados;
  invertido?: boolean;
};

export function Funcionalidade({ dados, invertido = false }: FuncionalidadeProps) {
  return (
    <Section id={dados.id} titulo={dados.titulo} lede={dados.descricao}>
      <Bloco $invertido={invertido}>
        <Texto $invertido={invertido}>
          <Itens>
            {dados.itens.map((item) => (
              <Item key={item}>{item}</Item>
            ))}
          </Itens>
          <Chamada>
            <Button href={urlAdesao}>Ir para adesão</Button>
          </Chamada>
        </Texto>
        <Telas $invertido={invertido}>
          {dados.telas.map((tela) => (
            <TelaSistema key={tela.alt} imagem={tela.imagem} alt={tela.alt} />
          ))}
        </Telas>
      </Bloco>
    </Section>
  );
}
