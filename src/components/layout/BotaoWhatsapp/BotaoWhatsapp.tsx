"use client";

import { useState, useSyncExternalStore } from "react";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp/IconeWhatsapp";
import { rotuloWhatsapp, urlWhatsapp } from "@/lib/config";
import { Circulo, Flutuante, Rotulo } from "./BotaoWhatsapp.styles";

const idSecaoGatilho = "perguntas";

function criarLojaDeVisibilidade() {
  let visivel = false;

  return {
    assinar(avisar: () => void) {
      const mudar = (proximo: boolean) => {
        if (proximo === visivel) return;
        visivel = proximo;
        avisar();
      };
      const secao = document.getElementById(idSecaoGatilho);

      // Sem a seção de referência o contato não pode sumir: mostra o botão.
      if (!secao) {
        mudar(true);
        return () => {};
      }

      // A seção na tela ou acima dela (top < 0) mantém o botão visível; ao voltar para cima, some.
      const observador = new IntersectionObserver(
        ([entrada]) => mudar(entrada.isIntersecting || entrada.boundingClientRect.top < 0),
        { rootMargin: "0px 0px -15% 0px" },
      );
      observador.observe(secao);

      return () => observador.disconnect();
    },
    lerVisibilidade: () => visivel,
    lerVisibilidadeNoServidor: () => false,
  };
}

export function BotaoWhatsapp() {
  const [loja] = useState(criarLojaDeVisibilidade);
  const visivel = useSyncExternalStore(loja.assinar, loja.lerVisibilidade, loja.lerVisibilidadeNoServidor);

  return (
    <Flutuante
      $visivel={visivel}
      href={urlWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${rotuloWhatsapp} Falar com a Murel pelo WhatsApp (abre em nova aba)`}
    >
      <Rotulo aria-hidden="true">{rotuloWhatsapp}</Rotulo>
      <Circulo>
        <IconeWhatsapp />
      </Circulo>
    </Flutuante>
  );
}
