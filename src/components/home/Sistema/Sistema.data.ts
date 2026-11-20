import comprovanteEntrada from "@/assets/telas/cliente/comprovante-entrada.webp";
import patioConveniada from "@/assets/telas/conveniado/patio.webp";
import ticketCarimbado from "@/assets/telas/conveniado/ticket-carimbado.webp";
import caixa from "@/assets/telas/gestor/caixa.webp";
import catalogoServicos from "@/assets/telas/gestor/catalogo-servicos.webp";
import conferencia from "@/assets/telas/gestor/conferencia.webp";
import configuracoes from "@/assets/telas/gestor/configuracoes.webp";
import conveniadas from "@/assets/telas/gestor/conveniadas.webp";
import dashboard from "@/assets/telas/gestor/dashboard.webp";
import faturas from "@/assets/telas/gestor/faturas.webp";
import financeiro from "@/assets/telas/gestor/financeiro.webp";
import mensalistas from "@/assets/telas/gestor/mensalistas.webp";
import patioGestor from "@/assets/telas/gestor/patio.webp";
import precos from "@/assets/telas/gestor/precos.webp";
import quadrosChaves from "@/assets/telas/gestor/quadros-chaves.webp";
import filaNaFila from "@/assets/telas/lavador/fila-na-fila.webp";
import filaPronto from "@/assets/telas/lavador/fila-pronto.webp";
import confirmarSaida from "@/assets/telas/operador/confirmar-saida.webp";
import entradaPreenchida from "@/assets/telas/operador/entrada-preenchida.webp";
import entradaRegistrada from "@/assets/telas/operador/entrada-registrada.webp";
import localizarVeiculo from "@/assets/telas/operador/localizar-veiculo.webp";
import patioOperador from "@/assets/telas/operador/patio.webp";
import saidaRegistrada from "@/assets/telas/operador/saida-registrada.webp";
import ticket from "@/assets/telas/operador/ticket.webp";
import type { IdPerfil, PerfilSistema } from "@/types/sistema";

// Telas capturadas em 06/11/2026 (sistema v1.0.356), com dados fictícios.
// Cada explicação descreve só o que aparece na tela; revisar a cada versão relevante do sistema.
export const perfilInicial: IdPerfil = "operador";

export const perfis: PerfilSistema[] = [
  {
    id: "cliente",
    rotulo: "Cliente",
    resumo: "O que quem estaciona vê no celular, sem baixar app e sem cadastro.",
    telas: [
      {
        id: "comprovante-entrada",
        imagem: comprovanteEntrada,
        alt: "Comprovante de entrada no celular, com o nome do estacionamento, o tempo de permanência, o valor até agora, a placa, o veículo e os botões Baixar PDF, Como chegar e Ligar.",
        titulo: "Comprovante de entrada",
        explicacao:
          "O cliente abre o comprovante pelo QR Code ou pelo link, sem login. Vê há quanto tempo o carro está no pátio e quanto deve até agora. Na mesma tela estão os botões Baixar PDF, Como chegar e Ligar. Mais abaixo está o QR Code que ele apresenta ao operador na saída.",
      },
    ],
  },
  {
    id: "operador",
    rotulo: "Operador",
    resumo: "O que a equipe do pátio usa na entrada e na saída, pelo celular.",
    telas: [
      {
        id: "patio",
        imagem: patioOperador,
        alt: "Tela do pátio no celular, com as vagas ocupadas, a quantidade por tipo, o campo de busca e a lista de veículos com a placa e o tempo de permanência.",
        titulo: "Pátio",
        explicacao:
          "A tela inicial mostra quantas vagas estão ocupadas e quantas estão livres. O operador busca por placa, modelo ou ticket e vê cada veículo com o tempo de permanência. A barra de baixo leva para Entrada, Saída e Caixa.",
      },
      {
        id: "entrada-preenchida",
        imagem: entradaPreenchida,
        alt: "Janela Registrar entrada com a placa, o modelo, a categoria do veículo e a cor escolhidos.",
        titulo: "Registrar entrada",
        explicacao:
          "O operador digita a placa ou lê pela câmera. Se a placa é nova, informa o modelo, a categoria, que define a tarifa, e a cor. Depois toca em Registrar entrada.",
      },
      {
        id: "entrada-registrada",
        imagem: entradaRegistrada,
        alt: "Comprovante de entrada registrada, com o nome do estacionamento, a placa, o número do ticket, o veículo, a categoria e um QR Code.",
        titulo: "Comprovante da entrada",
        explicacao:
          "Ao registrar, o sistema gera o comprovante com QR Code. O cliente escaneia ou fotografa a tela e acompanha tempo e valor pelo link. Dá para imprimir, mas não é preciso.",
      },
      {
        id: "ticket",
        imagem: ticket,
        alt: "Ticket de entrada de um veículo, com a placa, a permanência, o valor até agora separado em estadia e serviços, a tabela de preço, a lista de serviços adicionais e os botões Comprovante cliente e Registrar saída.",
        titulo: "Ticket do veículo",
        explicacao:
          "Cada veículo no pátio tem um ticket com a permanência e o valor até agora, com a estadia e os serviços somados à parte, e a tabela de preço aplicada. No lava-rápido, o operador acrescenta serviços ao veículo e vê se estão na fila ou prontos. Dali ele abre o comprovante do cliente ou registra a saída.",
      },
      {
        id: "localizar-veiculo",
        imagem: localizarVeiculo,
        alt: "Janela Localizar veículo, com a leitura de QR Code pela câmera e a escolha de buscar por Placa, Token ou Sequencial, com o campo da placa.",
        titulo: "Localizar o veículo na saída",
        explicacao:
          "Na saída, o operador lê o QR Code do cliente com a câmera. Sem QR Code, escolhe buscar pela placa, pelo token do cupom ou pelo número sequencial e digita o dado do veículo.",
      },
      {
        id: "confirmar-saida",
        imagem: confirmarSaida,
        alt: "Janela Confirmar saída, com a placa, a entrada, a permanência, o valor a cobrar, as formas de pagamento, os atalhos de valor recebido e o troco a devolver.",
        titulo: "Confirmar a saída",
        explicacao:
          "O sistema calcula o valor pela tabela de preço. O operador escolhe a forma de pagamento e, no dinheiro, toca no valor que o cliente entregou (exato, notas redondas ou outro) e vê o troco antes de confirmar. Só aparecem os meios de pagamento que a empresa aceita. Quando não há nada a cobrar, a saída se confirma sem pedir pagamento.",
      },
      {
        id: "saida-registrada",
        imagem: saidaRegistrada,
        alt: "Recibo de pagamento da saída, com a placa, o veículo, a entrada, a saída, a permanência, a forma de pagamento, o valor pago e um QR Code.",
        titulo: "Recibo da saída",
        explicacao:
          "Confirmada a saída, o recibo mostra entrada, saída, permanência, tabela, pagamento, valor recebido, troco e total pago. O cliente leva o recibo no celular pelo QR Code.",
      },
    ],
  },
  {
    id: "lavador",
    rotulo: "Lavador",
    resumo: "O que quem lava o carro vê no celular: a fila de serviços do lava-rápido, sem papel.",
    telas: [
      {
        id: "fila-na-fila",
        imagem: filaNaFila,
        alt: "Fila de serviços no celular, com os contadores no topo, a busca por placa ou prisma, as abas Na fila, Em andamento e Pronto e os cartões dos veículos com o serviço pedido e o botão Iniciar.",
        titulo: "Fila de serviços",
        explicacao:
          "O lavador abre direto na fila do lava-rápido. No topo vê quantos serviços estão na fila, em andamento e prontos, e quais passaram da previsão. Cada cartão mostra a placa, o modelo, a cor, a categoria, o serviço pedido, a hora em que o carro entrou e o tempo estimado. Ao começar, ele toca em Iniciar.",
      },
      {
        id: "fila-pronto",
        imagem: filaPronto,
        alt: "Aba Pronto da fila de serviços, com o cartão de um veículo, o serviço concluído, o horário em que ficou pronto, há quanto tempo aguarda retirada e o botão Voltar para em andamento.",
        titulo: "Serviço pronto",
        explicacao:
          "Quando o serviço termina, o cartão vai para a aba Pronto com o horário e há quanto tempo o carro espera a retirada. O lavador acha o veículo pela placa ou pelo prisma, e se marcou pronto por engano, toca em Voltar para em andamento.",
      },
    ],
  },
  {
    id: "conveniado",
    rotulo: "Conveniado",
    resumo: "O que a equipe de uma empresa conveniada usa no celular para carimbar o ticket e acompanhar os carros.",
    telas: [
      {
        id: "ticket-carimbado",
        imagem: ticketCarimbado,
        alt: "Tela Ticket carimbado no celular, com o selo Convênio, a placa, o modelo e a cor do carro, o estacionamento, a categoria, a entrada, a tabela aplicada e a hora do carimbo.",
        titulo: "Carimbar o ticket",
        explicacao:
          "A empresa conveniada aponta a câmera para o QR Code do ticket do cliente, ou digita o código do ticket. O sistema confirma o carimbo e mostra a placa, o estacionamento, a categoria, a entrada, a tabela de convênio aplicada e a hora em que foi carimbado.",
      },
      {
        id: "patio-conveniada",
        imagem: patioConveniada,
        alt: "Tela Pátio da empresa conveniada no celular, com o total de veículos carimbados, o campo de busca por placa e o cartão de um veículo com permanência, estacionamento, entrada, carimbo e tabela.",
        titulo: "Pátio da conveniada",
        explicacao:
          "Lista os veículos que a empresa carimbou e que ainda estão no estacionamento, com a permanência até agora, a data da entrada, quem carimbou e a tabela de convênio. A empresa busca pela placa e atualiza a lista quando quiser, sem ligar para o estacionamento.",
      },
    ],
  },
  {
    id: "gestor",
    rotulo: "Gestor",
    resumo: "O que quem administra o pátio acompanha no computador.",
    telas: [
      {
        id: "dashboard",
        imagem: dashboard,
        alt: "Visão Geral no computador, com o faturamento do dia, o mês até agora e a projeção, o pátio agora, as saídas, o ticket médio, a permanência média e a lista do que precisa de atenção.",
        titulo: "Visão Geral",
        explicacao:
          "O resumo do dia em uma tela: faturamento, o que já entrou no mês e a projeção até o fim dele, as vagas ocupadas, as saídas, o ticket médio e a permanência média. Um gráfico mostra o faturamento dos últimos 30 dias por origem, e a lista \"Precisa da sua atenção\" avisa de mensalistas inadimplentes, veículos há mais de três dias e faturas abertas. Dá para ver por dia, semana ou mês.",
      },
      {
        id: "patio",
        imagem: patioGestor,
        alt: "Tela do pátio no computador, com as vagas ocupadas, a busca por placa, os filtros por categoria e a lista de veículos com o tempo de permanência.",
        titulo: "Pátio",
        explicacao:
          "Todos os veículos que estão no pátio, com busca por placa, modelo ou ticket e filtros por tipo e categoria. Mostra a ocupação por tipo de vaga e o tempo de cada veículo.",
      },
      {
        id: "caixa",
        imagem: caixa,
        alt: "Tela do caixa aberto, com o valor em caixa, o fundo de caixa, o dinheiro na gaveta e o total por forma de pagamento.",
        titulo: "Caixa",
        explicacao:
          "O caixa aberto com o valor em caixa, o fundo de caixa e o dinheiro na gaveta. Mostra o total recebido por forma de pagamento no turno, com a quantidade de tickets de cada uma. O histórico e os movimentos ficam a um toque.",
      },
      {
        id: "precos",
        imagem: precos,
        alt: "Tela de gestão de preços, com as tabelas de preço, a tarifa por tempo de permanência da tabela selecionada e o simulador de cobrança.",
        titulo: "Gestão de preços",
        explicacao:
          "As tabelas de preço do pátio, cada uma marcada como padrão ou convênio, com a tarifa por tempo de permanência, a diária, a tolerância e as categorias que atende. O simulador mostra quanto seria cobrado de uma categoria e de uma permanência antes de usar a tabela.",
      },
      {
        id: "catalogo-servicos",
        imagem: catalogoServicos,
        alt: "Catálogo de serviços do lava-rápido, com os cartões de cada serviço, a duração, o tempo grátis no pátio e a faixa de preço por categoria de veículo.",
        titulo: "Catálogo de serviços",
        explicacao:
          "Os serviços do lava-rápido, cada um com descrição, duração estimada, tempo de pátio sem cobrança e preço por categoria de veículo. O gestor cadastra um serviço novo, busca pelo nome e vê quantos estão ativos.",
      },
      {
        id: "mensalistas",
        imagem: mensalistas,
        alt: "Agenda de mensalistas com os nomes, a situação do contrato, a placa do veículo, o valor da mensalidade e o botão Reenviar.",
        titulo: "Mensalistas",
        explicacao:
          "A agenda mostra quem vence e quem ainda não pagou. Cada mensalista tem a situação do contrato, a placa e o valor da mensalidade, com opção de reenviar o contrato. Há também a lista completa e os tipos de mensalidade.",
      },
      {
        id: "conveniadas",
        imagem: conveniadas,
        alt: "Lista de empresas conveniadas com o CNPJ, o contato, a situação do convênio e a data de início.",
        titulo: "Empresas conveniadas",
        explicacao:
          "As empresas que têm convênio com o pátio, com CNPJ, contato, situação e data de início. O filtro separa os convênios ativos dos encerrados.",
      },
      {
        id: "faturas",
        imagem: faturas,
        alt: "Lista de faturas das empresas conveniadas, com o número, a empresa, a data de emissão, o vencimento, a quantidade de saídas, o valor e a situação Paga ou Aberta.",
        titulo: "Faturas das conveniadas",
        explicacao:
          "O estacionamento junta as saídas da empresa conveniada em uma fatura com vencimento e acompanha a situação: aberta, paga ou cancelada. Filtra por conveniada e emite uma fatura nova pelo botão no alto.",
      },
      {
        id: "financeiro",
        imagem: financeiro,
        alt: "Tela do financeiro com o fluxo de caixa, o saldo do período, as entradas, as saídas e o gráfico de evolução do saldo.",
        titulo: "Financeiro",
        explicacao:
          "O fluxo de caixa do período: saldo, entradas, saídas e a evolução do saldo dia a dia. Dá para trocar o período, ver os lançamentos e as categorias e fazer um novo lançamento.",
      },
      {
        id: "conferencia",
        imagem: conferencia,
        alt: "Tela de conferência de pátio, com a quantidade de veículos no sistema e as opções de conferir pela câmera ou marcando pela lista.",
        titulo: "Conferência de pátio",
        explicacao:
          "Para conferir se o pátio bate com o sistema. Mostra quantos veículos deveriam estar lá e a data da última conferência. A equipe confere lendo as placas com a câmera ou marcando pela lista, e as entradas e saídas continuam funcionando.",
      },
      {
        id: "quadros-chaves",
        imagem: quadrosChaves,
        alt: "Quadro de chaves com os ganchos organizados em linhas e colunas, indicando quais estão livres e quais estão ocupados.",
        titulo: "Quadros de chaves",
        explicacao:
          "O quadro onde as chaves ficam penduradas no pátio, agora no sistema: cada gancho aparece livre ou ocupado. Na entrada, o sistema sugere o primeiro gancho livre para pendurar a chave do carro.",
      },
      {
        id: "configuracoes",
        imagem: configuracoes,
        alt: "Tela de configurações da empresa, com as chaves para tornar obrigatórios o modelo, a cor e o prisma na entrada e para ligar ou desligar os serviços do lava-rápido.",
        titulo: "Regras da empresa",
        explicacao:
          "A empresa escolhe o que o operador precisa preencher na entrada: modelo, cor e prisma. Aqui também liga ou desliga o módulo de serviços do lava-rápido.",
      },
    ],
  },
];
