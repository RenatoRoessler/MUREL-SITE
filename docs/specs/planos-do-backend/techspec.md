# Tech Spec: Planos vindos do Back-end

## Referências
- PRD: ./prd.md
- Design: seção "Design" abaixo (via skill claude-design, que ainda não existe no projeto; a mudança reaproveita o visual atual e não redefine o design system)
- Docs do Next consultadas (versão 16.4.3, `cacheComponents: true`): `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md`, `01-app/01-getting-started/08-caching.md` e `04-functions/cacheLife.md`
- Spec anterior que esta substitui na origem dos dados: `docs/specs/novo-preco-2026-11/techspec.md`

## Design
- **Telas/estados** (a seção `#planos` da home e os textos que citam preço ou duração do teste):
  1. *Promoção com data*: cartão com selo "Preço de lançamento · assine até 30/06/2027", preço de tabela riscado, preço atual em destaque e a linha "R$ 69,90/mês até 30/06/2027; depois, R$ 99,90/mês." (RF3, RF3a).
  2. *Promoção sem `promocaoFim`*: igual ao anterior, sem data em lugar nenhum: selo "Preço de lançamento" e nenhuma linha "até <data>" (RF3a, decisão do negócio).
  3. *Sem promoção*: só o preço atual, sem riscado, selo nem linha de regra (RF4).
  4. *Contingência* (API fora do ar, lenta, resposta inválida ou sem plano pago): no lugar do cartão, um bloco com a mensagem "Os valores não carregaram agora. Comece pelo teste grátis ou fale com a equipe." e dois botões: teste grátis (`tipoPlanoAdesao=0`) e WhatsApp. Sem preço e sem duração do teste (RF9, decisão: mensagem sem preço, para nunca divergir do que é cobrado).
  5. *Carregamento* (RF8): no caminho normal a oferta já está no HTML (ver "Arquitetura"), então não há tela de carregamento visível nem salto de layout. A reserva de espaço só importa se o cache expirar e a página for renderizada sob demanda (ver "Riscos").
- **Componentes do design system reaproveitados:** `Section`, `Button`, `Garantias` (`src/components/ui`), e os styled-components atuais de `CartaoPlano.styles.ts` (`Cartao`, `Selo`, `Riscado`, `Valor`, `Regra`, `SoLeitor`...). Nenhum token novo.
- **Componentes novos:** `PlanoIndisponivel` em `src/components/home/Planos/` (bloco de contingência), reutilizando `Cartao`, `Button` e `urlWhatsapp`/`urlAdesaoTeste` de `src/lib/config.ts`. Estilos em `PlanoIndisponivel.styles.ts` ou, se for só um parágrafo e dois botões, reaproveitando `Chamada`/`Regra`.
- **Tokens de tema:** nenhum novo.

## Arquitetura da solução

### Visão geral
A consulta é feita **no servidor** (Server Component → `fetch` dentro de uma função com `"use cache"`), não no navegador. Isso:
- dispensa CORS (o navegador nunca fala com a API; a liberação do domínio confirmada pelo negócio fica como reserva);
- entrega os preços no HTML inicial (SEO, sem salto de layout, sem estado de carregamento);
- deixa a URL da API fora do bundle do cliente.

```
page.tsx (async) ── obterOferta() ──► fetch GET {MUREL_API_URL}/Plano   ["use cache", revalida a cada 5 min]
     │                  │
     │                  └─ mapeia o JSON para OfertaPlanos | null
     └─ passa `oferta` por props: Hero, Planos, Faq, Contato
```

### Arquivos novos
- `src/types/plano.ts` (alterado, ver abaixo): tipos de domínio.
- `src/lib/planos/obterOferta.ts`: `obterOferta(): Promise<OfertaPlanos | null>`. Contém `"use cache"`, `cacheLife`, o `fetch` com timeout e o tratamento de erro.
- `src/lib/planos/mapearOferta.ts`: função pura `mapearOferta(json: unknown): OfertaPlanos | null`. Valida o formato, separa Trial dos pagos, ordena e normaliza a promoção.
- `src/lib/planos/formatar.ts`: funções puras `formatarReais(valor)`, `formatarDataIso(iso)` (dd/mm/aaaa) e `rotuloDuracaoMeses(meses)` ("1 mês", "3 meses").
- `src/components/home/Planos/PlanoIndisponivel.tsx` (+ `.styles.ts` se necessário).
- Testes ao lado de cada arquivo (`*.test.ts`/`*.test.tsx`), como o resto do projeto.

### Arquivos alterados
- `src/types/plano.ts`: substituir `Plano` (centavos, `mesesDeLancamento`) pelos tipos abaixo. `TipoPlanoAdesao` permanece (contrato com o GIPE).
- `src/app/page.tsx`: vira `async`, chama `obterOferta()` uma vez e passa `oferta` para `Hero`, `Planos`, `Faq` e `Contato`.
- `src/components/home/Planos/Planos.tsx`: recebe `oferta`; renderiza `CartaoPlano` para cada plano pago ou `PlanoIndisponivel` se `oferta` for `null`; `NotaTeste` usa a duração do teste.
- `src/components/home/Planos/CartaoPlano.tsx`: deixa de ser Client Component (não precisa mais de relógio) e vira Server Component. Recebe o `PlanoPago` novo. Nome e texto do botão vêm do plano (`Assinar o plano mensal`).
- `src/components/home/Planos/Planos.data.ts`: sai `planoMensal`; `garantiasPlano` vira função da duração do teste (`montarGarantiasPlano(teste)`). `areasDoSistema` permanece.
- `src/components/home/TesteGratis/TesteGratis.tsx`: recebe `teste` (duração) e monta o título ("Teste grátis por 1 mês"); sem `teste`, usa "Teste grátis".
- `src/components/home/Hero/Hero.tsx` e `src/components/home/Contato/Contato.tsx`: botão e texto do teste passam a usar a duração ("Testar grátis por 1 mês"); sem `teste`, "Testar grátis".
- `src/components/home/Faq/Faq.data.ts`: de lista fixa para `montarPerguntas(oferta)`; `Faq.tsx` recebe `oferta`.
- `.env.example`: documentar `MUREL_API_URL`.

### Arquivos removidos
- `src/components/home/Planos/Lancamento.ts` e `Lancamento.test.ts`: a regra "o lançamento está vigente?" passa a ser do back-end (`emPromocao`).
- `src/components/home/Planos/useLancamentoVigente.ts`: sem uso.

### Tipos e dados (`src/types/plano.ts`)
```ts
export type TipoPlanoPago = Exclude<TipoPlanoAdesao, typeof TipoPlanoAdesao.Trial>;

export type PlanoPago = {
  tipo: TipoPlanoPago;        // vem de tipoPeriodoPlano; o botão usa em urlAdesaoComPlano
  nome: string;               // tipoPeriodoPlanoDescricao ("Mensal")
  valorTabela: number;        // valor, em reais
  valorAtual: number;         // valorAtual, em reais
  promocao: { fim: string | null } | null; // fim = "AAAA-MM-DD" (parte da data de promocaoFim) ou null
};

export type TesteGratis = { duracaoMeses: number }; // validadeDuracaoMeses do plano Trial

export type OfertaPlanos = {
  planos: PlanoPago[];        // ordenados por ordemExibicao; nunca vazio
  teste: TesteGratis | null;  // null se a resposta não trouxer o Trial
};
```
`OfertaPlanos` é objeto simples serializável, como `use cache` exige.

### Contrato da API (`GET {MUREL_API_URL}/Plano`)
Campos usados: `tipoPeriodoPlano`, `tipoPeriodoPlanoDescricao`, `validadeDuracaoMeses`, `valor`, `valorAtual`, `emPromocao`, `promocaoFim`, `ordemExibicao`. Ignorados nesta versão: `planoAdesaoId`, `plano`, `valorPromocional` (redundante com `valorAtual`), `diferencaPercentual`, `promocaoInicio`.

Regras do `mapearOferta`:
1. A resposta precisa ser um array; item que não tiver os campos usados com o tipo certo é descartado (não derruba os demais).
2. `tipoPeriodoPlano === 0` → `teste` (usa `validadeDuracaoMeses`, que precisa ser inteiro > 0; senão `teste = null`). Tipos 1 a 4 → `planos`. Qualquer outro valor é descartado.
3. Ordenar `planos` por `ordemExibicao` crescente.
4. Promoção: `promocao` só existe se `emPromocao === true` **e** `valorAtual < valor`. Caso contrário o plano sai sem promoção e o preço exibido é `valorAtual`.
5. `promocao.fim`: se `promocaoFim` for string no formato ISO, guarda só os 10 primeiros caracteres (`AAAA-MM-DD`); senão `null`. A data **não** é convertida em `Date`: o texto "30/06/2027" é o dia que o back-end mandou, sem deslocamento de fuso.
6. Se não sobrar nenhum plano pago, `mapearOferta` devolve `null` (vai para a contingência).
7. Preço exibido nunca é recalculado nem arredondado no site; `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` formata o número recebido.

### Consulta e cache (`obterOferta`)
- `"use cache"` na função, com `cacheLife({ stale: 300, revalidate: 300, expire: 86400 })`: o dado envelhece até 5 minutos, o `expire` ≥ 5 min mantém a oferta dentro do HTML pré-renderizado (limiares em `cacheLife.md`, "Prerendering behavior").
- `fetch` com `signal: AbortSignal.timeout(5000)` e `headers: { accept: "application/json" }`. `response.ok` falso, erro de rede, timeout, JSON inválido ou `mapearOferta` devolvendo `null` caem no mesmo caminho de falha.
- **Falha:** registrar com `console.error` (sem dados sensíveis, só status/mensagem) e devolver `null`. Na falha, chamar `cacheLife({ stale: 300, revalidate: 60, expire: 86400 })` para a contingência ser reavaliada em 1 minuto, em vez de ficar 5 minutos (e, no build, não ficar "congelada" no HTML). Validar na T de verificação se a chamada tardia vale; se não valer, dividir em duas funções (uma só de `fetch` que lança erro, que não é armazenada, e a que captura e define o `cacheLife`).
- URL: `process.env.MUREL_API_URL` (variável **sem** prefixo `NEXT_PUBLIC_`, só servidor), sem barra final. Produção: `https://api.murel.com.br/api/v1` (a mesma do GIPE, `.env.prod`). Se a variável faltar, `obterOferta` devolve `null` (contingência) e registra o motivo; o site continua de pé.

### Server vs Client
- Tudo é Server Component: `page.tsx`, `Hero`, `Planos`, `CartaoPlano`, `PlanoIndisponivel`, `TesteGratis`, `Faq`, `Contato`. O único Client Component que existia nesta área (`CartaoPlano` por causa do relógio) deixa de ser.
- Componentes recebem `oferta` por props e ficam síncronos e puros; só `page.tsx` é `async`. Isso mantém os testes dos componentes simples (renderizar com uma `oferta` de exemplo) e deixa a regra de dados em `lib/planos`.

### Textos que dependem do dado
| Onde | Com promoção e `fim` | Promoção sem `fim` | Sem promoção | Contingência |
|---|---|---|---|---|
| Selo do cartão | "Preço de lançamento · assine até 30/06/2027" | "Preço de lançamento" | (sem selo) | (sem cartão) |
| Linha de regra | "R$ 69,90/mês até 30/06/2027; depois, R$ 99,90/mês." | (sem linha) | (sem linha) | (sem cartão) |
| FAQ "Quanto custa?" | preço atual, tabela, data | preço atual e tabela, sem data | só o preço atual | "Fale com a equipe pelo formulário de contato." |
| FAQ sobre o fim do lançamento | "O que acontece quando o preço de lançamento acaba?" com a data | omitida | omitida | omitida |
| Duração do teste (Hero, Contato, faixa, garantias, nota do plano, FAQ) | "1 mês" via `rotuloDuracaoMeses` | idem | idem | sem duração ("Testar grátis") |

Notas:
- Os "30 dias" fixos em `Hero`, `Contato`, `TesteGratis`, `Planos.data` (`garantiasPlano`), `Planos` (`NotaTeste`) e `Faq.data` (quatro respostas) saem. Redação: onde hoje se lê "30 dias", ler a duração derivada ou reescrever sem número ("Durante o teste você usa o sistema completo...", "O que acontece quando o teste termina?").
- A frase do FAQ "os seus dados ficam guardados por 30 dias" é **outra** regra (retenção depois do teste) e não vem desta API: permanece como está e continua pendente de confirmação do negócio (já registrado em `teste-gratis`).
- O que o PRD chama de "12 meses" desaparece dos textos: a regra do lançamento agora é a data de `promocaoFim`. Isso altera a frase definida em `novo-preco-2026-11` (RF4b); este Tech Spec prevalece.
- O valor `R$ 69,90` no texto da `Home` (ex.: `dadosEstruturados`, metadados) não existe hoje; se aparecer algum, passa a usar `oferta` ou é removido (T de varredura).

## Decisões técnicas e trade-offs
- **Servidor, não navegador.** Alternativa: `fetch` no cliente com `useEffect`. Descartada: exigiria CORS, mostraria carregamento/salto de layout, esconderia o preço de buscadores e faria o preço aparecer depois do HTML. Custo da escolha: o site depende do cache do Next e de variável de ambiente no servidor.
- **`use cache` com 5 minutos, em vez de `fetch` sob demanda a cada visita.** Evita bater na API a cada acesso e mantém a home estática/rápida. Contrapartida: uma mudança de preço leva até ~5 minutos para aparecer (e o Next serve a versão antiga enquanto regenera em segundo plano). Valor a confirmar com o negócio (pendência "Frescor do dado" do PRD); a mudança é só o `cacheLife`.
- **Cache em memória do processo.** Em hospedagem serverless cada instância tem o seu cache (`use-cache.md`, "Runtime caching considerations"); o efeito é só buscar mais vezes a API, sem inconsistência grave. `use cache: remote` não é necessário para uma rota leve e pública.
- **Confiar em `emPromocao`/`valorAtual` do back-end**, em vez de o site comparar `promocaoFim` com a data atual. Remove o hook de relógio e a regra duplicada. Efeito colateral aceito: se o back-end atrasar a virada, o site atrasa junto (até 5 min do cache).
- **Data como texto `AAAA-MM-DD`**, sem `Date`. Evita o deslocamento de fuso (o campo vem sem fuso) e atende o "assine até 30/06/2027" sem lógica de fuso no site.
- **Contingência sem preço** (decisão do negócio no PRD): nunca existe preço "de reserva" no código, então o site não pode divergir da cobrança. O custo é perder a conversão do plano pago nos minutos em que a API cai; o teste grátis e o WhatsApp seguem disponíveis.
- **Validação manual do JSON (sem zod).** O projeto não usa zod hoje; um guarda de tipo pequeno em `mapearOferta` basta para 8 campos e evita nova dependência.
- **Não criar rota `/api/planos` no site.** Seria só um proxy sem ganho, já que o consumo é no servidor.
- **Mantém os tipos 2 a 4 em `TipoPlanoAdesao`** (contrato com o GIPE) e aceita-os no mapeamento: se o back-end voltar a devolver outros planos pagos, o site os exibe em ordem, mas hoje o desenho do `Planos` está pensado para um cartão.

## Riscos / pontos de atenção
- **Build com a API indisponível:** o HTML pré-renderizado sai com a contingência. A mitigação é o `cacheLife` curto na falha (1 min) e a verificação em T de teste com `MUREL_API_URL` apontando para um endereço morto. Se o shell não revalidar, avaliar `connection()` + `<Suspense>` com esqueleto de altura fixa para a seção `#planos`.
- **Cache expirado sem tráfego (`expire` de 24 h):** a primeira visita depois disso renderiza sob demanda. O `page.tsx` async aguarda o cache sem `<Suspense>`; o efeito é a página demorar até o timeout (5 s) no pior caso. Alternativa se incomodar: `loading.tsx` com esqueleto. Isso reinterpreta o RF8 do PRD (sem salto de layout) como "o dado já vem no HTML"; ajustado no PRD.
- **Variável de ambiente em produção:** `MUREL_API_URL` precisa estar configurada no ambiente de deploy do site. Sem ela o site mostra a contingência em produção. Incluir no checklist de publicação e no `.env.example`.
- **Tipos de plano não esperados:** valores novos de `tipoPeriodoPlano` são descartados em silêncio; registrar `console.warn` no mapeamento para não passar despercebido.
- **`promocaoFim` no passado com `emPromocao = true`:** o site confia no back-end. Se aparecer promoção vencida, o erro está no back-end.
- **Redação "1 mês":** `validadeDuracaoMeses` é número de meses e o site agora diz "1 mês". Se o negócio preferir "30 dias", isso exige o campo em dias na API.
- **Testes de componentes `async`:** `page.tsx` vira `async`; os testes de `Home` precisam aguardar o componente (ou testar `Planos`/`Faq` com `oferta` direta e deixar `obterOferta` mockado). Testes que dependiam de `useLancamentoVigente` e `Lancamento.ts` são reescritos.
- **GIPE precisa ler `tipoPlanoAdesao`** (risco herdado de `planos-adesao`, `teste-gratis` e `novo-preco-2026-11`); fora do alcance do site.

## Fora de escopo técnico
- Alterar o back-end, o contrato de `/api/v1/Plano` ou a tela de adesão do GIPE.
- Cache durável compartilhado entre instâncias (`use cache: remote`) e invalidação sob demanda por webhook do back-end (`revalidateTag`); fica como evolução se os 5 minutos não bastarem.
- Exibir `diferencaPercentual`, `promocaoInicio` ou o `planoAdesaoId`.
- Cartões de vários planos ou comparação entre eles; a decisão de plano único continua.
- Métricas de uso (taxa de visitas em contingência); só `console.error` no servidor nesta versão.
- Painel de edição de planos no site.
