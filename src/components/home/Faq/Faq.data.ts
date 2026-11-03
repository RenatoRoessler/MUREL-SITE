export type Pergunta = {
  pergunta: string;
  resposta: string;
};

export const perguntas: Pergunta[] = [
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
    resposta:
      "Só os dados do carro: placa, modelo e cor. Não pedimos e-mail nem telefone do cliente.",
  },
  {
    pergunta: "Funciona no celular?",
    resposta:
      "Sim. As telas de entrada e saída foram pensadas para o celular do operador, no portão ou no balcão. As telas de gestão funcionam bem no computador.",
  },
  {
    pergunta: "Quanto custa?",
    resposta:
      "Os valores estão na seção Planos: mensal, trimestral, semestral e anual, todos com as mesmas funcionalidades. Em dúvida sobre qual escolher, fale com a equipe pelo formulário de contato.",
  },
  // Regras do teste grátis ainda sem confirmação do negócio: ver "Riscos" em docs/specs/teste-gratis/prd.md.
  {
    pergunta: "Preciso cadastrar cartão de crédito para testar?",
    resposta:
      "Não. O teste grátis não pede cartão nem nenhum dado de pagamento. Você só informa os dados da empresa para criar o acesso.",
  },
  {
    pergunta: "O teste tem todas as funcionalidades?",
    resposta:
      "Sim. Durante os 30 dias você usa o sistema completo: entrada e saída, pátio, quadro de chaves, caixa, mensalistas, convênios e tudo o mais.",
  },
  {
    pergunta: "O que acontece depois dos 30 dias?",
    resposta:
      "Nada é cobrado automaticamente. No fim do teste, você escolhe um plano para continuar usando. Se não escolher, o acesso é pausado e os seus dados ficam guardados por 30 dias, caso queira voltar.",
  },
  {
    pergunta: "O que eu cadastrar no teste continua valendo se eu assinar?",
    resposta:
      "Sim. Tabelas de preço, mensalistas, convênios e histórico continuam lá. Você não precisa cadastrar nada de novo.",
  },
  {
    pergunta: "Posso cancelar quando quiser?",
    resposta:
      "Pode. Durante o teste não existe compromisso, e depois dele você pode cancelar a qualquer momento.",
  },
  {
    pergunta: "Como eu começo?",
    resposta:
      "Comece pelo teste grátis de 30 dias, direto no botão “Testar grátis”. Se preferir conversar antes, mande uma mensagem pelo formulário de contato: a equipe da Murel responde e explica o passo a passo para o seu pátio.",
  },
];
