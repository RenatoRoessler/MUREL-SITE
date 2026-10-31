# Tasks: Home de Vendas Detalhada

Referências: ./prd.md, ./techspec.md

- [x] T1 — Adicionar `urlAdesao` à configuração
  - Arquivos: `src/lib/config.ts`, `src/lib/config.test.ts`
  - Pronto quando: `urlAdesao` é `${urlBase}/adesao`, funciona com e sem barra final em `NEXT_PUBLIC_APP_URL`, e o teste cobre os dois casos.

- [x] T2 — Definir os tipos das funcionalidades
  - Arquivos: `src/types/funcionalidade.ts`
  - Pronto quando: exporta `TelaSistema` e `Funcionalidade` conforme o Tech Spec e `npx tsc --noEmit` passa.

- [x] T3 — Levantar o conteúdo real de Empresas conveniadas e confirmar o das demais áreas
  - Arquivos: leitura de `C:\murel\GIPE\src\app\(app)\{patio,caixa,precos,mensalistas,empresas-conveniadas}` e testes; saída em notas no próprio `Funcionalidades.data.ts` (T9)
  - Pronto quando: existe a lista do que cada área faz hoje, confirmada no código ou na tela do GIPE, sem funcionalidade inventada.
  - Resultado (empresas conveniadas, confirmado no código do GIPE): lista com filtro Todos/Ativos/Encerrados (CNPJ, telefone, endereço, "desde"); cadastro de nova conveniada em duas seções (empresa e responsável), com validação de CNPJ/CPF e endereço pelo CEP; carimbo do ticket, que aplica a tabela de convênio e marca o ticket como "Convênio". As demais áreas seguem o relatório do GIPE (seções 4 a 8).

- [x] T4 — Capturar as telas do GIPE com dados fictícios
  - Arquivos: `src/assets/telas/*.webp` (patio-lista, patio-saida, caixa, precos, mensalistas, conveniadas, tema-claro, tema-escuro); GIPE no tema claro, exceto as duas capturas do item de tema
  - Pronto quando: GIPE rodando local, tema escuro, conta de teste; cada WebP tem largura ≤ 1280 px e peso < 150 KB; revisada uma a uma, sem placa, nome, CNPJ, e-mail, telefone ou valor real; a senha de `docs/input.md` não aparece em nenhum arquivo.

- [x] T5 — Criar o componente `TelaSistema`
  - Arquivos: `src/components/ui/TelaSistema/TelaSistema.tsx`, `TelaSistema.styles.ts`, `TelaSistema.test.tsx`
  - Pronto quando: renderiza `next/image` em moldura com tokens do tema, recebe `imagem`, `alt` e `sizes`, e o teste confirma o `alt`.

- [x] T6 — Criar o bloco genérico `Funcionalidade`
  - Arquivos: `src/components/home/Funcionalidade/Funcionalidade.tsx`, `Funcionalidade.styles.ts`, `Funcionalidade.test.tsx`
  - Pronto quando: usa `Section` com o `id` da área, mostra título, lede, lista de itens, tela(s) e botão "Ir para adesão" com `href` em `urlAdesao`; uma coluna no celular, duas em `lg` com ordem alternada só por CSS; teste cobre esses elementos.

- [x] T7 — Criar a seção `VisaoGeral`
  - Arquivos: `src/components/home/VisaoGeral/VisaoGeral.tsx`, `VisaoGeral.styles.ts`, `VisaoGeral.test.tsx`
  - Pronto quando: seção `#sistema` com título, lede e um cartão por área, cada um com link `#<id>`; teste confirma os links.

- [x] T8 — Escrever o conteúdo das 4 áreas
  - Arquivos: `src/components/home/Funcionalidades/Funcionalidades.data.ts`
  - Pronto quando: exporta `funcionalidades: Funcionalidade[]` (patio, caixa-precos, mensalistas, conveniadas, tema); o item `tema` destaca que o sistema tem tema claro e escuro, com uma tela em cada tema com benefício, descrição, itens confirmados em T3 e telas de T4 com `alt` descritivo; texto no tom da marca, sem jargão, sem emojis; sem Relatórios nem Notas fiscais.

- [x] T9 — Criar o compositor `Funcionalidades`
  - Arquivos: `src/components/home/Funcionalidades/Funcionalidades.tsx`, `Funcionalidades.test.tsx`
  - Pronto quando: renderiza um `Funcionalidade` por item dos dados; teste verifica os ids esperados, ao menos uma tela por área e `alt` não vazio.

- [x] T10 — Integrar as seções na home
  - Arquivos: `src/app/page.tsx`
  - Pronto quando: ordem Hero, Diferencial, VisaoGeral, Funcionalidades, ComoFunciona, Faq, Contato; `description` do JSON-LD atualizada se necessário.

- [x] T11 — Atualizar Hero, Header e Footer com a chamada de adesão
  - Arquivos: `src/components/home/Hero/Hero.tsx`, `src/components/layout/Header/Header.tsx`, `src/components/layout/Footer/Footer.tsx` e seus testes
  - Pronto quando: Hero tem "Ir para adesão" como botão principal e "Falar com a equipe" como secundário; Header ganha o link "Sistema" (`#sistema`); Footer tem "Ir para adesão"; todos apontam para `urlAdesao` e os testes cobrem isso.

- [x] T12 — Verificação final
  - Arquivos: —
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; conferido no navegador em 360 px e desktop (telas legíveis, âncoras com o cabeçalho fixo, foco visível, sem rolagem horizontal); auditoria de acessibilidade sem falhas críticas; peso das imagens conferido.
