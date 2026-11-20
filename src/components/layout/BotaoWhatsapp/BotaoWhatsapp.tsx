"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useSecaoEmVista } from "@/hooks/useSecaoEmVista";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp/IconeWhatsapp";
import { rotuloWhatsapp, urlWhatsapp } from "@/lib/config";
import { Circulo, Flutuante, Rotulo } from "./BotaoWhatsapp.styles";

const idSecaoGatilho = "perguntas";
// No Contato a seção já tem a chamada do WhatsApp: o botão flutuante some.
const idSecaoContato = "contato";
// Depois da primeira aparição, o rótulo encolhe e fica só o ícone.
const ATRASO_PARA_COMPACTAR_MS = 6000;
const idsContato = [idSecaoContato];

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
  const depoisDoGatilho = useSyncExternalStore(loja.assinar, loja.lerVisibilidade, loja.lerVisibilidadeNoServidor);
  const noContato = useSecaoEmVista(idsContato);
  const visivel = depoisDoGatilho && !noContato;
  const [compacto, setCompacto] = useState(false);

  useEffect(() => {
    if (!visivel || compacto) return;
    const temporizador = setTimeout(() => setCompacto(true), ATRASO_PARA_COMPACTAR_MS);
    return () => clearTimeout(temporizador);
  }, [visivel, compacto]);

  return (
    <Flutuante
      $visivel={visivel}
      $compacto={compacto}
      href={urlWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${rotuloWhatsapp} Falar com a Murel pelo WhatsApp (abre em nova aba)`}
    >
      <Rotulo aria-hidden="true" $compacto={compacto}>
        {rotuloWhatsapp}
      </Rotulo>
      <Circulo $visivel={visivel}>
        <IconeWhatsapp />
      </Circulo>
    </Flutuante>
  );
}
