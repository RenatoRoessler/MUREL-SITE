# Tasks: Contato por WhatsApp

Referências: ./prd.md, ./techspec.md

- [x] T1 — Adicionar a configuração do WhatsApp (número, número formatado, mensagem inicial, rótulo do botão e `urlWhatsapp` com `encodeURIComponent`) e testá-la.
  - Arquivos: `src/lib/config.ts`, `src/lib/config.test.ts`
  - Pronto quando: `urlWhatsapp` é `https://wa.me/5519992215384?text=<mensagem codificada>`, os testes de config passam e o número aparece só neste arquivo.

- [x] T2 — Criar os tokens de cor do WhatsApp no tema.
  - Arquivos: `src/styles/theme.ts`, `src/styles/theme.test.ts`
  - Pronto quando: `colors.whatsapp` (`#25D366`) e `colors.whatsappEscuro` (`#1EBE5B`) existem e o teste do tema cobre os dois.

- [x] T3 — Criar o componente do ícone do WhatsApp (SVG inline, `aria-hidden`, `fill="currentColor"`).
  - Arquivos: `src/components/ui/IconeWhatsapp/IconeWhatsapp.tsx`
  - Pronto quando: o ícone renderiza, é ignorado por leitores de tela e herda a cor do texto.

- [x] T4 — Adicionar a variante `whatsapp` ao `Button` (fundo verde, texto `asfalto`, hover `whatsappEscuro`) e testá-la.
  - Arquivos: `src/components/ui/Button/Button.styles.ts`, `src/components/ui/Button/Button.tsx` (se o tipo exigir), `src/components/ui/Button/Button.test.tsx`
  - Pronto quando: `<Button variante="whatsapp" href=...>` renderiza como link com o estilo novo, as variantes existentes não mudam e os testes passam.
  - Depende de: T2

- [x] T5 — Criar o botão flutuante do WhatsApp (pílula "Estamos online!" + círculo com ícone, fixo no canto inferior direito, link para `urlWhatsapp` em nova aba com `rel="noopener noreferrer"`, nome acessível que diz que abre o WhatsApp) e testá-lo.
  - Arquivos: `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.tsx`, `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.styles.ts`, `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.test.tsx`
  - Pronto quando: o teste confirma `href`, `target`, `rel` e nome acessível; o foco é visível; o contraste do rótulo é AA; usa `env(safe-area-inset-bottom)`.
  - Depende de: T1, T2, T3

- [x] T6 — Montar o botão flutuante na página.
  - Arquivos: `src/app/page.tsx`
  - Pronto quando: `<BotaoWhatsapp />` aparece depois de `<Footer />` e a página continua renderizando os demais blocos.
  - Depende de: T5

- [x] T7 — Adicionar à seção de contato o bloco "Prefere falar agora?" com o botão "Chamar no WhatsApp" e o divisor "ou deixe sua mensagem abaixo", acima do formulário.
  - Arquivos: `src/components/home/Contato/Contato.tsx`, `src/components/home/Contato/Contato.styles.ts`
  - Pronto quando: o botão abre `urlWhatsapp`, o formulário continua com o mesmo comportamento e os testes de `ContatoForm` seguem passando.
  - Depende de: T1, T4

- [x] T8 — Adicionar o link do WhatsApp ao rodapé e testá-lo.
  - Arquivos: `src/components/layout/Footer/Footer.tsx`, `src/components/layout/Footer/Footer.test.tsx`
  - Pronto quando: o rodapé mostra "WhatsApp: (19) 99221-5384" apontando para `urlWhatsapp` e o teste confirma o link.
  - Depende de: T1

- [x] T9 — Verificar a sobreposição do botão fixo em 360 px (formulário, botão "Enviar" e rodapé) e ajustar o espaçamento da seção de contato se necessário. Se o rótulo não couber ao lado do ícone, esconder o rótulo abaixo de `sm` e manter só o ícone com `aria-label`.
  - Arquivos: `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.styles.ts`, `src/components/home/Contato/Contato.styles.ts`
  - Pronto quando: em 360 px o botão fixo não cobre nenhum botão, campo ou texto essencial da página.
  - Depende de: T6, T7, T8

- [x] T10 — Rodar a verificação final do projeto.
  - Arquivos: nenhum
  - Pronto quando: `npm run lint`, os testes e `npm run build` passam sem erros.
  - Depende de: T9

- [x] T11 — Atualizar o PRD do site institucional, que ainda lista WhatsApp como fora de escopo, para apontar para esta feature.
  - Arquivos: `docs/specs/site-institucional/prd.md`
  - Pronto quando: a seção "Fora do Escopo" não lista mais o WhatsApp e referencia `docs/specs/whatsapp-contato/prd.md`.
