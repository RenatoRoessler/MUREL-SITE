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
      "Fale com a equipe pelo formulário de contato. A gente responde com a proposta para o seu pátio.",
  },
  {
    pergunta: "Como eu começo?",
    resposta:
      "Mande uma mensagem pelo formulário de contato. A equipe da Murel responde e explica o passo a passo para o seu pátio.",
  },
];
