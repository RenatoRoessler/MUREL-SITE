import comprovanteEntrada from "@/assets/telas/cliente/comprovante-entrada.webp";
import caixa from "@/assets/telas/gestor/caixa.webp";
import conferencia from "@/assets/telas/gestor/conferencia.webp";
import conveniadas from "@/assets/telas/gestor/conveniadas.webp";
import dashboard from "@/assets/telas/gestor/dashboard.webp";
import financeiro from "@/assets/telas/gestor/financeiro.webp";
import mensalistas from "@/assets/telas/gestor/mensalistas.webp";
import patioGestor from "@/assets/telas/gestor/patio.webp";
import precos from "@/assets/telas/gestor/precos.webp";
import quadrosChaves from "@/assets/telas/gestor/quadros-chaves.webp";
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
export const perfilInicial: IdPerfil = "gestor";

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
        alt: "Ticket de entrada de um veículo, com a placa, a permanência, o valor até agora, a tabela de preço e os botões Mostrar QR do ticket, Enviar ao cliente e Registrar saída.",
        titulo: "Ticket do veículo",
        explicacao:
          "Cada veículo no pátio tem um ticket com a permanência, o valor até agora e a tabela de preço aplicada. Dali o operador mostra o QR ao cliente, envia o comprovante ou já registra a saída.",
      },
      {
        id: "localizar-veiculo",
        imagem: localizarVeiculo,
        alt: "Janela Localizar veículo, com a leitura de QR Code pela câmera e os campos Placa, Token e Sequencial.",
        titulo: "Localizar o veículo na saída",
        explicacao:
          "Na saída, o operador lê o QR Code do cliente com a câmera. Sem QR Code, procura pela placa, pelo token do cupom ou pelo número sequencial do veículo.",
      },
      {
        id: "confirmar-saida",
        imagem: confirmarSaida,
        alt: "Janela Confirmar saída, com a placa, a entrada, a permanência, o valor a cobrar, a forma de pagamento e o valor recebido.",
        titulo: "Confirmar a saída",
        explicacao:
          "O sistema calcula o valor pela tabela de preço. O operador escolhe a forma de pagamento, informa o valor recebido e vê o troco antes de confirmar. Só aparecem os meios de pagamento que a empresa aceita.",
      },
      {
        id: "saida-registrada",
        imagem: saidaRegistrada,
        alt: "Recibo de pagamento da saída, com a placa, o veículo, a entrada, a saída, a permanência, a forma de pagamento, o valor pago e um QR Code.",
        titulo: "Recibo da saída",
        explicacao:
          "Confirmada a saída, o recibo mostra entrada, saída, permanência, tabela, pagamento e total pago. O cliente leva o recibo no celular pelo QR Code.",
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
        alt: "Dashboard com o percentual de vagas ocupadas, os veículos no pátio, a permanência média e gráficos de mensalistas e avulsos, categoria e tempo no pátio.",
        titulo: "Dashboard",
        explicacao:
          "O resumo do pátio agora: vagas ocupadas, veículos no pátio, permanência média e quantos estão há três dias ou mais. Gráficos mostram mensalistas e avulsos, as categorias e o tempo no pátio.",
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
          "O caixa aberto com o valor em caixa, o fundo de caixa e o dinheiro na gaveta. Mostra o total recebido por forma de pagamento no turno e permite lançar sangria e despesa. O histórico e os movimentos ficam a um toque.",
      },
      {
        id: "precos",
        imagem: precos,
        alt: "Tela de gestão de preços, com a lista de tabelas e a tarifa por tempo de permanência da tabela selecionada.",
        titulo: "Gestão de preços",
        explicacao:
          "As tabelas de preço do pátio, com a tarifa por tempo de permanência, a tolerância e as categorias de veículo que cada uma atende. Dá para simular a cobrança antes de usar a tabela.",
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
    ],
  },
];
