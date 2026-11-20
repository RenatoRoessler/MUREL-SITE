import { garantiaTestePlano } from "@/lib/planos/textos";
import type { AreaDoSistema, TesteGratis } from "@/types/plano";

export const montarGarantiasPlano = (teste: TesteGratis | null) =>
  ["Todas as funcionalidades", "Sem fidelidade", garantiaTestePlano(teste)] as const;

export const rotuloGarantiasPlano = "O que o plano inclui";

// Conteúdo conferido no código do GIPE (relatório de 23/10/2026 e histórico) e no sistema em uso (v1.0.486, 20/11/2026).
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
    descricao: "Convênio com tabela própria, carimbo do ticket pelo QR Code e pátio da conveniada com os carros que ela carimbou.",
  },
  {
    titulo: "Faturas das conveniadas",
    descricao: "Junta as saídas da conveniada em uma fatura com vencimento e registra o pagamento.",
  },
  {
    titulo: "Serviços do lava-rápido",
    descricao: "Catálogo com preço por categoria de veículo, serviços no ticket e fila do lavador por status.",
  },
  {
    titulo: "Regras da empresa",
    descricao: "Escolha o que a entrada exige (modelo, cor e prisma) e ligue ou desligue os serviços.",
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
    descricao: "Perfis de administrador, gerente, caixa, manobrista, financeiro e lavador, cada um com o seu menu.",
  },
  {
    titulo: "Acesso e empresa",
    descricao: "Login por CPF, tour no primeiro acesso, várias empresas na mesma conta e recuperação de senha por e-mail.",
  },
  {
    titulo: "Celular, tablet e computador",
    descricao: "Instalável como aplicativo, com tema claro e escuro.",
  },
];
