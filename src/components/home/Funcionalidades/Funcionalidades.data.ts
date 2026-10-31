import caixa from "@/assets/telas/caixa.webp";
import conveniadas from "@/assets/telas/conveniadas.webp";
import mensalistas from "@/assets/telas/mensalistas.webp";
import patio from "@/assets/telas/patio.webp";
import patioEntrada from "@/assets/telas/patio-entrada.webp";
import precos from "@/assets/telas/precos.webp";
import temaEscuro from "@/assets/telas/tema-escuro.webp";
import type { Funcionalidade } from "@/types/funcionalidade";

// Conteúdo conferido no código do GIPE (relatório de funcionalidades de 23/10/2026).
// Telas capturadas com dados fictícios; revisar a cada versão relevante do sistema.
export const funcionalidades: Funcionalidade[] = [
  {
    id: "patio",
    rotulo: "Pátio",
    resumo: "Entrada, saída e quem está no pátio agora.",
    titulo: "Quem entrou e quem saiu, sem caderno.",
    descricao:
      "O operador registra a entrada em segundos e vê o pátio inteiro numa tela. Na saída, o sistema calcula o valor e dá baixa no ticket.",
    itens: [
      "Entrada com placa, modelo, categoria e cor, com leitura da placa pela câmera.",
      "Ticket digital com QR Code, sem impressora.",
      "Página pública do ticket para o cliente acompanhar, sem login.",
      "Lista do pátio com busca e filtros por tipo de veículo.",
      "Saída por placa ou leitura do QR Code, só com os meios de pagamento da empresa.",
      "Recibo público da saída, com QR Code.",
    ],
    telas: [
      {
        imagem: patio,
        alt: "Tela do pátio com o total de vagas ocupadas, a busca por placa e um veículo na lista, com o tempo de permanência.",
      },
      {
        imagem: patioEntrada,
        alt: "Janela de registro de entrada com placa, modelo, categoria do veículo e cor.",
      },
    ],
  },
  {
    id: "caixa-precos",
    rotulo: "Caixa e preços",
    resumo: "Dinheiro na gaveta e tabelas de preço.",
    titulo: "O caixa fecha certo e o preço é o que você definiu.",
    descricao:
      "Abra o caixa, acompanhe o dinheiro da gaveta e feche com a diferença na mão. As tabelas de preço valem para cada categoria e horário.",
    itens: [
      "Dinheiro na gaveta em destaque, com fundo de caixa e valor recebido.",
      "Total por forma de pagamento no turno atual.",
      "Abertura, retirada (sangria), passagem de turno e fechamento do caixa.",
      "Resumo do fechamento com sobra, falta ou sem diferença, e comprovante em PDF.",
      "Histórico de caixas com extrato e exportação em CSV e PDF.",
      "Tabelas de preço por categoria e horário, com cadastro em 3 etapas.",
    ],
    telas: [
      {
        imagem: caixa,
        alt: "Tela do caixa aberto com o valor em caixa, o fundo de caixa, o dinheiro na gaveta e o total por forma de pagamento.",
      },
      {
        imagem: precos,
        alt: "Tela de gestão de preços com a lista de tabelas e a tarifa por tempo de permanência da tabela Padrão.",
      },
    ],
  },
  {
    id: "mensalistas",
    rotulo: "Mensalistas",
    resumo: "Cadastro, contrato e vencimentos.",
    titulo: "Mensalista cadastrado, contrato aceito, vencimento em dia.",
    descricao:
      "Cadastre quem paga por mês, envie o contrato por e-mail e acompanhe quem está em dia. O mensalista sai sem cobrança na saída.",
    itens: [
      "Cadastro com veículos e condutores.",
      "Tipos de mensalidade com valor, horário e dias de atendimento.",
      "Contrato com aceite pelo link enviado por e-mail, com reenvio.",
      "Registro do pagamento da mensalidade.",
      "Agenda de vencimentos e lista que se adapta ao celular.",
    ],
    telas: [
      {
        imagem: mensalistas,
        alt: "Lista de mensalistas com situação do contrato, placa do veículo, tipo e valor da mensalidade e dia de vencimento.",
      },
    ],
  },
  {
    id: "conveniadas",
    rotulo: "Empresas conveniadas",
    resumo: "Convênio com tabela própria.",
    titulo: "Convênio com empresas, com a tabela de preço certa.",
    descricao:
      "Cadastre as empresas que têm convênio com o seu pátio. O ticket carimbado aplica a tabela de convênio e aparece marcado como convênio.",
    itens: [
      "Lista de empresas com filtro por convênios ativos e encerrados.",
      "Cadastro da empresa e do responsável, com CNPJ e CPF validados.",
      "Endereço preenchido pelo CEP.",
      "Carimbo do ticket com a tabela de convênio aplicada.",
    ],
    telas: [
      {
        imagem: conveniadas,
        alt: "Lista de empresas conveniadas com CNPJ, contato, situação do convênio e data de início.",
      },
    ],
  },
  {
    id: "tema",
    rotulo: "Tema claro e escuro",
    resumo: "Um botão troca entre os dois.",
    titulo: "Tema claro de dia, tema escuro à noite.",
    descricao:
      "O sistema tem dois temas. Quem trabalha à noite ou em pátio com pouca luz troca com um botão, em qualquer tela.",
    itens: [
      "Tema claro e tema escuro em todas as telas.",
      "Troca por um botão no topo da tela.",
      "Instala como aplicativo no celular ou no computador.",
    ],
    telas: [
      {
        imagem: patio,
        alt: "Tela do pátio no tema claro.",
      },
      {
        imagem: temaEscuro,
        alt: "A mesma tela do pátio no tema escuro.",
      },
    ],
  },
];
