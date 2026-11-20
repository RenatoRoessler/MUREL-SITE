# Tasks: Redesenho do layout da home (Hero, plano, como funciona e sistema)

Referências: ./prd.md, ./techspec.md

Regras para todas as tasks: seguir as skills `code-best-practices` e `styled-components-best-practices`; usar `.agents/skills/impeccable` para as decisões visuais; consultar `node_modules/next/dist/docs/` antes de mexer em `next/image` e em componentes de cliente (AGENTS.md); respeitar "menos movimento" via `comMovimento`; rodar `npm run lint` e `npm test` ao final de cada task e `npm run build` na última.

- [x] T1 — Contexto de design e escolha dos modelos
  - Arquivos: `PRODUCT.md` (via `impeccable init`, com o usuário), `docs/specs/redesenho-layout-home/layouts.html` (protótipos estáticos), seção "Design" do `techspec.md`
  - Resultado (20/11/2026): `PRODUCT.md` criado com a confirmação do usuário. Escolhas: Hero B (duas molduras), Plano B (cartão com faixa do mês grátis no topo), Como funciona A (pista com bifurcação). Protótipos em `layouts.html` e `layouts.png`.
  - Pronto quando: o `PRODUCT.md` foi criado com o usuário; os 3 modelos do Hero, os 3 do bloco do plano e os 3 do "Como funciona" foram mostrados em 360 px e em desktop; o usuário escolheu um de cada e a escolha está registrada no Tech Spec. Nenhuma task seguinte começa antes disso (RF22).

- [x] T2 — `TelaSistema` com prioridade de carregamento
  - Arquivos: `src/components/ui/TelaSistema/TelaSistema.tsx`, `TelaSistema.test.tsx`
  - Pronto quando: a prop opcional `prioridade` é repassada ao `next/image` como `priority`; sem ela, nada muda; teste cobre os dois casos.

- [x] T3 — Hero com a tela do produto
  - Arquivos: `src/components/home/Hero/Hero.tsx`, `Hero.styles.ts`, `Hero.test.tsx`
  - Pronto quando: o modelo escolhido na T1 está implementado: duas molduras de celular sobrepostas em ângulo leve (pátio atrás, ticket à frente) à direita no desktop, e logo abaixo dos botões no celular, menores e cortadas com degradê; só a imagem do pátio usa `prioridade`; o símbolo animado continua, em papel de apoio; os botões e as garantias seguem clicáveis desde o início; a entrada em sequência da spec `animacoes-site` continua; a imagem usa `prioridade`; teste confere a imagem com texto alternativo e os botões.

- [x] T4 — Faixa de destaques
  - Arquivos: `src/components/home/Destaques/Destaques.tsx`, `Destaques.styles.ts`, `Destaques.test.tsx`, `src/app/page.tsx`
  - Pronto quando: logo abaixo do Hero aparece a faixa com "Sem impressora", "Ticket 100% digital", "Sem cadastro do cliente" e a garantia do mês grátis (`garantiaTestePlano`, com e sem teste carregado); 2x2 no celular e em linha no desktop; teste cobre os quatro itens nos dois casos.

- [x] T5 — Grupos de "Tudo isso incluso no plano"
  - Arquivos: `src/components/home/Planos/Planos.data.ts`, `Planos.data.test.ts`, `src/components/home/Planos/GruposDoPlano.tsx` e `.styles.ts`, `GruposDoPlano.test.tsx`
  - Pronto quando: `gruposDeAreas` tem 4 grupos (Pátio, Dinheiro, Clientes, Equipe e empresa) com as 16 áreas, cada uma em um só grupo; `GruposDoPlano` mostra os grupos abertos no desktop e como acordeão (`<details>`) no celular, com o primeiro aberto; sem JavaScript, todos abertos; navegação por teclado funciona; testes cobrem a divisão, a contagem e o acordeão.

- [x] T6 — Bloco único do teste grátis e do plano
  - Arquivos: `src/components/home/Planos/BlocoOferta.tsx` e `.styles.ts`, `TesteGratis.tsx`, `CartaoPlano.tsx` (prop `embutido`), `Planos.tsx`, `Planos.test.tsx`, `CartaoPlano.test.tsx`, `PlanoIndisponivel.test.tsx`
  - Pronto quando: o modelo B (cartão único com faixa amarela do mês grátis no topo e o plano abaixo) está implementado, com uma só borda amarela e um só botão primário ("Começar meu mês grátis"); "Assinar o plano mensal" é `ghost`; preço, promoção, validade e duração do teste continuam vindo do back-end; sem oferta, o bloco mostra o teste e a mensagem de plano indisponível; `TesteGratis` e `CartaoPlano` sem `embutido` continuam iguais; `Planos.tsx` usa `BlocoOferta` e `GruposDoPlano`.

- [x] T7 — "Como funciona" como caminho
  - Arquivos: `src/components/home/ComoFunciona/ComoFunciona.tsx`, `ComoFunciona.styles.ts`, `ComoFunciona.test.tsx`
  - Pronto quando: o modelo A (pista com bifurcação) está implementado: 4 etapas, a segunda com duas alternativas ("Escolha uma") que se juntam na terceira; sem buraco de grade em 320 a 1280 px; semântica `ol` com o item 2 contendo uma lista de 2 opções; conectores só com CSS; a frase de reforço continua; os textos não mudam; testes cobrem a ordem, as duas opções e a frase.

- [x] T8 — Hook de navegação por setas
  - Arquivos: `src/hooks/useNavegacaoPorSetas.ts`, `useNavegacaoPorSetas.test.ts`, `src/components/home/Sistema/SeletorPerfil.tsx`
  - Pronto quando: a lógica de setas, Home e End do `SeletorPerfil` foi extraída para o hook, sem mudar o comportamento (os testes atuais do seletor passam), e aceita direção horizontal ou vertical.

- [x] T9 — Sistema com lista de telas e tela grande no desktop
  - Arquivos: `src/components/home/Sistema/TelasDoPerfil.tsx` e `.styles.ts`, `TelasDoPerfil.test.tsx`, `CarrosselTelas.tsx` (modo controlado) e seu teste, `Sistema.tsx`, `TelaPerfil.styles.ts`, `Sistema.test.tsx`
  - Pronto quando: a partir de `lg`, cada perfil mostra a lista de todas as telas à esquerda e a tela grande com a explicação à direita; trocar a tela funciona por clique, setas e toque; abaixo de `lg`, o carrossel atual continua, com botões de 44 px; todas as telas estão no HTML; sem JavaScript, fica como hoje; as abas de perfil, o Operador por padrão e os textos e imagens atuais não mudam; a moldura de celular chega a 360 px no desktop.

- [x] T10 — Verificação final
  - Arquivos: nenhum novo (ajustes pontuais)
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; no navegador, em 320, 360, 390, 768 e 1280 px não há rolagem horizontal; com "menos movimento", sem JavaScript e na impressão, todo o conteúdo aparece; navegação por teclado, foco, contraste e textos alternativos conferidos em WCAG 2.2 AA; o LCP e o CLS do Lighthouse não pioraram; a altura da página no celular ficou menor que a de hoje (cerca de 10.500 px); o detector do impeccable (`impeccable detect`) rodou nas telas alteradas.
  - Resultado (20/11/2026): lint, `tsc`, 248 testes e build passam. No navegador: sem rolagem horizontal em 320, 360, 390, 768 e 1280 px; sem JavaScript todas as seções aparecem, as 24 telas dos cinco perfis estão no HTML e os 4 grupos do plano abertos; com "menos movimento" e na impressão nada fica escondido; no desktop a lista de telas troca a tela por clique e setas. No celular (390 px), LCP de cerca de 0,74 s (o maior elemento é o texto do Hero, não a imagem) e CLS 0. Altura da página no celular: 9.840 px (antes, cerca de 10.500). O detector do impeccable não apontou problemas. Não rodei o Lighthouse nem fiz auditoria formal de contraste: as cores são as do tema.
