# Tasks: Teste Grátis por 30 dias

Referências: ./prd.md, ./techspec.md

Antes de implementar: ler os guias de `node_modules/next/dist/docs/` citados no Tech Spec (regra do `AGENTS.md`) e conduzir o layout pela skill `.agents/skills/impeccable` (regra do `CLAUDE.md`).

- [x] T1 — Criar a constante `urlAdesaoTeste` e atualizar o comentário do Trial
  - Arquivos: `src/lib/config.ts`, `src/lib/config.test.ts`, `src/types/plano.ts`
  - Pronto quando: `urlAdesaoTeste = urlAdesaoComPlano(TipoPlanoAdesao.Trial)` (importando `TipoPlanoAdesao` como valor) resulta em `<base>/adesao?tipoPlanoAdesao=0`, com base com e sem barra final; `urlAdesao` continua sem parâmetro; o comentário em `plano.ts` não diz mais que o Trial não é oferecido; testes de `config` passam.

- [x] T2 — Criar o componente `Garantias`
  - Arquivos: `src/components/ui/Garantias/Garantias.tsx`, `Garantias.styles.ts`, `Garantias.test.tsx`
  - Pronto quando: recebe `itens: readonly string[]` e `rotulo` (vira `aria-label` da lista); lista horizontal que quebra linha, texto `nevoa` 15px, check `amarelo` em SVG decorativo (`aria-hidden`); teste confirma a lista com o `aria-label` e os itens; sem valores soltos fora do tema.

- [x] T3 — Criar os dados e o componente `TesteGratis` (faixa)
  - Arquivos: `src/components/home/TesteGratis/TesteGratis.data.ts`, `TesteGratis.tsx`, `TesteGratis.styles.ts`, `TesteGratis.test.tsx`
  - Pronto quando: `.data.ts` exporta `garantiasTeste` ("Todas as funcionalidades", "Sem cartão de crédito", "Sem compromisso"); a faixa tem rótulo "Comece sem pagar nada", `h3` "Teste grátis por 30 dias", o texto do Tech Spec, `Garantias` (`aria-label` "Condições do teste grátis") e botão primário "Começar meu teste grátis" com `href` = `urlAdesaoTeste`; layout: fundo `asfalto2`, borda `amarelo` 2px, raio `xl`, duas colunas em `md`+ e uma coluna com botão em largura total abaixo disso; teste confirma heading, três garantias e o `href`.
  - Depende de: T1, T2

- [x] T4 — Atualizar o `Hero` com o novo CTA e as garantias
  - Arquivos: `src/components/home/Hero/Hero.tsx`, `Hero.styles.ts`, `Hero.test.tsx`
  - Pronto quando: o botão primário é "Testar grátis por 30 dias" (`urlAdesaoTeste`); "Falar com a equipe" continua em `#contato`; `Garantias` com `garantiasTeste` aparece abaixo dos botões; o teste que procurava "Ir para adesão" foi atualizado e passa.
  - Depende de: T1, T2, T3

- [x] T5 — Adicionar a chamada "Testar grátis" ao fim de `VisaoGeral`
  - Arquivos: `src/components/home/VisaoGeral/VisaoGeral.tsx`, `VisaoGeral.styles.ts`, teste correspondente
  - Pronto quando: há um botão/link "Testar grátis" ao fim da seção apontando para `urlAdesaoTeste`; teste cobre o link.
  - Depende de: T1

- [x] T6 — Incluir a faixa e a nota em `Planos`
  - Arquivos: `src/components/home/Planos/Planos.tsx`, `Planos.styles.ts`, `Planos.test.tsx`
  - Pronto quando: `TesteGratis` aparece antes de `ListaPlanos` (ordem no DOM); abaixo da lista há a nota centralizada "Todos os planos começam com 30 dias grátis. Você só paga depois do teste."; continuam 4 cartões com `tipoPlanoAdesao` 1, 2, 3 e 4 e nenhum aponta para `tipoPlanoAdesao=0`; lede, faixa e nota não se contradizem; testes passam.
  - Depende de: T3

- [x] T7 — Adicionar a chamada de teste em `Contato`
  - Arquivos: `src/components/home/Contato/Contato.tsx`, `Contato.styles.ts`, teste correspondente
  - Pronto quando: no topo do bloco, antes do WhatsApp, há o título "Prefere testar antes?", o texto "Use o sistema completo por 30 dias, sem cartão e sem compromisso." e o botão "Testar grátis por 30 dias" com `href` = `urlAdesaoTeste`; teste cobre o link.
  - Depende de: T1

- [x] T8 — Incluir as perguntas do teste no `Faq`
  - Arquivos: `src/components/home/Faq/Faq.data.ts`, `src/components/home/Faq/Faq.test.tsx`
  - Pronto quando: as cinco perguntas do Tech Spec entram depois de "Quanto custa?"; "Como eu começo?" cita o teste e o formulário; teste confirma as cinco perguntas e a menção ao teste. **Não publicar sem confirmação das regras do PRD** (registrar a pendência ao concluir).

- [x] T9 — Reorganizar o `Header` com o botão "Testar grátis"
  - Arquivos: `src/components/layout/Header/Header.tsx`, `Header.styles.ts`, `Header.test.tsx`
  - Pronto quando: `Acoes` mostra o botão primário sm "Testar grátis" (`urlAdesaoTeste`) sempre; "Acessar o sistema" (ghost, `urlAcesso`) só de `md` para cima; o menu aberto tem "Acessar o sistema" como último item, visível só abaixo de `md`; nunca há dois "Acessar o sistema" visíveis ao mesmo tempo; sem quebra em 360 px; testes cobrem os dois links e o item no menu aberto.
  - Depende de: T1

- [x] T10 — Fazer o `BotaoWhatsapp` aparecer só depois de `#perguntas`
  - Arquivos: `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.tsx`, `BotaoWhatsapp.styles.ts`, `BotaoWhatsapp.test.tsx`, `src/test/setup.ts` (se o mock do `IntersectionObserver` for global)
  - Pronto quando: vira Client Component com `useState(false)` e `IntersectionObserver` (`rootMargin: "0px 0px -15% 0px"`, `visivel = isIntersecting || boundingClientRect.top < 0`); fica visível se `#perguntas` não existir; observador é desmontado na limpeza; CSS oculto com `opacity: 0`, `translateY(24px)`, `pointer-events: none`, `visibility: hidden` e transição de 0,3 s (sem transição em `prefers-reduced-motion`); testes cobrem: oculto no início, visível ao entrar, continua visível com a seção acima da tela, oculta ao voltar, visível sem `#perguntas`, e mantêm `href`, `target`, `rel` e nome acessível; os três testes existentes foram ajustados.

- [ ] T11 — Verificação final
  - Arquivos: —
  - Pronto quando: `npm run lint` e `npm run build` passam sem avisos de hidratação ou de `cacheComponents`; testes passam; conferência manual em 360 px e desktop (sem rolagem horizontal, header sem quebra); cada chamada do teste leva a `tipoPlanoAdesao=0` e os quatro planos a 1–4; o balão aparece e some ao rolar; auditoria de acessibilidade (foco, contraste de `nevoa` sobre `asfalto2`, `prefers-reduced-motion`); pendências registradas: GIPE ler o parâmetro e confirmação das regras do teste.
  - Depende de: T1–T10
  - Parcial: `npm run lint` (0 erros), `npm run build` e a suíte de testes (129) passam. Falta a conferência manual no navegador (360 px e desktop, balão ao rolar, foco, contraste, `prefers-reduced-motion`) e as pendências externas (GIPE ler `tipoPlanoAdesao=0`; negócio confirmar as regras do teste).
