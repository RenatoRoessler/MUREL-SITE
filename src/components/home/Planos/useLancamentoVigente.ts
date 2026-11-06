"use client";

import { useSyncExternalStore } from "react";
import { lancamentoVigente } from "./Lancamento";

// A data não muda durante a visita, então não há o que assinar.
const semAssinatura = () => () => {};

const lerNoCliente = () => lancamentoVigente(Date.now());

// O HTML estático sai sempre com o lançamento; o relógio só é lido depois da hidratação.
const lerNoServidor = () => true;

export function useLancamentoVigente() {
  return useSyncExternalStore(semAssinatura, lerNoCliente, lerNoServidor);
}
