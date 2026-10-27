import "server-only";
import nodemailer from "nodemailer";
import type { CamposContato, TipoNegocio } from "@/types/contato";

const TIMEOUT_MS = 10_000;
const HOST_PADRAO = "smtp.zoho.com";
const PORTA_PADRAO = 465;

const ROTULO_TIPO: Record<TipoNegocio, string> = {
  estacionamento: "Estacionamento",
  valet: "Valet",
  "lava-rapido": "Lava-rápido",
  "mais-de-um": "Mais de um",
};

export type ResultadoEnvio = { ok: true } | { ok: false };

const linhaUnica = (valor: string) => valor.replace(/[\r\n]+/g, " ").trim();

function montarAssunto(campos: CamposContato) {
  const nome = linhaUnica(campos.nome);
  const patio = linhaUnica(campos.patio);
  return patio ? `Contato pelo site: ${nome} (${patio})` : `Contato pelo site: ${nome}`;
}

function montarCorpo(campos: CamposContato) {
  return [
    `Nome: ${linhaUnica(campos.nome)}`,
    `Pátio: ${linhaUnica(campos.patio) || "não informado"}`,
    `Tipo de negócio: ${campos.tipo ? ROTULO_TIPO[campos.tipo] : "não informado"}`,
    `E-mail: ${linhaUnica(campos.email) || "não informado"}`,
    `Telefone: ${linhaUnica(campos.telefone) || "não informado"}`,
    "",
    "Mensagem:",
    campos.mensagem,
  ].join("\n");
}

export async function enviarEmail(campos: CamposContato): Promise<ResultadoEnvio> {
  const usuario = process.env.SMTP_USER;
  const senha = process.env.SMTP_PASSWORD;
  const destino = process.env.CONTATO_DESTINO;

  if (!usuario || !senha || !destino) {
    console.error("[contato] envio não configurado: faltam variáveis de ambiente");
    return { ok: false };
  }

  const host = process.env.SMTP_HOST || HOST_PADRAO;
  const porta = Number(process.env.SMTP_PORT) || PORTA_PADRAO;
  const remetente = process.env.EMAIL_REMETENTE || usuario;
  const email = linhaUnica(campos.email);

  try {
    const transporte = nodemailer.createTransport({
      host,
      port: porta,
      secure: porta === 465,
      auth: { user: usuario, pass: senha },
      connectionTimeout: TIMEOUT_MS,
      greetingTimeout: TIMEOUT_MS,
      socketTimeout: TIMEOUT_MS,
    });

    await transporte.sendMail({
      from: remetente,
      to: destino,
      subject: montarAssunto(campos),
      text: montarCorpo(campos),
      ...(email ? { replyTo: email } : {}),
    });
    return { ok: true };
  } catch (erro) {
    const codigo =
      erro instanceof Error && "code" in erro ? String((erro as { code: unknown }).code) : "";
    const motivo = erro instanceof Error ? erro.name : "desconhecido";
    console.error(`[contato] falha ao enviar pelo SMTP: ${motivo} ${codigo}`.trim());
    return { ok: false };
  }
}
