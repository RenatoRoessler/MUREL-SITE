# PRD: Animações do site (pacote inicial)

## Problema
O site institucional é a primeira impressão do Murel, mas fora do logo animado ele é estático: seções, cards e preços aparecem prontos, os botões só trocam de cor, o menu do celular surge de uma vez e o FAQ abre e fecha seco. A página parece parada para quem rola, e a identidade da marca (pista, faixas tracejadas, amarelo) não aparece no movimento. Isso reduz o interesse de quem chega e a força das chamadas para o teste grátis.

## Objetivo
A página inicial ganha movimento discreto e consistente, que guia o olhar pelas seções, dá resposta imediata a toques e cliques e reforça o teste grátis, sem atrasar a página nem atrapalhar a leitura. Tudo respeita a preferência do aparelho por menos movimento.

## Usuário-alvo
Donos e gestores de estacionamentos, valets e lava-rápidos que visitam o site no celular ou no computador, muitas vezes em aparelhos simples e com conexão média.

## Requisitos funcionais
- RF1: **Revelação ao rolar.** Títulos, cards e listas das seções Diferencial, Como funciona, Planos e FAQ entram com fade e leve subida quando chegam à tela. Itens de uma mesma lista entram em sequência, com pequeno intervalo entre eles. Cada elemento anima uma vez só.
- RF2: **Entrada do topo (Hero).** Ao abrir a página, título, subtítulo, botões e garantias entram em sequência. O trecho em amarelo do título ganha um destaque que se desenha. Não pode atrasar a leitura nem o clique nos botões.
- RF3: **Botões.** O botão primário reage ao hover (leve subida) e ao clique (leve pressão). O botão "Começar grátis" do topo tem um brilho que passa de vez em quando para chamar atenção, sem ficar piscando.
- RF4: **Cards.** Os cards de Como funciona e de Planos reagem ao hover (subida e realce da borda em amarelo). O selo de promoção tem um brilho que o atravessa de vez em quando.
- RF5: **Header.** Transparente ou discreto no topo da página; ganha fundo com desfoque e sombra depois de rolar um pouco. O menu do celular abre e fecha com transição, com os links entrando em sequência.
- RF6: **FAQ.** A abertura e o fechamento de cada pergunta animam a altura, e o ícone gira.
- RF7: **Botão do WhatsApp.** Chama atenção nos primeiros segundos com um anel pulsando e depois só esporadicamente, nunca de forma contínua.
- RF8: **Padrão de movimento.** Durações e curvas seguem um conjunto único de valores, para que todo o site tenha o mesmo ritmo.
- RF9: **Menos movimento.** Com a preferência do aparelho por menos movimento, nenhuma dessas animações roda e todo o conteúdo aparece direto. Sem JavaScript, o conteúdo também aparece direto.
- RF10: **Impressão.** Ao imprimir, todo o conteúdo aparece, sem depender de rolagem.

## Fora de escopo
- Mudar o logo animado (já entregue em `docs/specs/logo-animado/`).
- Contagem animada de números e preços (odômetro) e preço riscado desenhado.
- Faixa de pista que se desenha na rolagem e fundo com parallax.
- Animações dentro dos mockups do carrossel de telas e transições do seletor de perfil.
- Check animado e shake no formulário de contato.
- Barra de progresso de leitura no header.
- Configuração para o visitante desligar as animações, além da preferência do aparelho.
- Mudar textos, cores, layout ou conteúdo das seções.

## Critérios de aceite
- [ ] Diferencial, Como funciona, Planos e FAQ revelam o conteúdo ao rolar, uma vez por elemento, e em sequência nas listas.
- [ ] O Hero entra em sequência ao abrir a página, e os botões já são clicáveis desde o início.
- [ ] Botões, cards e selo de promoção reagem como descrito, sem mudar o tamanho do layout (nada pula nem empurra o texto).
- [ ] O header ganha fundo e sombra após rolar e o menu do celular abre e fecha com transição.
- [ ] O FAQ anima a altura e o ícone, e continua acessível por teclado e leitor de tela.
- [ ] O anel do botão do WhatsApp aparece no início e depois só de vez em quando.
- [ ] Com "menos movimento", sem JavaScript e na impressão, todo o conteúdo fica visível e nada se move.
- [ ] Sem rolagem horizontal em 320px e sem mudança nos textos lidos por leitor de tela.
- [ ] A animação não piora a velocidade percebida da página: o conteúdo acima da dobra aparece sem esperar nenhum efeito.

## Métricas de sucesso
- Nenhuma piora nas métricas de desempenho da página inicial (carregamento e deslocamento visual do layout) em comparação com antes.
- Aumento de cliques em "Começar grátis" e em "Falar com a equipe", medido pela contagem de cliques nos botões ao longo das semanas seguintes à publicação.
