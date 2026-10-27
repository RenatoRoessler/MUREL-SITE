# Tasks: Site Institucional da Murel

Referências: ./prd.md, ./techspec.md

Antes de concluir qualquer task de código: `npm run lint` e, nas marcadas com build, `npm run build`. Layout das tasks de interface conduzido pela skill `.agents/skills/impeccable`, seguindo `code-best-practices` e `styled-components-best-practices`.

## Fase 1 — Base

- [x] T1 — Instalar dependências e configurar testes
  - Arquivos: `package.json`, `vitest.config.ts`, `src/test/setup.ts`
  - Pronto quando: `styled-components`, `zod`, `vitest`, `@testing-library/*`, `jsdom` instalados; script `test` (`vitest run`) roda um teste de fumaça e passa; `npm run lint` passa.

- [x] T2 — Configurar styled-components com SSR
  - Arquivos: `next.config.ts`, `src/lib/registry.tsx`
  - Pronto quando: `compiler.styledComponents: true` ativo; `StyledComponentsRegistry` envolve o conteúdo; `npm run build` passa sem erro de hidratação.

- [x] T3 — Tema tipado, estilos globais e fontes
  - Arquivos: `src/styles/theme.ts`, `src/styles/styled.d.ts`, `src/styles/GlobalStyle.ts`, `src/app/layout.tsx`, `src/app/globals.css`
  - Pronto quando: tokens do guia de marca (cores, fontes, espaços, raios, breakpoints) no tema; `ThemeProvider` único no layout; Plus Jakarta Sans e JetBrains Mono via `next/font` com `--font-plus-jakarta` e `--font-jetbrains`; tema escuro único; `lang="pt-BR"`; teste do tema (valores-chave e contraste do botão amarelo) passa; sem FOUC ao recarregar.

- [x] T4 — Configuração de URLs e variáveis de ambiente
  - Arquivos: `src/lib/config.ts`, `src/lib/config.test.ts`, `.env.example`
  - Pronto quando: `urlAcesso` e `urlAdesao` (`APP_URL` + `/adesao`) exportados e testados; `.env.example` documenta `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SITE_URL`, `EMAIL_API_KEY`, `EMAIL_REMETENTE`, `CONTATO_DESTINO` (só `NEXT_PUBLIC_*` visíveis ao cliente).

## Fase 2 — Formulário de contato (back)

- [x] T5 — Tipos e schema de validação do contato
  - Arquivos: `src/types/contato.ts`, `src/lib/contato/schema.ts`, `src/lib/contato/schema.test.ts`
  - Pronto quando: `CamposContato` e `EstadoContato` definidos; `contatoSchema` valida nome, mensagem, e-mail/telefone e "ao menos um meio de retorno", com `trim` e mensagens em português; testes cobrem obrigatórios, inválidos, limites e o refinamento.

- [x] T6 — Envio de e-mail pelo provedor
  - Arquivos: `src/lib/contato/enviarEmail.ts`, `src/lib/contato/enviarEmail.test.ts`
  - Pronto quando: `POST` via `fetch` com timeout de 10 s, `reply_to` quando houver e-mail, assunto e corpo em texto simples sem quebra de linha em cabeçalhos; resposta não 2xx, timeout e chave ausente retornam falha controlada sem logar dados pessoais; testes com `fetch` mockado passam. Marcado `server-only`.

- [x] T7 — Limite de envios por IP
  - Arquivos: `src/lib/contato/limitarEnvios.ts`, `src/lib/contato/limitarEnvios.test.ts`
  - Pronto quando: janela de 10 min, máximo de 5 envios por IP; testes com relógio simulado cobrem dentro do limite, excedido e janela renovada.

- [x] T8 — Server Action `enviarContato`
  - Arquivos: `src/app/contato/actions.ts`, `src/app/contato/actions.test.ts`
  - Pronto quando: ordem honeypot → limite → validação → envio; devolve `enviado`, `erro-validacao` (com `valores`) ou `falha-envio` (com `valores`); honeypot preenchido responde "enviado" sem enviar; testes cobrem sucesso, validação, falha do provedor, honeypot e limite excedido.

## Fase 3 — Componentes base e identidade

- [x] T9 — Marca: símbolo e logotipo em SVG
  - Arquivos: `src/components/brand/Simbolo.tsx`, `src/components/brand/LogoMurel.tsx`, `src/app/icon.svg`
  - Pronto quando: símbolo das 3 vagas com o carro (máscara dos vidros) igual ao guia; `LogoMurel` com `aria-label`; ícone do site configurado; animação do carro só com `prefers-reduced-motion: no-preference`; teste de renderização e rótulo acessível.

- [x] T10 — Componentes de UI: Button e Section
  - Arquivos: `src/components/ui/Button/Button.tsx`, `Button.styles.ts`, `Button.test.tsx`, `src/components/ui/Section/Section.tsx`, `Section.styles.ts`
  - Pronto quando: `Button` (como `a` ou `button`) com variantes `primary` e `ghost`, foco visível e alvo de toque adequado; `Section`/`SectionHeader` com eyebrow, título e lede, borda tracejada entre seções; testes de variante, tag e foco.

- [x] T11 — Cabeçalho com acesso ao sistema
  - Arquivos: `src/components/layout/Header/Header.tsx`, `Header.styles.ts`, `Header.test.tsx`
  - Pronto quando: marca, links de âncora, "Acessar o sistema" (→ `urlAcesso`) e "Ir para adesão" (→ `urlAdesao`); menu simples no celular abaixo de `md`, operável por teclado; botão de acesso visível no celular; link "Ir para o conteúdo"; testes de links e menu (RF-01).

## Fase 4 — Seções da página

- [x] T12 — Seção Hero
  - Arquivos: `src/components/home/Hero/Hero.tsx`, `Hero.styles.ts`, `Hero.test.tsx`
  - Pronto quando: "Seu pátio sob controle." e subtítulo dizendo na primeira frase o que a Murel faz; diferencial (sem impressora, sem e-mail/telefone do cliente); chamada para adesão em destaque; um único `h1`; teste de textos e link (RF-02, RF-03).

- [x] T13 — Seção Diferencial
  - Arquivos: `src/components/home/Diferencial/Diferencial.tsx`, `Diferencial.styles.ts`
  - Pronto quando: três cartões (0 impressoras, 0 dados pessoais pedidos, 2 formas de levar o ticket) no tom da marca; chamada para adesão ao final do bloco; legível em 360 px.

- [ ] T14 — Capturas de tela do sistema com dados fictícios
  - Arquivos: `public/telas/*.webp` (pátio, caixa, preços e convênios, mensalistas, notas fiscais)
  - Pronto quando: capturas feitas numa conta de teste do GIPE, em WebP com até 1280 px de largura; nenhuma credencial, dado de cliente real, CNPJ ou placa reais visíveis (revisão tela a tela); só funcionalidades que existem hoje (sem Relatórios). Passo manual: as credenciais não são copiadas para o repositório.

- [ ] T15 — Seção Funcionalidades
  - Arquivos: `src/components/home/Funcionalidades/Funcionalidades.tsx`, `Funcionalidades.data.ts`, `Funcionalidades.styles.ts`, `Funcionalidades.test.tsx`
  - Pronto quando: cinco funcionalidades com texto curto e `next/image` (com `alt` descritivo, `sizes`, `loading` lazy abaixo da dobra); legível no celular; chamada para adesão ao final; teste de itens e `alt` (RF-04). Depende de T14.

- [x] T16 — Seção Como funciona
  - Arquivos: `src/components/home/ComoFunciona/ComoFunciona.tsx`, `ComoFunciona.styles.ts`, `ComoFunciona.test.tsx`
  - Pronto quando: cinco passos (entrada, foto da tela, aponta a câmera, acompanha, saída) com as duas formas de levar o ticket e o reforço de "sem impressora, sem cadastro"; lista ordenada semântica; teste da ordem dos passos (RF-05).

- [x] T17 — Seção Perguntas frequentes
  - Arquivos: `src/components/home/Faq/Faq.tsx`, `Faq.data.ts`, `Faq.styles.ts`, `Faq.test.tsx`
  - Pronto quando: perguntas sobre tipos de negócio, funcionamento sem impressora, dados pedidos ao cliente, uso no celular e como começar, com `<details>/<summary>` nativos; resposta sobre preço orienta a falar com a equipe, sem valores; teste de que há as perguntas e de que a de preço não exibe valores (RF-06).

- [x] T18 — Seção Contato com formulário
  - Arquivos: `src/components/home/Contato/Contato.tsx`, `ContatoForm.tsx`, `Contato.styles.ts`, `ContatoForm.test.tsx`
  - Pronto quando: formulário ligado a `enviarContato` com `useActionState`; campos e rótulos do PRD, campo honeypot oculto, aviso curto sobre uso dos dados; botão desabilitado enquanto envia; erro por campo (`aria-invalid`, `aria-describedby`) e resumo com `role="alert"` que recebe foco; falha de envio com texto claro e valores mantidos; sucesso com `role="status"`; testes cobrem valores mantidos após erro, estado "enviando", sucesso e falha (RF-07). Depende de T8.

- [x] T19 — Rodapé
  - Arquivos: `src/components/layout/Footer/Footer.tsx`, `Footer.styles.ts`, `Footer.test.tsx`
  - Pronto quando: mostra `contato@murel.com.br` (link `mailto:`), link para o formulário, "Acessar o sistema" e "Ir para adesão"; teste de links (RF-08).

## Fase 5 — Integração e acabamento

- [x] T20 — Compor a página e substituir a provisória
  - Arquivos: `src/app/page.tsx`, remover `src/app/page.module.css`
  - Pronto quando: seções na ordem da Tech Spec dentro de `main`, com `id`s das âncoras e `scroll-margin-top` por causa do cabeçalho fixo; `<h1>` único; página provisória removida; `npm run lint` e `npm run build` passam.

- [x] T21 — SEO, compartilhamento e dados estruturados
  - Arquivos: `src/app/layout.tsx`, `src/app/opengraph-image.tsx` (ou imagem em `public/`), `src/app/robots.ts`, `src/app/sitemap.ts`, JSON-LD `Organization` na página
  - Pronto quando: título, descrição, Open Graph, Twitter e `metadataBase` definidos (tom da marca, sem jargão); imagem de compartilhamento 1200×630; `robots` e `sitemap` respondem; JSON-LD válido; teste de metadados.

- [ ] T22 — Verificação final: tom de voz, acessibilidade e build
  - Arquivos: revisão de todos os textos; sem arquivos novos esperados
  - Pronto quando: textos sem jargão ("plataforma", "solução", "ecossistema"), sem exageros e sem emojis (RF-09); `npm run lint`, `npm test` e `npm run build` passam; página conferida no navegador em 360 px e em desktop (sem rolagem horizontal, foco visível, teclado completo, `prefers-reduced-motion`); auditoria automática de acessibilidade sem falhas críticas WCAG 2.2 AA; envio real de teste chega em `contato@murel.com.br` (pré-requisito: domínio verificado no provedor e variáveis configuradas).

## Cobertura do PRD

| Requisito | Tasks |
|---|---|
| RF-01 Cabeçalho | T10, T11 |
| RF-02 Hero | T12 |
| RF-03 Chamada para adesão | T4, T11, T12, T13, T15 |
| RF-04 Funcionalidades | T14, T15 |
| RF-05 Como funciona | T16 |
| RF-06 Perguntas frequentes | T17 |
| RF-07 Formulário de contato | T5, T6, T7, T8, T18 |
| RF-08 Rodapé | T19 |
| RF-09 Tom de voz | T22 |
| Não-funcionais (acessibilidade, SEO, segurança, desempenho) | T3, T9, T10, T21, T22 |

## Pendências externas (não são tasks de código)
- Confirmar o provedor de e-mail e verificar o domínio `murel.com.br` (SPF/DKIM) antes da T22.
- Confirmar os campos do formulário (`[A DEFINIR]` no PRD).
- Trocar a senha do sistema citada em `docs/input.md` e remover o trecho do arquivo.
