"use client";

import { type ReactNode, useId, useLayoutEffect, useRef, useState } from "react";
import { useNavegacaoPorSetas } from "@/hooks/useNavegacaoPorSetas";
import type { IdPerfil } from "@/types/sistema";
import { Aba, Abas, Painel, Pilula, Resumo } from "./SeletorPerfil.styles";

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
  // Para onde a troca andou na lista: o painel novo entra vindo desse lado. Vazio até a primeira troca.
  const [sentido, setSentido] = useState<"proximo" | "anterior" | null>(null);
  const [pilulaPronta, setPilulaPronta] = useState(false);
  const abasRef = useRef<HTMLDivElement>(null);

  const trocar = (id: IdPerfil) => {
    if (id === ativo) return;
    const indiceDe = (alvo: IdPerfil) => perfis.findIndex((perfil) => perfil.id === alvo);
    setSentido(indiceDe(id) > indiceDe(ativo) ? "proximo" : "anterior");
    setAtivo(id);
  };
  const { registrar, aoTeclar } = useNavegacaoPorSetas<HTMLButtonElement>(perfis.length, (indice) => trocar(perfis[indice].id));

  // A pílula amarela desliza até a aba ativa: mede a aba (posição e tamanho) e entrega ao CSS por variáveis.
  // Sem medida (sem JavaScript ou antes da primeira) vale o fundo da própria aba ativa.
  useLayoutEffect(() => {
    const abas = abasRef.current;
    if (!abas) return;

    const medir = () => {
      const aba = abas.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!aba || aba.offsetWidth === 0) return;
      abas.style.setProperty("--pilula-x", `${aba.offsetLeft}px`);
      abas.style.setProperty("--pilula-y", `${aba.offsetTop}px`);
      abas.style.setProperty("--pilula-w", `${aba.offsetWidth}px`);
      abas.style.setProperty("--pilula-h", `${aba.offsetHeight}px`);
      setPilulaPronta(true);
    };

    medir();
    if (typeof ResizeObserver === "undefined") return;
    const observador = new ResizeObserver(medir);
    observador.observe(abas);
    return () => observador.disconnect();
  }, [ativo]);

  return (
    <div>
      <Abas ref={abasRef} role="tablist" aria-label={rotulo} data-pilula={pilulaPronta ? "pronta" : undefined}>
        <Pilula aria-hidden="true" />
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
            onClick={() => trocar(perfil.id)}
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
          data-entrando={perfil.id === ativo ? (sentido ?? undefined) : undefined}
        >
          <Resumo>{perfil.resumo}</Resumo>
          {perfil.conteudo}
        </Painel>
      ))}
    </div>
  );
}
