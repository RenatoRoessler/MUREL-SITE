import "server-only";
import type { CamposContato, TipoNegocio } from "@/types/contato";

const URL_PROVEDOR = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

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
  const chave = process.env.EMAIL_API_KEY;
  const remetente = process.env.EMAIL_REMETENTE;
  const destino = process.env.CONTATO_DESTINO;

  if (!chave || !remetente || !destino) {
    console.error("[contato] envio não configurado: faltam variáveis de ambiente");
    return { ok: false };
  }

  const email = linhaUnica(campos.email);

  try {
    const resposta = await fetch(URL_PROVEDOR, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${chave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remetente,
        to: [destino],
        subject: montarAssunto(campos),
        text: montarCorpo(campos),
        ...(email ? { reply_to: email } : {}),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!resposta.ok) {
      console.error(`[contato] provedor recusou o envio: status ${resposta.status}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (erro) {
    const motivo = erro instanceof Error ? erro.name : "desconhecido";
    console.error(`[contato] falha ao chamar o provedor: ${motivo}`);
    return { ok: false };
  }
}
