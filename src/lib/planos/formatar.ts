const formatadorReais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatarReais = (valor: number) => formatadorReais.format(valor);

const dataIso = /^(\d{4})-(\d{2})-(\d{2})/;

// A data chega sem fuso; lê-la como texto evita deslocar o dia.
export function formatarDataIso(iso: string): string | null {
  const partes = dataIso.exec(iso);
  return partes ? `${partes[3]}/${partes[2]}/${partes[1]}` : null;
}

export const rotuloDuracaoMeses = (meses: number) => `${meses} ${meses === 1 ? "mês" : "meses"}`;
