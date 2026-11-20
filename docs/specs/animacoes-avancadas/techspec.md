# Tech Spec: Animações avançadas do site

## Referências
- PRD: ./prd.md
- Base: `docs/specs/animacoes-site/techspec.md` (pacote inicial, já entregue). Esta spec **estende** `src/styles/movimento.ts`, `theme.motion` e `Revelar`, não os refaz.
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe no projeto, então as decisões visuais ficam registradas aqui.
- Next.js: nenhum arquivo de `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` é necessário, exceto para RF15 (ver "Decisões").

## Design

### Princípios
- Só `transform`, `opacity` e propriedades customizadas (`--x`, `--y`, `--progresso`) se movem. Nada muda o tamanho do layout (sem CLS).
- **CSS primeiro.** JavaScript só onde há estado de entrada real (cursor, rolagem, ciclo de vida de um mock). Efeitos de cursor escrevem **variáveis CSS** direto no elemento via `ref` (sem `setState` por `pointermove`, sem re-render).
- Todo movimento passa por `comMovimento()` (`prefers-reduced-motion: no-preference`). Efeitos de cursor passam por `comCursorFino()` (novo): `@media (hover: hover) and (pointer: fine)` **e** sem preferência por menos movimento. Os hooks de cursor também checam `matchMedia` antes de registrar listeners.
- O estado final é o estado normal da página: sem JS, com "menos movimento" e na impressão, o HTML/CSS já mostra o valor, o texto e a posição finais (RF17, RF18).
- Ciclos contínuos (RF2 flutuação, RF10, RF11) pausam fora da vista (`useSecaoEmVista`/`IntersectionObserver`) e com a aba em segundo plano (`animation-play-state` via `data-ativo`).

### Tokens de movimento (acréscimos em `theme.motion`)
| Token | Valor | Uso |
|---|---|---|
| `curva.elastica` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | retorno do botão magnético, check do envio |
| `duracao.ciclo` | `{ lento: 6000, fundo: 40000 }` | ciclo dos mocks (RF10), deslocamento do fundo (RF11) |
| `cursor.raio` | `240` (px) | alcance da luz de farol (RF1) |
| `cursor.magnetismo` | `{ alcance: 80, forca: 0.25, maximo: 6 }` | botão magnético (RF7) |
| `cursor.inclinacao` | `6` (graus, máximo) | tilt do Hero (RF2) |

Tokens de cor novos, derivados da paleta (sem cor nova): `colors.farol` = `rgba(255,194,14,0.18)` (amarelo a 18%) e `colors.farolBorda` = `rgba(255,194,14,0.55)`. Entram em `theme.ts` e `styled.d.ts`, com checagem em `theme.test.ts`.

### Comportamento por peça

**RF1 · Luz de farol.** Cartões ganham dois pseudo-elementos sobrepostos (`::before` fundo, `::after` borda com `mask` de borda) com `radial-gradient(circle at var(--x) var(--y), …)`. Opacidade 0 em repouso; 1 no `:hover`. `--x`/`--y` em px relativos ao cartão, atualizados por `useLuzDeFarol` (ver abaixo). Aplica em `CartaoPlano`/bloco de oferta, cartões de `Diferencial` e o painel de telas de `Sistema`.

**RF2 · Topo com profundidade.** `Aparelhos` recebe `--rx`/`--ry` (−1…1) do cursor e cada camada aplica `translate3d` com ganho próprio (símbolo 0,4; tela do fundo 0,7; tela da frente 1,0) mais `rotateX/Y` de até 6° no conjunto, sob `perspective`. Os brilhos à frente são um `::after` com gradiente que se desloca no sentido oposto. Com cursor grosso (celular), mantém só `flutuar` (já existente), sem listener. Interpolação por `transition` curta (150ms, `curva.padrao`) em vez de laço `requestAnimationFrame`.

**RF3 · Faixa de pista.** Um elemento fixo à esquerda do conteúdo (só em `lg`+; some abaixo disso para não cobrir texto), com `repeating-linear-gradient` tracejado amarelo. Desenha-se com `animation-timeline: scroll(root)` e `clip-path`/`scaleY` de 0 a 1. **Detecção por `@supports (animation-timeline: scroll())`**; sem suporte, a faixa fica completa e estática com opacidade baixa (nunca escondida). `pointer-events: none`, `aria-hidden`, atrás do conteúdo (`z-index` negativo no contexto da `main`).

**RF4 · Troca de perfil.**
- Painéis: continuam todos no DOM (`hidden`), como hoje. Ao ativar, o painel recebe `data-entrando="proximo|anterior"` (direção por índice) e roda `entrarNoPerfil` (fade + `translateX(±24px)`, `duracao.media`, `curva.saida`) com `backwards`. Sem saída animada do anterior (ele some por `hidden`), o que evita quadro em branco e salto de altura: a altura é a do painel novo, já medida pelo navegador.
- Indicador: um `Pilula` absoluto dentro de `Abas`, com `transform: translateX(var(--pilula-x)) ; width: var(--pilula-w)` e `transition` (`duracao.media`, `curva.saida`). `SeletorPerfil` mede a aba ativa em `useLayoutEffect` (e em `ResizeObserver` do `Abas`) e grava as duas variáveis. **Fallback:** a aba com `aria-selected="true"` mantém o próprio fundo amarelo; o `Pilula` só aparece (`data-pronto`) depois da primeira medição, e então o fundo da aba ativa fica transparente. Sem JS, vale o fundo da aba.

**RF5 · Preços e promoção.**
- Contagem: novo `ContadorDePreco` (Client) recebe `valor` (number) e o `texto` já formatado pelo servidor (`formatarReais`). Renderiza `texto` no HTML (SSR, leitor de tela, sem JS) e, ao entrar na vista com movimento permitido, troca por uma animação 0 → `valor` de 800ms (`easeOutExpo` em `requestAnimationFrame`) usando `Intl.NumberFormat("pt-BR", currency BRL)` com `font-variant-numeric: tabular-nums` e largura mínima reservada (`min-width` em `ch`) para não mudar o layout. Ao terminar, volta exatamente ao `texto`. `aria-label={texto}` no envoltório e a contagem em `aria-hidden`.
- Preço antigo: o `<s>` perde o `text-decoration` e ganha um `::after` de 2px (`scaleX` 0 → 1, `transform-origin: left`, 400ms, atraso de 600ms depois da revelação). Sem movimento, a linha já é desenhada. Mantém `<s>` e `SoLeitor` para leitores de tela.

**RF6 · Títulos em linhas.** `Section` passa a renderizar o título com `TituloEmLinhas`: cada linha visual vira um `<span class="linha"><span>…</span></span>` (máscara `overflow: clip`, filho sobe de `translateY(110%)`). A divisão em linhas é **visual, feita no cliente** por medição (`Range.getClientRects` por palavra) em `useLinhasDoTitulo`, e só depois de `document.fonts.ready`. O HTML do servidor mantém o `<h2>` com texto corrido (fallback sem JS) e o `Revelar` atual do cabeçalho segue valendo até a divisão pronta. O texto acessível não muda (`aria-label` no `<h2>` = título, spans `aria-hidden`). `em` amarelo reaproveita o sublinhado `desenhar` do Hero (extraído para `movimento.ts`).

**RF7 · Botão magnético.** `useMagnetismo(ref)` escuta `pointermove` no `document` só enquanto o botão está a menos de `alcance` px (checado por `getBoundingClientRect` em cache por `pointerenter` num anel invisível, não por quadro) e grava `--mx`/`--my` (limitados a `maximo` px). O `Button` aplica `translate: var(--mx, 0) var(--my, 0)` (propriedade `translate`, independente do `transform` do hover/clique). Ao sair, remove as variáveis e a `transition` com `curva.elastica` devolve. **Não altera `getBoundingClientRect` do layout** (apenas `translate`), então a área de clique visual acompanha, e o alvo de toque real não muda. Ativado por prop `magnetico` só no CTA principal do Hero, no da barra de planos e no do contato.

**RF8 · Formulário de contato.**
- Rótulo flutuante: `Campo` passa a usar `:placeholder-shown`/`:focus-within` para subir o `Rotulo` (`translateY(-…) scale(0.85)`, `duracao.rapida`). O rótulo continua um `<label>` real e visível; o texto "(obrigatório)" é preservado. Selects e área de texto mantêm o rótulo acima (sem flutuar), por serem sempre "preenchidos".
- Tremor: `Entrada[aria-invalid="true"]` roda `tremer` (`translateX` ±4px, 3 ciclos, 300ms) **uma vez por envio com erro**. Como o `aria-invalid` permanece entre envios, o `ContatoForm` incrementa um contador `tentativa` (já derivável do `estado`) e o passa como `key`/`data-tentativa` ao campo para reiniciar a animação. Não mexe em foco nem no `role="alert"`.
- Botão: `BotaoEnviar` mostra um spinner (SVG, `rotate` contínuo) no lugar do texto enquanto `pending`, mantendo o texto "Enviando..." na leitura (`SoLeitor`). Ao `enviado`, a `Confirmacao` ganha um círculo + check que se desenham (`stroke-dashoffset`, `curva.elastica` na escala final). O `role="status"` e o texto atuais ficam.

**RF9 · Progresso de leitura.** Linha de 3px, `position: fixed`, topo, `z-index` acima do `Header`, `scaleX` 0 → 1 por `animation-timeline: scroll(root)`. Fallback sem suporte: escondida (`display: none` dentro de `@supports not`), por ser puramente aditiva. `aria-hidden`.

**RF10 · Telas vivas.** Camada decorativa por tela (`CamadaViva`, `aria-hidden`, `pointer-events: none`) posicionada em % sobre a imagem: um "toque" (anel que cresce e some), um *chip* de status que troca "em fila" → "pronto" por `opacity` e um item "fantasma" que desliza para dentro de uma lista. Cada tela do `Sistema.data.ts` ganha um campo opcional `vida` com os eventos e posições (em %), e as telas sem `vida` não renderizam camada. Ciclo de `duracao.ciclo.lento`; `animation-play-state: paused` quando fora da vista (`data-ativo`, vindo do `IntersectionObserver` do painel/carrossel). As posições em % dependem do recorte de cada print: ficam como dados, ajustáveis sem mexer em componente.

**RF11 · Fundo com vida.** `body::before` fixo, `inset: 0`, atrás de tudo (`z-index: -1`): (a) `background-image` de ruído em SVG inline (`data:` URI pequeno, `feTurbulence`) a 3% de opacidade; (b) dois `radial-gradient` grandes de `asfalto2` que derivam por `translate` em ciclo de 40s. `will-change: transform`. As seções de fundo alternado continuam sólidas por cima. Contraste do texto verificado contra a cor mais clara possível do fundo (ver critérios).

**RF12 · Seleção e foco.** `::selection { background: amarelo; color: asfalto }` no `GlobalStyle`. O `:focus-visible` existente ganha `transition: outline-offset duracao.rapida` (de 0 a 3px) sob `comMovimento`.

**RF13 · Links do rodapé.** `Footer.styles.ts`: sublinhado por `background-size` 0 → 100% (`duracao.media`) em `:hover` e `:focus-visible`, sob `comMovimento`; sem movimento, sublinhado estático no hover/foco.

**RF14 · Marca-texto da busca.** `PerguntasFaq` passa a dividir pergunta e resposta pelo termo (comparação já normalizada por `normalizarTexto`, mapeando índices de volta ao texto original) e a envolver o trecho em `<mark>`, com fundo amarelo a 35% que se desenha (`background-size` 0 → 100%). `<mark>` é semântico e lido normalmente. Sem termo, o texto é o de hoje.

**RF15 · Transição entre páginas.** Hoje só existe a rota `/`. Entrega apenas a **infraestrutura**: `<ViewTransition>` do React envolvendo `{children}` do `layout.tsx` com `default="auto"`, mais as regras `::view-transition-*` sob `comMovimento`. Sem outra rota, não há o que transitar, e o critério de aceite é condicional (PRD). Não adicionar rotas para testar.

### Convenções de acabamento
- Reaproveitar `comMovimento`, `revelar`, `brilho`, `aparecer`; novos keyframes compartilhados (`desenhar`, `tremor`, `girar`) vão para `src/styles/movimento.ts`; os de uso único ficam no `.styles.ts` do componente.
- Nada de bibliotecas de animação. Orçamento extra de JS: só os hooks abaixo (~2 KB).

## Arquitetura da solução

### Arquivos novos
- `src/hooks/useLuzDeFarol.ts` (**Client**): recebe um `ref`, registra `pointermove`/`pointerleave` (com `{ passive: true }`) só se `matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")` casar, escreve `--x`/`--y` no elemento, agenda no máximo uma escrita por quadro (`requestAnimationFrame`). Remove tudo no cleanup.
- `src/hooks/useInclinacao.ts` (**Client**): mesmo padrão, escreve `--rx`/`--ry` normalizados (−1…1).
- `src/hooks/useMagnetismo.ts` (**Client**): ver RF7.
- `src/hooks/useEntradaDeCursor.ts` (**Client**): utilitário comum aos três acima (checagem do `matchMedia`, assinatura e limpeza), para não repetir a lógica.
- `src/hooks/useLinhasDoTitulo.ts` (**Client**): ver RF6.
- `src/components/ui/CartaoComFarol/CartaoComFarol.tsx` + `.styles.ts` (**Client**): `as`-polimórfico que aplica `useLuzDeFarol` e os pseudo-elementos; substitui o `Cartao`/painel nos três usos de RF1.
- `src/components/ui/ContadorDePreco/ContadorDePreco.tsx` + `.styles.ts` (**Client**) (RF5).
- `src/components/ui/TituloEmLinhas/TituloEmLinhas.tsx` + `.styles.ts` (**Client**) (RF6).
- `src/components/layout/FaixaDePista/FaixaDePista.tsx` + `.styles.ts` (**Server**, só CSS) (RF3).
- `src/components/layout/ProgressoDeLeitura/ProgressoDeLeitura.tsx` + `.styles.ts` (**Server**, só CSS) (RF9).
- `src/components/ui/CamadaViva/CamadaViva.tsx` + `.styles.ts` (**Client**: recebe `ativo` do `IntersectionObserver`) (RF10).
- `src/components/ui/Marcador/Marcador.tsx` (**Server**): função `destacar(texto, termo)` e componente que devolve `ReactNode` com `<mark>` (RF14), com teste de unidade da função pura.
- `src/components/layout/FundoVivo/FundoVivo.tsx` ou regra no `GlobalStyle` (ver Decisões) (RF11).
- Testes `.test.tsx`/`.test.ts` ao lado de cada peça nova (Vitest + Testing Library).

### Arquivos alterados
- `src/styles/theme.ts`, `src/styles/styled.d.ts`, `src/styles/theme.test.ts`: tokens da tabela acima.
- `src/styles/movimento.ts` (+ `movimento.test.ts`): `comCursorFino`, keyframes compartilhados (`desenhar`, `tremor`, `girar`).
- `src/styles/GlobalStyle.ts`: `::selection`, transição do foco, fundo vivo (se mantido global).
- `src/app/layout.tsx`: `ViewTransition` (RF15); montagem de `ProgressoDeLeitura` (RF9).
- `src/app/page.tsx`: `FaixaDePista` dentro de `main` (RF3).
- `src/components/home/Hero/Hero.tsx` + `Hero.styles.ts`: `Aparelhos` com `useInclinacao`, camadas com ganho; `magnetico` no CTA (RF2, RF7).
- `src/components/ui/Button/Button.tsx` + `Button.styles.ts`: prop `magnetico?: boolean` (RF7).
- `src/components/ui/Section/Section.tsx` + `.styles.ts`: usa `TituloEmLinhas` (RF6).
- `src/components/home/Planos/CartaoPlano.tsx` + `.styles.ts`, `BlocoOferta.*`: `CartaoComFarol`, `ContadorDePreco`, `<s>` com linha desenhada (RF1, RF5).
- `src/components/home/Diferencial/Diferencial.*`: `CartaoComFarol` (RF1).
- `src/components/home/Sistema/SeletorPerfil.tsx` + `.styles.ts`, `TelasDoPerfil.*`: pílula, entrada direcional, farol, `CamadaViva` (RF1, RF4, RF10).
- `src/components/home/Sistema/Sistema.data.ts` + `src/types/sistema.ts`: campo opcional `vida` por tela (RF10), com ajuste em `Sistema.data.test.ts`.
- `src/components/home/Contato/ContatoForm.tsx` + `Contato.styles.ts`: rótulo flutuante, tremor, spinner, check (RF8). Os testes existentes de `ContatoForm`/`Contato` seguem valendo (rótulos acessíveis não mudam).
- `src/components/home/Faq/PerguntasFaq.tsx` + `PerguntasFaq.styles.ts`: `<mark>` (RF14).
- `src/components/layout/Footer/Footer.styles.ts`: sublinhado desenhado (RF13).

### Tipos e dados
- `src/types/sistema.ts`: `EventoVivo = { tipo: "toque" | "status" | "item"; x: number; y: number; de?: string; para?: string }` (x/y em %) e `vida?: EventoVivo[]` em `TelaPerfil`.
- Tokens: tipo inferido de `theme` (`AppTheme`), sem tipo novo.
- Nenhum dado de servidor novo: `ContadorDePreco` recebe `valor` e `texto` já derivados de `plano` no `CartaoPlano`.

### Server Component vs Client Component
| Peça | Tipo | Por quê |
|---|---|---|
| `FaixaDePista`, `ProgressoDeLeitura`, `Marcador.destacar` | Server | só CSS / função pura |
| `CartaoComFarol`, `ContadorDePreco`, `TituloEmLinhas`, `CamadaViva`, `SeletorPerfil` (pílula) | Client | ref, observer, medição |
| `Hero` (tilt) | Server, com um filho Client `AparelhosInterativos` | evita virar Client o Hero inteiro |
| `Button` (magnético) | continua sem `"use client"`; o hook roda num pequeno wrapper Client `BotaoMagnetico` usado só nos 3 CTAs | mantém `Button` leve nas ~15 outras ocorrências |

## Decisões técnicas e trade-offs
- **Variáveis CSS por `ref` em vez de estado React** (RF1, RF2, RF7): evita re-render a cada `pointermove` e mantém 60 fps em celular de médio porte; o custo é uma pequena camada de hooks imperativos, isolada e testável com eventos sintéticos.
- **`animation-timeline: scroll()` com `@supports`** (RF3, RF9): zero JavaScript e fora da thread principal. Em navegadores sem suporte, a faixa de pista fica estática e a barra de progresso some; ambas são aditivas, então não vale um polyfill em JS.
- **Pílula medida em JS** (RF4): CSS Anchor Positioning ainda não é segura entre navegadores; a medição por `ResizeObserver` é pequena e o fundo da aba ativa serve de fallback sem JS.
- **Sem animação de saída do painel** (RF4): animar a saída exigiria manter dois painéis visíveis ao mesmo tempo e brigaria com `hidden`/`role="tabpanel"`. A entrada direcional já dá a sensação de transição sem risco de altura ou quadro em branco.
- **Linhas do título por medição no cliente** (RF6): quebrar linhas no servidor é impossível (depende de fonte e largura). Por isso o HTML continua com texto corrido e a divisão só ocorre depois de `fonts.ready`; se a medição falhar, o título simplesmente fica como hoje. Recalcula em `resize` com debounce.
- **Contagem do preço sem lib** (RF5): um `requestAnimationFrame` curto basta; evita dependência. O valor final **sempre** vem do `texto` do servidor, nunca de ponto flutuante calculado no cliente.
- **Fundo vivo via pseudo-elemento fixo, não `background-attachment`** (RF11): `fixed` em `background` repinta a cada rolagem em iOS; um elemento próprio promovido a camada (`will-change: transform`) é mais barato.
- **`ViewTransition` só como infraestrutura** (RF15): coerente com o PRD, que condiciona o critério à existência de navegação interna. Sem rota nova, nenhum custo visível.
- **Não criar um sistema de animação genérico** (timeline, orquestrador): cada efeito é pequeno e independente; abstrair antes de haver um segundo uso real do mesmo padrão seria prematuro. Só o que três ou mais peças repetem (`useEntradaDeCursor`, `comCursorFino`, keyframes) é compartilhado.

## Riscos / pontos de atenção
- **Desempenho em celular fraco:** tilt e luz de farol só existem com cursor fino, mas RF10 e RF11 rodam em toda tela. Mitigação: pausar fora da vista, `will-change` só no fundo, medir no Lighthouse (LCP, CLS, TBT) antes e depois, e ter uma chave simples (`data-efeitos="baixo"`) para desligar RF10/RF11 se a medição piorar.
- **LCP do Hero:** as imagens do Hero já têm `priority`; o tilt não pode atrasar o primeiro quadro. Os listeners só entram depois de `requestIdleCallback`/hidratação.
- **CLS:** contador de preço, rótulo flutuante e linhas do título mudam o DOM no cliente. Cada um precisa reservar espaço (`min-width`, altura da linha, `padding-top` do campo) e ter teste visual em 320, 768 e 1280 px.
- **Acessibilidade:** `TituloEmLinhas` e `ContadorDePreco` duplicam texto visual; o texto acessível precisa ficar único (`aria-label` + `aria-hidden` nos spans). Tremor e spinner não podem mover o foco nem substituir o `role="alert"`/`role="status"` atuais. Verificar com leitor de tela e navegação por teclado.
- **Contraste do fundo vivo:** o ruído e os gradientes não podem derrubar o contraste dos textos `nevoa` sobre `asfalto2` abaixo de 4,5:1; conferir no ponto mais claro do ciclo.
- **`animation-timeline`** exige Chrome/Edge 115+ e Safari 26+; Firefox ainda atrás de flag. O fallback precisa ser testado nesse navegador.
- **Testes com jsdom:** `matchMedia`, `IntersectionObserver` e `ResizeObserver` não existem por padrão; reaproveitar `src/test/intersectionObserver.ts` e criar um mock de `matchMedia` e `ResizeObserver` no `setup`. Fixar `jsdom@30` por ora (v31 quebra 21 testes existentes), então não depender de APIs novas dele.
- **Escopo grande:** são 15 requisitos. Entregar em pacotes (1: RF1, RF3, RF4, RF5; 2: RF2, RF7, RF8, RF10; 3: restante) para revisar e medir desempenho a cada passo.

## Fora de escopo técnico
- Qualquer biblioteca de animação (Framer Motion, GSAP, Lenis).
- Smooth-scroll customizado ou parallax por JavaScript de rolagem.
- Polyfill de `animation-timeline` e de CSS Anchor Positioning.
- Novas rotas, mudança de conteúdo, textos, cores ou layout das seções.
- Animar a saída do painel de perfil (ver Decisões).
- Painel do visitante para ligar/desligar efeitos (além da preferência do aparelho).
- Geração de novos prints do sistema: os eventos de RF10 são sobrepostos às imagens existentes.
