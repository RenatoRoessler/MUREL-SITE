# PRD: Refinamentos da home (layout, animações e usabilidade)

## Problema
Depois do redesenho do Hero, do plano, do "Como funciona" e do Sistema, uma nova análise da home (desktop 1280 px e celular 390 px) encontrou o que ainda atrapalha a leitura e a decisão de testar:

- **Usabilidade.** No celular, o botão flutuante do WhatsApp cobre conteúdo (o texto de ajuda do formulário e a última pergunta do FAQ). O menu do celular não fecha com a tecla Esc nem ao tocar fora dele, e não devolve o foco ao botão. Depois de rolar do topo, não há chamada para o teste grátis à mão: quem lê o plano ou o FAQ precisa voltar ao topo. O contato tem três chamadas seguidas antes do formulário, e o formulário não deixa claro o que é obrigatório. O FAQ tem 12 perguntas em fila, sem atalho para achar uma. O carrossel de telas do celular e os grupos do plano não dizem onde a pessoa está nem o que há dentro de cada grupo.
- **Layout.** O símbolo da marca cobre a barra de navegação do celular da esquerda no Hero. A faixa de diferenciais fica abaixo da dobra no desktop. A seção Diferencial é fraca (números pequenos, muito vazio). O Contato e o FAQ usam só metade da largura no desktop. Todas as seções seguem o mesmo molde e o rodapé tem só três links.
- **Animações.** O menu não mostra em que seção a pessoa está. A tela do Sistema troca seca no desktop. As animações da marca (a pista e o carro) aparecem só no logo, e várias seções entram sem nenhuma reação.

## Objetivo
A home fica mais fácil de usar no celular e no computador, com a chamada para o mês grátis sempre acessível, nada cobrindo conteúdo, um contato mais claro e um visual mais variado, com movimento discreto que usa a identidade da marca. Tudo respeitando "menos movimento", o teclado e o leitor de tela.

## Usuário-alvo
- Dono de estacionamento, valet ou lava-rápido que avalia a Murel, no celular, entre tarefas do pátio.
- Gerente que avalia para o dono, geralmente no computador.
- Quem usa só o teclado ou um leitor de tela.

## Requisitos funcionais

### Usabilidade
- RF1: **WhatsApp.** O botão flutuante não cobre conteúdo: depois da primeira aparição, mostra só o ícone; some dentro da seção de Contato (que já tem a chamada para o WhatsApp); e a página tem espaço no fim para ele não tapar o último conteúdo.
- RF2: **Menu do celular.** Fecha com a tecla Esc e ao tocar fora, devolve o foco ao botão que o abriu, e o resto da página fica esmaecido enquanto ele está aberto.
- RF3: **Chamada fixa no celular.** Depois de rolar do Hero, uma barra fina fixa na base do celular mostra "Começar grátis" (texto do back-end). Ela some enquanto o Hero está na tela e quando o formulário de contato está em uso, e nunca cobre campos nem botões.
- RF4: **Contato mais claro.** As formas de contato (escrever uma mensagem, falar agora pelo WhatsApp e ver funcionando, com o mês grátis) são abas da seção, com a mensagem aberta por padrão, e a chamada para o mês grátis fica separada do formulário. (Ajustado em 20/11/2026, conforme o modelo escolhido.)
- RF5: **Formulário.** Só Nome e Mensagem são marcados como obrigatórios; o aviso de que é preciso informar e-mail ou telefone aparece junto desses dois campos, antes do envio, e não só no erro.
- RF6: **FAQ.** Há um controle para abrir e fechar todas as perguntas e uma busca por palavra que filtra a lista; sem resultado, mostra uma mensagem e o caminho para falar com a equipe.
- RF7: **Sistema no celular.** O carrossel mostra, junto dos pontos, o título da tela atual e "N de M".
- RF8: **Plano no celular.** Cada grupo recolhido mostra quantas áreas tem (por exemplo, "5 áreas").

### Layout
- RF9: **Hero.** O símbolo da marca não cobre nenhuma tela do produto; o espaço inferior do Hero é ajustado para a faixa de diferenciais aparecer na primeira tela em um computador de 800 px de altura.
- RF10: **Diferencial.** Os três números ganham destaque em cartões, com o número grande no topo, sem perder nenhum texto atual. (Ajustado em 20/11/2026, conforme o modelo escolhido.)
- RF11: **Contato no desktop.** As mesmas abas, em largura confortável; a aba "Falar agora" traz WhatsApp, e-mail e o que acontece depois de enviar (só o que for verdade hoje).
- RF12: **FAQ.** Lista única com as perguntas em dois grupos, com cabeçalho ("Preço e teste" e "Como funciona"), sem tirar nenhuma pergunta. (Ajustado em 20/11/2026, conforme o modelo escolhido.)
- RF13: **Ritmo.** Pelo menos duas seções ganham fundo alternado (`asfalto2`) para quebrar a repetição, sem baixar o contraste de nenhum texto.
- RF14: **Rodapé.** Traz os atalhos das seções, os termos de uso e a política de privacidade (os mesmos exigidos na adesão), o contato e os dois botões atuais.

### Animações
- RF15: **Menu ativo.** O link da seção em que a pessoa está fica destacado, com um traço que desliza entre os links.
- RF16: **Troca de tela no Sistema (desktop).** A tela e a explicação trocam com um fade curto e leve deslizamento.
- RF17: **Pista em "Como funciona".** A faixa tracejada se desenha ao entrar na tela e o carro do símbolo percorre o caminho, parando em cada etapa.
- RF18: **Números do Diferencial.** Rolam como um odômetro, de 9 até o valor (0, 0 e 2), ao entrar na tela, uma vez, sem mudar a largura do texto. (Ajustado em 20/11/2026: os números são zeros, então "contar de 0" não teria efeito.)
- RF19: **Hero.** As duas molduras se movem em ritmos levemente diferentes conforme a rolagem, dando profundidade.
- RF20: **Plano.** Um brilho único passa sobre o preço quando o bloco aparece.
- RF21: **FAQ.** A resposta aparece com um fade junto da animação de altura.
- RF22: **WhatsApp.** Depois do anel pulsante, o rótulo encolhe suavemente e fica só o ícone (ligado ao RF1).

### Transversais
- RF23: Com "menos movimento", sem JavaScript e na impressão, todo o conteúdo aparece e nada se move; os controles novos (busca do FAQ, barra fixa, menu) têm alternativa sem movimento.
- RF24: Navegação por teclado, foco visível, contraste e textos alternativos em WCAG 2.2 AA; a barra fixa, o menu e a busca funcionam com leitor de tela.
- RF25: Só `transform` e `opacity` se movem, exceto onde o PRD diz o contrário; nada muda o tamanho do layout durante a animação.
- RF26: A página não fica mais pesada de forma relevante no celular, e o LCP e o CLS não pioram em relação ao estado atual (LCP cerca de 0,7 s e CLS 0 no celular).
- RF27: Antes de implementar, são apresentados 3 modelos de layout para o Contato e o FAQ (em conjunto) e 3 para o Diferencial e o rodapé, e o usuário escolhe um de cada.

## Fora de escopo
- Mudar preços, planos, regras do teste grátis ou textos de oferta.
- Novas capturas de tela do sistema e novos perfis.
- Novas rotas ou páginas, e mudanças no sistema (o app).
- Medição de cliques, testes A/B e envio de formulário (regras do back-end ou do e-mail).
- Modo claro do site.

## Critérios de aceite
- [ ] No celular, o botão do WhatsApp não cobre texto, campo nem pergunta em nenhuma seção; some no Contato.
- [ ] O menu do celular fecha com Esc e ao tocar fora, devolve o foco ao botão e esmaece a página.
- [ ] A barra fixa de "Começar grátis" aparece depois do Hero no celular, some no Hero e no formulário, e nunca cobre conteúdo.
- [ ] O Contato mostra as duas formas de contato lado a lado e o formulário abaixo; só Nome e Mensagem são obrigatórios; o aviso de e-mail ou telefone aparece antes do envio.
- [ ] O FAQ tem "abrir todas" e busca com mensagem de lista vazia.
- [ ] O carrossel do celular mostra o título da tela e "N de M"; os grupos recolhidos do plano mostram a quantidade de áreas.
- [ ] O símbolo não cobre telas no Hero e a faixa de destaques aparece na primeira tela com 800 px de altura.
- [ ] Diferencial, Contato, FAQ e rodapé seguem os modelos escolhidos; ao menos duas seções com fundo alternado; contraste mantido.
- [ ] Menu ativo, troca de tela, pista, rolo de dígitos, profundidade do Hero, brilho do preço, fade do FAQ e rótulo do WhatsApp funcionam como descrito.
- [ ] Com "menos movimento", sem JavaScript e na impressão, todo o conteúdo aparece e nada se move.
- [ ] Sem rolagem horizontal em 320, 360, 390, 768 e 1280 px.
- [ ] Teclado, foco, leitor de tela e contraste conferidos em WCAG 2.2 AA.
- [ ] LCP e CLS no celular iguais ou melhores que os atuais.
- [ ] Os modelos de layout foram apresentados e um de cada foi escolhido pelo usuário antes da implementação.

## Métricas de sucesso (se aplicável)
- LCP e CLS no celular sem piora (hoje, cerca de 0,7 s e 0).
- Cliques em "Começar grátis" e "Falar com a equipe": [A DEFINIR meta; ainda não há ferramenta de medição no código].
- Nenhum conteúdo coberto pelo botão do WhatsApp nas larguras testadas.

## Riscos e observações
- **Quantidade de itens.** São 22 melhorias; se o prazo apertar, a ordem sugerida é: usabilidade (RF1 a RF3), Hero (RF9), animações do menu, da troca de tela e da pista (RF15 a RF17) e, depois, Contato e FAQ.
- **Barra fixa no celular** pode brigar com o botão do WhatsApp e com o teclado virtual do formulário; precisa de regra clara de convivência (RF1 e RF3).
- **Menu esmaecido e foco** exigem cuidado com a ordem do teclado e com leitores de tela.
- **Pista com o carro** reusa o símbolo animado; não pode competir com o logo animado do cabeçalho nem rodar sem parar.
- **Busca do FAQ** filtra texto que depende da oferta (preço, data), então precisa funcionar com os textos montados pelo back-end.
- **Rodapé com termos de uso e privacidade** depende de os endereços já existirem no sistema de adesão; se não existirem, ficam de fora e isso é registrado.
- Referências: `docs/specs/redesenho-layout-home/`, `docs/specs/animacoes-site/`, `docs/specs/whatsapp-contato/` e `docs/Marca_Murel.html`.
