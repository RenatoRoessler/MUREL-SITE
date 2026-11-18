# PRD: Logo animado do Murel no site

> Mesma animação já entregue no sistema (GIPE, `docs/specs/logo-animado/` daquele repositório). Referência visual: `prototipo.html` nesta pasta.

## Problema
O site institucional é a primeira impressão do Murel. Hoje o símbolo grande do topo só faz o carro subir até a vaga, uma vez, e o logo do cabeçalho é estático. O sistema já ganhou a animação em que o carro sai da vaga, vai embora, volta e estaciona; o site precisa contar a mesma história, para a marca ser a mesma nos dois lugares.

## Objetivo
O logo do cabeçalho e o símbolo grande do topo da página têm a mesma animação do sistema: dois ciclos de sair e voltar, terminando com o carro estacionado, que pode ser parada pelo próprio logo.

## Usuário-alvo
Donos e gestores de estacionamentos, valets e lava-rápidos que visitam o site no celular ou no computador.

## Requisitos funcionais
- RF1: O ciclo é o mesmo do sistema: o carro espera na vaga, sai de ré até a rua, segue para a esquerda e some, o logo fica vazio por um instante, o carro volta pela direita, faz a curva e estaciona. Faróis com facho, luz de freio e luz de ré.
- RF2: São **2 ciclos** e a animação termina com o carro estacionado na vaga do meio (o logo de sempre). Depois de **2 minutos** parada, ela roda os 2 ciclos de novo, enquanto a página estiver aberta (revisão de 2026-11-18).
- RF3: **Cabeçalho**: o logo (símbolo + "murel") anima ao abrir a página. O carro passa por baixo da palavra.
- RF4: **Topo da página (Hero)**: o símbolo grande anima com o novo ciclo, no lugar da animação atual. Como ele aparece sem a palavra, o carro entra e sai pelas bordas do próprio símbolo.
- RF5: **Rodapé**: o logo continua estático (fica no fim da página; a animação acabaria antes de ser vista).
- RF6: Passar o mouse, focar ou tocar no logo para a animação e põe o carro na vaga; ela não recomeça enquanto a página estiver aberta, nem pelo reinício de 2 minutos (WCAG 2.2.2).
- RF7: No cabeçalho, onde o logo é o link para o topo da página: durante a animação o primeiro toque ou clique só para; com a animação parada, o link funciona como hoje. Pelo teclado, o foco já para e Enter segue o link.
- RF8: Com a preferência do aparelho por **menos movimento**, não há animação. Na impressão, o carro aparece estacionado.
- RF9: O carro nunca passa por cima de texto ou botões vizinhos: a faixa da rua, logo abaixo das vagas, é reservada no layout.
- RF10: O logo e o símbolo continuam com os mesmos nomes acessíveis; a animação não é anunciada.

## Fora de escopo
- Mudar o desenho do símbolo, a palavra, as cores ou o tamanho.
- Animar o rodapé, o card de compartilhamento (Open Graph) ou o favicon.
- Configuração para desligar a animação, além de parar pelo logo e da preferência do aparelho.

## Critérios de aceite
- [ ] Cabeçalho e Hero fazem o ciclo do sistema, 2 vezes, e terminam com o carro na vaga.
- [ ] O rodapé fica estático.
- [ ] Hover, foco e toque param a animação; no cabeçalho o primeiro clique durante a animação só para, e o seguinte segue o link.
- [ ] Com "menos movimento", sem animação; na impressão, carro estacionado.
- [ ] O carro não cobre texto nem botões; sem rolagem horizontal em 320px.

## Métricas de sucesso
- Nenhuma piora de desempenho percebida na página inicial (a animação não atrasa a primeira renderização).
