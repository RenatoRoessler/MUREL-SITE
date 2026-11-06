# Tech Spec: Plano Único a R$ 69,90 no Lançamento

## Referências
- PRD: ./prd.md
- Specs anteriores que esta muda: `docs/specs/planos-adesao/` (quatro planos) e `docs/specs/teste-gratis/` (textos que falam em "escolher plano"). Ficam como histórico.
- Documento de cenário: `Murel - Cenario Preco Unico R 6990.pdf` (pasta Downloads/teclado).
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe; as decisões partem do cartão e do vocabulário visual que a seção de planos já tem. A execução do layout passa pela skill `.agents/skills/impeccable` (regra do `CLAUDE.md`).
- Next `16.4.3` com `cacheComponents: true`. Os docs em `node_modules/next/dist/docs/` dizem que `new Date()` durante o prerender é erro de build (ver "Virada em 30/06/2027"); ler antes de implementar, como pede o `AGENTS.md`.

## Estado atual do repositório
- `src/components/home/Planos/` tem `Planos.tsx`, `CartaoPlano.tsx`, `Planos.data.ts` (quatro planos em centavos, `calcularCondicoes`, 13 `areasDoSistema`), os `.styles.ts` e os testes de cada um.
- `Planos.tsx` compõe: `TesteGratis`, lista de quatro cartões, `NotaTeste` ("Todos os planos começam com 30 dias grátis…"), bloco "Tudo isso em todos os planos" (13 áreas) e o bloco `Duvida` ("Em dúvida sobre qual plano escolher?").
- `src/types/plano.ts` tem `TipoPlanoAdesao` (0 a 4), `TipoPlanoVendido`, `Plano` (com `meses` 1/3/6/12 e `recomendado`) e `AreaDoSistema`.
- `src/lib/config.ts` tem `urlAdesaoComPlano(tipo)` e `urlAdesaoTeste` (tipo 0). Não precisa mudar.
- Textos que falam de vários planos ou de "escolher plano":
  - `Planos.tsx`: título "Escolha como quer pagar. O sistema é o mesmo.", lede, `NotaTeste`, "Tudo isso em todos os planos", frase "quem assina o mensal… o anual" e o bloco `Duvida`.
  - `TesteGratis.tsx`: "você escolhe o plano que fizer mais sentido".
  - `Faq.data.ts`: "Quanto custa?" (cita as quatro periodicidades) e "O que acontece depois dos 30 dias?" ("você escolhe um plano").
- `Header.tsx` já tem o link "Planos" (`#planos`); `Hero`, `Contato`, `VisaoGeral` e `ComoFunciona` não citam preço nem planos (levantado por busca no código). `app/page.tsx` cita "tabela de preços" no `description`, que é o recurso do sistema e não muda.
- `BotaoWhatsapp` já usa `useSyncExternalStore` com snapshot de servidor, padrão a reaproveitar para a virada por data.

## Design
- **Posição:** a seção continua em `#planos`, entre `ComoFunciona` e `Faq`.
- **Estrutura (mobile primeiro):**
  1. `Section` com `h2` novo e lede curto: um plano, todas as funcionalidades, sem fidelidade. Sugestão de copy, a validar na revisão: "Um plano, tudo incluso, sem fidelidade." / "Sem módulo extra, sem limite de vagas e sem multa para cancelar."
  2. Faixa do teste grátis (`TesteGratis`), como hoje.
  3. **Um cartão de plano**, centralizado e com largura máxima (≈ 480 px no mobile e no tablet), no lugar da lista de quatro. O cartão traz, de cima para baixo:
     - Nome "Mensal" e o selo **"Preço de lançamento · assine até 30/06/2027"** (texto, para não depender só de cor);
     - preço de tabela riscado "R$ 99,90/mês" e, em destaque, "R$ 69,90/mês";
     - linha da regra: "R$ 69,90/mês nos primeiros 12 meses; depois, R$ 99,90/mês.";
     - garantias curtas: "Todas as funcionalidades", "Sem fidelidade", "30 dias grátis para testar";
     - botão primário "Assinar o plano mensal" (`tipoPlanoAdesao=1`).
  4. Bloco "Tudo isso incluso no plano" com as 13 áreas, como hoje (só muda o título e a frase de apoio).
  5. Bloco de ajuda: "Ficou com dúvida?" / "Conte como é o seu pátio e a gente responde." / botão "Falar com a equipe" (`#contato`).
- **Cartão:** reaproveita o vocabulário atual (fundo `asfalto2`, borda `amarelo` 2px por ser o único e o recomendado, raio `xl`, linha tracejada antes do botão, valor em `extrabold` com `tabular-nums`). Preço riscado em `nevoa` com `text-decoration: line-through`.
- **Acessibilidade do preço riscado:** o riscado sozinho é mal lido por leitor de tela. Marcar o preço de tabela com `<s>` e incluir texto só para leitor de tela ("de R$ 99,90 por"), ou usar `<del>`/`<ins>`; o texto lido deve ser "de R$ 99,90 por R$ 69,90 por mês".
- **Depois de 30/06/2027:** o cartão mostra só "R$ 99,90/mês", sem selo, sem riscado e sem a linha da regra dos 12 meses. O botão e o resto não mudam.
- **Responsivo:** uma coluna em todos os tamanhos; cartão centralizado em `md` e acima. Legível a partir de 360 px sem rolagem horizontal. As 13 áreas continuam em 1, 2 e 3 colunas.
- **Estados:** conteúdo estático; dois estados de conteúdo (lançamento vigente e encerrado). Foco visível pelo `Button`.
- **Movimento:** nenhum.
- **Componentes reaproveitados:** `Section`, `Button`, `Garantias` (já usada no teste grátis), `TesteGratis`, tokens de `theme.ts`.
- **Componentes novos:** nenhum arquivo novo de componente visual além do que já existe em `Planos/`, com exceção do leitor de data (ver abaixo). O `CartaoPlano` é simplificado: perde `condicoes`, `Total`, `Economia` e a variante `$destaque` condicional (o cartão único é sempre destacado).
- **Tokens de tema:** nenhum novo. Se faltar algum para o preço riscado, acrescentar a `theme.ts` e `styled.d.ts`, nunca valor solto.

## Arquitetura da solução

### Arquivos
```
src/
  types/
    plano.ts                          # Plano simplificado; TipoPlanoAdesao mantém 0-4
  components/
    home/Planos/
      Planos.tsx                      # um cartão, textos novos, sem NotaTeste de "todos os planos"
      Planos.styles.ts                # remove ListaPlanos/ItemPlano de 4 colunas; cartão centralizado
      Planos.data.ts                  # plano único, oferta de lançamento, áreas; remove calcularCondicoes
      Planos.test.tsx
      CartaoPlano.tsx                 # cartão único com preço de lançamento
      CartaoPlano.styles.ts
      CartaoPlano.test.tsx
      Lancamento.ts                   # função pura lancamentoVigente(agora)
      Lancamento.test.ts
      useLancamentoVigente.ts         # hook com useSyncExternalStore (client)
    home/TesteGratis/TesteGratis.tsx  # texto "você decide se quer assinar"
    home/Faq/Faq.data.ts              # "Quanto custa?", "depois dos 30 dias?" + nova pergunta
    home/Faq/Faq.test.tsx             # ajusta o que testa sobre preço
```
`src/lib/config.ts`, `Header.tsx`, `Hero`, `Contato`, `Footer` e `app/page.tsx` não mudam.

### Tipos e contratos
```ts
// src/types/plano.ts
export const TipoPlanoAdesao = { Trial: 0, Mensal: 1, Trimestral: 2, Semestral: 3, Anual: 4 } as const;
export type TipoPlanoAdesao = (typeof TipoPlanoAdesao)[keyof typeof TipoPlanoAdesao];
// Os valores 2 a 4 continuam existindo no sistema (GIPE); o site só vende o Mensal.

export type Plano = {
  tipo: typeof TipoPlanoAdesao.Mensal;
  nome: string;                 // "Mensal"
  centavosPorMes: number;       // 9990 (tabela)
  centavosLancamento: number;   // 6990
  mesesDeLancamento: number;    // 12
};
```
- `TipoPlanoVendido` e `meses`/`recomendado` saem, porque só há um plano. Manter os valores 2 a 4 em `TipoPlanoAdesao` evita divergir do contrato com o GIPE.
- Valores em **centavos inteiros**, como antes. Nenhum preço escrito em componente ou teste fora de `Planos.data.ts`, exceto nos testes que conferem o texto exibido.
- Oferta de lançamento em dados, não espalhada em componentes:
```ts
// src/components/home/Planos/Planos.data.ts
export const planoMensal: Plano = { tipo: TipoPlanoAdesao.Mensal, nome: "Mensal", centavosPorMes: 9990, centavosLancamento: 6990, mesesDeLancamento: 12 };
// 1º de julho de 2027, 00:00 em Brasília (UTC-3): "assine até 30/06/2027" vale o dia 30 inteiro.
export const fimDoLancamento = new Date("2027-07-01T00:00:00-03:00");
export const rotuloFimDoLancamento = "30/06/2027";
```

### Virada em 30/06/2027
- **Problema:** com `cacheComponents`, `new Date()` no componente de servidor derruba o build, e uma página estática gerada hoje continuaria mostrando o lançamento depois do prazo.
- **Solução:** a decisão de data fica numa função pura e o componente cliente lê o relógio só depois da hidratação.
  - `lancamentoVigente(agora: number, fim: Date = fimDoLancamento): boolean` retorna `agora < fim.getTime()` (função pura, testável sem relógio).
  - `useLancamentoVigente()` usa `useSyncExternalStore` com `getSnapshot` = `lancamentoVigente(Date.now())`, `getServerSnapshot` = `true` e `subscribe` sem efeito (a data não muda durante a visita), no padrão de `BotaoWhatsapp`.
  - `CartaoPlano` vira Client Component e escolhe entre o conteúdo de lançamento e o de tabela com esse hook.
- **Consequência:** o HTML estático sempre sai com o lançamento; depois de 30/06/2027 quem tem JS vê o preço de tabela após a hidratação (breve troca de conteúdo). Quem não executa JS ou lê o HTML em cache continua vendo o lançamento. É por isso que a data **não substitui** a limpeza manual (ver Riscos).
- **Alternativa descartada:** `connection()` + `<Suspense>` em torno do cartão. Funciona, mas torna o preço — o conteúdo mais importante da seção — dinâmico e fora do shell estático, com fallback ou salto visível; custo alto para uma troca que acontece uma vez.
- **Alternativa descartada:** só constante manual (remover o lançamento no commit depois da data). Mais simples, mas depende de alguém lembrar; vira o plano B, não o único mecanismo.

### Link de adesão
- Botão do plano: `urlAdesaoComPlano(TipoPlanoAdesao.Mensal)` → `<base>/adesao?tipoPlanoAdesao=1`.
- Chamadas do teste: `urlAdesaoTeste` → `tipoPlanoAdesao=0`. Sem mudanças em `config.ts`.

### Server vs Client
| Peça | Tipo | Motivo |
|---|---|---|
| `Planos` | Server | só composição e conteúdo estático |
| `CartaoPlano` | Client | lê a data para a virada de 30/06/2027; os `styled.*` já ficam em `.styles.ts` com `"use client"` |
| `useLancamentoVigente` | Client (hook) | usa `useSyncExternalStore` e `Date.now()` |
| `Lancamento.ts` | Neutro | função pura, sem dependências de React |

### Conteúdo (copy)
Tom da marca: direto, sem jargão, sem exagero, sem emojis. Copy final a validar na revisão do design.
- **Título e lede da seção:** "Um plano, tudo incluso, sem fidelidade." / "Sem módulo extra, sem limite de vagas e sem multa para cancelar." Conferir "sem multa" e "sem limite" com o negócio antes de publicar (ver Riscos).
- **Selo:** "Preço de lançamento · assine até 30/06/2027".
- **Linha da regra:** "R$ 69,90/mês nos primeiros 12 meses; depois, R$ 99,90/mês."
- **Botão:** "Assinar o plano mensal" (cita o plano; o `aria-label` atual "Aderir ao plano mensal" vira "Assinar o plano mensal por R$ 69,90 por mês" só se fizer sentido na revisão).
- **`NotaTeste`:** "O plano começa com 30 dias grátis. Você só paga depois do teste." (singular, RF6).
- **Bloco das funcionalidades:** título "Tudo isso incluso no plano"; texto "Sem módulo extra e sem limite de funcionalidade." (a frase do mensal e do anual sai).
- **Bloco de ajuda:** "Ficou com dúvida?" / "Conte como é o seu pátio e a gente responde." / "Falar com a equipe".
- **`TesteGratis`:** "No fim do teste, você decide se quer assinar." no lugar de "escolhe o plano que fizer mais sentido".
- **FAQ:**
  - "Quanto custa?": "Um plano único, com todas as funcionalidades e sem fidelidade: R$ 69,90 por mês no lançamento, para quem assinar até 30/06/2027. Depois de 12 meses, o valor passa a ser R$ 99,90 por mês."
  - "O que acontece depois dos 30 dias?": trocar "você escolhe um plano para continuar usando" por "você assina para continuar usando"; o restante (nada cobrado automaticamente, dados guardados por 30 dias) fica como está, com a mesma pendência de confirmação já registrada.
  - **Nova pergunta**, logo após "Quanto custa?": "O que acontece depois dos 12 meses do preço de lançamento?" / "O valor passa a ser o de tabela, R$ 99,90 por mês. Não prometemos prazo de aviso aqui; fale com a equipe se quiser entender como isso funciona no seu caso." Esta frase evita prometer os 60 dias de aviso do PDF, que o negócio ainda não confirmou. Trocar o final quando o aviso for definido.
- **Excluir** de todo texto: R$ 149,90, 134,90, 119,90 e 79,90; trimestral, semestral e anual; "economia", "mais econômico"; número de vagas restantes; qualquer promessa de aviso ou de congelamento do preço (Clientes Fundadores).

### SEO e dados estruturados
- Sem preço no JSON-LD nesta entrega (oferta com validade é justamente o caso em que o dado estruturado exige data e disponibilidade; fica para depois).
- Conferir `seo.test.tsx` e o `description` do metadata: nenhum cita preço hoje.

### Testes (Vitest + Testing Library)
- `Lancamento.test.ts`: `lancamentoVigente` retorna `true` um milissegundo antes de `2027-07-01T00:00:00-03:00` e `false` no instante e depois; `true` em 30/06/2027 às 23:59 em Brasília.
- `Planos.data`: `planoMensal` tem 9990 de tabela, 6990 de lançamento e 12 meses; `fimDoLancamento` é 1º/07/2027 00:00 -03:00.
- `CartaoPlano`:
  - com a data vigente: mostra "R$ 99,90" riscado, "R$ 69,90", o selo com "30/06/2027" e a linha dos 12 meses; botão com `href` terminando em `tipoPlanoAdesao=1`;
  - com a data encerrada (relógio falso com `vi.useFakeTimers` e `vi.setSystemTime` depois do prazo): mostra só "R$ 99,90", sem selo, sem riscado e sem a linha dos 12 meses;
  - o preço antigo da tabela não aparece como riscado quando encerrado.
- `Planos`: um cartão (nenhum "Trimestral", "Semestral" ou "Anual" no texto); título novo; 13 áreas; link de contato para `#contato`; sem os termos excluídos ("Relatórios", "avarias", "tag", "economia", "149,90", "134,90", "119,90", "79,90"); `NotaTeste` no singular.
- `TesteGratis`: o botão continua com `tipoPlanoAdesao=0`; sem a expressão "escolhe o plano".
- `Faq`: a pergunta "Quanto custa?" cita R$ 69,90, R$ 99,90 e 30/06/2027; a nova pergunta existe e abre por teclado; nenhuma resposta cita as quatro periodicidades.
- Regressão: `config.test.ts` continua passando sem mudança.
- Verificação final: `npm run lint`, `npm run build` (confirma que a seção continua no shell estático e que o hook não quebra o prerender), conferência manual em 360 px e em desktop sem rolagem horizontal, leitura do preço riscado por leitor de tela, clique no botão do plano (`tipoPlanoAdesao=1`) e em todas as chamadas do teste (`tipoPlanoAdesao=0`), busca textual por todos os valores antigos em `src/` e auditoria de contraste do selo e do texto `nevoa` sobre `asfalto2`.

## Decisões técnicas e trade-offs
1. **Simplificar o modelo em vez de manter a lista de quatro planos com três escondidos.** Dados, tipos e testes ficam com um plano só; o contrato com o GIPE (`TipoPlanoAdesao` 0 a 4) continua intacto. Se os planos longos voltarem, o git preserva a versão anterior.
2. **Oferta de lançamento em dados, não em componentes.** Preço, meses e data ficam em `Planos.data.ts`; mudar a data ou o valor é uma alteração de uma linha.
3. **Virada por data no cliente (`useSyncExternalStore`) com snapshot de servidor "vigente".** Mantém a seção estática e evita `connection()`/`Suspense` por causa de uma troca única. O custo é uma troca visível pós-hidratação depois do prazo e o fato de o HTML em cache continuar mostrando o lançamento; por isso a remoção manual do lançamento continua obrigatória (Riscos).
4. **Fim do lançamento em 1º/07/2027 00:00 -03:00 (exclusivo).** Torna "assine até 30/06/2027" inclusivo no dia 30, no fuso de Brasília, e fixa o fuso no próprio valor em vez de depender do fuso do navegador.
5. **Cartão único sempre destacado**, com borda amarela. Não há mais comparação entre planos, então o selo "Mais econômico" sai; o destaque agora é o selo de lançamento, em texto.
6. **Copy sem promessa de aviso.** A pergunta sobre os 12 meses diz o valor de tabela e manda falar com a equipe, em vez de repetir os 60 dias do PDF, que não foram confirmados.
7. **Sem preço no JSON-LD e sem medição de cliques** (as métricas do PRD seguem `[A DEFINIR]`).

## Riscos / pontos de atenção
- **Preço publicado é compromisso comercial.** R$ 69,90 por 12 meses e R$ 99,90 depois valem para quem lê o site. Confirmar R$ 99,90 como valor de tabela final (veio como exemplo no PDF) antes do deploy.
- **A regra "depois de 12 meses volta ao preço de tabela" precisa existir no sistema/cobrança.** O site só informa; o GIPE e o termo de uso precisam aplicar o reajuste. Confirmar com o negócio que o contrato sustenta o que o site diz (inclusive o aviso prévio, ainda não definido).
- **GIPE ainda não lê `tipoPlanoAdesao`** (risco herdado de `planos-adesao` e `teste-gratis`). Sem isso, o plano e o teste se perdem na adesão. Dependência externa, a combinar antes de publicar.
- **Lançamento não pode ficar no ar depois de 30/06/2027.** A troca por data é só uma rede de segurança. Criar um lembrete (issue ou tarefa agendada) para remover o preço de lançamento do código, o selo e as menções do FAQ em julho de 2027, e testar o estado "encerrado" no build.
- **Preço riscado e propaganda:** exibir "R$ 99,90" riscado exige que esse seja o preço praticado de fato depois do lançamento (ele é, pela regra dos 12 meses). Manter o texto da regra visível ao lado, para o riscado não parecer desconto artificial.
- **Clientes que assinaram antes da mudança** e quem estiver numa adesão em andamento com tipo 2, 3 ou 4 podem ser afetados no GIPE; fora do alcance do site, mas vale avisar o negócio.
- **Teste grátis:** as regras do teste seguem pendentes de confirmação, como registrado em `teste-gratis`; a mudança de "escolhe um plano" para "assina" não as resolve.
- **Texto "sem fidelidade" e "sem multa":** vem do documento de cenário, que diz que com preço baixo não é preciso fidelidade. Confirmar com o negócio antes de publicar, porque o site passa a prometer isso.
- **Contraste e leitura em 360 px:** preço riscado em `nevoa` sobre `asfalto2` e selo longo ("Preço de lançamento · assine até 30/06/2027") no cartão estreito; conferir contraste AA e quebra de linha.
- **`NEXT_PUBLIC_APP_URL`** com valor de desenvolvimento no deploy quebra todos os links de adesão. Conferir no deploy.
- **`cacheComponents`:** validar no `npm run build` que o hook e o cartão cliente não introduzem acesso dinâmico no shell.

## Fora de escopo técnico
- Alterar o GIPE (ler o parâmetro, aplicar a virada de preço aos 12 meses, bloquear planos 2 a 4).
- Contador regressivo, número de vagas ou qualquer dado em tempo real.
- Clientes Fundadores e condições especiais, e comunicação a clientes atuais.
- Preço no JSON-LD, analytics e medição de cliques.
- Remoção do lançamento em julho de 2027 (tarefa futura, registrada em Riscos).
- Mudanças em `Header`, `Hero`, `Contato`, `Footer`, `BotaoWhatsapp` e `config.ts`.
