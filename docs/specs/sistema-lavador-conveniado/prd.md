# PRD: Sistema por perfil, com Lavador, Conveniado e as novidades do GIPE

## Problema
A seção "Tudo o que o pátio precisa, no mesmo sistema" mostra o sistema por perfil (Cliente, Operador e Gestor), com telas capturadas em 06/11/2026 (sistema v1.0.356). De lá para cá o GIPE foi até a v1.0.486 e ganhou o que mais pesa para dois públicos do site:

- **Lava-rápido.** O sistema ganhou o módulo de Serviços (catálogo com preço por categoria de veículo, serviços no ticket do veículo e fila do lavador por status) e o perfil Lavador. O site diz atender lava-rápidos, mas não mostra nada disso.
- **Empresa conveniada.** O sistema tem pátio e carimbo próprios para o usuário da conveniada, mas o site só fala de conveniadas do ponto de vista do estacionamento.

Além disso, parte das telas publicadas ficou velha (Visão Geral redesenhada, ticket de entrada novo, atalhos de valor e troco na saída), e a lista "Tudo isso incluso no plano" não cita o que veio depois da v1.0.333. Quem avalia a Murel vê um produto menor do que o que existe.

## Objetivo
A seção do sistema passa a ter cinco perfis (Cliente, Operador, Gestor, Lavador e Conveniado), abre por padrão no **Operador**, e todos os perfis mostram telas atuais, com dados fictícios, só do que funciona hoje. A lista do que o plano inclui e os textos relacionados passam a refletir as novidades do GIPE.

## Usuário-alvo
- Dono de estacionamento, valet ou **lava-rápido** que ainda não é cliente e avalia o sistema, no celular, entre tarefas do pátio.
- Gerente que avalia o sistema para o dono, em geral no desktop.
- Dono de empresa que **conveniaria** ou já conveniada e quer saber o que a equipe dela usa.

## Resultado da análise do GIPE (o que existe no sistema e falta no site)
Fontes: histórico de atualizações do GIPE até a v1.0.486, regra de permissões por perfil e as specs do repositório. É leitura de código e documentação; cada item abaixo precisa ser confirmado no sistema em funcionamento antes de entrar no site.

| Novidade no GIPE | Versão | Hoje no site |
|---|---|---|
| Módulo de Serviços: catálogo, preço por categoria, serviços no veículo | 1.0.433 a 1.0.443 | Ausente |
| Fila do lavador por status (Aguardando, Em execução, Pronto) e perfil Lavador | 1.0.433, 1.0.445, 1.0.461 | Ausente |
| Pátio da conveniada e carimbo do ticket pela conveniada | 1.0.300, 1.0.347 | Só como item de lista, sem tela |
| Faturas das empresas conveniadas | 1.0.369 | Ausente |
| Visão Geral redesenhada (faturamento, pendências, gráfico diário, formas de recebimento, categorias, movimento por hora) | 1.0.481 | Tela antiga (v1.0.356) |
| Ticket de entrada redesenhado, com o valor em destaque | 1.0.464 | Tela antiga |
| Atalhos de valor recebido e troco na saída em dinheiro; saída direta quando não há o que cobrar | 1.0.447, 1.0.460 | Ausente |
| Leitura contínua da placa pela câmera e teclados próprios de placa | 1.0.332, 1.0.343, 1.0.448 | Só "placa lida pela câmera" |
| Campo prisma e regras da empresa na entrada | 1.0.407 | Ausente |
| Ticket público consultado pela placa; Cartaz do Ticket | 1.0.418, 1.0.419 | Ausente |
| Próxima faixa de valor no comprovante do cliente | 1.0.439 | Parcial (texto de "Acompanha") |
| Configurações da empresa | 1.0.406 | Ausente |
| Tour interativo no primeiro acesso | 1.0.425 | Ausente |
| Lançar despesa pelo caixa | 1.0.404 | Ausente |

O que o GIPE ainda não tem e continua de fora do site: Relatórios (só a casca), tela de permissões por módulo e emissão de NFS-e.

## Requisitos funcionais

### Perfis e seletor
- RF1: O seletor da seção passa a ter cinco perfis: Cliente, Operador, Gestor, **Lavador** e **Conveniado**. A ordem e o desenho do seletor com cinco opções são decididos no design, e ele continua usável em celular a partir de 360 px.
- RF2: A seção abre por padrão no **Operador** (hoje abre no Gestor).
- RF3: Cada perfil mostra só as telas que aquela pessoa usa no sistema e cada tela traz uma explicação própria e um texto alternativo.

### Lavador (novo)
- RF4: Mostra as telas que o lavador vê, capturadas com uma conta Lavador de teste: a fila de serviços por status, o detalhe de um serviço e a mudança de status (Aguardando, Em execução, Pronto). Telas adicionais entram só se o perfil as acessar de fato.
- RF5: Explica o que o lavador faz na fila (ver placa, modelo, cor, categoria e prisma do veículo, abrir o mais urgente e avançar o status) e o que ele não vê, com base no que a conta mostra.

### Conveniado (novo)
- RF6: Mostra as telas do usuário de conveniada, capturadas com uma conta de teste: o carimbo do ticket e o pátio da conveniada (veículos carimbados que ainda não saíram, com permanência).
- RF7: Explica para quem usa e o que ganha: carimbar o ticket do cliente e acompanhar o que carimbou. Só o que a conta realmente mostra.

### Operador, Cliente e Gestor (atualizar)
- RF8: **Operador:** recapturar as telas que mudaram (ticket de entrada, saída com valor recebido e troco, pátio) e incluir os serviços no ticket do veículo, quando a tela existir para o perfil.
- RF9: **Cliente:** incluir a consulta pública do ticket pela placa e atualizar o comprovante, se mudou.
- RF10: **Gestor:** trocar a tela da Visão Geral pela versão atual e acrescentar uma tela de cada menu com funcionalidade que ainda não aparece (Serviços/catálogo, Faturas, Configurações e os demais que a captura mostrar).

### Plano e textos
- RF11: A lista "Tudo isso incluso no plano" passa a citar o que o GIPE tem e o site não diz: Serviços para lava-rápido, faturas das conveniadas, pátio da conveniada, perfil Lavador em "Equipe e permissões", configurações da empresa e o tour do primeiro acesso, cada item conferido no sistema.
- RF12: Perguntas frequentes e textos que falam de lava-rápido, equipe e conveniadas ficam coerentes com as novas telas (por exemplo, dizer que o lava-rápido tem fila de serviços).

### Regras de conteúdo
- RF13: Todas as telas usam dados fictícios. As contas de teste informadas pelo usuário são de teste, mas a revisão tela a tela continua obrigatória: nada de nome, CPF/CNPJ, placa, telefone ou e-mail reais.
- RF14: Mostrar só o que funciona hoje. Relatórios, permissões por módulo e NFS-e ficam de fora.
- RF15: Nenhuma credencial (CPF, senha, token) aparece no site, na documentação, no código, nas capturas ou nesta spec.
- RF16: Mantêm-se as regras da spec "sistema por perfil": moldura de celular para Cliente, Operador, Lavador e Conveniado (se as telas forem de celular) e de notebook para Gestor, chamada para testar grátis acessível na seção, tom de voz da marca e acessibilidade WCAG 2.2 AA.
- RF17: Antes de implementar, são apresentados modelos de layout para o seletor de cinco perfis e o usuário escolhe um.

## Fora de escopo
- Perfis Gerente, Caixa, Manobrista e Financeiro como opções separadas (continuam representados por Operador e Gestor).
- Relatórios, tela de permissões por módulo, emissão de NFS-e e qualquer funcionalidade que o GIPE ainda não tenha.
- Mudanças em preços, planos, teste grátis, formulário de contato, WhatsApp, cabeçalho e rodapé.
- Nova página ou rota; o conteúdo continua na home.
- Vídeos, demonstração interativa e outros idiomas.
- Telas de administração da conveniada além das que o usuário de conveniada vê.

## Critérios de aceite
- [ ] O seletor tem Cliente, Operador, Gestor, Lavador e Conveniado e a seção abre no Operador.
- [ ] O Lavador mostra a fila de serviços e a mudança de status, com telas atuais e dados fictícios.
- [ ] O Conveniado mostra o carimbo e o pátio da conveniada, com telas atuais e dados fictícios.
- [ ] A Visão Geral e as telas do Operador que mudaram foram recapturadas, e o Gestor ganhou as telas dos menus que faltavam.
- [ ] "Tudo isso incluso no plano" cita as novidades e cada item foi conferido no sistema.
- [ ] Cada tela tem explicação e texto alternativo, e todas foram revisadas uma a uma antes de publicar.
- [ ] Nenhuma credencial ou dado pessoal real aparece em site, imagens, documentação ou código.
- [ ] O seletor e a seção funcionam em 360 px e no desktop, com teclado, contraste e textos alternativos em WCAG 2.2 AA.
- [ ] Imagens otimizadas, sem piorar o peso da página no celular.
- [ ] Os modelos de layout foram apresentados e um foi escolhido pelo usuário antes da implementação.

## Métricas de sucesso (se aplicável)
- Cliques em "Testar grátis" partindo da seção Sistema, e parcela dos visitantes que abre o perfil Lavador ou Conveniado: [A DEFINIR meta; baseline não medido e sem ferramenta de medição no código hoje].

## Riscos e observações
- **Credenciais em texto no repositório.** O `docs/input.md` está versionado e já teve logins e senhas em texto. As senhas atuais estão nele de novo e devem ser trocadas; o arquivo não deve voltar a guardar credenciais, e vale limpá-las do histórico do git. Nada disso foi copiado para esta spec.
- A análise vem do histórico e do código do GIPE, não de uso do sistema. O relatório de funcionalidades do próprio GIPE (23/10/2026) registra que só o perfil Administrador foi testado com login real; as telas do Lavador e do Conveniado precisam ser conferidas entrando com as contas de teste.
- As telas de Operador e Gestor publicadas hoje são da v1.0.356; recapturar tudo de uma vez evita mistura de versões.
- Cinco perfis no seletor aumentam o conteúdo da seção. Se ficar pesada no celular, o design deve priorizar (por exemplo, agrupar ou limitar telas por perfil) em vez de cortar explicações.
- Referências: `docs/specs/sistema-por-perfil/prd.md`, `docs/specs/home-vendas-detalhada/prd.md`, `docs/Marca_Murel.html`, e no GIPE `docs/specs/modulo-servicos/prd.md`, `docs/specs/patio-conveniada/prd.md` e `docs/relatorio-funcionalidades.txt`.
