import type { TesteGratis } from "@/types/plano";
import { rotuloDuracaoMeses } from "./formatar";

// Textos que citam a duração do teste. Sem a duração (API indisponível), saem sem número.
export const tituloTeste = (teste: TesteGratis | null) =>
  teste ? `Teste grátis por ${rotuloDuracaoMeses(teste.duracaoMeses)}` : "Teste grátis";

export const botaoTeste = (teste: TesteGratis | null) =>
  teste ? `Testar grátis por ${rotuloDuracaoMeses(teste.duracaoMeses)}` : "Testar grátis";

export const garantiaTestePlano = (teste: TesteGratis | null) =>
  teste ? `${rotuloDuracaoMeses(teste.duracaoMeses)} grátis para testar` : "Teste grátis antes de assinar";

export const notaTestePlano = (teste: TesteGratis | null) =>
  teste
    ? `O plano começa com ${rotuloDuracaoMeses(teste.duracaoMeses)} grátis. Você só paga depois do teste.`
    : "O plano começa com um teste grátis. Você só paga depois do teste.";

export const fraseTesteContato = (teste: TesteGratis | null) =>
  teste
    ? `Use o sistema completo por ${rotuloDuracaoMeses(teste.duracaoMeses)}, sem cartão e sem compromisso.`
    : "Use o sistema completo no teste grátis, sem cartão e sem compromisso.";
