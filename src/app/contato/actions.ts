"use server";

import { headers } from "next/headers";
import { enviarEmail } from "@/lib/contato/enviarEmail";
import { podeEnviar } from "@/lib/contato/limitarEnvios";
import { validarContato } from "@/lib/contato/schema";
import type { CamposContato, EstadoContato } from "@/types/contato";

function texto(formData: FormData, nome: string) {
  const valor = formData.get(nome);
  return typeof valor === "string" ? valor : "";
}

function lerCampos(formData: FormData): CamposContato {
  return {
    nome: texto(formData, "nome"),
    patio: texto(formData, "patio"),
    tipo: texto(formData, "tipo") as CamposContato["tipo"],
    email: texto(formData, "email"),
    telefone: texto(formData, "telefone"),
    mensagem: texto(formData, "mensagem"),
  };
}

async function ipDoVisitante() {
  const cabecalhos = await headers();
  const encaminhado = cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim();
  return encaminhado || cabecalhos.get("x-real-ip") || "desconhecido";
}

export async function enviarContato(
  _estadoAnterior: EstadoContato,
  formData: FormData,
): Promise<EstadoContato> {
  const campos = lerCampos(formData);

  // Campo oculto que só robôs preenchem: finge sucesso e não envia nada.
  if (texto(formData, "site") !== "") return { status: "enviado" };

  if (!podeEnviar(await ipDoVisitante())) {
    return { status: "falha-envio", valores: campos };
  }

  const validacao = validarContato(campos);
  if (!validacao.sucesso) {
    return { status: "erro-validacao", erros: validacao.erros, valores: campos };
  }

  const envio = await enviarEmail(validacao.dados);
  return envio.ok ? { status: "enviado" } : { status: "falha-envio", valores: campos };
}
