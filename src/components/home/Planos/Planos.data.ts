import { TipoPlanoAdesao, type AreaDoSistema, type Plano } from "@/types/plano";

// Valores combinados com o negócio (docs/input.md), em centavos para o total e a economia saírem exatos.
export const planos: Plano[] = [
  { tipo: TipoPlanoAdesao.Mensal, nome: "Mensal", meses: 1, centavosPorMes: 14990 },
  { tipo: TipoPlanoAdesao.Trimestral, nome: "Trimestral", meses: 3, centavosPorMes: 13490 },
  { tipo: TipoPlanoAdesao.Semestral, nome: "Semestral", meses: 6, centavosPorMes: 11990 },
  { tipo: TipoPlanoAdesao.Anual, nome: "Anual", meses: 12, centavosPorMes: 7990, recomendado: true },
];

export type CondicoesPlano = {
  totalCentavos: number;
  economiaCentavos: number;
  economiaPercentual: number;
};

export function calcularCondicoes(plano: Plano, planoMensal: Plano): CondicoesPlano {
  const totalCentavos = plano.centavosPorMes * plano.meses;
  const totalSemDesconto = planoMensal.centavosPorMes * plano.meses;
  const economiaCentavos = totalSemDesconto - totalCentavos;

  return {
    totalCentavos,
    economiaCentavos,
    economiaPercentual: Math.round((economiaCentavos / totalSemDesconto) * 100),
  };
}

// Conteúdo conferido no código do GIPE (relatório de 23/10/2026 e histórico até a versão 1.0.333).
// Fica de fora o que o sistema ainda não tem: relatórios, tela de permissões por módulo e emissão de NFS-e.
export const areasDoSistema: AreaDoSistema[] = [
  {
    titulo: "Entrada e saída de veículos",
    descricao: "Placa lida pela câmera, ticket digital com QR Code, saída por placa ou QR e recibo público.",
  },
  {
    titulo: "Pátio",
    descricao: "Quem está no pátio agora, com busca e filtros, e a saída direto pela lista.",
  },
  {
    titulo: "Quadro de chaves",
    descricao: "Cada chave no seu gancho, com o gancho livre sugerido na entrada.",
  },
  {
    titulo: "Preços",
    descricao: "Tabelas por categoria, dia e horário, com simulador de cobrança.",
  },
  {
    titulo: "Caixa",
    descricao: "Abertura, sangria, passagem de turno e fechamento com a diferença apurada.",
  },
  {
    titulo: "Meios de pagamento",
    descricao: "A saída oferece só os meios que a sua empresa aceita.",
  },
  {
    titulo: "Mensalistas",
    descricao: "Cadastro, contrato por e-mail, registro de pagamento e agenda de vencimentos.",
  },
  {
    titulo: "Empresas conveniadas",
    descricao: "Convênio com tabela própria e carimbo do ticket pelo QR Code.",
  },
  {
    titulo: "Financeiro",
    descricao: "Receitas, despesas e fluxo de caixa do período.",
  },
  {
    titulo: "Notas fiscais",
    descricao: "Pedido de nota pelo recibo da saída e lista das notas lançadas.",
  },
  {
    titulo: "Equipe e permissões",
    descricao: "Perfis de administrador, gerente, caixa, manobrista e financeiro, cada um com o seu menu.",
  },
  {
    titulo: "Acesso e empresa",
    descricao: "Login por CPF, várias empresas na mesma conta e recuperação de senha por e-mail.",
  },
  {
    titulo: "Celular, tablet e computador",
    descricao: "Instalável como aplicativo, com tema claro e escuro.",
  },
];
