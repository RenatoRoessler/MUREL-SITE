# Tasks: Animações do site (pacote inicial)

Referências: ./prd.md, ./techspec.md

Antes de começar: ler o guia relevante em `node_modules/next/dist/docs/` (AGENTS.md) e seguir as skills `code-best-practices` e `styled-components-best-practices`. Ao final de cada task: `npm run lint` e `npm test`. `npm run build` na última.

- [x] T1 — Tokens de movimento no tema
  - Arquivos: `src/styles/theme.ts`, `src/styles/styled.d.ts` (se o tipo não vier de `AppTheme`), `src/styles/theme.test.ts`
  - Pronto quando: `theme.motion` existe com `duracao` (rapida 150, media 300, lenta 500), `curva` (saida, padrao), `intervalo` (70) e `distancia` (16), e o teste do tema cobre esses valores.

- [x] T2 — Helper de movimento e keyframes compartilhados
  - Arquivos: `src/styles/movimento.ts`, `src/styles/movimento.test.ts`
  - Pronto quando: `comMovimento` envolve um bloco `css` em `@media (prefers-reduced-motion: no-preference)`; os keyframes `revelar` e `brilho` estão exportados; teste simples confirma que a media query está presente no CSS gerado.

- [x] T3 — Componente `Revelar`
  - Arquivos: `src/components/ui/Revelar/Revelar.tsx`, `src/components/ui/Revelar/Revelar.styles.ts`, `src/components/ui/Revelar/Revelar.test.tsx`, mock de `IntersectionObserver` em `src/test/setup.ts` (ou helper em `src/test/`)
  - Pronto quando: renderiza o elemento de `as` (tag ou componente estilizado) com `data-revelar` e `data-estado="pendente"`; ao o observer sinalizar visibilidade passa a `visivel` e para de observar; modo `filhos` atrasa cada filho em `índice × intervalo`, limitado ao 6º; o estado pendente só é escondido sob `scripting: enabled` + `no-preference` e fora da impressão; testes cobrem a troca de estado, o `as` e o desligamento do observer.

- [x] T4 — Prop `revelar` no `Section` e uso em Diferencial e Como funciona
  - Arquivos: `src/components/ui/Section/Section.tsx`, `src/components/home/Diferencial/Diferencial.tsx`, `src/components/home/ComoFunciona/ComoFunciona.tsx` e testes existentes dos dois
  - Pronto quando: `Section revelar` renderiza o cabeçalho dentro de `Revelar`; Diferencial usa `modo="filhos"` na `Lista`; Como funciona usa `modo="filhos"` em `Passos` e `modo="proprio"` em `Reforco`; a semântica (`ul`/`ol`/`li`, títulos) é a mesma de antes e os testes existentes passam.

- [x] T5 — Revelação em Planos e FAQ
  - Arquivos: `src/components/home/Planos/Planos.tsx`, `src/components/home/Planos/CartaoPlano.tsx` (ou o uso dele em `Planos.tsx`), `src/components/home/Faq/Faq.tsx` e testes existentes
  - Pronto quando: cabeçalho, bloco do teste grátis e cartão(ões) de Planos usam `modo="proprio"`; a `Lista` do FAQ usa `modo="filhos"`; `Section revelar` ligado nas duas; testes existentes passam.

- [x] T6 — Entrada do Hero em CSS
  - Arquivos: `src/components/home/Hero/Hero.styles.ts`, `src/components/home/Hero/Hero.test.tsx` (só se algo quebrar)
  - Pronto quando: título (0ms), subtítulo (120ms), chamadas (240ms) e garantias (360ms) entram com `revelar` dentro de `comMovimento`, sem JavaScript; o trecho em amarelo do título tem sublinhado que se desenha (`scaleX` 0→1, 600ms, atraso 500ms); o conteúdo já é clicável desde o início; sem "menos movimento" nada se move.

- [x] T7 — Botões: hover, clique e variante com brilho
  - Arquivos: `src/components/ui/Button/Button.tsx`, `src/components/ui/Button/Button.styles.ts`, `src/components/ui/Button/Button.test.tsx`, `src/components/home/Hero/Hero.tsx`
  - Pronto quando: todas as variantes sobem 2px no hover e reduzem a 0,97 no clique, só com `no-preference`; a prop `brilho` (repassada como `$brilho`, sem vazar para o DOM) faz uma faixa cruzar o botão 3 vezes a cada 6s e parar; o botão principal do Hero usa `brilho`; teste confirma que `brilho` não vira atributo no DOM e que o botão continua link ou botão conforme `href`.

- [x] T8 — Cards e selo de promoção
  - Arquivos: `src/components/home/ComoFunciona/ComoFunciona.styles.ts`, `src/components/home/Planos/CartaoPlano.styles.ts`
  - Pronto quando: `Passo` e `Cartao` sobem 4px e realçam a borda em amarelo no hover, só em `@media (hover: hover)` e `no-preference`; `Selo` tem o brilho (3 vezes, depois para); o `transform` do hover não herda atraso da revelação (a revelação usa `animation` com `fill-mode: backwards`).

- [x] T9 — Header: fundo ao rolar e menu animado
  - Arquivos: `src/components/layout/Header/Header.tsx`, `src/components/layout/Header/Header.styles.ts`, teste do Header (criar `Header.test.tsx` se não existir)
  - Pronto quando: `Barra` fica transparente e sem borda no topo e ganha fundo a 80%, blur de 12px e sombra após 8px de rolagem (listener `passive`, estado só atualizado ao mudar); o menu do celular abre e fecha com fade e descida de 8px usando `visibility` (fechado não entra na ordem de tab); os links entram em sequência de 70ms; de `lg` para cima o menu continua visível e estático; testes cobrem `aria-expanded`, o estado `rolado` e o fechamento ao clicar em um link.

- [x] T10 — FAQ: altura animada e ícone giratório
  - Arquivos: `src/components/home/Faq/Faq.styles.ts`, `src/components/home/Faq/Faq.test.tsx`
  - Pronto quando: a altura anima em 300ms via `::details-content` e `interpolate-size`, dentro de `@supports (interpolate-size: allow-keywords)` e `no-preference`; o ícone é um único `+` que gira 45° quando aberto (sem trocar o caractere); abrir e fechar por teclado (Enter/Espaço) continua funcionando; testes existentes ajustados se dependiam do `−`.

- [x] T11 — WhatsApp: anel ao aparecer
  - Arquivos: `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.styles.ts`, `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.tsx`, `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.test.tsx`
  - Pronto quando: `Circulo` recebe `$visivel` e, só quando visível e em `no-preference`, mostra um anel que cresce e some 3 vezes (1,6s cada) por aparição; não muda o tamanho nem a posição do botão; testes existentes passam.

- [ ] T12 — Verificação final
  - Arquivos: nenhum novo (ajustes pontuais onde algo falhar)
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; no navegador (celular e desktop) conferido: nenhuma seção fica invisível, nada se move com "menos movimento" ativado, sem JavaScript tudo aparece, a impressão mostra tudo, sem rolagem horizontal em 320px, link direto para `#planos` revela a seção, e o Lighthouse mostra LCP e CLS sem piora em relação ao estado anterior.
  - Andamento: `npm run lint` (sem erros em `src`), `tsc`, `npm run build` e `npm test` passam (o `ContatoForm` falha de vez em quando na suíte completa por tempo e passa isolado). O HTML do servidor sai com `data-estado="pendente"` e o CSS que esconde só vale em `@media screen and (scripting: enabled) and (prefers-reduced-motion: no-preference)`. **Falta a conferência no navegador:** "menos movimento", impressão, 320px, link direto para `#planos`, Lighthouse (LCP e CLS) e olhar cada animação.
