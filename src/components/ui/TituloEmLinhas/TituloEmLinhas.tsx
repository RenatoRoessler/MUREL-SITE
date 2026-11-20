"use client";

import { useRef } from "react";
import { useLinhasDoTitulo } from "@/hooks/useLinhasDoTitulo";
import { Titulo } from "../Section/Section.styles";
import { Linha, SoLeitor, TextoDaLinha } from "./TituloEmLinhas.styles";

type TituloEmLinhasProps = {
  id: string;
  texto: string;
};

// Título de seção que entra linha a linha, cada uma subindo de dentro de uma máscara. O HTML do servidor é o
// título como texto corrido; depois de carregar as fontes o navegador mede onde cada linha quebra e o título é
// refeito em linhas. O texto lido por leitor de tela continua um só.
export function TituloEmLinhas({ id, texto }: TituloEmLinhasProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const linhas = useLinhasDoTitulo(ref, texto);

  return (
    <Titulo id={id} ref={ref}>
      {linhas ? (
        <>
          <SoLeitor>{texto}</SoLeitor>
          <span aria-hidden="true">
            {linhas.map((linha, indice) => (
              <Linha key={linha}>
                <TextoDaLinha $indice={indice}>{linha}</TextoDaLinha>
              </Linha>
            ))}
          </span>
        </>
      ) : (
        texto
      )}
    </Titulo>
  );
}
