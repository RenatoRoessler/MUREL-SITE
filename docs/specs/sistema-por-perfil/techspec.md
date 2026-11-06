# Tech Spec: Sistema por Perfil de Usuário

## Referências
- PRD: ./prd.md
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe no projeto; o RF11 do PRD exige que o usuário escolha entre 3 modelos de layout antes da implementação. Os 3 modelos estão em `./layouts.png` e o usuário escolheu o **modelo B (abas + carrossel horizontal)**.
- Código atual relacionado: `src/components/home/VisaoGeral`, `Funcionalidades`, `Funcionalidade`, `src/components/ui/TelaSistema`, `src/types/funcionalidade.ts`.
- Next.js 16.4.3: conferido em `node_modules/next/dist/docs` que styled-components continua suportado só em Client Components (arquivos `.styles.ts` com `"use client"`, como já é feito no projeto).

## Design
- Layout escolhido: **B, abas + carrossel horizontal com rolagem por encaixe** (mockup em `./layouts.png`).
- Telas/estados:
  - Seção "Sistema" (id `sistema`, âncora do cabeçalho preservada) com título, lede e abas de perfil (Cliente, Operador, Gestor).
  - Cada perfil tem um carrossel: um slide por tela, com a imagem à esquerda e título + explicação à direita (RF5). O slide seguinte aparece parcialmente ao lado, indicando que há mais. Abaixo: indicador de posição (pontos, com o ativo alongado) e botões anterior/próximo.
  - Ordem dos slides: do fluxo mais comum ao menos comum no perfil.
  - Estados: perfil ativo (padrão: Gestor, que tem mais telas e cobre quem decide a compra); perfil inativo; slide atual; primeiro e último slide (botão correspondente desabilitado); foco por teclado; sem JavaScript (a rolagem horizontal nativa continua funcionando e os três perfis ficam no HTML).
  - Celular (a partir de 360 px): o slide vira coluna (imagem em cima, texto embaixo) e ocupa quase toda a largura; a rolagem por encaixe é o gesto principal. Imagens em retrato (Operador e Cliente) mantêm a proporção, sem corte.
  - Desktop: slide com imagem e texto lado a lado; imagens largas do Gestor e retrato do Operador usam o mesmo slide, com enquadramento por `object-fit: contain` sobre fundo da moldura.
  - Chamada "Testar grátis" ao fim da seção (RF8).
- Movimento: a rolagem suave respeita `prefers-reduced-motion` (sem animação nesse caso).
- Molduras de aparelho (RF12, estilo A escolhido; mockup em `./molduras.png`): a moldura de `TelaSistema` passa a desenhar um celular (imagem em retrato) ou um notebook (imagem em paisagem), só com CSS, nas cores do tema (`asfalto3` no corpo, `bordaControle` no contorno de 1 px, `faixaCinza` no detalhe da base). Celular: corpo de 9 px, cantos de 38 px e uma pílula no topo. Notebook: tampa de 10 px e base fina com o recorte central. O visor (a área da tela) é o elemento focável e rolável, para o teclado continuar rolando as telas largas no celular; a base do notebook é decorativa e não rola. Coluna do celular no slide sobe de 280 para 300 px, já contando a moldura.
- Componentes do design system reaproveitados: `Section`, `Button` (chamada "Testar grátis" com `urlAdesaoTeste`), `TelaSistema` (moldura com `tabIndex`, `aria-label` e `next/image`), tokens de tema existentes (`theme.space`, `theme.breakpoints`, cores).
- Componentes novos necessários:
  - `src/components/home/Sistema/Sistema.tsx` (Server Component): monta a `Section` e passa os dados.
  - `src/components/home/Sistema/SeletorPerfil.tsx` (Client Component): abas acessíveis e painéis.
  - `src/components/home/Sistema/CarrosselTelas.tsx` (Client Component): trilho com rolagem por encaixe, indicador de posição e botões anterior/próximo.
  - `src/components/home/Sistema/TelaPerfil.tsx` (Server Component): slide com imagem + título + explicação.
  - Arquivos `.styles.ts` correspondentes, com `"use client"`, seguindo o padrão atual.
- Tokens de tema usados/criados: nenhum novo previsto; o indicador e as abas ativas usam `colors.amarelo`, como no mockup. Se algo novo for preciso, criar em `theme` e não no componente.

## Arquitetura da solução
- **Tipos** (`src/types/sistema.ts`, novo; `funcionalidade.ts` fica enquanto houver uso):
  ```ts
  export type IdPerfil = "cliente" | "operador" | "gestor";

  export type TelaPerfil = {
    id: string;
    imagem: StaticImageData;
    alt: string;
    titulo: string;
    explicacao: string;
  };

  export type PerfilSistema = {
    id: IdPerfil;
    rotulo: string;
    resumo: string;
    telas: TelaPerfil[];
  };
  ```
- **Dados** (`src/components/home/Sistema/Sistema.data.ts`, novo): lista de `PerfilSistema`, no mesmo estilo de `Funcionalidades.data.ts`, com cabeçalho de comentário indicando a data da conferência das telas. Os textos do Gestor reaproveitam o conteúdo útil já publicado em `Funcionalidades.data.ts` (pátio, caixa e preços, mensalistas, conveniadas, tema), reorganizado por menu real do sistema.
- **Imagens** (`src/assets/telas/cliente/`, `operador/`, `gestor/`, em `.webp`, como as atuais):
  - Origem: `Documentos/gipe/cliente` (1 JPEG), `Documentos/gipe/operador` (7 JPEG) e capturas novas do Gestor.
  - Cada imagem de origem é revisada uma a uma; dado pessoal ou real (placa, nome, CPF/CNPJ, telefone, e-mail) é ocultado ou a tela é recapturada com dados fictícios (RF6).
  - Conversão para WebP com largura máxima de 1280 px para telas largas e 720 px para telas em retrato (as telas existentes servem de referência de peso). `next/image` com `sizes` ajustado ao slide do carrossel (aprox. 640 px em desktop, 90vw no celular).
  - Nomes de arquivo descritivos (`recibo-saida.webp`, não o nome do WhatsApp). Nenhum arquivo original com nome ou metadados de origem entra no repositório; remover EXIF.
- **Captura do Gestor**: a versão web é aberta pelo desenvolvedor, em conta de teste com dados fictícios. Os menus a capturar são levantados no próprio sistema; menus em branco ou em construção (ex.: Relatórios) ficam de fora (RF7). A lista final de menus entra na tarefa de captura. **Nenhuma credencial é registrada em código, spec ou commit.**
- **Server vs. Client**:
  - `Sistema` e `TelaPerfil`: Server Components (sem estado).
  - `SeletorPerfil`: Client Component, só pelo estado do perfil ativo. Recebe os perfis já montados (as telas renderizadas como `children`/nós do servidor) para não levar as imagens para o bundle de cliente.
  - `CarrosselTelas`: Client Component, só pelo estado do slide atual. Usa `scroll-snap` nativo e `scrollTo`/`IntersectionObserver` para sincronizar indicador e botões; sem biblioteca de carrossel. Trilho focável (`tabIndex=0`) com `role="region"`, `aria-roledescription="carrossel"` e `aria-label` com o nome do perfil; setas do teclado rolam o trilho; cada slide com `role="group"` e `aria-label="Tela N de M"`.
  - Acessibilidade das abas: `role="tablist"`, `tab` e `tabpanel`, `aria-selected`, `aria-controls`, setas esquerda/direita e Home/End. Os três painéis ficam no HTML; os inativos usam o atributo `hidden`.
- **Integração na home** (`src/app/page.tsx`): substituir `VisaoGeral` + `Funcionalidades` por `Sistema`. O id `sistema` permanece, então o link do cabeçalho e o `Header.test.tsx` continuam válidos. Os ids antigos (`#patio`, `#caixa-precos` etc.) não têm uso fora de testes; os testes de `VisaoGeral` e `Funcionalidade` são removidos junto com os componentes, se a remoção for confirmada.
- **Metadados**: a descrição estruturada em `page.tsx` (`dadosEstruturados`) não muda. Se o texto do SEO listar áreas, revisar para coerência.
- **Testes** (Vitest + Testing Library, como o resto do projeto): perfis renderizados; troca de aba por clique e por teclado; botões anterior/próximo (inclusive desabilitados no primeiro e no último slide) e indicador de posição; painel ativo visível e demais com `hidden`; cada tela com `alt`, título e explicação; chamada "Testar grátis" presente; `SeletorPerfil` sem perda de conteúdo no HTML inicial.

## Decisões técnicas e trade-offs
- **Todos os painéis no HTML, inativos ocultos**: ajuda SEO e leitores de tela e evita carregamento sob demanda. Custo: `next/image` das telas ocultas. Mitigar com `loading="lazy"` (padrão) e `sizes` corretos; só as telas do perfil ativo e da primeira dobra recebem prioridade, e nenhuma tem `priority`.
- **Abas em vez de três blocos empilhados**: a divisão por perfil é a mudança pedida e as abas reduzem a rolagem no celular. Trade-off: parte do conteúdo fica oculta até o clique; aceitável com o padrão ARIA correto.
- **Carrossel próprio e enxuto, sem biblioteca**: `scroll-snap` nativo cobre o gesto de deslizar no celular e a rolagem por teclado, e evita peso de JavaScript. Fica em `home/Sistema`; só vira componente de `ui` se um segundo uso aparecer.
- **Modelos A e C descartados** pelo usuário; não serão implementados.
- **Dados em arquivo `.data.ts` e não em CMS ou JSON externo**: igual ao padrão atual do projeto.
- **Reaproveitar `TelaSistema`** em vez de criar nova moldura, para manter foco por teclado, `aria-label` e estilo consistentes.

## Riscos / pontos de atenção
- **Dados reais nas imagens**: as imagens de origem vêm de capturas de WhatsApp; risco de vazar placa, nome ou documento reais. Mitigação: revisão uma a uma, ocultação ou recaptura, e checklist na tarefa de revisão.
- **Credenciais em `docs/input.md`**: login e senha do ambiente de produção estão em texto no repositório. Não devem ser copiados; recomenda-se trocar a senha e removê-las do arquivo (e do histórico, se já foi commitado). O arquivo está modificado e ainda não commitado no estado atual.
- **Conta usada nas capturas do Gestor**: se for uma conta real, as telas trarão dados reais. Preferir conta de teste ou ambiente local com dados fictícios.
- **Fidelidade das explicações**: o texto de cada tela depende de conferir o comportamento real; o que não for confirmado fica de fora (RF7).
- **Acessibilidade do carrossel**: slides fora da vista continuam no HTML e são lidos por leitores de tela; não usar `aria-hidden` nem `inert` neles, e manter o botão "próximo" com nome claro ("Próxima tela"). Respeitar `prefers-reduced-motion`.
- **Peso da página**: 1 + 7 + N imagens a mais. Controlar o peso por imagem e verificar o resultado com `npm run build`.
- **Imagens do operador/cliente em formato retrato** (celular) dentro de uma moldura pensada para telas largas: o slide usa `object-fit: contain` e altura limitada, para a imagem não ser cortada nem ficar maior que a janela do celular.
- **Acessibilidade das abas**: foco visível, contraste, ordem de tabulação e leitura dos painéis ocultos (WCAG 2.2 AA).
- **Remoção de componentes antigos** (`VisaoGeral`, `Funcionalidades`, `Funcionalidade`): confirmar que nada mais os usa antes de apagar.

## Fora de escopo técnico
- Nova rota, página separada ou CMS.
- Carregamento dinâmico de telas, vídeo ou demonstração interativa.
- Alterar cabeçalho, rodapé, planos, teste grátis, FAQ, contato e WhatsApp, além do necessário para encaixar a seção.
- Automatizar a captura de telas do sistema.
- Internacionalização.
