# PRD: Redesenho do layout da home (Hero, plano, como funciona e sistema)

## Problema
Uma análise do layout atual da home (desktop 1280 px e celular 390 px) mostrou quatro pontos que enfraquecem a primeira impressão e a decisão de testar:

- **Hero sem produto.** A primeira tela mostra só o símbolo da marca. O produto (que é o maior argumento do site) só aparece na terceira seção. No celular, o símbolo vai para o fim do Hero, abaixo da dobra.
- **"Tudo isso incluso no plano" longo demais.** São 16 itens em lista plana, cerca de uma tela e meia no celular, sem agrupamento. Perto dele, o bloco do teste grátis e o cartão do plano competem entre si (dois blocos de borda amarela) e o cartão do plano fica sozinho no centro da página.
- **"Como funciona" não parece um fluxo.** Cinco passos numa grade de três colunas deixam um buraco na segunda linha. Os passos 2a e 2b são alternativas (foto da tela ou QR Code), mas aparecem como etapas comuns, em sequência.
- **Seção do sistema com telas pequenas e conteúdo escondido.** No desktop, a tela fica pequena num carrossel largo, com muito espaço vazio, e a maioria das telas de cada perfil (de 2 a 12) fica fora da vista, atrás de setas e pontos.

## Objetivo
Quem chega à home entende o produto já na primeira tela, encontra o plano e o que ele inclui de forma organizada, vê o fluxo do ticket como um caminho com uma escolha, e vê as telas do sistema em tamanho que dê para ler, sem esconder o conteúdo.

## Usuário-alvo
- Dono de estacionamento, valet ou lava-rápido que avalia a Murel, lendo no celular entre tarefas do pátio.
- Gerente que avalia para o dono, geralmente no computador.
- Quem chega por link direto para uma seção (planos, sistema) e precisa se localizar rápido.

## Requisitos funcionais

### Hero com o produto
- RF1: O Hero mostra o produto na primeira tela: uma tela real do sistema, com dados fictícios, ao lado do título no desktop e logo abaixo dos botões no celular, parcialmente visível acima da dobra.
- RF2: O símbolo da marca continua presente no Hero, em papel de apoio, sem competir com a tela do produto.
- RF3: Os botões "Começar com 1 mês grátis" e "Falar com a equipe", as garantias e o texto atual continuam visíveis e clicáveis desde o início.
- RF4: Uma faixa curta logo abaixo do Hero resume o que diferencia a Murel (sem impressora, ticket digital, sem cadastro do cliente, mês grátis), com textos já usados no site.

### Plano e o que ele inclui
- RF5: O bloco do teste grátis e o cartão do plano viram um bloco único: preço, condições e botão de um lado e garantias do outro. Só existe um destaque de cor principal na seção.
- RF6: O bloco continua mostrando os dados que vêm do back-end (preço, promoção, validade, duração do teste) e mantém o estado de contingência quando o plano não carrega.
- RF7: "Tudo isso incluso no plano" é organizado em grupos com subtítulo (Pátio, Dinheiro, Clientes e Equipe, a confirmar no design), mantendo todas as 16 áreas atuais e seus textos.
- RF8: No celular, os grupos podem ser recolhidos e abertos, com o primeiro aberto por padrão; no desktop, ficam todos visíveis.
- RF9: A chamada "Ficou com dúvida?" continua ao fim da seção.

### Como funciona
- RF10: Os passos são apresentados como um caminho, de cima a baixo no celular e da esquerda para a direita no desktop, usando o visual de pista da marca, com ordem inequívoca.
- RF11: Os passos 2a e 2b aparecem como duas alternativas que se juntam no passo seguinte, e a diferença entre "alternativa" e "etapa" fica clara sem depender de cor.
- RF12: Nenhum passo fica sozinho ou deslocado em linha incompleta em nenhuma largura de tela.
- RF13: A frase de reforço "Sem impressora. Sem e-mail e sem telefone do cliente." continua ao fim da seção.

### Sistema por perfil
- RF14: No desktop, a seção usa uma tela grande, à direita, e uma lista das telas do perfil, à esquerda; escolher um item troca a tela e a explicação. A lista mostra todas as telas do perfil, sem rolagem horizontal.
- RF15: No celular, as telas continuam em sequência navegável, com a explicação junto da tela e alvos de toque de pelo menos 44 px.
- RF16: Os cinco perfis (Cliente, Operador, Lavador, Conveniado e Gestor) continuam como abas, com o Operador aberto por padrão, e os textos e imagens atuais não mudam.
- RF17: Telas de celular continuam em moldura de celular e as do Gestor em moldura de notebook, no tamanho maior que o layout permitir.
- RF18: A chamada "Experimente no seu pátio" continua ao fim da seção.

### Transversais
- RF19: Todos os textos já publicados são mantidos, salvo trocas mínimas para encaixar o novo layout. Nenhuma informação nova sobre o produto é inventada.
- RF20: As animações da spec `animacoes-site` continuam valendo e respeitam "menos movimento", sem JavaScript e na impressão; o novo layout não esconde conteúdo nesses casos.
- RF21: Navegação por teclado, foco visível, contraste e textos alternativos em WCAG 2.2 AA; leitores de tela leem a ordem dos passos e a escolha do passo 2.
- RF22: Antes de implementar, são apresentados 3 modelos de layout para o Hero, 3 para o bloco do plano e 3 para o fluxo "Como funciona" (o Sistema segue a direção descrita no RF14), e o usuário escolhe um de cada.

## Fora de escopo
- Contato, FAQ, Diferencial, rodapé, header e botão do WhatsApp (ficam para outra spec).
- Alternar o fundo das seções e outras mudanças de ritmo geral da página.
- Mudar preços, planos, regras do teste grátis ou textos de oferta.
- Novas capturas de tela do sistema (usa as imagens atuais) e novos perfis.
- Nova página ou rota; tudo continua na home.
- Medição de cliques e testes A/B.

## Critérios de aceite
- [ ] O Hero mostra uma tela do sistema na primeira tela do desktop e do celular, com os botões e as garantias visíveis e clicáveis.
- [ ] A faixa de diferenciais aparece logo abaixo do Hero com textos já usados no site.
- [ ] Teste grátis e plano formam um único bloco, com preço e promoção vindos do back-end, e a contingência continua funcionando.
- [ ] As 16 áreas do plano aparecem em grupos com subtítulo; no celular os grupos recolhem e abrem por teclado e toque.
- [ ] "Como funciona" mostra um caminho com o passo 2 como escolha entre duas opções, sem buraco de grade em nenhuma largura.
- [ ] No desktop, a seção Sistema mostra a lista de todas as telas do perfil e a tela grande, trocando por clique, teclado e toque; no celular, a navegação continua por gesto e por botões de 44 px.
- [ ] Os cinco perfis continuam nas abas, com o Operador por padrão e todos os textos e imagens atuais.
- [ ] Sem rolagem horizontal da página em 320, 360, 390, 768 e 1280 px.
- [ ] Com "menos movimento", sem JavaScript e na impressão, todo o conteúdo aparece e nada se move.
- [ ] Navegação por teclado, contraste e textos alternativos conferidos em WCAG 2.2 AA.
- [ ] Os modelos de layout foram apresentados e um de cada foi escolhido pelo usuário antes da implementação.
- [ ] A página não fica mais pesada de forma relevante no celular (imagens do Hero e do Sistema otimizadas e carregadas sob demanda fora da dobra).

## Métricas de sucesso (se aplicável)
- Altura total da página no celular menor que hoje (cerca de 10.500 px), sem perder conteúdo.
- Cliques em "Começar com 1 mês grátis" e "Falar com a equipe": [A DEFINIR meta; não há ferramenta de medição no código hoje].

## Riscos e observações
- A tela do produto no Hero pode envelhecer; o ideal é usar uma tela estável do sistema (pátio ou ticket) e revisá-la a cada captura nova.
- A imagem no Hero ocupa a área mais importante da página: precisa carregar rápido e não atrasar o texto nem os botões (LCP).
- O fluxo com ramificação (passo 2a e 2b) é o ponto mais delicado de acessibilidade e de adaptação ao celular.
- Reorganizar o plano em grupos não pode esconder nenhuma das 16 áreas nem reduzir o texto conferido no sistema.
- Mexer na seção Sistema reabre testes de teclado e de abas já cobertos na spec `sistema-lavador-conveniado`.
- Referências: `docs/specs/animacoes-site/prd.md`, `docs/specs/sistema-lavador-conveniado/prd.md`, `docs/specs/home-vendas-detalhada/prd.md` e `docs/Marca_Murel.html`.
