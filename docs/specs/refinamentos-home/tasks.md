# Tasks: Refinamentos da home (layout, animações e usabilidade)

Referências: ./prd.md, ./techspec.md

Regras para todas as tasks: seguir as skills `code-best-practices` e `styled-components-best-practices`; usar `.agents/skills/impeccable` para as decisões visuais; consultar `node_modules/next/dist/docs/` antes de mexer em componentes de cliente e em variáveis `NEXT_PUBLIC_*` (AGENTS.md); todo movimento dentro de `comMovimento`; em CSS de styled-components, escapes como `\2212` precisam ser escritos `\\2212` (senão o estilo inteiro é descartado); rodar `npm run lint` e `npm test` ao final de cada task e `npm run build` na última.

- [x] T1 — Modelos de Diferencial, Contato + FAQ e rodapé, e escolha do usuário
  - Arquivos: `docs/specs/refinamentos-home/layouts.html` e `layouts.png` (protótipos estáticos), seção "Design" do `techspec.md`
  - Resultado (20/11/2026): Diferencial C (cartões), Contato + FAQ C (abas e lista única com cabeçalhos) e Rodapé A (quatro colunas), escolhidos pelo usuário.
  - Pronto quando: os 3 modelos de cada bloco foram mostrados em 360 px e em desktop; o usuário escolheu um de cada e a escolha está registrada no Tech Spec. As tasks T8, T9 (parte de layout), T13 e T14 só começam depois (RF27).

- [x] T2 — Hooks de seção em vista e seção ativa, e token da barra fixa
  - Arquivos: `src/hooks/useSecaoEmVista.ts` e `.test.tsx`, `src/hooks/useSecaoAtiva.ts` e `.test.tsx`, `src/styles/theme.ts`, `src/styles/theme.test.ts`
  - Pronto quando: `useSecaoEmVista(ids)` devolve se alguma das seções está na tela (servidor devolve `false`); `useSecaoAtiva(ids)` devolve o id da seção na faixa central; `theme.layout.barraFixa` é `"72px"`; testes com `IntersectionObserver` simulado (`src/test/intersectionObserver.ts`).

- [x] T3 — WhatsApp que não cobre conteúdo
  - Arquivos: `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.tsx`, `.styles.ts`, `.test.tsx`
  - Pronto quando: o botão some dentro de `#contato`; depois de cerca de 6 s da primeira aparição o rótulo encolhe e fica só o círculo, com transição que respeita "menos movimento"; o `bottom` soma `var(--barra-fixa, 0px)`; o timer é limpo ao desmontar; testes cobrem esconder no Contato, o estado compacto e a variável (RF1, RF22).

- [x] T4 — Barra fixa de "Começar grátis" no celular
  - Arquivos: `src/components/layout/BarraComecar/BarraComecar.tsx`, `.styles.ts`, `.test.tsx`, `src/app/page.tsx`
  - Pronto quando: abaixo de `md`, a barra aparece depois do Hero com o texto de `botaoTeste(teste)` e some no Hero, no Contato, no rodapé e enquanto um campo de formulário tem foco; publica `--barra-fixa` no `documentElement` enquanto visível e limpa ao sair; `visibility` esconde do teclado e do leitor de tela quando oculta; `env(safe-area-inset-bottom)` respeitado; testes cobrem as regras de mostrar e esconder, o texto com e sem teste e a variável (RF3).

- [x] T5 — Menu do celular: Esc, toque fora, foco e fundo
  - Arquivos: `src/components/layout/Header/Header.tsx`, `.styles.ts`, `Header.test.tsx`
  - Pronto quando: com o menu aberto, Esc e toque no fundo o fecham, o foco volta ao botão do menu, e um fundo escuro translúcido cobre a página abaixo do header (só abaixo de `lg`, `aria-hidden`); escolher um link continua fechando; os listeners só existem com o menu aberto; testes cobrem Esc, toque fora e retorno do foco (RF2).

- [x] T6 — Menu com a seção ativa
  - Arquivos: `src/components/layout/Header/Header.tsx`, `.styles.ts`, `Header.test.tsx`
  - Pronto quando: o link da seção ativa fica em amarelo com `aria-current="location"`; no desktop um traço de 2 px desliza sob os links (200 ms, só com movimento permitido), recalculado ao redimensionar; no celular só o destaque; sem salto entre seções vizinhas (faixa central estreita); teste cobre `aria-current` conforme a seção ativa (RF15).

- [x] T7 — Formulário de contato mais claro
  - Arquivos: `src/components/home/Contato/ContatoForm.tsx`, `Contato.styles.ts`, `ContatoForm.test.tsx`
  - Pronto quando: Nome e Mensagem têm o rótulo "obrigatório"; E-mail e Telefone ganham "(ou telefone)" e "(ou e-mail)"; o aviso "Informe pelo menos um" fica logo abaixo desses dois campos e é ligado a eles por `aria-describedby`; o esquema de validação não muda; testes cobrem os rótulos e a ligação do aviso (RF5).

- [x] T8 — Layout do Contato (modelo escolhido na T1)
  - Arquivos: `src/components/home/Contato/Contato.tsx`, `Contato.styles.ts`, `Contato.test.tsx`
  - Pronto quando: o Contato tem três abas ("Escrever mensagem" aberta por padrão, "Falar agora" com WhatsApp, e-mail e "A gente responde por e-mail ou telefone", só com o que é verdade hoje, e "Ver funcionando" com o mês grátis); os painéis estão no HTML e só o ativo aparece com JavaScript (sem JavaScript aparecem os três); o que foi digitado no formulário se mantém ao trocar de aba; setas, Home e End navegam pelas abas; testes cobrem a troca de abas, os links e a manutenção dos campos (RF4, RF11).

- [x] T9 — FAQ com busca, abrir todas, grupos e fade
  - Arquivos: `src/components/home/Faq/Faq.tsx`, `Faq.data.ts`, `Faq.test.tsx`, `src/components/home/Faq/PerguntasFaq.tsx`, `PerguntasFaq.styles.ts`, `PerguntasFaq.test.tsx`, `Faq.styles.ts`
  - Pronto quando: a busca ignora acento e caixa e filtra pergunta e resposta; "Abrir todas" / "Fechar todas" funciona e atualiza o rótulo; lista vazia mostra a mensagem e o link para o contato; as 12 perguntas aparecem em uma lista única com os cabeçalhos de grupo "Preço e teste" e "Como funciona", sem mudar nenhum texto; `aria-live` anuncia "N perguntas"; a resposta abre com fade de 250 ms (RF6, RF12, RF21).

- [x] T10 — Legenda do carrossel e contagem de áreas do plano
  - Arquivos: `src/components/home/Sistema/CarrosselTelas.tsx`, `.styles.ts`, `TelasDoPerfil.tsx`, `src/components/home/Planos/GruposDoPlano.tsx`, `.styles.ts` e os testes dos três
  - Pronto quando: abaixo de `lg`, o carrossel mostra "Título · N de M" junto dos pontos; no painel do desktop a legenda não aparece; cada grupo recolhido do plano mostra "N áreas" ("1 área" no singular); testes cobrem os dois (RF7, RF8).

- [x] T11 — Hero: símbolo, espaço e profundidade
  - Arquivos: `src/components/home/Hero/Hero.styles.ts`, `Hero.tsx`, `Hero.test.tsx`
  - Pronto quando: o símbolo fica acima do segundo celular, menor, sem cobrir nenhuma tela; o conjunto de celulares e o espaçamento vertical deixam a faixa de destaques inteira na primeira tela em 1280x800; as molduras sobem em ritmos diferentes conforme a rolagem, só dentro de `@supports (animation-timeline: scroll())` e `comMovimento`, usando a propriedade `translate`; sem suporte, ficam paradas (RF9, RF19).

- [x] T12 — Fundo alternado nas seções
  - Arquivos: `src/components/ui/Section/Section.tsx`, `Section.styles.ts`, `Sistema.tsx`, `Faq.tsx`, `src/styles/theme.test.ts`
  - Pronto quando: `Section` aceita `fundo="alternado"` e pinta o fundo `asfalto2` de ponta a ponta (sem rolagem horizontal); Sistema e Perguntas usam; o teste de tema confere o contraste mínimo de 4,5:1 dos textos usados sobre `asfalto2` (RF13).

- [x] T13 — Diferencial em destaque (modelo escolhido na T1)
  - Arquivos: `src/components/home/Diferencial/Diferencial.tsx`, `.styles.ts`, `Diferencial.test.tsx`, `src/components/ui/RoloDeDigitos/RoloDeDigitos.tsx` e `.styles.ts`
  - Pronto quando: o Diferencial tem três cartões com borda, número grande no topo e os mesmos textos; cada número tem o efeito de rolo de dígitos (rola de 9 até o valor ao entrar na tela, só CSS ligado ao `Revelar`); o valor final está no HTML e é lido corretamente por leitor de tela; sem movimento ou sem JavaScript, o número já aparece no valor final (RF10, RF18).

- [x] T14 — Rodapé completo e endereços de termos e privacidade
  - Arquivos: `src/components/layout/Footer/Footer.tsx`, `Footer.styles.ts`, `Footer.test.tsx`, `src/lib/config.ts`, `src/lib/config.test.ts`, `.env.example`
  - Pronto quando: o rodapé tem quatro colunas (marca e contato, seções, legal e ações), com os atalhos das seções, o contato e os dois botões atuais; `urlTermos` e `urlPrivacidade` são lidas de `NEXT_PUBLIC_URL_TERMOS` e `NEXT_PUBLIC_URL_PRIVACIDADE` e só aparecem no rodapé quando definidas; as variáveis estão documentadas no `.env.example`; testes cobrem com e sem as variáveis (RF14).

- [x] T15 — Troca de tela com fade no Sistema (desktop)
  - Arquivos: `src/components/home/Sistema/CarrosselTelas.styles.ts` (ou `TelaPerfil.styles.ts`), testes se algo quebrar
  - Pronto quando: no painel do desktop, a tela ativa entra com fade e subida de 8 px em 220 ms, só com movimento permitido; no carrossel do celular nada muda (RF16).

- [x] T16 — Pista animada em "Como funciona"
  - Arquivos: `src/components/home/ComoFunciona/ComoFunciona.styles.ts`, `ComoFunciona.tsx`, `ComoFunciona.test.tsx`
  - Pronto quando: ao revelar a seção, os conectores se desenham em sequência e, no desktop, o símbolo do carro percorre a pista em cerca de 3 s e estaciona na última etapa; no celular só a faixa e os pontos aparecem em sequência; tudo em `comMovimento`, com `@supports` onde precisar; sem movimento ou sem JavaScript, o caminho aparece completo e parado; o carro é decorativo (`aria-hidden`) (RF17).

- [x] T17 — Brilho no preço do plano
  - Arquivos: `src/components/home/Planos/CartaoPlano.styles.ts`, `CartaoPlano.test.tsx` se necessário
  - Pronto quando: uma faixa de luz atravessa o preço uma vez, 600 ms depois de o bloco do plano aparecer, só com movimento permitido; o texto do preço continua legível durante o brilho (RF20).

- [x] T18 — Verificação final
  - Arquivos: nenhum novo (ajustes pontuais)
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; no navegador, sem rolagem horizontal em 320, 360, 390, 768 e 1280 px; com "menos movimento", sem JavaScript e na impressão todo o conteúdo aparece e nada se move; o botão do WhatsApp não cobre conteúdo em nenhuma largura testada; a barra fixa, o menu e a busca do FAQ funcionam com teclado e foram testados com leitor de tela quando possível; LCP e CLS no celular iguais ou melhores que os atuais (cerca de 0,7 s e 0); o detector do impeccable (`impeccable detect`) rodou nas telas alteradas.
  - Resultado (20/11/2026): lint, `tsc` e build passam; 303 de 304 testes passam na suíte completa (o `ContatoForm` falha de vez em quando sob carga e passa isolado, como antes). No navegador: sem rolagem horizontal em 320, 360, 390, 768 e 1280 px; sem JavaScript os três painéis do Contato aparecem, a lista de abas some e as 12 perguntas e os 3 números estão no HTML; com "menos movimento" e na impressão nada fica escondido. No celular (390 px): a barra fixa aparece depois do Hero e some no Contato e com campo em foco; o WhatsApp sobe 88 px acima da barra, vira só o ícone depois de 6 s e some no Contato; Esc e toque fora fecham o menu e o foco volta ao botão; as abas do Contato mantêm o que foi digitado. Em 1280x800 a faixa de destaques cabe na primeira tela (de 701 a 771 px). LCP e CLS: desktop 0,66 s e 0; celular entre 0,74 s e 0,82 s em três medidas e CLS 0 (o antes era 0,74 s; a variação é do ruído de medição). Altura da página: 7.614 px no desktop e 10.207 px no celular (antes 9.840: os três cartões do Diferencial e a barra de ferramentas do FAQ ocupam mais). O detector do impeccable não apontou problemas. Não rodei Lighthouse nem auditoria formal de contraste; o teste de tema cobre os pares usados no fundo alternado.
