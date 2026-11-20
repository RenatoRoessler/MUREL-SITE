"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useSecaoEmVista } from "@/hooks/useSecaoEmVista";
import { urlAdesaoTeste } from "@/lib/config";
import { botaoTeste } from "@/lib/planos/textos";
import type { TesteGratis } from "@/types/plano";
import { AlturaDaBarra, Barra } from "./BarraComecar.styles";

const idsDoTopo = ["topo"];
// No Contato e no rodapé a barra já não ajuda (há formulário e botões) e cobriria o fim da página.
const idsDoFim = ["contato", "rodape"];
// A barra só some quando essas seções passam do quarto de baixo da tela, para não piscar na borda.
const margemDoFim = "0px 0px -25% 0px";

function assinarFoco(avisar: () => void) {
  document.addEventListener("focusin", avisar);
  document.addEventListener("focusout", avisar);
  return () => {
    document.removeEventListener("focusin", avisar);
    document.removeEventListener("focusout", avisar);
  };
}

// Com um campo de formulário em foco o teclado virtual abre: a barra sai da frente.
const lerCampoEmFoco = () => {
  const ativo = document.activeElement;
  return ativo instanceof HTMLInputElement || ativo instanceof HTMLTextAreaElement || ativo instanceof HTMLSelectElement;
};

const naoAssinar = () => () => {};

type BarraComecarProps = {
  teste: TesteGratis | null;
};

export function BarraComecar({ teste }: BarraComecarProps) {
  // Só depois de hidratar: o HTML do servidor sai com a barra escondida.
  const pronta = useSyncExternalStore(naoAssinar, () => true, () => false);
  const noTopo = useSecaoEmVista(idsDoTopo);
  const noFim = useSecaoEmVista(idsDoFim, margemDoFim);
  const campoEmFoco = useSyncExternalStore(assinarFoco, lerCampoEmFoco, () => false);
  const visivel = pronta && !noTopo && !noFim && !campoEmFoco;

  return (
    <>
      <AlturaDaBarra $ativa={visivel} />
      <Barra $visivel={visivel} aria-label="Atalho para o mês grátis">
        <Button href={urlAdesaoTeste}>{botaoTeste(teste)}</Button>
      </Barra>
    </>
  );
}
