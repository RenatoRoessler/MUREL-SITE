# Tasks: Animações avançadas do site

Referências: ./prd.md, ./techspec.md

Regras para todas as tasks: seguir `code-best-practices` e `styled-components-best-practices`; todo movimento dentro de `comMovimento()` (ou `comCursorFino()`); estado final visível sem JS, com "menos movimento" e na impressão; rodar `npm run lint`, `npm test` e, ao fim de cada pacote, `npm run build`.

## Pacote 0 — Fundação

- [x] T1 — Tokens de movimento, cursor e cor
  - Arquivos: `src/styles/theme.ts`, `src/styles/styled.d.ts`, `src/styles/theme.test.ts`
  - Pronto quando: `theme.motion.curva.elastica`, `duracao.ciclo`, `cursor.*` e `colors.farol`/`farolBorda` existem, tipados, e `theme.test.ts` os verifica.

- [x] T2 — Helpers e keyframes compartilhados
  - Arquivos: `src/styles/movimento.ts`, `src/styles/movimento.test.ts`, `src/components/home/Hero/Hero.styles.ts`
  - Pronto quando: `comCursorFino` (hover fino + sem "menos movimento") e os keyframes `desenhar`, `tremor` e `girar` estão em `movimento.ts` com teste; o Hero passa a importar `desenhar` de lá, sem mudança visual.

- [x] T3 — Mocks de teste para `matchMedia` e `ResizeObserver`
  - Arquivos: `src/test/setup.ts`, `src/test/matchMedia.ts`, `src/test/resizeObserver.ts`
  - Pronto quando: os testes existentes continuam passando (304) e um teste novo consegue simular "cursor fino" e "menos movimento".

- [x] T4 — Hook base de cursor
  - Arquivos: `src/hooks/useEntradaDeCursor.ts`, `src/hooks/useEntradaDeCursor.test.ts`
  - Pronto quando: só registra listeners se `matchMedia` permitir, agrupa escritas em um `requestAnimationFrame` por quadro, limpa tudo no cleanup; coberto por testes (permitido, bloqueado, cleanup).

## Pacote 1 — RF1, RF3, RF4, RF5

- [x] T5 — Hook `useLuzDeFarol`
  - Arquivos: `src/hooks/useLuzDeFarol.ts`, `src/hooks/useLuzDeFarol.test.ts`
  - Pronto quando: `pointermove` grava `--x`/`--y` relativos ao elemento, `pointerleave` limpa; não registra nada sem cursor fino; teste cobre os dois casos.

- [x] T6 — Componente `CartaoComFarol`
  - Arquivos: `src/components/ui/CartaoComFarol/CartaoComFarol.tsx`, `.styles.ts`, `.test.tsx`
  - Pronto quando: aceita `as`, repassa props e `ref`, tem os pseudo-elementos de fundo e borda com gradiente na posição `--x`/`--y`, opacidade 0 em repouso e 1 no hover; teste confere que renderiza o filho e a tag escolhida.

- [x] T7 — Aplicar a luz de farol em Planos, Diferencial e Sistema
  - Arquivos: `src/components/home/Planos/CartaoPlano.tsx`, `CartaoPlano.styles.ts`, `BlocoOferta.*`, `src/components/home/Diferencial/Diferencial.*`, `src/components/home/Sistema/TelasDoPerfil.*`
  - Pronto quando: os três usam `CartaoComFarol` sem mudar tamanho, textos ou HTML lido por leitor de tela; testes existentes dessas seções passam.

- [x] T8 — `ContadorDePreco`
  - Arquivos: `src/components/ui/ContadorDePreco/ContadorDePreco.tsx`, `.styles.ts`, `.test.tsx`
  - Pronto quando: o HTML inicial traz o `texto` formatado; ao entrar na vista com movimento permitido conta 0 → `valor` em 800 ms e termina exatamente no `texto`; com "menos movimento" ou sem `IntersectionObserver` mostra o valor final direto; largura reservada (sem CLS); `aria-label` com o texto, contagem em `aria-hidden`.

- [x] T9 — Preço contado e preço antigo riscado desenhado nos planos
  - Arquivos: `src/components/home/Planos/CartaoPlano.tsx`, `CartaoPlano.styles.ts`, `CartaoPlano.test.tsx`
  - Pronto quando: `Valor` usa `ContadorDePreco`; `<s>` ganha a linha que se desenha (`scaleX` 0→1, atraso após a revelação) e, sem movimento, a linha já está completa; `<s>` e `SoLeitor` preservados; testes de preço continuam passando.

- [x] T10 — `FaixaDePista` (RF3)
  - Arquivos: `src/components/layout/FaixaDePista/FaixaDePista.tsx`, `.styles.ts`, `.test.tsx`, `src/app/page.tsx`
  - Pronto quando: faixa tracejada amarela, só em `lg`+, `aria-hidden`, `pointer-events: none`, atrás do conteúdo, desenhada por `animation-timeline: scroll()` sob `@supports`; sem suporte fica estática e discreta; sem rolagem horizontal em 320 px.

- [x] T11 — Pílula do seletor de perfis
  - Arquivos: `src/components/home/Sistema/SeletorPerfil.tsx`, `SeletorPerfil.styles.ts`, `SeletorPerfil.test.tsx`
  - Pronto quando: um `Pilula` desliza entre as abas com `--pilula-x`/`--pilula-w` medidos em `useLayoutEffect` e `ResizeObserver`; só aparece após a primeira medição, com o fundo da aba ativa como fallback; navegação por setas e `aria-*` inalteradas.

- [x] T12 — Entrada direcional do painel de perfil
  - Arquivos: `src/components/home/Sistema/SeletorPerfil.tsx`, `SeletorPerfil.styles.ts`, `SeletorPerfil.test.tsx`
  - Pronto quando: ao trocar de perfil o painel novo recebe `data-entrando="proximo|anterior"` (pela ordem dos índices) e roda fade + deslize; sem animação de saída; sem quadro em branco nem salto de altura; teste confere o atributo nos dois sentidos.

- [ ] T13 — Fechamento do pacote 1
  - Arquivos: —
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; conferido no navegador em 320, 768 e 1280 px (sem rolagem horizontal, sem CLS) e com "menos movimento" ligado.

## Pacote 2 — RF2, RF7, RF8, RF10

- [x] T14 — Hook `useInclinacao`
  - Arquivos: `src/hooks/useInclinacao.ts`, `src/hooks/useInclinacao.test.ts`
  - Pronto quando: grava `--rx`/`--ry` entre −1 e 1 conforme o cursor sobre o elemento e zera ao sair; inativo sem cursor fino.

- [x] T15 — Hero com profundidade
  - Arquivos: `src/components/home/Hero/Hero.tsx`, `Hero.styles.ts`, `src/components/home/Hero/AparelhosInterativos.tsx`, `Hero.test.tsx`
  - Pronto quando: `AparelhosInterativos` (Client) aplica o tilt (máx. 6°) com camadas em ganhos 0,4 / 0,7 / 1,0 e brilho à frente; o `Hero` continua Server; no celular só `flutuar`; sem aumento de LCP e sem mudança no texto lido; testes passam.

- [x] T16 — Hook `useMagnetismo` e `BotaoMagnetico`
  - Arquivos: `src/hooks/useMagnetismo.ts`, `.test.ts`, `src/components/ui/Button/BotaoMagnetico.tsx`, `Button.styles.ts`
  - Pronto quando: o botão se desloca até 6 px (propriedade `translate`) a menos de 80 px do cursor e volta com `curva.elastica`; tamanho e área de toque inalterados; inativo sem cursor fino.

- [x] T17 — Aplicar o botão magnético nos 3 CTAs
  - Arquivos: `src/components/home/Hero/Hero.tsx`, `src/components/home/Planos/CartaoPlano.tsx` (ou `BlocoOferta.tsx`), `src/components/home/Contato/ContatoForm.tsx`
  - Pronto quando: apenas o CTA principal do Hero, o de planos e o do contato usam `BotaoMagnetico`; os demais `Button` não mudam; testes passam.

- [x] T18 — Rótulo flutuante no contato
  - Arquivos: `src/components/home/Contato/Contato.styles.ts`, `ContatoForm.tsx`, `ContatoForm.test.tsx`
  - Pronto quando: em campos de texto/e-mail/telefone o rótulo sobe com foco ou conteúdo (`:placeholder-shown`, `:focus-within`); selects e área de texto mantêm o rótulo acima; `<label>` real, texto "(obrigatório)" preservado; os testes por rótulo continuam passando.

- [x] T19 — Tremor e estados do botão de envio
  - Arquivos: `src/components/home/Contato/ContatoForm.tsx`, `Contato.styles.ts`, `ContatoForm.test.tsx`
  - Pronto quando: campo inválido treme uma vez por tentativa (reinicia por `data-tentativa`); `BotaoEnviar` mostra spinner com "Enviando..." no `SoLeitor`; foco, `role="alert"` e resumo de erros inalterados.

- [x] T20 — Check de sucesso desenhado
  - Arquivos: `src/components/home/Contato/ContatoForm.tsx`, `Contato.styles.ts`, `Contato.test.tsx`
  - Pronto quando: `Confirmacao` mostra círculo e check que se desenham (`stroke-dashoffset`); sem movimento aparece pronto; `role="status"` e texto atuais preservados.

- [x] T21 — Dados de eventos vivos
  - Arquivos: `src/types/sistema.ts`, `src/components/home/Sistema/Sistema.data.ts`, `Sistema.data.test.ts`
  - Pronto quando: `EventoVivo` e `vida?` existem; ao menos as telas do Hero e as principais do perfil Operador têm eventos (posições em %); teste valida que x/y ficam entre 0 e 100.

- [x] T22 — `CamadaViva`
  - Arquivos: `src/components/ui/CamadaViva/CamadaViva.tsx`, `.styles.ts`, `.test.tsx`
  - Pronto quando: renderiza toque, chip de status e item deslizante sobre a imagem, `aria-hidden`, `pointer-events: none`, ciclo `duracao.ciclo.lento`, pausado fora da vista; sem eventos não renderiza nada.

- [x] T23 — Aplicar `CamadaViva` nas telas
  - Arquivos: `src/components/ui/TelaSistema/TelaSistema.tsx`, `TelaSistema.styles.ts`, `src/components/home/Sistema/TelaPerfil.tsx`, `Hero.tsx`
  - Pronto quando: telas com `vida` mostram a camada em Hero e Sistema; sem `vida` ficam iguais a hoje; `alt` e foco do visor inalterados; testes passam.

- [ ] T24 — Fechamento do pacote 2
  - Arquivos: —
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; conferido no navegador em 320, 768 e 1280 px, com "menos movimento" ligado e com leitor de tela/teclado no formulário; LCP e CLS sem piora.

## Pacote 3 — RF6, RF9, RF11 a RF15

- [ ] T25 — Hook `useLinhasDoTitulo`
  - Arquivos: `src/hooks/useLinhasDoTitulo.ts`, `.test.ts`
  - Pronto quando: após `document.fonts.ready` devolve as linhas visuais de um texto por medição de palavras, recalcula no `resize` com debounce e, se a medição falhar, devolve `null`.

- [ ] T26 — `TituloEmLinhas` e uso em `Section`
  - Arquivos: `src/components/ui/TituloEmLinhas/TituloEmLinhas.tsx`, `.styles.ts`, `.test.tsx`, `src/components/ui/Section/Section.tsx`, `Section.styles.ts`
  - Pronto quando: o HTML do servidor segue com o texto corrido; no cliente cada linha sobe de uma máscara; `<h2>` com `aria-label` do título e spans `aria-hidden`; `em` amarelo recebe o sublinhado de `desenhar`; sem medição, o título é o de hoje.

- [ ] T27 — `ProgressoDeLeitura`
  - Arquivos: `src/components/layout/ProgressoDeLeitura/ProgressoDeLeitura.tsx`, `.styles.ts`, `.test.tsx`, `src/app/layout.tsx`
  - Pronto quando: linha amarela de 3 px acima do `Header`, `scaleX` 0→1 por `animation-timeline: scroll(root)`; escondida via `@supports not`; `aria-hidden`.

- [ ] T28 — Fundo vivo
  - Arquivos: `src/styles/GlobalStyle.ts` (ou `src/components/layout/FundoVivo/*`), `src/app/layout.tsx`
  - Pronto quando: grão a 3% e gradientes que derivam em 40 s, num elemento fixo atrás de tudo; contraste de `nevoa` e `giz` mantido em 4,5:1 conferido no ponto mais claro; parado com "menos movimento" e fora da aba ativa.

- [ ] T29 — Seleção, foco e links do rodapé
  - Arquivos: `src/styles/GlobalStyle.ts`, `src/components/layout/Footer/Footer.styles.ts`
  - Pronto quando: `::selection` em amarelo, `outline-offset` do foco anima, links do rodapé desenham o sublinhado em hover e foco (estático sem movimento); testes do rodapé passam.

- [ ] T30 — Marca-texto da busca do FAQ
  - Arquivos: `src/components/ui/Marcador/Marcador.tsx`, `Marcador.test.tsx`, `src/components/home/Faq/PerguntasFaq.tsx`, `PerguntasFaq.styles.ts`, `PerguntasFaq.test.tsx`
  - Pronto quando: `destacar(texto, termo)` envolve o trecho em `<mark>` respeitando acentos e caixa (via `normalizarTexto`); o destaque se desenha; sem termo o texto é o de hoje; testes da busca passam.

- [ ] T31 — Infraestrutura de transição entre páginas
  - Arquivos: `src/app/layout.tsx`, `src/styles/GlobalStyle.ts`
  - Pronto quando: `{children}` está dentro de `ViewTransition` (conforme `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`) e as regras `::view-transition-*` estão sob `comMovimento`; a home continua idêntica e o build passa.

- [ ] T32 — Fechamento e QA final
  - Arquivos: `docs/specs/animacoes-avancadas/tasks.md`
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; todos os critérios de aceite do PRD verificados (incluindo "menos movimento", sem JS, impressão, 320 px, teclado e leitor de tela, fallback sem `animation-timeline`); métricas de desempenho comparadas com as de antes; todas as tasks marcadas `[x]`.
