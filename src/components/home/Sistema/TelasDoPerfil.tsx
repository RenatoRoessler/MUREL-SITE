"use client";

import { type ReactNode, useState } from "react";
import { useNavegacaoPorSetas } from "@/hooks/useNavegacaoPorSetas";
import { CarrosselTelas } from "./CarrosselTelas";
import { Conjunto, ItemDaLista, Lista, Numero } from "./TelasDoPerfil.styles";

export type TelaDaLista = {
  id: string;
  titulo: string;
  conteudo: ReactNode;
};

type TelasDoPerfilProps = {
  rotulo: string;
  telas: TelaDaLista[];
  estreito?: boolean;
};

// Todas as telas ficam no HTML. No desktop (com JavaScript) a lista à esquerda troca a tela grande da direita;
// no celular, e sem JavaScript, continua o carrossel com rolagem nativa.
export function TelasDoPerfil({ rotulo, telas, estreito = false }: TelasDoPerfilProps) {
  const [atual, setAtual] = useState(0);
  const { registrar, aoTeclar } = useNavegacaoPorSetas<HTMLButtonElement>(telas.length, setAtual, "vertical");

  return (
    <Conjunto>
      <Lista aria-label={`Lista de telas do perfil ${rotulo}`}>
        {telas.map((tela, indice) => (
          <ItemDaLista
            key={tela.id}
            ref={registrar(indice)}
            type="button"
            aria-current={indice === atual}
            onClick={() => setAtual(indice)}
            onKeyDown={(evento) => aoTeclar(evento, indice)}
          >
            <Numero aria-hidden="true">{String(indice + 1).padStart(2, "0")}</Numero>
            {tela.titulo}
          </ItemDaLista>
        ))}
      </Lista>
      <CarrosselTelas
        rotulo={`Telas do perfil ${rotulo}`}
        estreito={estreito}
        atual={atual}
        aoMudar={setAtual}
        slides={telas.map((tela) => ({ id: tela.id, titulo: tela.titulo, conteudo: tela.conteudo }))}
      />
    </Conjunto>
  );
}
