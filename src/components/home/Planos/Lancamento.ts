// "Assine até 30/06/2027" vale o dia 30 inteiro, no horário de Brasília (UTC-3).
export const fimDoLancamento = new Date("2027-07-01T00:00:00-03:00");

export const rotuloFimDoLancamento = "30/06/2027";

export function lancamentoVigente(agora: number, fim: Date = fimDoLancamento): boolean {
  return agora < fim.getTime();
}
