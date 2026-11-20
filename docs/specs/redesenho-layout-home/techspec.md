# Tech Spec: Redesenho do layout da home (Hero, plano, como funciona e sistema)

## Referências
- PRD: ./prd.md
- Specs vizinhas: `docs/specs/animacoes-site/` (movimento e `Revelar`), `docs/specs/sistema-lavador-conveniado/` (perfis e telas), `docs/specs/logo-animado/` (símbolo animado).
- Design: seção "Design" abaixo. O `CLAUDE.md` manda conduzir decisões visuais pela skill `.agents/skills/impeccable`. Ela exige um `PRODUCT.md` (`impeccable init`) antes de fluxos de redesenho, e o projeto ainda não tem. Isso entra na primeira task, junto da escolha dos modelos.

## Design

### Princípios
- O redesenho **preserva** a identidade atual (asfalto, amarelo, Plus Jakarta Sans, faixa de pista tracejada, símbolo com o carro) e **muda a estrutura** das quatro seções. Nada de nova paleta ou fonte.
- Conteúdo e textos atuais ficam; só muda onde e como aparecem.
- Mostrar o produto cedo, tirar a competição entre blocos de mesma força e transformar listas em estruturas que se leiam de relance.

### Escolhas do usuário (T1, 20/11/2026)
Protótipos em `layouts.html` e `layouts.png`. **Hero: modelo B** (duas molduras sobrepostas, pátio e ticket). **Plano: modelo B** (cartão único com faixa do mês grátis no topo). **Como funciona: modelo A** (pista com bifurcação). Sistema segue a direção do PRD (lista de telas e tela grande no desktop).

### Hero (RF1 a RF4)
- **Desktop:** duas colunas, como hoje. Coluna do texto igual. Na coluna da direita, duas molduras de celular (`TelaSistema`) sobrepostas em ângulo leve (cerca de -5° e +4°): o pátio do Operador (`operador/patio.webp`) atrás e o ticket com serviço (`operador/ticket.webp`) à frente. O símbolo animado vira apoio: menor, perto da base das molduras, sem cobrir as telas.
- **Celular:** título, subtítulo, botões e garantias como hoje; logo abaixo, o par de molduras (menores, cerca de 170 px) entra pela base do Hero, cortado com degradê para o fundo. O símbolo sai do fim do Hero e passa a fazer parte do conjunto, menor.
- **Faixa de destaques** logo abaixo: quatro itens curtos em linha (grade 2x2 no celular), com textos já usados: "Sem impressora", "Ticket 100% digital", "Sem cadastro do cliente" e a garantia do mês grátis (`garantiaTestePlano`).
- Modelos avaliados: A moldura grande com símbolo de apoio; **B duas molduras sobrepostas (escolhido)**; C símbolo grande com o celular nascendo por baixo.
- Peso: o modelo B carrega duas imagens. Só a do pátio (a primeira, mais visível) usa `prioridade`; a do ticket carrega logo depois, sem `priority`, e as duas usam `sizes` pequenos.

### Plano (RF5 a RF9)
- **Bloco único** `BlocoOferta`: um cartão com borda amarela (o único destaque forte da seção). No topo, uma faixa amarela com o mês grátis e o botão principal "Começar meu mês grátis" (botão escuro sobre o amarelo); abaixo, o corpo com o plano, o selo de lançamento, o preço, a regra de preço e "Assinar o plano mensal" em `ghost`.
- Modelos avaliados: A duas colunas; **B cartão com faixa do mês grátis no topo (escolhido)**; C linha do tempo "Hoje → Depois".
- No desktop o cartão tem largura limitada (cerca de 560 px) e fica centralizado; no celular, ocupa a largura toda. A faixa cabe em duas linhas quando o texto é maior (por exemplo, duração do teste com mais de um mês).
- Contingência (plano indisponível): a faixa do mês grátis continua; o corpo mostra a mensagem de `PlanoIndisponivel`.
- **Grupos** de "Tudo isso incluso no plano", em quatro grupos: **Pátio** (Entrada e saída de veículos, Pátio, Quadro de chaves), **Dinheiro** (Preços, Caixa, Meios de pagamento, Financeiro, Notas fiscais), **Clientes** (Mensalistas, Empresas conveniadas, Faturas das conveniadas, Serviços do lava-rápido) e **Equipe e empresa** (Regras da empresa, Equipe e permissões, Acesso e empresa, Celular, tablet e computador). São as 16 áreas atuais, nenhuma fora.
  - Desktop: grupos lado a lado (2x2 ou 4 colunas), todos abertos.
  - Celular: acordeão, com "Pátio" aberto.

### Como funciona (RF10 a RF13)
- Estrutura em quatro etapas: **1 Entrada**, **2 Levar o ticket** (bifurcação: **2a Foto da tela** ou **2b Aponta a câmera**), **3 Acompanha**, **4 Saída**.
- Modelo **A (escolhido)**: pista horizontal no desktop (cartões ligados por uma faixa tracejada amarela; o passo 2 abre em dois ramos dentro de uma moldura tracejada, com o rótulo "Passo 2 · escolha uma") e a mesma pista na vertical no celular, com "ou" entre as opções. Avaliados e descartados: B trilho vertical único e C cartões com setas.
- O que diferencia alternativa de etapa não depende de cor: o rótulo "Escolha uma" e a forma (dois ramos / cartões irmãos).

### Sistema (RF14 a RF18)
- **Desktop (a partir de `lg`):** duas colunas. À esquerda, a lista de todas as telas do perfil (título de cada uma, a ativa em destaque). À direita, a tela grande na moldura e a explicação. Escolher um item troca a tela, por clique, setas do teclado e toque.
- **Abaixo de `lg`:** o carrossel de hoje, com a explicação junto da tela, setas e pontos de 44 px.
- As abas de perfil (Cliente, Operador, Lavador, Conveniado, Gestor, modelo A, Operador por padrão) não mudam.
- Moldura de celular maior no desktop (até 360 px, hoje 300 px); o notebook do Gestor ocupa a largura toda da coluna.

### Componentes do design system reaproveitados
`Section`, `Button` (variante `ghost` no plano), `TelaSistema` (moldura), `Garantias`, `Revelar`, `SeletorPerfil`, `CarrosselTelas`, `Simbolo` e as animações de `comMovimento`.

### Tokens
Sem tokens novos de cor. Possível acréscimo em `theme.layout` para a largura da lista de telas do Sistema (por exemplo `listaTelas: "280px"`).

## Arquitetura da solução

### Hero
- `src/components/home/Hero/Hero.tsx` e `Hero.styles.ts`: coluna da direita com `TelaSistema` (imagem do pátio do Operador) e `Simbolo animado` de apoio; no celular, recorte com degradê.
- `src/components/ui/TelaSistema/TelaSistema.tsx`: nova prop opcional `prioridade` repassada ao `next/image` (`priority`), usada só no Hero, para a imagem não atrasar o maior elemento da página.
- `src/components/home/Destaques/Destaques.tsx` e `Destaques.styles.ts` (**Server Component**): a faixa de destaques. `src/app/page.tsx` a insere entre `Hero` e `Diferencial`, passando `oferta?.teste ?? null`.

### Plano
- `src/components/home/Planos/BlocoOferta.tsx` e `BlocoOferta.styles.ts` (Server Component): bloco único conforme o modelo escolhido. Recebe `plano` (ou `null`) e `teste`; sem plano, mostra o teste e a mensagem de `PlanoIndisponivel`.
- `TesteGratis.tsx` e `CartaoPlano.tsx`: só são usados no bloco, então foram ajustados direto (faixa amarela e corpo sem borda própria), sem a prop `embutido` prevista. Os botões ganharam a variante `escuro` (mês grátis sobre o amarelo) e `ghost` (plano).
- `Planos.data.ts`: novo `gruposDeAreas` (4 grupos, com os títulos das 16 áreas), mantendo `areasDoSistema` como lista plana. Teste confere que cada área está em um e só um grupo.
- `src/components/home/Planos/GruposDoPlano.tsx` (**Client Component**): desktop mostra os grupos abertos como seções; celular, como acordeão (`<details>`). O estado vem de `matchMedia` via `useSyncExternalStore`, com o servidor entregando todos abertos (sem JavaScript, nada fica escondido).
- `Planos.tsx`: usa `BlocoOferta` e `GruposDoPlano`; mantém `Incluso`, `Duvida` e a nota do teste.

### Como funciona
- `ComoFunciona.tsx` e `ComoFunciona.styles.ts`: nova estrutura (modelo escolhido). Semântica: `ol` de 4 itens; o item 2 contém uma lista de 2 opções com rótulo "Escolha uma". Os dados (`passos`) ganham o campo `grupo` para o agrupamento, e os textos não mudam. Conectores em CSS (bordas tracejadas e pseudo-elementos), sem JavaScript.
- Server Component, como hoje.

### Sistema
- `src/components/home/Sistema/TelasDoPerfil.tsx` e `.styles.ts` (**Client Component**): une a lista de telas (desktop) e o carrossel (celular) em um único DOM com todas as telas no HTML. O estado da tela ativa é um só; o breakpoint (`matchMedia lg`) decide se o clique na lista troca a tela visível ou rola o trilho.
- `CarrosselTelas.tsx`: passa a aceitar `atual` e `aoMudar` (controlado); sem as props, funciona como hoje.
- `Sistema.tsx`: troca `CarrosselTelas` por `TelasDoPerfil` e passa os títulos de cada tela.
- `TelaPerfil.styles.ts`: a moldura de celular cresce no desktop (até 360 px).
- `SeletorPerfil.tsx`: sem mudança; a navegação por setas da lista de telas reaproveita a lógica, extraída em um hook `useNavegacaoPorSetas` em `src/hooks/`.
- Sem JavaScript, ou fora de `scripting: enabled`, o layout fica como o de hoje: carrossel com rolagem nativa e todas as telas no HTML.

### Tipos e dados
Sem mudança em `src/types`, exceto o tipo local dos grupos de áreas (`GrupoDeAreas = { titulo: string; areas: AreaDoSistema[] }`).

### Server vs Client
- Server: `Destaques`, `BlocoOferta`, `ComoFunciona`, `Hero`.
- Client: `GruposDoPlano` (acordeão por breakpoint), `TelasDoPerfil` e `CarrosselTelas` (estado e rolagem).

### Testes
- `Hero.test.tsx`: tela do produto presente com texto alternativo; botões e garantias intactos.
- `Destaques.test.tsx` (novo): os quatro itens, com e sem teste carregado.
- `Planos.test.tsx`, `CartaoPlano.test.tsx`, `Planos.data.test.ts`: bloco único, preço e promoção do back-end, contingência, 16 áreas em 4 grupos, acordeão por teclado.
- `ComoFunciona.test.tsx`: ordem e semântica (4 itens, o 2 com duas opções).
- `Sistema.test.tsx`, `CarrosselTelas.test.tsx`, novo `TelasDoPerfil.test.tsx`: lista com todas as telas, troca por clique e teclado, carrossel preservado.

## Decisões e trade-offs
- **Uma só estrutura de DOM no Sistema:** duplicar o markup para desktop e celular dobraria as imagens e quebraria testes que contam telas. Um DOM com CSS e estado único é mais barato e mantém todas as telas no HTML.
- **`matchMedia` só para o comportamento, nunca para esconder conteúdo:** no servidor, tudo aparece (acordeão aberto, carrossel completo); o cliente refina. Sem JavaScript, a página continua legível.
- **`<details>` no acordeão do plano:** nativo, acessível por teclado e leitor de tela. Evita um componente de acordeão novo.
- **Segurar o bloco do plano em um componente novo em vez de editar `CartaoPlano`/`TesteGratis` por dentro:** os dois continuam reutilizáveis e testados, e o novo componente só os compõe.
- **Fluxo "Como funciona" em CSS:** sem SVG nem biblioteca; a bifurcação é feita com bordas e pseudo-elementos, simples de manter e de adaptar ao celular.
- **Imagem do Hero com `priority` e `sizes` corretos:** é a imagem acima da dobra; as demais da home seguem com carregamento sob demanda.

## Riscos / pontos de atenção
- **LCP:** a tela do produto no Hero vira o maior elemento. Conferir antes e depois com Lighthouse, e dimensionar `sizes` para o celular.
- **Hidratação do acordeão e do Sistema:** no celular, o acordeão abre tudo no servidor e fecha após hidratar; abaixo da dobra, o salto não deve contar como deslocamento, mas vale conferir.
- **Acessibilidade da bifurcação:** a leitura em ordem ("2: escolha uma das duas") precisa ser testada com leitor de tela.
- **Peso do Hero no celular:** manter a imagem do pátio em `.webp` já otimizado (720x1558); se pesar, gerar uma versão menor só para o Hero.
- **Duplicação de mensagem:** a faixa de destaques e a seção "Sem papel e sem cadastro do cliente" dizem coisas parecidas; manter a faixa curta, só como prova rápida, e deixar o detalhe na seção.
- **Testes do Sistema:** os testes de grupos "Tela N de N" e de teclado precisam ser revistos.
- **Next.js:** consultar `node_modules/next/dist/docs/` antes de mexer em `next/image` (`priority`) e nos componentes de cliente, como pede o `AGENTS.md`.
- **Skill impeccable:** o fluxo dela pede o `PRODUCT.md` antes de redesenhos; sem ele, os modelos da T1 seguem o que o código já mostra.

## Fora de escopo técnico
- Contato, FAQ, Diferencial, rodapé, header e botão do WhatsApp.
- Fundo alternado das seções e ritmo geral da página.
- Novas capturas de tela, novos perfis e mudança de preço ou de texto de oferta.
- Nova rota ou página; medição de cliques; testes A/B.
