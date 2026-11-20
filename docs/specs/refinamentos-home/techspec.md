# Tech Spec: Refinamentos da home (layout, animações e usabilidade)

## Referências
- PRD: ./prd.md
- Specs vizinhas: `docs/specs/redesenho-layout-home/`, `docs/specs/animacoes-site/` (movimento, `Revelar`, `comMovimento`) e `docs/specs/whatsapp-contato/`.
- Design: seção "Design" abaixo; as decisões visuais passam pela skill `.agents/skills/impeccable`, que já tem o `PRODUCT.md` do projeto.

## Design

### Princípios
- Mesma identidade (asfalto, amarelo, Plus Jakarta Sans, pista tracejada). Mudam estrutura, ritmo e comportamento, não paleta nem fonte.
- Conteúdo e textos atuais ficam. As trocas de texto são só as que o PRD pede (rótulos do formulário, contagens, legendas).
- Movimento sempre dentro de `comMovimento` e, quando possível, só CSS.

### Usabilidade
- **WhatsApp (RF1, RF22):** o botão aparece como hoje (ao chegar no FAQ), com o rótulo "Estamos online!" e o anel. Depois de cerca de 6 s, o rótulo encolhe e fica só o círculo de 56 px. Dentro da seção de Contato, o botão some. Quando a barra fixa (abaixo) está na tela, ele sobe para ficar acima dela.
- **Menu do celular (RF2):** o painel abre como hoje; passa a ter um fundo escuro translúcido sobre a página (abaixo do header), fecha por Esc, por toque no fundo ou ao escolher um link, e devolve o foco ao botão do menu.
- **Barra fixa (RF3):** faixa de 72 px na base, só abaixo de `md`, com o botão "Começar grátis" (texto do back-end, via `botaoTeste`). Entra com subida de 300 ms depois do Hero e sai quando o Hero volta, quando o Contato ou o rodapé aparecem, e enquanto um campo de formulário tem foco (teclado virtual).
- **Contato (RF4, RF5):** as três formas de contato viram abas (modelo C, escolhido): "Escrever mensagem", "Falar agora" e "Ver funcionando". A chamada para o mês grátis fica separada do formulário, na terceira aba. No formulário, Nome e Mensagem são os obrigatórios (rótulo "obrigatório"); E-mail e Telefone ganham o rótulo "(ou telefone)" e "(ou e-mail)", e o aviso "Informe pelo menos um" passa a ficar logo abaixo desses dois campos, ligado a eles por `aria-describedby`.
- **FAQ (RF6, RF12):** lista única com os cabeçalhos de grupo e barra de ferramentas com busca ("Buscar nas perguntas") e o botão "Abrir todas" / "Fechar todas"; a busca ignora acento e caixa e filtra pergunta e resposta; sem resultado, mostra "Nenhuma pergunta encontrada" e o link para o contato. Uma região `aria-live="polite"` anuncia "N perguntas".
- **Sistema no celular (RF7):** abaixo do carrossel, ao lado dos pontos, o título da tela atual e "N de M".
- **Plano no celular (RF8):** cada grupo recolhido mostra "N áreas" ao lado do título.

### Layout
- **Hero (RF9):** o símbolo sai do canto inferior esquerdo e vai para o canto superior direito, acima do segundo celular, menor (cerca de 96 px). No desktop, o conjunto de celulares fica um pouco menor (largura de 220 px) e o Hero perde espaço vertical, para a faixa de destaques aparecer inteira em 1280x800.
- **Fundo alternado (RF13):** as seções Sistema e Perguntas usam fundo `asfalto2` de ponta a ponta; as outras ficam em `asfalto`. Os textos já usados nessas seções têm contraste maior que 4,5:1 sobre `asfalto2` (conferir no teste de tema).
- **Diferencial, Contato + FAQ e rodapé (RF10 a RF12, RF14):** modelos escolhidos na T1, descritos abaixo.

#### Escolhas do usuário (T1, 20/11/2026)
Protótipos em `layouts.html` e `layouts.png`. **Diferencial C** (três cartões com o número no topo), **Contato + FAQ C** (Contato com abas; FAQ em uma coluna com cabeçalhos de grupo) e **Rodapé A** (quatro colunas).

- **Contato com abas:** três abas, "Escrever mensagem" (aberta por padrão, com o formulário), "Falar agora" (WhatsApp, e-mail e "A gente responde por e-mail ou telefone") e "Ver funcionando" (mês grátis). Os painéis ficam no HTML; só o ativo aparece, e só com JavaScript (`@media (scripting: enabled)`); sem JavaScript, os três aparecem em sequência. O formulário mantém o que foi digitado ao trocar de aba.
- **FAQ em uma coluna:** lista única, com os cabeçalhos "Preço e teste" e "Como funciona", busca e "Abrir todas" no topo.
- **Diferencial em cartões:** três cartões com borda, número grande (com rolo de dígitos) no topo, título e texto abaixo.

#### Modelos avaliados (RF27)
| Bloco | A | B | C |
|---|---|---|---|
| **Diferencial** | faixa com os três números muito grandes e centralizados, sobre `asfalto2` (recomendado) | números grandes à esquerda de cada coluna, com a pista tracejada vertical entre eles | três cartões lado a lado, com o número no topo |
| **Contato + FAQ** | **Contato:** formulário à esquerda e, à direita, cartão fixo com WhatsApp, e-mail e a frase "A gente responde por e-mail ou telefone". **FAQ:** título e chamada à esquerda, lista à direita, em dois grupos (recomendado) | **Contato:** atalhos em linha no topo e formulário em largura total. **FAQ:** lista em duas colunas | **Contato:** abas "Falar agora" e "Escrever mensagem". **FAQ:** lista única com cabeçalhos de grupo |
| **Rodapé** | quatro colunas: marca e contato, seções, legal (termos e privacidade) e ações | duas linhas: links em uma, marca e botões em outra | uma coluna centralizada, no estilo "cartão de visita" |

### Animações
- **Menu ativo (RF15):** o link da seção em que a pessoa está recebe o destaque (cor amarela) e `aria-current="location"`. No desktop, um traço de 2 px sob o menu desliza entre os links (200 ms); no celular, só o destaque.
- **Troca de tela no Sistema (RF16):** a tela ativa entra com fade e subida de 8 px em 220 ms ao ser mostrada.
- **Pista em "Como funciona" (RF17):** ao revelar a seção, a faixa tracejada se desenha de um passo ao outro (recorte animado, com atraso por etapa) e, no desktop, o símbolo do carro (pequeno, só o desenho) percorre a pista em cerca de 3 s e estaciona na última etapa. No celular só a faixa e os pontos aparecem, em sequência.
- **Números do Diferencial (RF18):** efeito de rolo de dígitos (odômetro): cada número rola de 9 até o valor ("0", "0", "2") ao entrar na tela. Ver "Decisões" sobre a diferença em relação ao texto do PRD.
- **Hero (RF19):** as duas molduras sobem em ritmos diferentes conforme a rolagem (cerca de 20 px e 50 px ao longo de 600 px de rolagem), só onde o navegador suporta animação ligada à rolagem.
- **Plano (RF20):** uma faixa de luz atravessa o preço uma vez, 600 ms depois de o bloco aparecer.
- **FAQ (RF21):** a resposta aparece com fade de 250 ms ao abrir, junto da animação de altura.

### Componentes do design system reaproveitados
`Section`, `Button`, `Revelar`, `Garantias`, `TelaSistema`, `comMovimento` e `brilho`, `useNavegacaoPorSetas`.

### Tokens
- `theme.layout.barraFixa: "72px"` (altura da barra fixa e deslocamento do WhatsApp).
- Sem tokens de cor novos.

## Arquitetura da solução

### Utilitários compartilhados
- `src/hooks/useSecaoEmVista.ts`: `useSecaoEmVista(ids, opcoes)` devolve se alguma das seções está na tela (IntersectionObserver, via `useSyncExternalStore`, com o servidor devolvendo `false`). Usado pela barra fixa, pelo WhatsApp e pelo menu ativo.
- `src/hooks/useSecaoAtiva.ts`: devolve o id da seção que ocupa a faixa central da tela, a partir de uma lista de ids (para o menu ativo).

### Usabilidade
- `src/components/layout/BarraComecar/BarraComecar.tsx`, `.styles.ts`, `.test.tsx` (**Client**): barra fixa. Recebe `teste`. Esconde com `visibility` e transição; publica a altura em `--barra-fixa` no `documentElement` enquanto visível, para o WhatsApp subir. `page.tsx` a renderiza ao lado do `BotaoWhatsapp`.
- `BotaoWhatsapp.tsx` e `.styles.ts`: segue o IntersectionObserver de hoje e acrescenta (a) esconder dentro de `#contato`, (b) estado `compacto` depois de cerca de 6 s da primeira aparição (timer limpo ao desmontar), (c) `bottom` somando `var(--barra-fixa, 0px)`. O rótulo encolhe por `max-width` e `opacity` (o botão é `fixed`, então o encolher não desloca a página).
- `Header.tsx` e `Header.styles.ts`: tratamento de `Esc` e de toque fora (listeners só com o menu aberto), `Fundo` (elemento `fixed`, `aria-hidden`, abaixo do header, só abaixo de `lg`), foco de volta no `BotaoMenu` (ref) e menu ativo (`useSecaoAtiva`, `aria-current`, traço deslizante calculado a partir das posições dos links, atualizado também no redimensionamento).
- `Contato.tsx` e `.styles.ts`: nova ordem (atalhos, formulário, mês grátis) e o layout do modelo escolhido. `ContatoForm.tsx`: rótulos, `Aviso` dentro da grade e `aria-describedby` em E-mail e Telefone. O esquema de validação não muda (já exige só nome, mensagem e e-mail ou telefone).
- `Faq.tsx` (Server) passa as perguntas, com o novo campo `grupo`, para `PerguntasFaq.tsx` e `.styles.ts` (**Client**): busca, abrir e fechar todas, grupos. `Faq.data.ts` ganha `grupo` em cada pergunta ("Preço e teste" ou "Como funciona"), sem mudar nenhum texto. O estado de aberto de cada pergunta fica em um conjunto no cliente, e a busca usa um normalizador (sem acento, minúsculas).
- `CarrosselTelas.tsx` e `TelasDoPerfil.tsx`: `slides` ganha `titulo`; legenda visível abaixo de `lg` ("Título · N de M"), escondida no painel do desktop.
- `GruposDoPlano.tsx` e `.styles.ts`: contagem "N áreas" no resumo do acordeão.

### Layout
- `Hero.styles.ts` e `Hero.tsx`: posição do símbolo, tamanho das molduras e espaçamento vertical.
- `Section.tsx` e `Section.styles.ts`: nova prop `fundo?: "alternado"`; o fundo é de ponta a ponta com `box-shadow` e `clip-path` (técnica de fundo cheio sem mexer no contêiner). `Sistema.tsx` e `Faq.tsx` passam `fundo="alternado"`.
- `Diferencial.tsx` e `.styles.ts`: modelo escolhido; o número vira `RoloDeDigitos` (componente de apresentação, Server, só CSS).
- `Footer.tsx` e `Footer.styles.ts`: modelo escolhido. `src/lib/config.ts` ganha `urlTermos` e `urlPrivacidade`, lidas de `NEXT_PUBLIC_URL_TERMOS` e `NEXT_PUBLIC_URL_PRIVACIDADE` (e documentadas em `.env.example`); o rodapé só mostra os links quando as variáveis existem.

### Animações
- `ComoFunciona.styles.ts` e `ComoFunciona.tsx`: animações da pista (recorte animado nos conectores, pontos em sequência) e o carro, só no desktop, dentro de `comMovimento` e ligadas a `[data-estado="visivel"]` do `Revelar`.
- `Hero.styles.ts`: animações ligadas à rolagem dentro de `@supports (animation-timeline: scroll())`, usando a propriedade `translate` (separada de `transform`, que já traz a rotação).
- `CartaoPlano.styles.ts`: brilho sobre o preço, disparado pelo `data-estado="visivel"` do bloco.
- `CarrosselTelas.styles.ts` ou `TelaPerfil.styles.ts`: animação de entrada da tela ativa no painel do desktop.
- `Faq.styles.ts`: fade da resposta.

### Server vs Client
- Server: `Diferencial`, `Footer`, `Contato` (a casca), `Faq` (a casca), `ComoFunciona`.
- Client: `BarraComecar`, `BotaoWhatsapp`, `Header`, `ContatoForm`, `PerguntasFaq`, `CarrosselTelas`, `TelasDoPerfil`, `GruposDoPlano`.

### Testes
- `BarraComecar.test.tsx`: aparece depois do Hero, some no Hero, no Contato, no rodapé e com campo em foco; texto com e sem teste; publica e limpa `--barra-fixa`.
- `BotaoWhatsapp.test.tsx`: some no Contato, vira compacto depois do tempo, sobe quando há barra.
- `Header.test.tsx`: Esc, toque fora, retorno do foco e `aria-current` da seção ativa.
- `ContatoForm.test.tsx` e `Contato.test.tsx`: rótulos, aviso ligado aos campos e nova ordem.
- `Faq.test.tsx` e novo `PerguntasFaq.test.tsx`: busca com acento, lista vazia, abrir todas, grupos e as 12 perguntas.
- `CarrosselTelas.test.tsx`/`TelasDoPerfil.test.tsx`: legenda "N de M".
- `GruposDoPlano.test.tsx`: contagem de áreas.
- `Footer.test.tsx`: links de seção; termos e privacidade só com as variáveis definidas.
- `Diferencial.test.tsx`: mesmos textos e o rolo de dígitos com o valor final no HTML.
- `theme.test.ts`: contraste dos textos usados sobre `asfalto2`.
- Verificação manual no navegador: teclado, leitor de tela, 320 a 1280 px, "menos movimento", sem JavaScript, impressão, LCP e CLS.

## Decisões e trade-offs
- **Rolo de dígitos em vez de contagem de 0 até o valor (RF18):** os números do Diferencial são "0", "0" e "2"; contar de 0 até 0 não mostra nada. O rolo de 9 até o valor dá o efeito pedido (movimento ao entrar na tela) e funciona com zero. Sugestão: ajustar o texto do RF18 do PRD para "rolam até o valor".
- **Barra fixa só em `md` para baixo:** no desktop o header já mostra "Começar grátis" sempre.
- **Esconder o WhatsApp no Contato em vez de reposicionar:** a seção já tem a chamada do WhatsApp, e o botão flutuante competiria com ela e com o teclado virtual.
- **Variável CSS `--barra-fixa` para a convivência:** evita que os dois componentes precisem se conhecer; cada um só lê ou publica um valor.
- **Animação da pista em CSS:** sem biblioteca; a precisão das paradas do carro é aproximada (a largura das etapas varia), o que é aceitável para um efeito decorativo.
- **Parallax só com animação ligada à rolagem:** onde não há suporte, as molduras ficam paradas, sem JavaScript de rolagem e sem custo.
- **Fundo alternado de ponta a ponta com `box-shadow` e `clip-path`:** o corpo da página tem preenchimento lateral; assim o fundo ocupa a largura toda sem mexer na estrutura das seções.
- **Termos e privacidade só com variável de ambiente:** o site não conhece esses endereços hoje (o texto aparece só na adesão). Sem a variável, o link não aparece, em vez de apontar para um endereço inventado.

## Riscos / pontos de atenção
- **Quantidade de mudanças:** 22 itens em muitos arquivos; a ordem das tasks começa pelo que corrige problemas reais (WhatsApp, menu, barra fixa).
- **Barra fixa e teclado virtual:** a regra de esconder com foco em campo precisa de teste em celular real; o `visualViewport` pode ser necessário em alguns navegadores.
- **Menu com fundo e foco:** o fundo não prende o foco (não é um diálogo modal); conferir a ordem do Tab e o retorno do foco com leitor de tela.
- **Animações ligadas à rolagem e `container` queries** têm suporte parcial; todas ficam dentro de `@supports` e o conteúdo funciona sem elas.
- **Menu ativo:** seções altas (Sistema, Plano) podem dar "salto" de destaque; usar faixa central estreita e histerese.
- **Busca do FAQ** precisa lidar com respostas montadas pelo back-end (preço e data) e com lista vazia.
- **Fundo alternado:** conferir o contraste de cada texto das duas seções e os campos do formulário se algum dia ficarem sobre `asfalto2`.
- **Termos e privacidade:** se o produto não tiver essas páginas públicas, o rodapé fica sem a coluna legal e isso é registrado.
- **Next.js:** consultar `node_modules/next/dist/docs/` antes de mexer em componentes de cliente e em variáveis `NEXT_PUBLIC_*`, como pede o `AGENTS.md`.

## Fora de escopo técnico
- Preços, planos, regras do teste grátis e textos de oferta.
- Novas capturas, novos perfis, novas rotas e mudanças no sistema (o app).
- Medição de cliques, testes A/B e regras de envio do formulário no back-end.
- Modo claro do site.
