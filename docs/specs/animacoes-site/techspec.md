# Tech Spec: Animações do site (pacote inicial)

## Referências
- PRD: ./prd.md
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe no projeto, então as decisões visuais ficam registradas aqui.

## Design

### Princípios
- Só `transform` e `opacity` se movem. Nada que mude o tamanho do layout (sem CLS).
- Movimento curto e rápido: entradas de 16px e 500ms, reações de hover de 150ms, aberturas de 300ms.
- Tudo é CSS onde der. JavaScript só onde há estado real (visibilidade na tela, rolagem, menu aberto).
- Todo movimento fica dentro de `@media (prefers-reduced-motion: no-preference)`. Fora dela (e sem JS, e na impressão) o estado final é o estado normal da página.

### Tokens de movimento (novos, em `theme.motion`)
| Token | Valor | Uso |
|---|---|---|
| `duracao.rapida` | `150ms` | hover, clique |
| `duracao.media` | `300ms` | menu, FAQ, header |
| `duracao.lenta` | `500ms` | entradas ao rolar e do Hero |
| `curva.saida` | `cubic-bezier(0.16, 1, 0.3, 1)` | entradas e aberturas (mesma curva já usada nos pontos do carrossel) |
| `curva.padrao` | `ease-out` | hovers |
| `intervalo` | `70ms` | atraso entre itens de uma sequência |
| `distancia` | `16px` | subida das entradas |

### Comportamento por peça
- **Revelação ao rolar (RF1):** o elemento começa com `opacity: 0` e `translateY(16px)`. Ao entrar na tela (10% visível, margem inferior de -10%), roda a animação `revelar` (500ms, curva de saída). Em listas, cada filho recebe atraso de `índice × 70ms`, limitado ao 6º item para a fila não demorar.
- **Hero (RF2):** keyframes CSS que rodam ao carregar, sem JavaScript: título (0ms), subtítulo (120ms), botões (240ms), garantias (360ms). O trecho amarelo do título ganha um sublinhado que se desenha da esquerda para a direita (`scaleX` 0→1, 600ms, atraso de 500ms).
- **Botões (RF3):** hover `translateY(-2px)`, clique `scale(0.97)`. Variante com brilho: faixa diagonal translúcida que cruza o botão, 3 repetições a cada 6s, depois para.
- **Cards (RF4):** hover (só em aparelhos com `hover: hover`) sobe 4px, borda vai para amarelo e ganha sombra. O selo de promoção usa o mesmo brilho dos botões.
- **Header (RF5):** no topo, fundo transparente e sem borda. Depois de rolar mais de 8px, fundo `asfalto` a 80% com `backdrop-filter: blur(12px)` e sombra. Menu do celular: abre com fade e descida de 8px (300ms); os links entram em sequência (70ms).
- **FAQ (RF6):** a altura do conteúdo anima de 0 até o tamanho natural (300ms). O ícone vira um único `+` que gira 45° e fica como `×` quando aberto (hoje trocam os caracteres `+` e `−`).
- **WhatsApp (RF7):** ao aparecer, um anel amarelo-esverdeado (cor do botão) cresce e some, 3 vezes (1,6s cada), uma vez por aparição.

## Arquitetura da solução

### Arquivos novos
- `src/styles/movimento.ts`: helper `comMovimento` (um `css` que envolve o bloco em `@media (prefers-reduced-motion: no-preference)`) e keyframes compartilhados (`revelar`, `brilho`). Evita repetir a media query em cada componente.
- `src/components/ui/Revelar/Revelar.tsx` (**Client Component**): envolve um elemento e marca quando ele entra na tela.
  - Props: `as` (tag ou componente estilizado, padrão `div`), `modo` (`"proprio"` anima o próprio elemento, `"filhos"` anima cada filho direto em sequência) e `children`, mais as props do elemento escolhido.
  - Renderiza `data-revelar={modo}` e `data-estado="pendente" | "visivel"`. Um `IntersectionObserver` troca para `visivel` uma única vez e desliga a observação.
- `src/components/ui/Revelar/Revelar.styles.ts`: o CSS de `[data-revelar]` (estado pendente e animação) como `css` reaproveitável via `createGlobalStyle`-free mixin, aplicado pelo próprio `Revelar` com `styled(...)`.
- `src/components/ui/Revelar/Revelar.test.tsx`

### Arquivos alterados
- `src/styles/theme.ts` e `src/styles/styled.d.ts`: adicionar `motion` (tabela acima). `theme.test.ts` ganha a checagem dos novos tokens.
- `src/components/ui/Section/Section.tsx` e `.styles.ts`: nova prop `revelar?: boolean` (padrão `false`). Quando `true`, o `Cabecalho` (título e lede) é renderizado com `Revelar`. Diferencial, Como funciona, Planos e FAQ passam `revelar`; Sistema e Contato ficam como estão.
- `src/components/home/Diferencial/Diferencial.tsx`: `Lista` com `Revelar as={Lista} modo="filhos"`.
- `src/components/home/ComoFunciona/ComoFunciona.tsx`: `Passos` com `modo="filhos"`; `Reforco` com `modo="proprio"`.
- `src/components/home/Planos/Planos.tsx` e `CartaoPlano.tsx`: bloco do teste grátis e cartão(ões) com `modo="proprio"`.
- `src/components/home/Faq/Faq.tsx` e `Faq.styles.ts`: `Lista` com `modo="filhos"`; abertura animada e ícone giratório no CSS.
- `src/components/home/Hero/Hero.styles.ts`: keyframes de entrada em `Titulo`, `Subtitulo`, `Chamadas`, e a garantia (filho do `Texto`); sublinhado em `Titulo em`. Nenhuma mudança no `Hero.tsx` além da prop `brilho` no botão principal.
- `src/components/ui/Button/Button.tsx` e `Button.styles.ts`: prop `brilho?: boolean` (repassada como prop transitória `$brilho`), efeitos de hover e clique para todas as variantes.
- `src/components/home/Planos/CartaoPlano.styles.ts` e `src/components/home/ComoFunciona/ComoFunciona.styles.ts`: hover dos cards; `Selo` ganha o brilho.
- `src/components/layout/Header/Header.tsx` e `Header.styles.ts`: estado `rolado`; `Barra` recebe `$rolado`; `Navegacao` troca `display: none/grid` por visibilidade com transição abaixo de `lg`.
- `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.styles.ts`: anel em `Circulo::after`, ativo só quando `$visivel` for verdadeiro (precisa passar `$visivel` ao `Circulo`).

### Tipos e dados
Sem mudança em `src/types`. Novos tipos só locais: `ModoRevelar = "proprio" | "filhos"` e as props das peças acima.

### Server vs Client
- `Revelar`: Client (observer e estado). Os componentes que o usam (Diferencial, ComoFunciona, Faq, Planos, Section) continuam Server Components, passando componentes estilizados e filhos como props, que já são client references neste projeto.
- Hero, botões, cards e selo: só CSS, sem JavaScript novo.
- Header: já é Client; ganha um listener de rolagem.
- BotaoWhatsapp: já é Client; só CSS novo.

### Como a revelação evita conteúdo escondido
O estado pendente só vale em `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)` e fora da impressão (`@media not print`). Logo:
- sem JavaScript, com "menos movimento" ou imprimindo, o CSS nunca esconde nada;
- com JavaScript, o HTML do servidor já vem escondido, então não há "piscada" (conteúdo aparecendo, sumindo e animando).

### Hover e revelação não brigam
A revelação usa `animation` com `fill-mode: backwards` (e não `transition`), disparada pela troca para `data-estado="visivel"`. Terminada a animação, o elemento volta ao estilo natural e o `transform` do hover do card continua livre, sem herdar o atraso da sequência.

## Decisões e trade-offs
- **IntersectionObserver em vez de `animation-timeline: view()`:** a opção em CSS puro dispensaria JavaScript, mas anima de forma reversível junto com a rolagem (o conteúdo "desanima" ao subir), o que contraria o PRD (uma vez só) e ainda não está em todos os navegadores.
- **`@media (scripting: enabled)` para esconder:** mantém o estado "tudo visível" como padrão seguro para quem não roda JavaScript, sem precisar de `<noscript>`.
- **Um componente `Revelar` polimórfico, e não um wrapper `div`:** envolver os `li` e `details` em `div` quebraria a semântica das listas e do FAQ. `as` mantém o HTML igual ao de hoje.
- **Animação finita nos brilhos e no anel do WhatsApp (3 repetições):** efeitos que repetem sem fim e passam de 5s precisam de pausa (WCAG 2.2.2). Em vez de oferecer um controle, eles simplesmente terminam. Isso é um pouco mais rígido que o "de vez em quando" do PRD; o efeito é "chama atenção no começo e para".
- **FAQ com `::details-content` e `interpolate-size`:** anima a altura em CSS puro e mantém o `<details>` nativo (teclado e leitor de tela intactos). Fica dentro de `@supports (interpolate-size: allow-keywords)`; onde não houver suporte, abre e fecha sem transição, como hoje. Alternativa descartada: animar com JavaScript e medir a altura, que adiciona estado e risco de erro com o `details`.
- **Header sem barra de progresso e sem detecção de direção da rolagem:** só um booleano `rolado`, atualizado apenas quando muda de valor, com listener `passive`.
- **Sem biblioteca de animação:** o escopo cabe em CSS e um observer. Adicionar uma dependência pesaria no bundle sem ganho.
- **Menu do celular com `visibility` e não `display`:** é preciso para animar. O mesmo padrão já é usado no botão do WhatsApp (`visibility` com atraso), e mantém o menu fechado fora da ordem de tab.

## Riscos / pontos de atenção
- **Falha na hidratação:** se o JavaScript não carregar, o conteúdo abaixo da dobra com `data-estado="pendente"` fica invisível. O risco é baixo (a hidratação é rápida e o observer revela na hora o que já está na tela), e o custo de um "plano B" por tempo, que mostraria tudo antes de rolar, anularia o efeito. Fica registrado como risco aceito.
- **LCP:** o título do Hero anima `opacity`. A entrada começa em 0ms e dura 500ms, sem atraso, para não adiar o maior elemento da página. Conferir no Lighthouse antes e depois.
- **Link direto para uma seção** (`#planos`): a rolagem automática passa pelas seções e o observer as revela em seguida. Conferir que não aparece um buraco visível.
- **Rolagem suave do `html`** (`scroll-behavior: smooth`) com muitos elementos entrando de uma vez: conferir fluidez em celular simples.
- **Testes em jsdom:** `IntersectionObserver` e `matchMedia` não existem; os testes precisam de um mock simples (já há `src/test/setup.ts` para centralizar).
- **Testes existentes:** `Faq.test.tsx`, `Header` e `Button.test.tsx` podem depender do ícone `+`/`−` ou da estrutura do menu; revisar ao executar as tasks.
- **Next.js:** este projeto usa uma versão do Next com mudanças em relação ao que é comum; as tasks devem consultar `node_modules/next/dist/docs/` antes de mexer em componentes (AGENTS.md), em especial para as regras de Client Components que recebem componentes como props.
- **Suporte de navegador:** `backdrop-filter`, `::details-content` e `scripting` são recursos recentes. Todos têm fallback aceitável: sem desfoque, sem animação de altura, e sem esconder o conteúdo.

## Fora de escopo técnico
- Contagem animada de números e preços, preço riscado desenhado, faixa de pista na rolagem e parallax.
- Animações dentro do carrossel de telas e transição do seletor de perfil.
- Check animado e shake no formulário de contato.
- Barra de progresso de leitura no header.
- Painel ou opção para o visitante desligar animações.
- Medição de cliques em "Começar grátis" e "Falar com a equipe" (a métrica do PRD depende de uma ferramenta de analytics que não existe no código hoje).
