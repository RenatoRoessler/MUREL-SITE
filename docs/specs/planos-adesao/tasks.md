# Tasks: Seção de Planos com Adesão

Referências: ./prd.md, ./techspec.md

Antes da T1: ler `node_modules/next/dist/docs/` (regra do `AGENTS.md`) e seguir as skills `code-best-practices` e `styled-components-best-practices`. A T6 (layout) passa pela skill `.agents/skills/impeccable`.

- [x] T1 — Criar os tipos de plano
  - Arquivos: `src/types/plano.ts`
  - Pronto quando: exporta `TipoPlanoAdesao` (Trial 0, Mensal 1, Trimestral 2, Semestral 3, Anual 4), `TipoPlanoVendido` (sem o Trial), `Plano` e `AreaDoSistema`, como no Tech Spec; `npm run lint` passa.

- [x] T2 — Criar `urlAdesaoComPlano` na configuração
  - Arquivos: `src/lib/config.ts`, `src/lib/config.test.ts`
  - Pronto quando: `urlAdesaoComPlano(2)` retorna `<base>/adesao?tipoPlanoAdesao=2`, com `NEXT_PUBLIC_APP_URL` com e sem barra final; `urlAdesao` continua sem parâmetro; testes novos passam.

- [x] T3 — Criar os dados dos planos e o cálculo de condições
  - Arquivos: `src/components/home/Planos/Planos.data.ts`, `src/components/home/Planos/Planos.data.test.ts`
  - Pronto quando: `planos` tem os 4 itens na ordem Mensal, Trimestral, Semestral, Anual, com 14990, 13490, 11990 e 7990 centavos por mês, e só o Anual é `recomendado`; `calcularCondicoes` devolve total 14990, 40470, 71940, 95880, economia 0, 4500, 18000, 84000 e percentual 0, 10, 20, 47 (centavos inteiros); o teste cobre esses valores.

- [x] T4 — Criar os dados das 13 áreas do sistema
  - Arquivos: `src/components/home/Planos/Planos.data.ts` (exporta `areasDoSistema`), `src/components/home/Planos/Planos.data.test.ts`
  - Pronto quando: `areasDoSistema` tem as 13 áreas do Tech Spec, cada uma com `titulo` e `descricao` de uma frase, no tom da marca (sem jargão, sem emojis); nenhum texto cita Relatórios, emissão de NFS-e, fotos de avarias, pagamento por tag, auditoria, tela de permissões por módulo nem reset de senha; o teste verifica a contagem e a ausência desses termos.

- [x] T5 — Criar o cartão de plano
  - Arquivos: `src/components/home/Planos/CartaoPlano.tsx`, `src/components/home/Planos/CartaoPlano.styles.ts`, `src/components/home/Planos/CartaoPlano.test.tsx`
  - Pronto quando: recebe um `Plano` e mostra nome, valor por mês formatado em pt-BR ("R$ 79,90"), total do período e economia (o Mensal não mostra economia); o botão tem o nome do plano no texto e aponta para `urlAdesaoComPlano(tipo)`; só o recomendado mostra o selo "MAIS ECONÔMICO" e usa botão `primary`, os demais usam `ghost`; sem valor solto fora do tema; testes passam.

- [x] T6 — Criar a seção Planos
  - Arquivos: `src/components/home/Planos/Planos.tsx`, `src/components/home/Planos/Planos.styles.ts`, `src/components/home/Planos/Planos.test.tsx`
  - Pronto quando: usa `Section` com id `planos`, `h2` e lede do Tech Spec; renderiza os 4 cartões em uma lista (1 coluna no celular, 2 em `md`, 4 em `lg`), o bloco "Tudo isso em todos os planos" com as 13 áreas e a linha "Em dúvida? Fale com a equipe" apontando para `#contato`; os quatro botões terminam em `tipoPlanoAdesao=1`, `2`, `3` e `4`; testes passam.

- [x] T7 — Encaixar a seção na home, no menu e no texto do contato
  - Arquivos: `src/app/page.tsx`, `src/components/layout/Header/Header.tsx`, `src/components/layout/Header/Header.test.tsx`, `src/components/home/Contato/Contato.tsx`
  - Pronto quando: `<Planos />` aparece entre `ComoFunciona` e `Faq`; o `Header` tem o link "Planos" (`#planos`) entre "Como funciona" e "Perguntas", coberto por teste; o lede de `Contato` não diz mais "inclusive sobre preço" (sugestão: "Conte sobre o seu pátio e tire dúvidas. A gente responde por e-mail ou telefone."); `seo.test.tsx` continua passando.

- [x] T8 — Verificar a entrega
  - Arquivos: nenhum (verificação); corrigir o que falhar nos arquivos acima
  - Pronto quando: `npm run lint` e `npm run build` passam e os testes passam; conferido no navegador a 360 px e no desktop, sem rolagem horizontal; quatro botões testados (a adesão abre; registrar que o GIPE ainda não lê `tipoPlanoAdesao`); foco visível e contraste AA do selo e do texto `nevoa` sobre `asfalto2` conferidos.

## Dependências externas (fora das tasks)
- GIPE: ler `tipoPlanoAdesao` em `/adesao`, enviá-lo no cadastro e tratar valor ausente ou fora de 1 a 4. Sem isso o plano escolhido se perde.
- Negócio: confirmar os valores publicados e como o Anual é cobrado (de uma vez ou mensal com fidelidade) antes do deploy; ajustar o texto do total do período se for mensal.
- Reconferir a lista das 13 áreas com o GIPE antes de publicar.
