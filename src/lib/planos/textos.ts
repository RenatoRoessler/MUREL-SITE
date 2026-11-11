import type { TesteGratis } from "@/types/plano";
import { rotuloDuracaoMeses } from "./formatar";

// Textos que citam a duração do mês grátis. Sem a duração (API indisponível), saem sem número.
export const tituloTeste = (teste: TesteGratis | null) =>
  teste ? `${rotuloDuracaoMeses(teste.duracaoMeses)} grátis, com o sistema completo` : "Mês grátis, com o sistema completo";

export const botaoTeste = (teste: TesteGratis | null) =>
  teste ? `Comece com ${rotuloDuracaoMeses(teste.duracaoMeses)} grátis` : "Comece grátis";

export const garantiaTestePlano = (teste: TesteGratis | null) => {
  if (!teste) return "Mês grátis antes de assinar";
  return teste.duracaoMeses === 1 ? "1º mês grátis" : `${rotuloDuracaoMeses(teste.duracaoMeses)} grátis`;
};

export const notaTestePlano = (teste: TesteGratis | null) =>
  teste
    ? `O plano começa com ${rotuloDuracaoMeses(teste.duracaoMeses)} grátis. Você só paga a partir do ${teste.duracaoMeses + 1}º mês.`
    : "O plano começa com um mês grátis. Você só paga depois dele.";

export const fraseTesteContato = (teste: TesteGratis | null) =>
  teste
    ? `Use o sistema completo por ${rotuloDuracaoMeses(teste.duracaoMeses)}, sem cartão e sem compromisso.`
    : "Use o sistema completo no mês grátis, sem cartão e sem compromisso.";
