import { formatarDataIso, formatarReais } from "@/lib/planos/formatar";
import type { OfertaPlanos, PlanoPago } from "@/types/plano";

export type Pergunta = {
  pergunta: string;
  resposta: string;
};

const contatoEquipe = "fale com a equipe pelo formulário de contato";

function respostaPreco(plano: PlanoPago | undefined): string {
  if (!plano) {
    return `Os valores não carregaram agora. Para saber o preço, ${contatoEquipe}.`;
  }
  const base = "Um plano único, com todas as funcionalidades e sem fidelidade:";
  const fechamento = `Os detalhes estão na seção Planos; em dúvida, ${contatoEquipe}.`;
  const atual = formatarReais(plano.valorAtual);
  if (!plano.promocao) {
    return `${base} ${atual} por mês. ${fechamento}`;
  }
  const tabela = formatarReais(plano.valorTabela);
  const fim = plano.promocao.fim ? formatarDataIso(plano.promocao.fim) : null;
  if (!fim) {
    return `${base} ${atual} por mês no lançamento (o preço de tabela é ${tabela} por mês). ${fechamento}`;
  }
  return `${base} ${atual} por mês no lançamento, até ${fim}. Depois dessa data, o valor passa a ser o de tabela, ${tabela} por mês. ${fechamento}`;
}

function perguntaFimDoLancamento(plano: PlanoPago | undefined): Pergunta[] {
  const fim = plano?.promocao?.fim ? formatarDataIso(plano.promocao.fim) : null;
  if (!plano || !fim) return [];
  return [
    {
      pergunta: "O que acontece quando o preço de lançamento acaba?",
      resposta: `O preço de lançamento vale até ${fim}. Depois dessa data, o valor passa a ser o de tabela, ${formatarReais(plano.valorTabela)} por mês. Se quiser entender como isso funciona no seu caso, ${contatoEquipe}.`,
    },
  ];
}

export function montarPerguntas(oferta: OfertaPlanos | null): Pergunta[] {
  const plano = oferta?.planos[0];
  return [
    {
      pergunta: "Que tipo de negócio a Murel atende?",
      resposta:
        "Estacionamentos, valets e lava-rápidos. Avulso, mensalista e conveniado funcionam no mesmo pátio.",
    },
    {
      pergunta: "Preciso comprar impressora?",
      resposta:
        "Não. O ticket é 100% digital: o cliente fotografa a tela do operador ou lê o QR Code. O operador só precisa do celular.",
    },
    {
      pergunta: "Que dados do cliente a Murel pede?",
      resposta: "Só os dados do carro: placa, modelo e cor. Não pedimos e-mail nem telefone do cliente.",
    },
    {
      pergunta: "Funciona no celular?",
      resposta:
        "Sim. As telas de entrada e saída foram pensadas para o celular do operador, no portão ou no balcão. As telas de gestão funcionam bem no computador.",
    },
    { pergunta: "Quanto custa?", resposta: respostaPreco(plano) },
    ...perguntaFimDoLancamento(plano),
    // Regras do teste grátis ainda sem confirmação do negócio: ver "Riscos" em docs/specs/teste-gratis/prd.md.
    {
      pergunta: "Preciso de cartão de crédito para começar?",
      resposta:
        "Não. O mês grátis não pede cartão nem nenhum dado de pagamento. Você só informa os dados da empresa para criar o acesso.",
    },
    {
      pergunta: "O mês grátis inclui todas as funcionalidades?",
      resposta:
        "Sim. Desde o primeiro dia você usa o sistema completo: entrada e saída, pátio, quadro de chaves, caixa, mensalistas, convênios e tudo o mais.",
    },
    {
      pergunta: "O que acontece depois do mês grátis?",
      resposta:
        "Nada é cobrado automaticamente. Ao fim dos 30 dias, você assina para continuar usando. Se não assinar, o acesso é pausado e os seus dados ficam guardados por 30 dias, caso queira voltar.",
    },
    {
      pergunta: "Meus cadastros continuam quando eu assinar?",
      resposta:
        "Sim. Tabelas de preço, mensalistas, convênios e histórico continuam lá. Você não precisa cadastrar nada de novo.",
    },
    {
      pergunta: "Posso cancelar quando quiser?",
      resposta:
        "Pode. No mês grátis não existe compromisso e, depois dele, você pode cancelar a qualquer momento.",
    },
    {
      pergunta: "Como eu começo?",
      resposta:
        "Comece pelo mês grátis, direto no botão “Começar grátis”. Se preferir conversar antes, mande uma mensagem pelo formulário de contato: a equipe da Murel responde e explica o passo a passo para o seu pátio.",
    },
  ];
}
