# PRD: Plano Único a R$ 69,90 no Lançamento (novembro/2026)

## Problema
Hoje o site mostra quatro planos (mensal, trimestral, semestral e anual) com valores de R$ 79,90 a R$ 149,90 por mês. O negócio decidiu simplificar a oferta: um único plano, com tudo incluso, a R$ 69,90 por mês e sem fidelidade. O site ainda vende a escada de periodicidades e os preços antigos, o que contradiz a nova oferta e obriga o visitante a comparar e a fazer conta antes de decidir.

## Objetivo
A home passa a mostrar um único plano mensal de R$ 69,90 por mês, com todas as funcionalidades e sem fidelidade, e todos os pontos do site que falam de preço ou de planos refletem isso. O visitante entende a oferta em uma frase e chega à adesão com um clique, o que deve aumentar os cadastros.

## Usuário-alvo
- Dono de pátio (estacionamento, valet, lava-rápido), em especial o de pequeno porte, que compara sistemas pelo preço de entrada. Lê no celular, entre tarefas do pátio.
- Gerente/administrador que leva o preço ao dono e precisa de uma resposta simples, em geral no desktop.

## Requisitos funcionais
- RF1: A seção de planos da home passa a ter um único plano, o Mensal, no lugar dos quatro cartões atuais. O cartão mostra o preço de tabela **R$ 99,90/mês** riscado e, em destaque, **R$ 69,90/mês no lançamento**, como recomenda o documento de cenário. A venda continua sendo "R$ 69,90".
- RF2: A seção deixa claro que o plano inclui todas as funcionalidades do sistema, sem limite de tamanho do pátio, e que não há fidelidade. A lista de áreas do sistema (as 13 de `planos-adesao`) continua como está.
- RF3: Trimestral, Semestral e Anual deixam de ser exibidos. Não sobram totais por período, economia em relação ao mensal, selo de "recomendado" nem comparação entre planos.
- RF4: O cartão traz um selo "Preço de lançamento: assine até 30/06/2027". O preço riscado deve ser identificável também para leitores de tela (ex.: "de R$ 99,90 por R$ 69,90").
- RF4a: Depois de 30/06/2027 o selo e o preço promocional não podem continuar no ar. A partir dessa data o plano passa a ser exibido a R$ 99,90/mês, sem riscado.
- RF4b: O cartão informa a regra do preço de lançamento em uma linha clara: "R$ 69,90/mês nos primeiros 12 meses; depois, R$ 99,90/mês." O mesmo vale para o FAQ, que ganha uma pergunta sobre o que acontece depois dos 12 meses.
- RF5: O botão do plano leva à tela de adesão com `tipoPlanoAdesao=1` (Mensal). O botão diz exatamente o que acontece ao clicar.
- RF6: As chamadas do teste grátis continuam levando à adesão com `tipoPlanoAdesao=0` (Trial). A faixa do teste continua antes do plano, e a nota "Todos os planos começam com 30 dias grátis" passa a falar no singular ("O plano começa com 30 dias grátis").
- RF7: Os textos fora da seção de planos que citam preço ou planos são atualizados:
  - Pergunta frequente sobre valores: deixa de citar mensal, trimestral, semestral e anual e passa a informar o preço único.
  - Perguntas sobre o fim do teste: deixam de falar em "escolher um plano" e passam a falar em assinar.
  - Hero, chamadas da home, resumo do sistema, bloco de contato e menu: revisar e ajustar o que citar vários planos ou "a partir de". O levantamento exato no código fica para o Tech Spec.
- RF8: Nenhum valor antigo (R$ 149,90, R$ 134,90, R$ 119,90, R$ 79,90) nem os totais por período aparecem em nenhum lugar do site.
- RF9: Os textos seguem o tom de voz da marca (direto, próximo, sem jargão, sem exageros, sem emojis). O argumento central é o do documento de cenário: "R$ 69,90, tudo incluso, sem fidelidade."
- RF10: O visual segue o da seção de planos atual (fundo escuro, cartão com borda, destaque amarelo, valor em destaque, lista de funcionalidades com marcação), adaptado para um único cartão.

## Fora de escopo
- Mudanças na tela de adesão do sistema (GIPE) e no que ela cobra; o site só envia `tipoPlanoAdesao`.
- Cobrança, cupons, desconto por indicação, preço por quantidade de pátios e condições especiais dos Clientes Fundadores.
- Contagem regressiva ao vivo ou contador de vagas restantes com dado em tempo real (ver "Pontos a definir").
- Termos de uso, regra de reajuste pelo IPCA e comunicação a clientes atuais.
- Remover o teste grátis ou mudar suas regras.
- Nova rota ou página separada; tudo fica na home.

## Critérios de aceite
- [ ] A seção de planos mostra um único plano, com "R$ 99,90/mês" riscado e "R$ 69,90/mês no lançamento", todas as funcionalidades e a informação de que não há fidelidade.
- [ ] Não existe mais nenhum cartão, total, economia ou selo de "recomendado" de Trimestral, Semestral ou Anual.
- [ ] Nenhum dos valores antigos (R$ 149,90, R$ 134,90, R$ 119,90, R$ 79,90) aparece em qualquer ponto da home, do FAQ, do menu ou dos metadados.
- [ ] O selo mostra "assine até 30/06/2027" e não promete número de vagas.
- [ ] O cartão e o FAQ dizem que o R$ 69,90 vale por 12 meses e que depois o valor é R$ 99,90/mês, sem prometer prazo de aviso nem reajuste intermediário.
- [ ] Depois de 30/06/2027 o site mostra o plano a R$ 99,90/mês, sem selo nem preço riscado.
- [ ] O botão do plano abre a adesão com `tipoPlanoAdesao=1`; as chamadas do teste abrem com `tipoPlanoAdesao=0` (verificado clicando em todas).
- [ ] FAQ e demais textos não citam planos que não existem mais e não mencionam "escolher um plano" onde só há um.
- [ ] A seção cobre as 13 áreas de funcionalidades e não cita nada que o sistema ainda não faz.
- [ ] Layout legível a partir de 360 px e no desktop, sem rolagem horizontal.
- [ ] Navegação por teclado, foco visível e contraste atendem WCAG 2.2 AA (o selo de oferta não depende só de cor).
- [ ] Textos seguem o tom de voz do guia de marca.

## Métricas de sucesso (se aplicável)
- Cadastros (teste grátis e adesão ao plano) por visita à home: [A DEFINIR meta; baseline não medido].
- Cliques no botão do plano por visita à home: [A DEFINIR].
- Conversão do teste grátis para o plano pago: [A DEFINIR; depende do sistema].

## Pontos a definir
O documento "Murel – Cenário Preço Único R$ 69,90" (Everton Oliveira, 5/11/2026) trata o R$ 69,90 como cenário em discussão entre os sócios e recomenda usá-lo como **preço de lançamento**, com o preço de tabela visível. A decisão atual é de um único plano, apresentado como lançamento a R$ 69,90 com tabela de R$ 99,90 visível; os pontos abaixo precisam de resposta antes de publicar:
- **Preço de tabela:** decidido seguir o documento: R$ 99,90/mês riscado e R$ 69,90/mês no lançamento. O valor de tabela de R$ 99,90 é o do exemplo do documento; confirmar que é o valor final.
- **Condição do selo (RF4):** decidido usar só prazo: "Preço de lançamento: assine até 30/06/2027". Sem limite de clientes.
- **Texto de vagas restantes:** o documento cita "restam 8 vagas" como exemplo de urgência. Sem fonte de dado em tempo real, o site não deve afirmar um número de vagas. **[A DEFINIR]**
- **Regra para quem assina no lançamento:** decidido que o R$ 69,90 vale por 12 meses; depois, o valor volta ao preço de tabela de R$ 99,90/mês (opção B do documento, sem degraus intermediários).
- **Aviso antes da virada:** o documento sugere avisar o cliente com 60 dias de antecedência. O site não deve prometer esse prazo até o negócio confirmar. **[A DEFINIR]**
- **Prazo dos Clientes Fundadores:** o documento sugere manter o R$ 69,90 por mais tempo (ex.: 24 meses). Não aparece no site nesta versão. **[A DEFINIR]**

## Riscos e observações
- **Receita por cliente:** o documento calcula 33% menos receita por cliente que a escada atual e cerca de R$ 60 líquidos por cliente após impostos e taxas (estimativa). É uma decisão de negócio dos sócios; o site apenas a reflete.
- **Preço público já existente:** esta feature substitui os valores definidos em `docs/specs/planos-adesao/prd.md`. Os PRDs `planos-adesao` e `teste-gratis` ficam como histórico e não são alterados.
- **Parâmetro de adesão:** persiste o risco registrado em `planos-adesao` e `teste-gratis`: o GIPE (`/adesao`) precisa ler `tipoPlanoAdesao`; sem isso, o plano escolhido se perde. Confirmar com o GIPE que `1` (Mensal) continua válido e é o único tipo pago.
- **Comparação com concorrentes:** o documento compara com preços publicados em novembro de 2026 (Estacione.ai, Valeti, Jump Park, CarMob). O site não cita concorrentes.
- **Teste grátis:** as regras do teste continuam pendentes de confirmação do negócio, como registrado em `teste-gratis`.
- Referências: `docs/input.md`, `Murel - Cenario Preco Unico R 6990.pdf` (pasta Downloads/teclado), `docs/specs/planos-adesao/prd.md`, `docs/specs/teste-gratis/prd.md` e `docs/Marca_Murel.html`.
