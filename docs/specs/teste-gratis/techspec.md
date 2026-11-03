# Tech Spec: Teste Grátis por 30 dias

## Referências
- PRD: ./prd.md
- Referência visual e de texto: `docs/specs/murel-teste-gratis.html` (só o visual e o copy; preços, resumo de funcionalidades e o `#cadastro` dele não valem)
- Specs anteriores: `docs/specs/planos-adesao/techspec.md` (tipos e `urlAdesaoComPlano`), `docs/specs/whatsapp-contato/techspec.md`
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe; as decisões derivam da referência HTML, do tema e do que a home já tem. A execução do layout passa pela skill `.agents/skills/impeccable` (regra do `CLAUDE.md`).
- Next com `cacheComponents: true` (herdado). Tudo é conteúdo estático, exceto o balão do WhatsApp, que passa a ser Client Component. Ler `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` e `.../03-file-conventions/` antes de implementar (regra do `AGENTS.md`) e validar com `npm run build`.

## Estado atual do repositório
- `src/lib/config.ts` já exporta `urlAdesao` e `urlAdesaoComPlano(tipo: TipoPlanoAdesao)`. `TipoPlanoAdesao` já inclui `Trial: 0`, então `urlAdesaoComPlano(TipoPlanoAdesao.Trial)` já compila e gera `/adesao?tipoPlanoAdesao=0`. Falta só a constante nomeada e a atualização do comentário em `src/types/plano.ts` ("o Trial não é oferecido no site", que deixa de ser verdade).
- `Hero` tem "Ir para adesão" (primário, `urlAdesao`) e "Falar com a equipe". `Footer` e `Funcionalidade` também têm "Ir para adesão" sem plano; esses ficam como estão (PRD, RF8 de `planos-adesao`).
- `Header` (Client) tem `secoes` e, em `Acoes`, o botão ghost "Acessar o sistema" (`urlAcesso`) e o botão do menu (só abaixo de `md`).
- `Planos` compõe `ListaPlanos`, `Incluso` e `Duvida`. `CartaoPlano` aponta para `urlAdesaoComPlano(plano.tipo)`.
- `VisaoGeral` (`#sistema`) não tem chamada. `Contato` tem o bloco WhatsApp e o formulário, sem chamada de teste.
- `Faq` renderiza `perguntas` de `Faq.data.ts` (6 itens; "Como eu começo?" manda para o formulário de contato).
- `BotaoWhatsapp` é um link `position: fixed` sempre visível, sem estado. Os testes em `BotaoWhatsapp.test.tsx` o consultam por papel de link.
- Não existe `IntersectionObserver` no ambiente de teste (jsdom).

## Design
- **Posição das chamadas** (todas levam à adesão com Trial):
  1. `Hero`: o botão primário vira "Testar grátis por 30 dias"; "Falar com a equipe" continua. Abaixo, a lista de garantias (RF2).
  2. `Header`: botão primário pequeno "Testar grátis".
  3. `VisaoGeral`: uma chamada "Testar grátis" ao fim da seção, como no exemplo.
  4. `Planos`: faixa `TesteGratis` **antes** da lista de quatro cartões, e nota abaixo da lista.
  5. `Contato`: chamada "Testar grátis por 30 dias" no topo do bloco, antes do WhatsApp.
- **Faixa do teste (`TesteGratis`):** fundo `asfalto2`, borda `amarelo` 2px, raio `xl`, padding 32px (24px em mobile). Rótulo mono "Comece sem pagar nada", `h3` "Teste grátis por 30 dias", parágrafo curto, lista de garantias e botão primário "Começar meu teste grátis". Em `md` ou mais: texto à esquerda e botão à direita (`grid-template-columns: 1fr auto`); abaixo de `md`, uma coluna com o botão ocupando a largura.
- **Garantias:** lista horizontal que quebra linha, texto `nevoa`, 15px, marca de check `amarelo` (SVG inline decorativo, o mesmo traço do `Marca` de `Planos.tsx`). Mesmo componente no `Hero` e na faixa.
- **Nota dos planos:** parágrafo centralizado em `nevoa`, 15px, abaixo de `ListaPlanos`: "Todos os planos começam com 30 dias grátis. Você só paga depois do teste."
- **Header em 360 px:** logo + "Testar grátis" + "Acessar o sistema" + botão do menu não cabem em 360 px. Decisão: abaixo de `md`, `Acoes` mostra só "Testar grátis" e o botão do menu; "Acessar o sistema" passa a ser o último item do menu aberto. De `md` para cima, os dois botões ficam lado a lado como hoje. Validar no design com o `impeccable`.
- **Balão do WhatsApp:** invisível até a seção `#perguntas` aproximar-se da parte de baixo da tela; some se a pessoa voltar para cima. Transição de opacidade e deslocamento de 24px de 0,3 s; sem transição em `prefers-reduced-motion`.
- **Estados:** conteúdo estático. Foco visível já vem do `Button`. Sem estados de erro ou carregamento no site.
- **Componentes reaproveitados:** `Section`, `Container`, `Button` (variantes `primary` e `ghost`, tamanhos `sm` e `md`), tokens de `theme.ts`.
- **Componentes novos:**
  - `src/components/ui/Garantias/Garantias.tsx` + `Garantias.styles.ts` + `Garantias.test.tsx`: lista de itens com check; recebe `itens: readonly string[]` e `rotulo` (vira `aria-label` da lista).
  - `src/components/home/TesteGratis/TesteGratis.tsx` + `TesteGratis.styles.ts` + `TesteGratis.data.ts` + `TesteGratis.test.tsx`: a faixa; o `.data.ts` exporta `garantiasTeste` (as três garantias).
- **Tokens de tema:** nenhum novo previsto. Se faltar tamanho de fonte ou espaçamento, acrescentar a `theme.ts` e `styled.d.ts`, nunca valor solto.

## Arquitetura da solução

### Arquivos
```
src/
  types/plano.ts                               # só o comentário do Trial
  lib/
    config.ts                                  # + urlAdesaoTeste
    config.test.ts                             # + caso do teste
  components/
    ui/Garantias/                              # novo
      Garantias.tsx / .styles.ts / .test.tsx
    home/TesteGratis/                          # novo
      TesteGratis.tsx / .styles.ts / .data.ts / .test.tsx
    home/Hero/Hero.tsx (+ .styles.ts, .test.tsx)          # CTA e garantias
    home/VisaoGeral/VisaoGeral.tsx (+ .styles.ts, .test)  # chamada ao fim
    home/Planos/Planos.tsx (+ .styles.ts, .test.tsx)      # faixa antes da lista, nota depois
    home/Faq/Faq.data.ts (+ Faq.test.tsx)                 # perguntas do teste
    home/Contato/Contato.tsx (+ .styles.ts)               # chamada do teste
    layout/Header/Header.tsx (+ .styles.ts, .test.tsx)    # botão e reorganização mobile
    layout/BotaoWhatsapp/BotaoWhatsapp.tsx (+ .styles.ts, .test.tsx)  # aparece só depois de #perguntas
```
Uma pasta por componente com `.tsx`, `.styles.ts` e `.test.tsx`, como no restante de `src/components`.

### Link do teste
```ts
// src/lib/config.ts
export const urlAdesaoTeste = urlAdesaoComPlano(TipoPlanoAdesao.Trial);
```
- Importar `TipoPlanoAdesao` como valor (hoje o arquivo importa só o tipo). Resultado: `<base>/adesao?tipoPlanoAdesao=0`.
- Todas as chamadas do teste usam `urlAdesaoTeste`; o site continua só enviando o parâmetro, sem lê-lo nem validá-lo.
- `urlAdesao` (sem parâmetro) permanece em `Footer` e `Funcionalidade`.

### Textos (copy)
Tom da marca: direto, sem jargão, sem exagero, sem emojis. Cada botão diz o que acontece.
- **Garantias** (`garantiasTeste`): "Todas as funcionalidades", "Sem cartão de crédito", "Sem compromisso". `aria-label` da lista: "Condições do teste grátis".
- **Hero:** botão "Testar grátis por 30 dias".
- **Header:** "Testar grátis".
- **VisaoGeral:** "Testar grátis".
- **Faixa:** rótulo "Comece sem pagar nada"; título "Teste grátis por 30 dias"; texto "Use o sistema completo no seu pátio, sem cadastrar cartão. Nada é cobrado automaticamente: no fim do teste, você escolhe o plano que fizer mais sentido."; botão "Começar meu teste grátis".
- **Contato:** título curto "Prefere testar antes?", texto "Use o sistema completo por 30 dias, sem cartão e sem compromisso.", botão "Testar grátis por 30 dias".
- **Perguntas** (entram em `Faq.data.ts` depois de "Quanto custa?"; "Como eu começo?" passa a citar o teste e o formulário):
  1. Preciso cadastrar cartão de crédito para testar? Não. O teste grátis não pede cartão nem nenhum dado de pagamento. Você só informa os dados da empresa para criar o acesso.
  2. O teste tem todas as funcionalidades? Sim. Durante os 30 dias você usa o sistema completo: entrada e saída, pátio, quadro de chaves, caixa, mensalistas, convênios e tudo o mais.
  3. O que acontece depois dos 30 dias? Nada é cobrado automaticamente. No fim do teste, você escolhe um plano para continuar usando. Se não escolher, o acesso é pausado e os seus dados ficam guardados por 30 dias, caso queira voltar.
  4. O que eu cadastrar no teste continua valendo se eu assinar? Sim. Tabelas de preço, mensalistas, convênios e histórico continuam lá. Você não precisa cadastrar nada de novo.
  5. Posso cancelar quando quiser? Pode. Durante o teste não existe compromisso, e depois dele você pode cancelar a qualquer momento.
  - **Não publicar sem confirmação** das regras do PRD ("Riscos e observações"). Os cinco textos acima afirmam essas regras como fatos. Se alguma mudar, só estes textos e a faixa mudam.

### Server vs Client
| Peça | Tipo | Motivo |
|---|---|---|
| `Garantias`, `TesteGratis` | Server (composição) | só conteúdo e link. Os `styled.*` ficam em `.styles.ts` com `"use client"`, como nas demais seções |
| `Hero`, `VisaoGeral`, `Planos`, `Contato`, `Faq` | Server | só ganham elementos estáticos |
| `Header` | Client (já é) | só ganha um botão e reorganiza `Acoes` |
| `BotaoWhatsapp` | **Client (passa a ser)** | precisa de estado e observador de scroll para aparecer só depois de `#perguntas` |

### Balão do WhatsApp que aparece por scroll
- `BotaoWhatsapp` ganha `"use client"`, `useState(false)` e um `useEffect` que cria um `IntersectionObserver` sobre `document.getElementById("perguntas")`.
- `rootMargin: "0px 0px -15% 0px"`: a seção conta como "chegou" quando o topo dela passa de 85% da altura da tela, como na referência.
- Regra: `visivel = entry.isIntersecting || entry.boundingClientRect.top < 0`. Cobre a seção na tela e tudo que está abaixo dela; ao voltar para cima, ambas viram falsas e o balão some.
- Se `#perguntas` não existir, o balão fica **visível** (falha aberta: o contato não some por erro de página).
- Primeira renderização no servidor e no cliente sai oculta (`visivel = false`), sem divergência de hidratação.
- Estado oculto, em CSS (`$visivel` como transient prop): `opacity: 0`, `transform: translateY(24px)`, `pointer-events: none`, `visibility: hidden`. `visibility: hidden` já tira o link da ordem de tab e da árvore de acessibilidade, então não é preciso `tabindex` nem `aria-hidden` manuais. Para a transição de saída terminar antes do `visibility`, usar `transition: visibility 0s linear 0.3s` oculto e `0s` visível.
- `@media (prefers-reduced-motion: reduce)`: `transition: none`.
- Sem JS o balão não aparece. Aceito: o bloco de contato tem seu próprio botão de WhatsApp.
- Desmonta o observador na limpeza do efeito.

### Header
- `Acoes` passa a renderizar `Button` primário sm "Testar grátis" (`urlAdesaoTeste`) sempre; "Acessar o sistema" (ghost sm) só de `md` para cima, via estilo (`display: none` abaixo de `md`).
- No menu aberto (`Navegacao`), um `LinkSecao` final "Acessar o sistema" (`urlAcesso`), visível só abaixo de `md`. Evita dois elementos com o mesmo nome acessível visíveis ao mesmo tempo: o do `Acoes` fica `display: none` abaixo de `md` e o do menu fica `display: none` de `md` para cima.
- `secoes` e âncoras não mudam. Sem rota nova: `sitemap.ts` e `robots.ts` não mudam.

### SEO
- Não adicionar oferta ao JSON-LD. Se o `description` do metadata ou de `dadosEstruturados` passar a citar "teste grátis", conferir `seo.test.tsx`. Sugestão: não alterar nesta entrega.

### Testes (Vitest + Testing Library)
- `config.test.ts`: `urlAdesaoTeste` é `<base>/adesao?tipoPlanoAdesao=0`, com base com e sem barra final; `urlAdesao` continua sem parâmetro.
- `Garantias`: renderiza os itens numa lista com o `aria-label`; os ícones são decorativos.
- `TesteGratis`: heading "Teste grátis por 30 dias", as três garantias, e o link "Começar meu teste grátis" com `href` igual a `urlAdesaoTeste`.
- `Hero`: o link "Testar grátis por 30 dias" aponta para `urlAdesaoTeste`; "Falar com a equipe" continua em `#contato`; garantias presentes. Atualizar o teste atual, que procura "Ir para adesão".
- `Planos`: a faixa vem antes da lista (ordem no DOM); continuam 4 cartões com `tipoPlanoAdesao` 1, 2, 3 e 4; a nota "Todos os planos começam com 30 dias grátis" aparece; nenhum cartão aponta para `tipoPlanoAdesao=0`.
- `VisaoGeral` e `Contato`: o link de teste existe e aponta para `urlAdesaoTeste`.
- `Faq`: as cinco perguntas novas existem; "Como eu começo?" menciona o teste.
- `Header`: tem "Testar grátis" apontando para `urlAdesaoTeste`; "Acessar o sistema" continua apontando para `urlAcesso`; abrir o menu mostra o link de acesso.
- `BotaoWhatsapp`: mockar `IntersectionObserver` em `src/test/setup.ts` ou no próprio teste, com função para disparar entradas. Casos: oculto no início (`not.toBeVisible()` / sem papel de link); visível quando a seção entra; continua visível quando a seção está acima da tela (`boundingClientRect.top < 0`); oculta de novo ao voltar; visível se `#perguntas` não existir; mantém `href`, `target`, `rel` e nome acessível do teste atual. Ajustar os três testes existentes para disparar a visibilidade antes de consultar o link.
- Verificação final: `npm run lint`, `npm run build`, conferência manual em 360 px e em desktop (sem rolagem horizontal, header sem quebra), clicar em cada chamada do teste e nos quatro planos e conferir o `tipoPlanoAdesao`, rolar a página para ver o balão aparecer e sumir, e auditoria de acessibilidade (foco, contraste de `nevoa` sobre `asfalto2`, `prefers-reduced-motion`).

## Decisões técnicas e trade-offs
1. **Teste como chamada, não como quinto cartão.** O teste não tem preço nem periodicidade e levaria o visitante a comparar coisas diferentes. A faixa antes dos cartões responde "posso testar?" antes de "qual plano escolher?".
2. **Um link único (`urlAdesaoTeste`) para todas as chamadas**, montado por `urlAdesaoComPlano(Trial)`: reaproveita o contrato existente, sem segundo formato de URL. O header também vai direto à adesão em vez de rolar até a faixa, para o clique de maior intenção custar um passo a menos.
3. **`Garantias` em `ui/`.** Usada no `Hero` e na faixa; um componente com o mesmo vocabulário evita duas listas divergentes. Os dados das garantias ficam em `TesteGratis.data.ts`, que o `Hero` importa.
4. **`BotaoWhatsapp` com `IntersectionObserver`, não `scroll` + `getBoundingClientRect`** como na referência: não dispara a cada quadro de rolagem e não força layout. A regra `top < 0` reproduz o comportamento "mantém visível dali para baixo".
5. **`visibility: hidden` em vez de `tabindex`/`aria-hidden` manuais.** Uma única propriedade tira o balão de tab, leitor de tela e clique, sem sincronizar três atributos.
6. **Falha aberta no balão** quando `#perguntas` não existe. Prefere-se mostrar o contato a escondê-lo por erro de estrutura.
7. **"Acessar o sistema" vai para o menu no mobile** para o CTA do teste caber no header. Quem já é cliente continua com acesso em dois toques; o CTA de aquisição ganha o espaço nobre.
8. **Textos de regra do teste ficam num único arquivo de dados** (`Faq.data.ts` e `TesteGratis`), para ajustar rápido quando o negócio confirmar.
9. **Sem alterador, sem formulário no site, sem `useState` além do balão.** O cadastro continua na adesão do GIPE.

## Riscos / pontos de atenção
- **O GIPE ainda não lê `tipoPlanoAdesao`** (dependência herdada de `planos-adesao`). Sem a leitura do valor 0, o clique abre a adesão e o visitante não entra como teste, e o site promete "sem cartão" para um fluxo que pode pedir pagamento. **Combinar com o GIPE antes de publicar:** ler o parâmetro, tratar 0 como teste e definir o que fazer com valor ausente ou inválido.
- **Regras do teste sem fonte** (sem cartão, sem cobrança automática, pausa com 30 dias de retenção, dados mantidos ao assinar, cancelamento): confirmar com o negócio. Texto publicado vira compromisso.
- **Header em 360 px:** a reorganização do mobile precisa ser verificada em tela real, inclusive o menu aberto e o foco ao navegar por teclado.
- **Hidratação e acessibilidade do balão:** conferir que não há aviso de hidratação, que o foco não vai para um balão oculto e que o rótulo visível ("Estamos online!") continua no início do nome acessível.
- **Dois "Testar grátis" visíveis ao mesmo tempo** (header e hero) com o mesmo nome e o mesmo destino: aceitável, mas se um leitor de tela listar links, repetir "Testar grátis" é ruído. Alternativa: `aria-label` distinto no header. Decidir no design.
- **Texto antigo de planos e perguntas:** `Planos` diz "O que muda é o tempo de compromisso e o valor por mês" e a nota nova diz "começam com 30 dias grátis"; conferir que lede, faixa e nota não se contradizem.
- **`NEXT_PUBLIC_APP_URL`** de desenvolvimento no deploy quebra todos os links de adesão, inclusive os do teste.
- **`cacheComponents`:** o único Client Component novo é o balão, sem dado de requisição; validar no `npm run build`.

## Fora de escopo técnico
- Alterar o GIPE (ler o parâmetro, criar o acesso de teste, pausar e reter dados): é dependência, não parte desta entrega.
- Formulário de cadastro, cobrança e e-mails de fim de teste no site.
- Medição de cliques, analytics e eventos por origem da chamada (as métricas do PRD seguem `[A DEFINIR]`).
- Preço ou oferta no JSON-LD.
- Mudanças nos preços, nas periodicidades e nos cartões de plano.
- Mudar as chamadas "Ir para adesão" do `Footer` e de `Funcionalidade`.
- Nova rota ou página de teste.
