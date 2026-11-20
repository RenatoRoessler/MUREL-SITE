"use client";

import { type ReactNode, useId, useState } from "react";
import { useNavegacaoPorSetas } from "@/hooks/useNavegacaoPorSetas";
import type { IdPerfil } from "@/types/sistema";
import { Aba, Abas, Painel, Resumo } from "./SeletorPerfil.styles";

export type PainelPerfil = {
  id: IdPerfil;
  rotulo: string;
  resumo: string;
  conteudo: ReactNode;
};

type SeletorPerfilProps = {
  perfis: PainelPerfil[];
  inicial: IdPerfil;
  rotulo: string;
};

export function SeletorPerfil({ perfis, inicial, rotulo }: SeletorPerfilProps) {
  const base = useId();
  const [ativo, setAtivo] = useState<IdPerfil>(inicial);
  const { registrar, aoTeclar } = useNavegacaoPorSetas<HTMLButtonElement>(perfis.length, (indice) => setAtivo(perfis[indice].id));

  return (
    <div>
      <Abas role="tablist" aria-label={rotulo}>
        {perfis.map((perfil, indice) => (
          <Aba
            key={perfil.id}
            ref={registrar(indice)}
            type="button"
            role="tab"
            id={`${base}-aba-${perfil.id}`}
            aria-selected={perfil.id === ativo}
            aria-controls={`${base}-painel-${perfil.id}`}
            tabIndex={perfil.id === ativo ? 0 : -1}
            onClick={() => setAtivo(perfil.id)}
            onKeyDown={(evento) => aoTeclar(evento, indice)}
          >
            {perfil.rotulo}
          </Aba>
        ))}
      </Abas>
      {perfis.map((perfil) => (
        <Painel
          key={perfil.id}
          role="tabpanel"
          id={`${base}-painel-${perfil.id}`}
          aria-labelledby={`${base}-aba-${perfil.id}`}
          hidden={perfil.id !== ativo}
        >
          <Resumo>{perfil.resumo}</Resumo>
          {perfil.conteudo}
        </Painel>
      ))}
    </div>
  );
}
