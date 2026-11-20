"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import type { EventoVivo } from "@/types/sistema";
import { Aviso, Camada, Toque } from "./CamadaViva.styles";

type CamadaVivaProps = {
  eventos?: EventoVivo[];
};

// Eventos decorativos em ciclo sobre o print de uma tela. Sem eventos não renderiza nada. Só anda enquanto a
// camada está na tela (e a aba, ativa): painéis escondidos e telas fora da vista ficam parados.
export function CamadaViva({ eventos }: CamadaVivaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);
  const temEventos = Boolean(eventos?.length);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || typeof IntersectionObserver === "undefined") return;

    const observador = new IntersectionObserver(([entrada]) => setAtivo(entrada.isIntersecting), { threshold: 0.2 });
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [temEventos]);

  if (!eventos?.length) return null;

  return (
    <Camada ref={ref} aria-hidden="true" data-ativo={ativo}>
      {eventos.map((evento, indice) => {
        const posicao = { "--x": evento.x, "--y": evento.y, "--atraso": `${evento.atraso ?? 0}ms` } as CSSProperties;
        return evento.tipo === "toque" ? (
          <Toque key={indice} style={posicao} />
        ) : (
          <Aviso key={indice} style={posicao}>
            {evento.texto}
          </Aviso>
        );
      })}
    </Camada>
  );
}
