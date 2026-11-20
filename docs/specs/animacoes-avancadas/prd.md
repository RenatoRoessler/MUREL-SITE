# PRD: Animações avançadas do site

## Problema
O pacote inicial de animações (`docs/specs/animacoes-site/`) deu ritmo ao site, mas o visual ainda é, em boa parte, estático nos pontos que mais vendem: o topo não tem profundidade, os cartões não reagem ao cursor, a troca de perfil do sistema é seca, o preço não conta a história da promoção, o formulário de contato não dá retorno visual e o fundo é chapado. O visitante é um dono ou gerente de pátio/estacionamento que compara fornecedores em poucos segundos: um site que parece "comum" passa a imagem de um produto comum.

## Objetivo
Deixar o site com acabamento de produto premium, com movimento e efeitos que reforçam a identidade da marca (asfalto escuro, amarelo, faixa de pista, farol, velocímetro) e mostram o sistema funcionando, sem atrasar a leitura, sem prejudicar o desempenho e sem tirar conteúdo de quem prefere menos movimento.

## Usuário-alvo
Donos e gerentes de pátios, estacionamentos e lava-rápidos que chegam ao site pelo computador ou pelo celular, avaliam o sistema e decidem entre começar o teste grátis ou falar com a equipe. Também visitantes que usam teclado, leitor de tela ou a preferência do aparelho por menos movimento.

## Requisitos funcionais

### Impacto alto
- RF1: **Luz de farol nos cartões.** Em aparelhos com mouse, os cartões de Planos, Sistema e Diferencial ganham um brilho amarelo suave na borda e no fundo, na posição do cursor, que some ao sair. Em telas de toque, o efeito não existe.
- RF2: **Topo com profundidade.** As telas do sistema no Hero inclinam levemente seguindo o cursor, e as camadas (símbolo ao fundo, telas no meio, brilhos à frente) se movem em ritmos diferentes. No celular, só uma flutuação lenta, sem depender de cursor.
- RF3: **Faixa de pista na rolagem.** Uma faixa tracejada amarela liga as seções da página e se desenha conforme a pessoa rola, dando continuidade ao carro de "Como funciona". Nunca cobre texto nem botões.
- RF4: **Troca de perfil com transição.** No seletor de perfis (Operador, Usuário, Lavador, Conveniado), as telas trocam com fusão e deslize, e o indicador do perfil ativo desliza de uma opção para a outra em vez de pular. A troca nunca deixa a área em branco nem muda a altura da seção de forma brusca.

### Impacto médio
- RF5: **Preços e promoção.** Ao entrar na tela, o preço dos planos conta até o valor final; o preço antigo é riscado por uma linha que se desenha, reforçando a promoção. O valor correto precisa estar legível desde o início para quem não vê a animação.
- RF6: **Títulos de seção em linhas.** Os títulos das seções entram linha a linha, cada uma subindo de dentro de uma máscara, e o trecho em amarelo recebe o mesmo sublinhado desenhado do Hero.
- RF7: **Botão primário magnético.** Em aparelhos com mouse, o botão primário se desloca poucos pixels na direção do cursor quando ele chega perto e volta com um retorno elástico. A área de clique não muda.
- RF8: **Formulário de contato com retorno visual.**
  - O rótulo do campo sobe suavemente ao receber foco ou ter conteúdo.
  - Campo inválido faz um tremor curto, uma vez por tentativa.
  - O botão de enviar mostra um indicador de carregamento e, ao concluir, um sinal de sucesso que se desenha.
- RF9: **Progresso de leitura.** Uma linha fina amarela no topo da página mostra quanto da página já foi lida.
- RF10: **Telas do sistema "vivas".** Dentro das telas mostradas no carrossel e no Hero, pequenos eventos se repetem em ciclo lento: um item entra na lista, um status muda de "em fila" para "pronto", um toque aparece sobre um botão. Pausam quando a tela sai da vista.

### Impacto sutil
- RF11: **Fundo com vida.** O fundo ganha um grão discreto e um gradiente que se desloca muito devagar, sem chamar atenção nem reduzir o contraste do texto.
- RF12: **Seleção e foco na identidade.** A seleção de texto usa o amarelo da marca, e o anel de foco de teclado aparece com uma transição curta.
- RF13: **Links do rodapé.** Um sublinhado se desenha ao passar o mouse ou receber foco.
- RF14: **Busca do FAQ.** O trecho encontrado é destacado com um marca-texto que se desenha.
- RF15: **Transição entre páginas.** Se houver navegação entre páginas internas, a troca acontece com uma transição suave em vez de um corte.

### Transversais
- RF16: **Padrão de movimento.** Todo novo movimento usa o mesmo conjunto de durações e curvas do site; qualquer valor novo (como o retorno elástico) entra nesse conjunto, não avulso.
- RF17: **Menos movimento.** Com a preferência do aparelho por menos movimento, nada se move: as posições finais, os valores finais e os textos aparecem direto. Efeitos que seguem o cursor também ficam desligados.
- RF18: **Sem JavaScript e impressão.** Sem JavaScript e ao imprimir, todo o conteúdo aparece completo e legível, sem depender de rolagem, cursor ou animação.
- RF19: **Acessibilidade.** Nada pisca mais de 3 vezes por segundo. Nenhuma animação muda o que o leitor de tela lê, atrapalha a navegação por teclado ou esconde conteúdo. Ciclos contínuos (RF2, RF10, RF11) podem ser pausados pela preferência de menos movimento e param quando fora da vista.

## Fora de escopo
- Mudar textos, cores, layout, conteúdo ou a ordem das seções.
- Configuração para o visitante ligar ou desligar as animações, além da preferência do aparelho.
- Mudar o logo animado (`docs/specs/logo-animado/`) e o pacote já entregue de `docs/specs/animacoes-site/`.
- Som, vídeo de fundo, modelos 3D carregados e bibliotecas de animação pesadas.
- Novas páginas ou rotas só para receber a transição de RF15.

## Critérios de aceite
- [ ] Em computador com mouse, os cartões de Planos, Sistema e Diferencial mostram o brilho no ponto do cursor e o removem ao sair; em tela de toque, não há efeito (RF1).
- [ ] O Hero inclina com o cursor e as camadas se movem em ritmos diferentes; no celular só há a flutuação lenta (RF2).
- [ ] A faixa de pista se desenha com a rolagem, não cobre conteúdo nem gera rolagem horizontal em 320 px (RF3).
- [ ] Trocar de perfil faz as telas e o indicador transitarem, sem quadro em branco nem salto de altura (RF4).
- [ ] O preço dos planos conta até o valor final e o preço antigo é riscado; com menos movimento e sem JavaScript, o valor final correto já aparece (RF5).
- [ ] Os títulos entram linha a linha e o trecho amarelo ganha o sublinhado desenhado (RF6).
- [ ] O botão primário se move na direção do cursor e retorna elástico, sem alterar o tamanho nem a área de clique (RF7).
- [ ] No formulário, rótulo flutuante, tremor no campo inválido, carregamento e sucesso funcionam, e erros continuam anunciados pelo leitor de tela (RF8).
- [ ] A linha de progresso de leitura acompanha a rolagem de 0 a 100% (RF9).
- [ ] Os eventos dentro das telas do sistema se repetem e pausam fora da vista (RF10).
- [ ] O fundo tem grão e movimento lento sem que o texto perca contraste mínimo de 4,5:1 (RF11).
- [ ] Seleção, foco, links do rodapé e destaque da busca do FAQ seguem o descrito (RF12 a RF14); a transição entre páginas existe se houver navegação interna (RF15).
- [ ] Nenhuma duração ou curva nova fica fora do conjunto único de movimento (RF16).
- [ ] Com "menos movimento", sem JavaScript e na impressão, todo o conteúdo e os valores finais aparecem e nada se move (RF17, RF18).
- [ ] Nada pisca mais de 3 vezes por segundo e nada altera o que o leitor de tela lê ou a navegação por teclado (RF19).
- [ ] Os efeitos que seguem o cursor só existem em aparelhos com mouse.

## Métricas de sucesso
- Nenhuma piora nas métricas de desempenho da página inicial (carregamento, deslocamento visual do layout e fluidez da rolagem) em comparação com antes, em celular de médio porte.
- Aumento de cliques em "Começar grátis" e em "Falar com a equipe" nas semanas seguintes à publicação.
- Aumento da taxa de envio do formulário de contato (envios concluídos sobre formulários iniciados).
- Aumento da interação com o seletor de perfis (trocas por visita).
