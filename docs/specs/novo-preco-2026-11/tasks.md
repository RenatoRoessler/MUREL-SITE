# Tasks: Plano Único a R$ 69,90 no Lançamento

Referências: ./prd.md, ./techspec.md

Antes de começar: ler os docs de `node_modules/next/dist/docs/` sobre `cacheComponents` e tempo atual no prerender (regra do `AGENTS.md`), e seguir as skills `code-best-practices` e `styled-components-best-practices`. O layout do cartão passa pela skill `.agents/skills/impeccable`.

- [x] T1 — Simplificar os tipos para um plano único
  - Arquivos: `src/types/plano.ts`
  - Pronto quando: `Plano` tem `tipo` (Mensal), `nome`, `centavosPorMes`, `centavosLancamento` e `mesesDeLancamento`; `TipoPlanoVendido`, `meses` e `recomendado` saíram; `TipoPlanoAdesao` continua com 0 a 4; `AreaDoSistema` não muda.

- [x] T2 — Regra de vigência do lançamento (função pura)
  - Arquivos: `src/components/home/Planos/Lancamento.ts`, `src/components/home/Planos/Lancamento.test.ts`
  - Pronto quando: `lancamentoVigente(agora, fim)` retorna `true` um milissegundo antes de 01/07/2027 00:00 -03:00 e `false` no instante e depois; teste cobre 30/06/2027 às 23:59 em Brasília.

- [x] T3 — Dados do plano único e da oferta
  - Arquivos: `src/components/home/Planos/Planos.data.ts`, `src/components/home/Planos/Planos.data.test.ts`
  - Pronto quando: `planoMensal` tem 9990 (tabela), 6990 (lançamento) e 12 meses; `fimDoLancamento` e `rotuloFimDoLancamento` ("30/06/2027") exportados; `planos`, `calcularCondicoes` e os preços antigos (14990, 13490, 11990, 7990) removidos; `areasDoSistema` segue com as 13 áreas; testes atualizados e passando.

- [x] T4 — Hook de vigência no cliente
  - Arquivos: `src/components/home/Planos/useLancamentoVigente.ts`
  - Pronto quando: usa `useSyncExternalStore` com snapshot de servidor `true` e snapshot de cliente `lancamentoVigente(Date.now())`, sem `Date` fora do cliente, no padrão do `BotaoWhatsapp`.

- [x] T5 — Cartão único com preço de lançamento
  - Arquivos: `src/components/home/Planos/CartaoPlano.tsx`, `src/components/home/Planos/CartaoPlano.styles.ts`
  - Pronto quando: com o lançamento vigente, mostra o selo "Preço de lançamento · assine até 30/06/2027", "R$ 99,90" riscado (lido por leitor de tela como "de R$ 99,90 por R$ 69,90 por mês"), "R$ 69,90/mês", a linha "R$ 69,90/mês nos primeiros 12 meses; depois, R$ 99,90/mês." e as garantias; encerrado, mostra só "R$ 99,90/mês", sem selo, riscado nem linha dos 12 meses; botão "Assinar o plano mensal" com `href` `…/adesao?tipoPlanoAdesao=1`; sem `Total`, `Economia` nem `$destaque` condicional; usa só tokens do tema.

- [x] T6 — Testes do cartão (lançamento vigente e encerrado)
  - Arquivos: `src/components/home/Planos/CartaoPlano.test.tsx`
  - Pronto quando: cobre os dois estados com `vi.useFakeTimers` e `vi.setSystemTime` (antes e depois do prazo), o `href` do botão com `tipoPlanoAdesao=1`, a ausência do riscado e do selo quando encerrado, e o texto para leitor de tela do preço riscado.

- [x] T7 — Reescrever a seção de planos
  - Arquivos: `src/components/home/Planos/Planos.tsx`, `src/components/home/Planos/Planos.styles.ts`
  - Pronto quando: título "Um plano, tudo incluso, sem fidelidade." e lede novo; faixa do teste grátis mantida; um único cartão centralizado com largura máxima no lugar da lista de quatro; `NotaTeste` no singular ("O plano começa com 30 dias grátis. Você só paga depois do teste."); bloco "Tudo isso incluso no plano" sem a frase mensal/anual; bloco de ajuda "Ficou com dúvida?"; `ListaPlanos` e `ItemPlano` de quatro colunas removidos; legível a partir de 360 px sem rolagem horizontal.

- [x] T8 — Testes da seção de planos
  - Arquivos: `src/components/home/Planos/Planos.test.tsx`
  - Pronto quando: verifica um único cartão, título novo, 13 áreas, link de contato para `#contato`, `NotaTeste` no singular, e a ausência de "Trimestral", "Semestral", "Anual", "economia", "149,90", "134,90", "119,90", "79,90", "Relatórios", "avarias" e "tag".

- [x] T9 — Ajustar o texto do teste grátis
  - Arquivos: `src/components/home/TesteGratis/TesteGratis.tsx`, `src/components/home/TesteGratis/TesteGratis.test.tsx`
  - Pronto quando: o texto diz "No fim do teste, você decide se quer assinar." no lugar de "escolhe o plano que fizer mais sentido"; o botão continua com `tipoPlanoAdesao=0`; teste atualizado e passando.

- [x] T10 — Atualizar o FAQ
  - Arquivos: `src/components/home/Faq/Faq.data.ts`, `src/components/home/Faq/Faq.test.tsx`
  - Pronto quando: "Quanto custa?" cita R$ 69,90, R$ 99,90 e 30/06/2027 e não cita as quatro periodicidades; "O que acontece depois dos 30 dias?" usa "assina" no lugar de "escolhe um plano"; a pergunta nova "O que acontece depois dos 12 meses do preço de lançamento?" vem logo após "Quanto custa?" e não promete prazo de aviso; testes atualizados e passando.

- [ ] T11 — Verificação final e varredura de valores antigos
  - Status: lint (0 erros), testes (136), tsc e build passaram; varredura de valores antigos limpa; HTML estático traz `tipoPlanoAdesao=1` no plano e `=0` no teste. Falta a conferência visual manual (360 px e desktop, rolagem horizontal, foco e contraste AA), que não foi feita.
  - Arquivos: todo `src/` (somente leitura, exceto correções)
  - Pronto quando: a busca por "149,90", "134,90", "119,90", "79,90", "trimestral", "semestral" e "anual" em `src/` não encontra nada fora de `TipoPlanoAdesao`; `npm run lint` e `npm run test` sem erros; `npm run build` conclui sem erro de prerender (confirmando que o hook cliente não torna a seção dinâmica); conferência manual em 360 px e em desktop sem rolagem horizontal; botão do plano abre `tipoPlanoAdesao=1` e as chamadas do teste abrem `tipoPlanoAdesao=0`; foco visível e contraste AA do selo e do preço riscado conferidos.

- [ ] T12 — Registrar a remoção do lançamento para julho de 2027
  - Arquivos: lembrete externo (issue ou tarefa agendada); nota no PR
  - Pronto quando: existe um lembrete para remover do código o preço de lançamento, o selo, o riscado e as menções do FAQ depois de 30/06/2027, e o PR cita os pontos pendentes do negócio (R$ 99,90 como tabela final, "sem multa", aviso de 60 dias, GIPE lendo `tipoPlanoAdesao`).
