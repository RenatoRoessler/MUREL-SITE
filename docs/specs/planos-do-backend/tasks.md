# Tasks: Planos vindos do Back-end

Referências: ./prd.md, ./techspec.md

Antes de escrever código: seguir as skills `code-best-practices` e `styled-components-best-practices` e ler `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md` (AGENTS.md). Cada task termina com seus testes passando (`npm test`); `npm run lint` e `npm run build` rodam na T14.

- [x] T1 — Definir os tipos de domínio da oferta
  - Arquivos: `src/types/plano.ts`
  - Pronto quando: existem `TipoPlanoPago`, `PlanoPago`, `TesteGratis` e `OfertaPlanos` como no Tech Spec; `Plano`, `centavosPorMes`, `centavosLancamento` e `mesesDeLancamento` saem; `TipoPlanoAdesao` e `AreaDoSistema` continuam. O projeto ainda não compila nos consumidores antigos (esperado até T9 a T13).

- [x] T2 — Funções puras de formatação
  - Arquivos: `src/lib/planos/formatar.ts`, `src/lib/planos/formatar.test.ts`
  - Pronto quando: `formatarReais(69.9)` devolve "R$ 69,90" (com o espaço sem quebra do `Intl`) e `formatarReais(99.9)` "R$ 99,90"; `formatarDataIso("2027-06-30T00:00:00")` devolve "30/06/2027" sem usar `Date`; `rotuloDuracaoMeses(1)` "1 mês" e `rotuloDuracaoMeses(3)` "3 meses"; entradas inválidas têm comportamento definido e testado.

- [x] T3 — Mapear a resposta da API para `OfertaPlanos`
  - Arquivos: `src/lib/planos/mapearOferta.ts`, `src/lib/planos/mapearOferta.test.ts`
  - Pronto quando: `mapearOferta` implementa as 7 regras do Tech Spec e os testes cobrem: o JSON de `docs/input.md` (Trial + Mensal em promoção → `teste.duracaoMeses = 1`, um plano com `promocao.fim = "2027-06-30"`); `emPromocao = false`; `emPromocao = true` com `promocaoFim` nulo (`fim = null`); `valorAtual >= valor` (sem promoção); ordenação por `ordemExibicao`; item com campo faltando ou de tipo errado descartado sem derrubar os demais; `tipoPeriodoPlano` desconhecido descartado com `console.warn`; Trial com `validadeDuracaoMeses` inválido (`teste = null`); resposta que não é array ou sem plano pago (`null`).

- [x] T4 — Buscar e cachear a oferta no servidor
  - Arquivos: `src/lib/planos/obterOferta.ts`, `src/lib/planos/obterOferta.test.ts`
  - Pronto quando: `obterOferta()` usa `"use cache"` e `cacheLife({ stale: 300, revalidate: 300, expire: 86400 })`; chama `GET {MUREL_API_URL}/Plano` (sem barra final duplicada) com `accept: application/json` e `AbortSignal.timeout(5000)`; devolve `null` com `console.error` quando a variável falta, a rede falha, estoura o tempo, a resposta não é `ok`, o JSON é inválido ou `mapearOferta` devolve `null`; na falha chama `cacheLife` curto (revalidate 60, expire ≥ 5 min). Testes com `fetch` mockado cobrem sucesso e cada caminho de falha, e a URL chamada.

- [x] T5 — Documentar a variável de ambiente
  - Arquivos: `.env.example`
  - Pronto quando: `MUREL_API_URL` está documentada (só servidor, sem prefixo `NEXT_PUBLIC_`, exemplo `https://api.murel.com.br/api/v1`). Nenhum valor real de segredo é copiado.

- [x] T6 — Verificar o comportamento do cache na falha (decisão aberta do Tech Spec)
  - Arquivos: `src/lib/planos/obterOferta.ts` (ajuste só se necessário)
  - Pronto quando: com `MUREL_API_URL` apontando para um endereço morto, `npm run build` conclui sem travar, gera o HTML com a contingência e confirma-se (log com `NEXT_PRIVATE_DEBUG_CACHE=1` ou `npm start` e nova consulta após ~1 minuto com a API de volta) que a oferta é reavaliada. Se a chamada tardia de `cacheLife` não valer, dividir em duas funções (uma só de `fetch` que lança erro, outra que captura e define o `cacheLife`) e registrar o resultado aqui. Depende de T3, T4 e T9 a T11 para ter a página funcionando.
  - Resultado: `cacheLife` chamado depois do erro vale, sem dividir a função. Build com `MUREL_API_URL` vazia e com `http://localhost:9/api/v1` conclui sem travar, gera a contingência no HTML e a rota sai com `Revalidate 1m`; com `https://api.murel.com.br/api/v1` sai com `Revalidate 5m` e os preços no HTML. A reavaliação com a API de volta, em `npm start`, não foi exercitada.

- [x] T7 — Texto da duração do teste: helpers compartilhados
  - Arquivos: `src/lib/planos/textos.ts`, `src/lib/planos/textos.test.ts`
  - Pronto quando: existem funções puras que recebem `teste: TesteGratis | null` e devolvem os textos que dependem da duração (título "Teste grátis por 1 mês", botão "Testar grátis por 1 mês", garantia "1 mês grátis para testar", nota do plano "O plano começa com 1 mês grátis"), caindo para a versão sem número ("Teste grátis", "Testar grátis") quando `teste` é `null`. Testes cobrem 1 mês, 3 meses e `null`.

- [x] T8 — Montar o FAQ a partir da oferta
  - Arquivos: `src/components/home/Faq/Faq.data.ts`, `src/components/home/Faq/Faq.tsx`, `src/components/home/Faq/Faq.test.tsx`
  - Pronto quando: `Faq.data.ts` exporta `montarPerguntas(oferta)` e `Faq` recebe `oferta: OfertaPlanos | null`; "Quanto custa?" segue a tabela do Tech Spec (promoção com data, promoção sem data, sem promoção, contingência sem valores); a pergunta sobre o fim do preço de lançamento só aparece quando há promoção com `fim` e cita a data; nenhuma resposta fala em "12 meses" nem em "30 dias" derivados do teste (a retenção de 30 dias dos dados continua como está); respostas sobre o teste usam a duração ou redação sem número. Testes cobrem os quatro cenários.

- [x] T9 — `CartaoPlano` como Server Component com o plano do back-end
  - Arquivos: `src/components/home/Planos/CartaoPlano.tsx`, `src/components/home/Planos/CartaoPlano.test.tsx`
  - Pronto quando: sem `"use client"`; recebe `PlanoPago` e o `teste`; usa `formatarReais` e `formatarDataIso`; com promoção e `fim`: selo "Preço de lançamento · assine até 30/06/2027", riscado com texto para leitor de tela ("de R$ 99,90 por R$ 69,90"), valor atual e linha "R$ 69,90/mês até 30/06/2027; depois, R$ 99,90/mês."; promoção sem `fim`: selo "Preço de lançamento", sem data e sem linha de regra; sem promoção: só o valor atual; nome e botão vêm do plano ("Assinar o plano mensal") e o `href` usa `urlAdesaoComPlano(plano.tipo)`. Testes cobrem os três estados e o `href`.

- [x] T10 — Bloco de contingência da seção de planos
  - Arquivos: `src/components/home/Planos/PlanoIndisponivel.tsx`, `src/components/home/Planos/PlanoIndisponivel.styles.ts` (se necessário), `src/components/home/Planos/PlanoIndisponivel.test.tsx`
  - Pronto quando: mensagem "Os valores não carregaram agora. Comece pelo teste grátis ou fale com a equipe." sem preço e sem duração; botão de teste grátis com `href` de `urlAdesaoTeste` (`tipoPlanoAdesao=0`) e botão de WhatsApp com `urlWhatsapp`; mesmo visual do cartão (RF11), legível a partir de 360 px, foco visível. Teste confere texto, os dois `href` e a ausência de "R$".

- [x] T11 — `Planos` e `TesteGratis` consumindo a oferta
  - Arquivos: `src/components/home/Planos/Planos.tsx`, `src/components/home/Planos/Planos.data.ts`, `src/components/home/Planos/Planos.test.tsx`, `src/components/home/Planos/Planos.data.test.ts`, `src/components/home/TesteGratis/TesteGratis.tsx`, `src/components/home/TesteGratis/TesteGratis.test.tsx`
  - Pronto quando: `Planos` recebe `oferta: OfertaPlanos | null`; renderiza um `CartaoPlano` por plano pago ou `PlanoIndisponivel` quando `oferta` é `null`; `NotaTeste` e `garantiasPlano` usam os textos de T7; `planoMensal` e a constante fixa de "30 dias" saem de `Planos.data.ts` (`areasDoSistema` fica); `TesteGratis` recebe `teste` e usa título e garantias de T7; a faixa do teste continua antes do plano e leva a `tipoPlanoAdesao=0`. Testes atualizados.

- [x] T12 — `Hero` e `Contato` com a duração do teste vinda do back-end
  - Arquivos: `src/components/home/Hero/Hero.tsx`, `src/components/home/Contato/Contato.tsx`, e os testes desses componentes (criar se não existirem)
  - Pronto quando: ambos recebem `teste: TesteGratis | null`; botão e frase do teste usam os helpers de T7 ("Testar grátis por 1 mês" com dado, "Testar grátis" sem); links continuam para `tipoPlanoAdesao=0`. Testes cobrem com e sem `teste`.

- [x] T13 — Ligar tudo em `page.tsx` e remover o código antigo
  - Arquivos: `src/app/page.tsx`, `src/components/home/Planos/Lancamento.ts`, `src/components/home/Planos/Lancamento.test.ts`, `src/components/home/Planos/useLancamentoVigente.ts`
  - Pronto quando: `Home` é `async`, chama `obterOferta()` uma vez e passa `oferta` (ou `oferta?.teste ?? null`) para `Hero`, `Planos`, `Faq` e `Contato`; `Lancamento.ts`, seu teste e `useLancamentoVigente.ts` foram apagados sem restar importação; busca por `Lancamento`, `planoMensal`, `centavos`, `mesesDeLancamento`, `useLancamentoVigente` no `src/` não encontra nada; o projeto compila (`tsc`).

- [x] T14 — Varredura de valores e textos antigos
  - Arquivos: `src/**` (leitura); correções onde necessário, incluindo `src/app/layout.tsx` e metadados
  - Pronto quando: busca por `69,90`, `99,90`, `30/06/2027`, `149,90`, `134,90`, `119,90`, `79,90`, `30 dias` e `12 meses` em `src/` (fora de testes e fixtures) não acha valor fixo de preço, data de promoção nem duração do teste; a única ocorrência de "30 dias" aceita é a retenção dos dados no FAQ; nenhum metadado, JSON-LD, menu ou resumo cita preço.

- [ ] T15 — Validação final
  - Arquivos: nenhum (execução e conferência); registrar o resultado nesta task
  - Pronto quando: `npm run lint` sem erros, `npm test` verde, `npm run build` sem avisos de hidratação ou de `cacheComponents`; com a API real (`MUREL_API_URL=https://api.murel.com.br/api/v1`) a home mostra o cartão com R$ 99,90 riscado, R$ 69,90 e a data vinda de `promocaoFim`; conferência manual: todos os botões do teste abrem `tipoPlanoAdesao=0` e o botão do plano abre `tipoPlanoAdesao=1`; contingência conferida derrubando a URL (sem preço, com os dois botões); 360 px e desktop sem rolagem horizontal; foco visível, contraste e o selo sem depender só de cor (WCAG 2.2 AA). Pendências externas registradas no PR: `MUREL_API_URL` configurada no deploy, GIPE lendo `tipoPlanoAdesao`, negócio confirmando o frescor de 5 minutos e a redação "1 mês".
  - Parcial: `npm run lint` (0 erros; 94 avisos, todos em scripts de `.agents/skills/impeccable`), `npm test` (187 de 188 passam; `ContatoForm.test.tsx`, que não foi alterado, falhou uma vez na suíte em paralelo e passa isolado) e `npm run build` passam. Com a API real, o HTML tem R$ 99,90 riscado, R$ 69,90, "assine até 30/06/2027", "Teste grátis por 1 mês", `tipoPlanoAdesao=1` no botão do plano e `=0` nas chamadas do teste. Falta a conferência manual no navegador (360 px e desktop sem rolagem horizontal, foco, contraste, contingência vista na tela) e as pendências externas.
