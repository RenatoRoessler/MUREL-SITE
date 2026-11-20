"use client";

import { type ReactNode, useId, useState } from "react";
import { useNavegacaoPorSetas } from "@/hooks/useNavegacaoPorSetas";
import { Aba, ListaDeAbas, Painel } from "./AbasContato.styles";

export type AbaDoContato = {
  id: string;
  rotulo: string;
  conteudo: ReactNode;
};

type AbasContatoProps = {
  abas: AbaDoContato[];
  rotulo: string;
};

// Os painéis ficam todos no HTML (o formulário não perde o que foi digitado ao trocar de aba); só o ativo aparece.
export function AbasContato({ abas, rotulo }: AbasContatoProps) {
  const base = useId();
  const [ativa, setAtiva] = useState(0);
  const { registrar, aoTeclar } = useNavegacaoPorSetas<HTMLButtonElement>(abas.length, setAtiva);

  return (
    <div>
      <ListaDeAbas role="tablist" aria-label={rotulo}>
        {abas.map((aba, indice) => (
          <Aba
            key={aba.id}
            ref={registrar(indice)}
            type="button"
            role="tab"
            id={`${base}-aba-${aba.id}`}
            aria-selected={indice === ativa}
            aria-controls={`${base}-painel-${aba.id}`}
            tabIndex={indice === ativa ? 0 : -1}
            onClick={() => setAtiva(indice)}
            onKeyDown={(evento) => aoTeclar(evento, indice)}
          >
            {aba.rotulo}
          </Aba>
        ))}
      </ListaDeAbas>
      {abas.map((aba, indice) => (
        <Painel
          key={aba.id}
          role="tabpanel"
          id={`${base}-painel-${aba.id}`}
          aria-labelledby={`${base}-aba-${aba.id}`}
          data-ativo={indice === ativa}
        >
          {aba.conteudo}
        </Painel>
      ))}
    </div>
  );
}
