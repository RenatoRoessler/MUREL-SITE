# Tech Spec: Seção de Planos com Adesão

## Referências
- PRD: ./prd.md
- Layout de referência: `docs/murel-planos.html` (só o visual; preços, níveis e funcionalidades dele não valem)
- Guia de marca: `docs/Marca_Murel.html`
- Spec anterior da home: `docs/specs/home-vendas-detalhada/techspec.md` (padrão de `Section`, `Button`, dados tipados, testes)
- Fonte do conteúdo funcional: `C:\murel\GIPE` (levantamento já consolidado no PRD)
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe; as decisões derivam do `murel-planos.html`, do guia de marca e do que a home já tem. A execução do layout passa pela skill `.agents/skills/impeccable` (regra do `CLAUDE.md`).
- Next `16.4.3` com `cacheComponents: true` (herdado). A seção é conteúdo estático e não usa dados de requisição, `searchParams` nem `next/image`; ainda assim, ler `node_modules/next/dist/docs/` (regra do `AGENTS.md`) antes de implementar, e validar com `npm run build`.

## Estado atual do repositório
- A home (`src/app/page.tsx`) compõe: Hero, Diferencial, VisaoGeral, Funcionalidades (5 áreas: pátio, caixa e preços, mensalistas, conveniadas, tema), ComoFunciona, Faq, Contato, Footer, BotaoWhatsapp.
- `src/lib/config.ts` já exporta `urlAdesao` (`${urlBase}/adesao`); não existe nenhum link de adesão com plano.
- O `Header` tem `secoes` (Sistema, Como funciona, Perguntas, Contato) e o botão "Acessar o sistema".
- `Section` entrega faixa tracejada, `h2` e lede. `Button` tem variantes `primary` e `ghost` e tamanhos `sm`/`md`. O tema é único e escuro (`theme.ts`) e já traz `asfalto2`, `faixaCinza`, `bordaControle`, `amarelo`, `giz`, `nevoa`, `ok`, e `radii.xl`.
- O texto de `Contato` diz "tire dúvidas, inclusive sobre preço", o que passa a ficar parcialmente desatualizado.
- Os textos de preço dos planos **não existem** em nenhum arquivo do site.

## Design
- **Posição na home:** nova seção `#planos` entre `ComoFunciona` e `Faq` (depois de o visitante ver o que o sistema faz, antes das perguntas).
- **Estrutura da seção (mobile primeiro):**
  1. `Section` com `h2` "Escolha como quer pagar. O sistema é o mesmo." e lede curto: todas as funcionalidades em todos os planos, o que muda é o tempo de compromisso e o valor.
  2. **Quatro cartões de plano**, em lista (`ul`), um por periodicidade, na ordem Mensal, Trimestral, Semestral, Anual. Cada cartão traz: nome, valor por mês em destaque, total do período ("R$ 404,70 a cada 3 meses"; no mensal, "cobrado todo mês"), economia sobre o mensal ("Economia de R$ 45,00 (10%)"; no mensal, sem linha de economia) e o botão.
  3. **Bloco "Tudo isso em todos os planos"**: lista das 13 áreas de funcionalidades do PRD, cada uma com nome e uma frase curta, em grade.
  4. Linha final com o contato ("Em dúvida? Fale com a equipe", `#contato`), no padrão do bloco de ajuda do `murel-planos.html`.
- **Cartões:** fundo `asfalto2`, borda `faixaCinza` 1,5px, raio `xl`, padding 28px, linha tracejada entre o preço e o botão — o mesmo vocabulário do `murel-planos.html`. Valor em `extrabold` com `font-variant-numeric: tabular-nums`.
- **Plano recomendado (Anual):** borda `amarelo` 2px, selo "MAIS ECONÔMICO" no topo do cartão (fonte mono, fundo `amarelo`, texto `asfalto`) e botão `primary`; os demais usam `ghost`. O selo é texto, então o destaque não depende só da cor. [Nota: o PRD chama o Anual de "recomendado"; o rótulo do selo é decisão de copy, "Recomendado" também serve.]
- **Responsivo:** 1 coluna abaixo de `md`; 2 colunas (2x2) em `md`; 4 colunas em `lg`. Na coluna única o Anual não sobe para o topo (mantém a ordem de comparação por tempo).
- **Estados:** conteúdo estático. Link com foco visível (já padronizado pelo `Button`).
- **Movimento:** nenhum.
- **Componentes reaproveitados:** `Section`, `Container`, `Button`, tokens de `theme.ts`.
- **Componentes novos:**
  - `src/components/home/Planos/Planos.tsx` (seção; compõe os cartões, o bloco de funcionalidades e a linha de contato).
  - `src/components/home/Planos/CartaoPlano.tsx` + `CartaoPlano.styles.ts` (um cartão; recebe um `Plano` e o destaque).
  - `src/components/home/Planos/Planos.data.ts` (planos e áreas do sistema, tipados).
  - `src/components/home/Planos/Planos.styles.ts`.
- **Tokens de tema:** nenhum novo. O selo e o texto de preço usam as famílias e pesos do tema; se faltar raio ou tamanho de fonte, acrescentar ao `theme.ts` e a `styled.d.ts`, nunca valor solto.

## Arquitetura da solução

### Arquivos
```
src/
  app/
    page.tsx                                  # + <Planos /> entre ComoFunciona e Faq
  lib/
    config.ts                                 # + urlAdesaoComPlano(tipo)
    config.test.ts                            # + casos da nova função
  types/
    plano.ts                                  # TipoPlanoAdesao, Plano, AreaDoSistema
  components/
    home/Planos/
      Planos.tsx
      Planos.styles.ts
      Planos.data.ts
      Planos.test.tsx
      CartaoPlano.tsx
      CartaoPlano.styles.ts
      CartaoPlano.test.tsx
    home/Contato/Contato.tsx                  # ajusta o lede (ver Conteúdo)
    layout/Header/Header.tsx                  # + { href: "#planos", rotulo: "Planos" } em secoes
```
Uma pasta por componente com `.tsx`, `.styles.ts` e `.test.tsx`, como no restante de `src/components/home`.

### Tipos e contratos
```ts
// src/types/plano.ts
export const TipoPlanoAdesao = {
  Trial: 0,
  Mensal: 1,
  Trimestral: 2,
  Semestral: 3,
  Anual: 4,
} as const;
export type TipoPlanoAdesao = (typeof TipoPlanoAdesao)[keyof typeof TipoPlanoAdesao];

// Planos vendidos na seção: Trial (0) existe no sistema, mas não é oferecido aqui.
export type TipoPlanoVendido = Exclude<TipoPlanoAdesao, typeof TipoPlanoAdesao.Trial>;

export type Plano = {
  tipo: TipoPlanoVendido;
  nome: string;           // "Mensal", "Trimestral", ...
  meses: 1 | 3 | 6 | 12;
  centavosPorMes: number; // 14990, 13490, 11990, 7990
  recomendado?: boolean;  // só o Anual
};

export type AreaDoSistema = {
  titulo: string;   // "Entrada e saída de veículos"
  descricao: string; // uma frase, sem jargão
};
```
- Valores em **centavos inteiros** para total e economia saírem exatos, sem erro de ponto flutuante.
- `Planos.data.ts` exporta `planos: Plano[]` (4 itens, nesta ordem) e `areasDoSistema: AreaDoSistema[]` (13 itens). É a fonte única dos valores; nenhum preço escrito em componente ou teste fora dos dados.
- Derivados calculados em uma função pura `calcularCondicoes(plano, planoMensal)` exportada de `Planos.data.ts` (ou de um `Planos.utils.ts` se crescer):
  - `totalCentavos = centavosPorMes * meses`
  - `economiaCentavos = planoMensal.centavosPorMes * meses - totalCentavos`
  - `economiaPercentual = Math.round(economiaCentavos / (planoMensal.centavosPorMes * meses) * 100)`
  - Resultado esperado: trimestral R$ 404,70, economia R$ 45,00 (10%); semestral R$ 719,40, R$ 180,00 (20%); anual R$ 958,80, R$ 840,00 (47%, pois 46,7% arredonda para 47). O PRD mostra 46,7% na conversa; na tela usar o inteiro. Mensal: economia 0, sem linha.
- Formatação em `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` criada uma vez no módulo.

### Link de adesão com plano
```ts
// src/lib/config.ts
export const urlAdesaoComPlano = (tipo: TipoPlanoAdesao) =>
  `${urlAdesao}?tipoPlanoAdesao=${tipo}`;
```
- Mesmo nome de parâmetro e valores do GIPE: `tipoPlanoAdesao` = 1 (Mensal), 2 (Trimestral), 3 (Semestral), 4 (Anual).
- Query string porque a adesão é uma rota pública do GIPE aberta por link comum; parâmetro numérico, nada a codificar além do que a função já faz.
- As demais chamadas "Ir para adesão" seguem com `urlAdesao` sem parâmetro (PRD RF8).

### Server vs Client
| Peça | Tipo | Motivo |
|---|---|---|
| `Planos`, `CartaoPlano` | Server (composição) | só conteúdo e link; sem estado nem efeito. Os `styled.*` ficam em `.styles.ts` com `"use client"`, como nas demais seções |
| `Header` | Client (já é) | só ganha um item em `secoes` |

Sem `useState`, sem alternador de periodicidade e sem leitura de `searchParams` no site.

### Conteúdo (copy)
Tom da marca: direto, sem jargão, sem exagero, sem emojis. Cada botão diz o que acontece.
- **Botões:** "Assinar o plano mensal", "Assinar o plano trimestral", "Assinar o plano semestral" e "Assinar o plano anual" abrem a adesão com o plano. Se o time preferir manter a expressão já usada no site, "Ir para adesão" também serve, mas o rótulo único em quatro botões faz leitor de tela e visitante não distinguirem; por isso cada botão cita o plano (via texto visível ou `aria-label` com o nome do plano). Decisão de copy a confirmar na revisão do design.
- **Áreas do sistema (13), `titulo` + `descricao`:**
  1. Entrada e saída de veículos: placa lida pela câmera, ticket digital com QR Code, saída por placa ou QR e recibo público.
  2. Pátio: quem está no pátio agora, com busca e filtros.
  3. Quadro de chaves: cada chave no seu gancho, com o gancho sugerido na entrada.
  4. Preços: tabelas por categoria, dia e horário, com simulador de cobrança.
  5. Caixa: abertura, sangria, troca de turno e fechamento com a diferença apurada.
  6. Meios de pagamento: a saída oferece só os que a empresa aceita.
  7. Mensalistas: cadastro, contrato por e-mail, pagamento e agenda de vencimentos.
  8. Empresas conveniadas: convênio com tabela própria e carimbo do ticket pelo QR Code.
  9. Financeiro: receitas, despesas e fluxo de caixa do período.
  10. Notas fiscais: solicitação de nota pelo recibo e lista das notas lançadas.
  11. Equipe e permissões: perfis de administrador, gerente, caixa, manobrista e financeiro.
  12. Acesso e empresa: login por CPF, várias empresas na mesma conta e recuperação de senha.
  13. Celular, tablet e computador: instalável como aplicativo, com tema claro e escuro.
- **Excluir** da seção, mesmo que alguém sugira: Relatórios, tela de permissões por módulo, reset de senha pelo administrador, emissão automática de NFS-e, fotos de avarias, pagamento por tag, auditoria (PRD, "Fora da lista, de propósito").
- **`Contato.tsx`:** o lede deixa de dizer "inclusive sobre preço" (agora há preço público). Sugestão: "Conte sobre o seu pátio e tire dúvidas. A gente responde por e-mail ou telefone."

### Âncoras e navegação
- Id da seção: `planos` (gerado pelo `Section`, que também define `planos-titulo`).
- `Header.secoes` ganha "Planos" (`#planos`), entre "Como funciona" e "Perguntas", seguindo a ordem da página.
- Sem rota nova: `sitemap.ts` e `robots.ts` não mudam.

### SEO e dados estruturados
- Não adicionar preços ao JSON-LD nesta entrega (dado estruturado de oferta exige moeda, disponibilidade e validade, e a regra de preço ainda pode mudar). Fora de escopo técnico.
- Se o `description` do metadata mencionar "planos", conferir `seo.test.tsx`.

### Testes (Vitest + Testing Library)
- `config.test.ts`: `urlAdesaoComPlano(2)` com base com e sem barra final retorna `<base>/adesao?tipoPlanoAdesao=2`; `urlAdesao` continua sem parâmetro.
- `Planos.data` / `calcularCondicoes`: os quatro planos, na ordem e com os valores do PRD; totais 14990, 40470, 71940, 95880 centavos; economias 0, 4500, 18000, 84000; percentuais 0, 10, 20, 47. Só o Anual tem `recomendado`.
- `CartaoPlano`: mostra nome, valor por mês formatado ("R$ 79,90"), total do período e economia; o botão aponta para `urlAdesaoComPlano(tipo)`; só o recomendado exibe o selo; o mensal não mostra linha de economia.
- `Planos`: renderiza 4 cartões em uma lista; heading da seção; 13 áreas; link de contato para `#contato`; os quatro `href` terminam em `tipoPlanoAdesao=1`, `2`, `3` e `4`; não contém os termos excluídos ("Relatórios", "avarias", "tag").
- `Header`: tem o link "Planos" com `href="#planos"`.
- Verificação final: `npm run lint`, `npm run build`, conferência manual em 360 px e em desktop (sem rolagem horizontal), teste manual dos quatro botões contra o GIPE (a adesão abre; ver risco do parâmetro) e auditoria de acessibilidade (foco, contraste do selo e do texto `nevoa` sobre `asfalto2`).

## Decisões técnicas e trade-offs
1. **Quatro cartões compactos + um bloco único de funcionalidades**, em vez de repetir a lista de funcionalidades em cada cartão como no `murel-planos.html`. As funcionalidades são iguais nos quatro planos, então repetir treze itens quatro vezes só esconde a comparação que importa (valor e prazo). O vocabulário visual do arquivo de referência (cartão, borda amarela no destaque, selo mono, linha tracejada) foi mantido.
2. **Dados em arquivo tipado, preços em centavos.** Total e economia saem de uma função pura testada; ninguém recalcula na mão quando um preço mudar, e não há risco de ponto flutuante (`134.90 * 3`).
3. **Sem alternador de periodicidade.** O `murel-planos.html` usa abas para trocar entre Estacionamento e Valet; aqui os quatro planos cabem juntos na tela e a comparação lado a lado é o objetivo. Evita `"use client"` e estado.
4. **Link por query string montado em `config.ts`**, junto de `urlAdesao`, para o caminho `/adesao` e o nome do parâmetro viverem em um lugar só. O site não valida nem lê o parâmetro; só o envia.
5. **Percentual inteiro na tela** (47% no anual) mesmo que a conta exata seja 46,7%: o número fica mais fácil de ler, e o valor em reais ao lado é exato.
6. **Rótulo dos botões cita o plano** para distinguir os quatro links por leitor de tela, ao custo de um texto mais longo no cartão estreito; o `Button` já quebra linha.
7. **Selo "MAIS ECONÔMICO" em vez de "MAIS ESCOLHIDO"** do arquivo de referência, porque o site não tem dado de adesão que sustente "mais escolhido". O PRD chama o Anual de recomendado; o texto do selo é de copy.
8. **Não reaproveitar a lista de `Funcionalidades.data.ts`** (5 áreas com telas) para o bloco do plano: aquela serve às seções de venda longas, esta é um resumo de 13 itens por área. Duplicação de conteúdo aceita; se as duas listas divergirem, revisar juntas a cada release do GIPE.
9. **Preço no JSON-LD e medição de cliques** ficam fora (as métricas do PRD seguem `[A DEFINIR]`).

## Riscos / pontos de atenção
- **O GIPE ainda não lê `tipoPlanoAdesao`.** Hoje não há nenhuma referência ao parâmetro em `C:\murel\GIPE\src`. Sem a mudança no GIPE, o clique abre a adesão e o plano se perde, e o visitante vê um preço no site sem que o cadastro o respeite. **Dependência externa, a combinar antes de publicar:** o GIPE precisa ler o parâmetro em `/adesao`, enviá-lo no cadastro e decidir o que fazer com valor ausente ou fora de 1 a 4 (sugestão: ignorar e seguir sem plano).
- **Preço publicado no site é compromisso comercial.** Os valores (R$ 149,90, 134,90, 119,90 e 79,90 por mês) vêm do `docs/input.md`; confirmar com o negócio antes do deploy e lembrar que o `murel-planos.html` tem outros preços (não usar).
- **Anual: total de R$ 958,80 cobrado de uma vez ou parcelado?** O PRD fala em "total cobrado no período". Se a cobrança for mensal com fidelidade, "a cada 12 meses" no cartão induz a erro. Confirmar a forma de cobrança e ajustar o texto do total antes de publicar.
- **Lista de funcionalidades envelhece.** Reflete o GIPE até a versão 1.0.333. Quadro de chaves, carimbo, conveniadas e financeiro entraram por commits e specs, sem teste manual. Reconferir antes de publicar e a cada release.
- **Contraste e leitura em 360 px:** quatro cartões com valor grande e texto `nevoa` sobre `asfalto2`; conferir contraste AA e que o botão com nome do plano não estoura a largura.
- **Divergência com a seção de funcionalidades:** a home passa a ter duas listas de funcionalidades (a das 5 áreas detalhadas e a das 13 do plano). Mantê-las coerentes entre si.
- **`NEXT_PUBLIC_APP_URL`** com valor de desenvolvimento no deploy quebra todos os links de adesão, inclusive os quatro novos. Conferir no deploy.
- **`cacheComponents`:** a seção é estática, sem acesso a dado dinâmico; validar no `npm run build`.

## Fora de escopo técnico
- Alterar o GIPE (ler o parâmetro, gravar o plano): é dependência, não parte desta entrega.
- Pagamento, checkout, cupons e Trial na seção.
- Alternador de periodicidade, comparador de planos e calculadora de economia interativa.
- Preço no JSON-LD, medição de cliques e analytics.
- Planos por tipo de operação (Estacionamento/Valet) e níveis Essencial/Profissional/Premium.
- Nova rota ou página de planos.
- Mudanças em `Faq`, `Footer`, `Hero` e `BotaoWhatsapp` além do que a seção exigir.
