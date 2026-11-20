"use client";

import { useState, useSyncExternalStore } from "react";
import type { GrupoDeAreas } from "@/types/plano";
import { Area, DescricaoArea, NomeArea } from "./Planos.styles";
import { Acordeao, Contagem, Detalhe, Grade, Grupo, ListaAreas, Resumo, TituloGrupo } from "./GruposDoPlano.styles";

const CONSULTA_TELA_LARGA = "(min-width: 768px)";

function assinarTelaLarga(avisar: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const consulta = window.matchMedia(CONSULTA_TELA_LARGA);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
}

// Sem matchMedia (ou no servidor) tudo aparece aberto: nada fica escondido sem JavaScript.
const lerTelaLarga = () => typeof window.matchMedia !== "function" || window.matchMedia(CONSULTA_TELA_LARGA).matches;
const lerTelaLargaNoServidor = () => true;

function Marca() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Areas({ grupo }: { grupo: GrupoDeAreas }) {
  return (
    <ListaAreas>
      {grupo.areas.map((area) => (
        <Area key={area.titulo}>
          <Marca />
          <div>
            <NomeArea>{area.titulo}</NomeArea>
            <DescricaoArea>{area.descricao}</DescricaoArea>
          </div>
        </Area>
      ))}
    </ListaAreas>
  );
}

type GruposDoPlanoProps = {
  grupos: GrupoDeAreas[];
};

export function GruposDoPlano({ grupos }: GruposDoPlanoProps) {
  const larga = useSyncExternalStore(assinarTelaLarga, lerTelaLarga, lerTelaLargaNoServidor);
  const [abertos, setAbertos] = useState<ReadonlySet<string>>(() => new Set(grupos.slice(0, 1).map((grupo) => grupo.titulo)));

  const alternar = (titulo: string, aberto: boolean) => {
    setAbertos((atuais) => {
      const proximos = new Set(atuais);
      if (aberto) proximos.add(titulo);
      else proximos.delete(titulo);
      return proximos;
    });
  };

  if (larga) {
    return (
      <Grade>
        {grupos.map((grupo) => (
          <Grupo key={grupo.titulo}>
            <TituloGrupo>{grupo.titulo}</TituloGrupo>
            <Areas grupo={grupo} />
          </Grupo>
        ))}
      </Grade>
    );
  }

  // No celular, os grupos recolhem: o primeiro abre por padrão.
  return (
    <Acordeao>
      {grupos.map((grupo) => (
        <Detalhe
          key={grupo.titulo}
          open={abertos.has(grupo.titulo)}
          onToggle={(evento) => alternar(grupo.titulo, evento.currentTarget.open)}
        >
          <Resumo>
            <span>{grupo.titulo}</span>
            <Contagem>{grupo.areas.length === 1 ? "1 área" : `${grupo.areas.length} áreas`}</Contagem>
          </Resumo>
          <Areas grupo={grupo} />
        </Detalhe>
      ))}
    </Acordeao>
  );
}
