import { cacheLife } from "next/cache";
import type { OfertaPlanos } from "@/types/plano";
import { mapearOferta } from "./mapearOferta";

const TIMEOUT_MS = 5000;

// Dado fresco por até 5 minutos. Com "expire" de 24 h a oferta entra no HTML pré-renderizado.
const vidaDaOferta = { stale: 300, revalidate: 300, expire: 86400 };

// Se a consulta falhar, a contingência é reavaliada em 1 minuto, não em 5.
const vidaDaFalha = { stale: 300, revalidate: 60, expire: 86400 };

function urlDosPlanos() {
  const base = process.env.MUREL_API_URL?.replace(/\/+$/, "");
  return base ? `${base}/Plano` : null;
}

async function buscarOferta(url: string): Promise<OfertaPlanos | null> {
  const resposta = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!resposta.ok) {
    throw new Error(`GET /Plano respondeu ${resposta.status}`);
  }
  return mapearOferta(await resposta.json());
}

// Consulta os planos no back-end (no servidor). Devolve null quando não há oferta utilizável:
// a home então mostra a contingência, sem preço.
export async function obterOferta(): Promise<OfertaPlanos | null> {
  "use cache";
  cacheLife(vidaDaOferta);

  const url = urlDosPlanos();
  if (!url) {
    console.error("MUREL_API_URL não está configurada: a seção de planos usa a contingência.");
    cacheLife(vidaDaFalha);
    return null;
  }

  try {
    const oferta = await buscarOferta(url);
    if (oferta) return oferta;
    console.error("GET /Plano não devolveu nenhum plano pago utilizável.");
  } catch (erro) {
    console.error("Falha ao consultar os planos:", erro instanceof Error ? erro.message : erro);
  }

  cacheLife(vidaDaFalha);
  return null;
}
