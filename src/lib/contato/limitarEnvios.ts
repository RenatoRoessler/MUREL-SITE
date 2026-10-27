import "server-only";

const JANELA_MS = 10 * 60 * 1000;
const MAXIMO_POR_JANELA = 5;

// Melhor esforço: cada instância do servidor tem o seu próprio mapa.
const envios = new Map<string, number[]>();

export function podeEnviar(ip: string, agora = Date.now()): boolean {
  const inicioJanela = agora - JANELA_MS;
  const recentes = (envios.get(ip) ?? []).filter((momento) => momento > inicioJanela);

  if (recentes.length >= MAXIMO_POR_JANELA) {
    envios.set(ip, recentes);
    return false;
  }

  envios.set(ip, [...recentes, agora]);
  limparExpirados(inicioJanela);
  return true;
}

function limparExpirados(inicioJanela: number) {
  for (const [ip, momentos] of envios) {
    if (momentos.every((momento) => momento <= inicioJanela)) envios.delete(ip);
  }
}

export function reiniciarLimite() {
  envios.clear();
}
