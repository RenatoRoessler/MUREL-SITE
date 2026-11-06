"use client";

import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
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
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const [ativo, setAtivo] = useState<IdPerfil>(inicial);

  const selecionar = (indice: number) => {
    const alvo = (indice + perfis.length) % perfis.length;
    setAtivo(perfis[alvo].id);
    abas.current[alvo]?.focus();
  };

  const aoTeclar = (evento: KeyboardEvent<HTMLButtonElement>, indice: number) => {
    const destinos: Record<string, number> = {
      ArrowRight: indice + 1,
      ArrowLeft: indice - 1,
      Home: 0,
      End: perfis.length - 1,
    };
    if (!(evento.key in destinos)) return;
    evento.preventDefault();
    selecionar(destinos[evento.key]);
  };

  return (
    <div>
      <Abas role="tablist" aria-label={rotulo}>
        {perfis.map((perfil, indice) => (
          <Aba
            key={perfil.id}
            ref={(el) => {
              abas.current[indice] = el;
            }}
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
