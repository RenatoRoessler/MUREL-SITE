# Tech Spec: Home de Vendas Detalhada

## Referências
- PRD: ./prd.md
- Spec anterior: `docs/specs/site-institucional/techspec.md` (base de tema, `Section`, `Button`, formulário)
- Guia de marca: `docs/Marca_Murel.html`
- Fonte do conteúdo funcional: `C:\murel\GIPE\docs\relatorio-funcionalidades.txt` (seções 4 a 8) e rotas `patio`, `caixa`, `precos`, `mensalistas`, `empresas-conveniadas` em `C:\murel\GIPE\src\app\(app)`
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe; as decisões derivam do guia de marca e do que a home já tem. A execução do layout passa pela skill `.agents/skills/impeccable` (regra do `CLAUDE.md`).
- Docs do Next consultados (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`). O projeto usa `next 16.4.3` com `cacheComponents: true`; reler `image.md` antes de implementar as imagens.

## Estado atual do repositório
- A home (`src/app/page.tsx`) compõe: Hero, Diferencial, ComoFunciona, Faq, Contato, Footer, BotaoWhatsapp.
- **Não existe** seção de funcionalidades, pasta `public/telas/`, uso de `next/image` nem `urlAdesao` em `src/lib/config.ts`.
- **Não existe** chamada "Ir para adesão" na página. O CTA do Hero hoje é "Falar com a equipe" (`#contato`). O PRD (RF1, RF9) exige a chamada de adesão, então ela precisa ser criada.
- A rota pública de adesão existe no GIPE (`src/app/adesao`), conforme a Tech Spec anterior.
- `Section` (`src/components/ui/Section`) já entrega faixa tracejada, `h2` e lede; serve de base para as novas seções.

## Design
- **Ordem da home** (mudanças em negrito):
  1. Hero (título, subtítulo, CTAs) — **CTA principal passa a ser "Ir para adesão"; "Falar com a equipe" vira secundário**.
  2. Diferencial (já existe).
  3. **Visão geral do sistema** (`#sistema`): `h2` + lede e um índice de 4 cartões que levam às seções abaixo.
  4. **Pátio, entrada e saída** (`#patio`).
  5. **Caixa e preços** (`#caixa-precos`).
  6. **Mensalistas** (`#mensalistas`).
  7. **Empresas conveniadas** (`#conveniadas`).
  8. ComoFunciona (já existe; complementa a seção do pátio com o fluxo do ticket).
  9. Faq, Contato, Footer (já existem).
- **Bloco de funcionalidade** (repetido nas seções 4 a 7), mobile primeiro:
  - Cabeçalho: `h2` (benefício para o dono) + lede (descrição).
  - Lista de funcionalidades (3 a 6 itens curtos).
  - Tela(s) do sistema em moldura.
  - Botão "Ir para adesão" ao final.
  - Em `lg`: duas colunas (texto | tela), invertendo a ordem a cada bloco para ritmo. Abaixo de `lg`: texto, depois tela, em coluna única.
- **Telas:** capturadas do GIPE no tema escuro (casa com o site). Largura máxima de exibição ~1000 px; em celular a tela ocupa a largura útil e permite ver o conteúdo sem zoom. O bloco de Pátio usa até 2 telas (lista do pátio e saída), os demais usam 1 a 2.
- **Estados:** conteúdo estático; sem estados de carga/erro além do carregamento da imagem (`placeholder="blur"` automático nos imports estáticos).
- **Movimento:** nenhum novo. Se houver entrada animada das telas, só sob `prefers-reduced-motion: no-preference`.
- **Componentes do design system reaproveitados:** `Section`, `Container`, `Button` (variantes primary/ghost), tokens de `theme.ts`.
- **Componentes novos:**
  - `src/components/ui/TelaSistema/` — moldura com `next/image` (borda `faixaCinza`, raio do tema, fundo `asfalto2`).
  - `src/components/home/Funcionalidade/` — bloco genérico de uma área (título, lede, lista, telas, CTA).
  - `src/components/home/VisaoGeral/` — seção `#sistema` com o índice de 4 cartões.
  - `src/components/home/Funcionalidades/Funcionalidades.data.ts` — conteúdo tipado das 4 áreas.
- **Tokens de tema:** nenhum novo. Se a moldura precisar de sombra/raio fora do tema, adicionar ao `theme.ts` e a `styled.d.ts`, não usar valor solto.

## Arquitetura da solução

### Arquivos
```
src/
  app/
    page.tsx                                  # inclui VisaoGeral e as 4 áreas; ordem acima
  lib/
    config.ts                                 # + urlAdesao = `${urlBase}/adesao`
    config.test.ts                            # + caso de urlAdesao
  types/
    funcionalidade.ts                         # Funcionalidade, TelaSistema
  components/
    ui/TelaSistema/                           # TelaSistema.tsx, .styles.ts, .test.tsx
    home/Funcionalidade/                      # Funcionalidade.tsx, .styles.ts, .test.tsx
    home/VisaoGeral/                          # VisaoGeral.tsx, .styles.ts, .test.tsx
    home/Funcionalidades/
      Funcionalidades.tsx                     # mapeia os dados para <Funcionalidade />
      Funcionalidades.data.ts                 # conteúdo das 4 áreas
      Funcionalidades.test.tsx
    home/Hero/Hero.tsx                        # CTA principal -> urlAdesao
    layout/Header/Header.tsx                  # + link de seção "Sistema"; opcional "Ir para adesão" em md+
    layout/Footer/Footer.tsx                  # + botão "Ir para adesão" (se ainda não houver)
  assets/telas/                               # *.webp importados estaticamente (ver decisões)
```
Estrutura de pasta por componente segue o padrão do projeto: `Componente.tsx`, `Componente.styles.ts`, `Componente.test.tsx` quando houver lógica.

### Tipos e contratos
```ts
// src/types/funcionalidade.ts
import type { StaticImageData } from "next/image";

export type TelaSistema = {
  imagem: StaticImageData;
  alt: string; // descreve o que a tela mostra, em português
};

export type Funcionalidade = {
  id: "patio" | "caixa-precos" | "mensalistas" | "conveniadas";
  rotulo: string;       // nome curto no índice e no menu
  titulo: string;       // benefício para o dono (h2)
  descricao: string;    // lede
  itens: string[];      // lista de funcionalidades reais
  telas: TelaSistema[]; // 1 a 2
};
```
- `Funcionalidades.data.ts` exporta `funcionalidades: Funcionalidade[]` e é a fonte única para o índice, as seções e o link de menu.
- `src/lib/config.ts` ganha `urlAdesao = \`${urlBase}/adesao\``, derivado de `NEXT_PUBLIC_APP_URL`. Nenhum `/adesao` fica repetido em componentes.

### Server vs Client
| Peça | Tipo | Motivo |
|---|---|---|
| `Funcionalidades`, `Funcionalidade`, `VisaoGeral`, `TelaSistema` | Server (composição) | só conteúdo; os `styled.*` ficam em `.styles.ts` com `"use client"`, como nas seções atuais |
| `Header` | Client (já é) | estado do menu; só ganha um item em `secoes` |
| `Hero`, `Footer` | como hoje | só trocam/adicionam o destino do botão |

### Conteúdo (o que mostrar, sem inventar)
Apenas o que o relatório do GIPE marca como funcionando:
- **Pátio, entrada e saída:** entrada com placa, cor, categoria e leitura da placa pela câmera; comprovante com QR Code; página pública do ticket sem login; lista de veículos presentes com busca e filtros; saída localizando por placa ou QR, só com os meios de pagamento da empresa; mensalista liberado sem cobrança; recibo público da saída.
- **Caixa e preços:** gaveta em destaque, turno por forma de pagamento, movimentos, linha do tempo e gráficos, abertura, retirada (sangria), passagem de turno e fechamento com resumo de diferença e PDF; histórico de caixas com exportação CSV/PDF; tabelas de preço com cadastro em 3 etapas e resumo ao vivo.
- **Mensalistas:** cadastro com veículos e condutores, tipos de mensalidade com dias de atendimento, contrato com aceite por link, registro de pagamento, agenda de vencimentos, lista adaptada ao celular.
- **Empresas conveniadas:** o relatório não detalha esta área (a rota `empresas-conveniadas` existe). **Ler a rota e os testes do GIPE antes de redigir** e listar só o que existir; ver riscos.
- Fora: Relatórios (vazio) e Notas fiscais (fora de escopo do PRD).
- Copy no tom da marca, sem jargão, sem emojis, sem exageros; cada botão diz o que acontece.

### Telas
- Capturas feitas **no GIPE rodando localmente**, em conta de teste com dados fictícios, tema escuro, viewport desktop (≈1280 px) e, quando agregar, celular. O login de `docs/input.md` é só para a captura; **não entra em código, docs nem variáveis do site.**
- Salvas como WebP (largura ≤ 1280 px, alvo < 150 KB cada) em `src/assets/telas/` e importadas estaticamente, para o `next/image` obter largura/altura e o blur automaticamente.
- `alt` descreve a tela (ex.: "Lista de veículos no pátio, com busca e filtros"), sem repetir o texto ao redor.
- `sizes` coerente com o layout (≈100vw no celular, ≈50vw em `lg`); sem `priority` (todas abaixo da dobra, `loading` padrão lazy).
- Revisão obrigatória, imagem por imagem: nenhuma placa real, nome, CNPJ, e-mail, telefone ou valor de cliente real.

### Âncoras e navegação
- Ids: `sistema`, `patio`, `caixa-precos`, `mensalistas`, `conveniadas`. Âncoras herdam o `scroll-margin-top` do cabeçalho fixo (já tratado em `GlobalStyle`; confirmar).
- `Header`: acrescentar "Sistema" (`#sistema`) a `secoes`; manter a barra enxuta (o índice da visão geral leva às 4 áreas).
- CTA "Ir para adesão" usa `Button href={urlAdesao}`; link externo ao sistema, mesma aba, igual a "Acessar o sistema".

### SEO e dados estruturados
- Atualizar `description` do metadata e do JSON-LD, se necessário, para citar controle de pátio, caixa, mensalistas e convênios.
- Sem novas rotas, então `sitemap.ts` e `robots.ts` não mudam.

### Testes (Vitest + Testing Library)
- `config.test.ts`: `urlAdesao` com e sem barra final em `NEXT_PUBLIC_APP_URL`.
- `TelaSistema`: renderiza `img` com `alt` informado.
- `Funcionalidade`: renderiza título, lede, todos os itens, tela(s) com `alt` e link "Ir para adesão" apontando para `urlAdesao`.
- `Funcionalidades`: renderiza uma seção por item de `funcionalidades` com os ids esperados; cada dado tem ao menos 1 tela e `alt` não vazio.
- `VisaoGeral`: um link para cada área, `href` igual a `#<id>`.
- `Hero`/`Header`/`Footer`: botão de adesão aponta para `urlAdesao`.
- Verificação final: `npm run lint`, `npm run build`, checagem manual no navegador (360 px e desktop), auditoria automática de acessibilidade e conferência dos tamanhos das imagens.

## Decisões técnicas e trade-offs
1. **Quatro áreas, não cinco.** O PRD lista "pátio, entrada e saída, caixa e preços, mensalistas e empresas conveniadas", mas os RF3 a RF6 agrupam pátio com entrada/saída. Segui os RFs (4 blocos). O fluxo detalhado do ticket continua em `ComoFunciona`. Se a intenção era um bloco só de entrada/saída separado do pátio, basta incluir um item em `funcionalidades` e um id novo; a estrutura de dados já comporta.
2. **Dados em arquivo tipado, componente genérico.** Um único `Funcionalidade` renderiza as 4 áreas; evita 4 componentes quase idênticos e mantém o conteúdo editável sem mexer em layout. Não criar CMS nem abstração além disso.
3. **Imports estáticos de imagens** em `src/assets/telas/` (e não `public/`): o Next lê dimensões e gera o blur, evitando `width`/`height` manuais e layout shift. Trade-off: as imagens entram no grafo do build; aceitável para ~6 arquivos.
4. **WebP otimizado pelo `next/image`**, sem configurar `qualities` extras (usar o padrão). Se for preciso um `quality` diferente de 75, registrar em `next.config.ts` (`images.qualities`) conforme o doc.
5. **Prints, não iframes**: nada de dado real, carregamento leve, independência do sistema estar no ar.
6. **Alternar a ordem texto/tela** no desktop é só CSS (`order`/grid), sem JS e sem duplicar markup; no celular a ordem de leitura é sempre texto, depois tela.
7. **CTA de adesão como principal** na home e no fim de cada área. "Falar com a equipe" fica como secundário para quem tem dúvida (preço continua só via contato).
8. **Sem medição de cliques** nesta entrega: as métricas do PRD seguem `[A DEFINIR]`, mesma decisão da Tech Spec anterior (analytics é decisão separada, pode exigir aviso de privacidade).

## Riscos / pontos de atenção
- **Conteúdo de Empresas conveniadas não está documentado** no relatório do GIPE. Risco de descrever algo que não existe; mitigar lendo a rota/testes antes de redigir e usando só o que for confirmado na tela.
- **Telas com dado sensível:** a conta de teste pode ter dados reais misturados. Conferir cada captura (placas, nomes, CNPJs, valores, e-mails) antes de commitar; trocar por dados fictícios no GIPE local se necessário.
- **Credenciais em `docs/input.md`:** a senha está em texto no repositório. Não copiar; recomendar troca e remoção do arquivo do histórico (já anotado no PRD).
- **Peso da página:** 5 a 8 imagens grandes podem pesar no celular. Limitar largura, alvo < 150 KB, `sizes` corretos, lazy abaixo da dobra; medir no `build`/Lighthouse.
- **Legibilidade em celular:** um print de desktop encolhido fica ilegível. Preferir recortes que mostrem o essencial, ou capturas em viewport de celular onde a tela for pensada para isso (menu inferior, lista de mensalistas).
- **Styled-components e Server Components:** cada `.styles.ts` com `"use client"` vira bundle de cliente; manter estilos isolados e medir antes de otimizar.
- **`NEXT_PUBLIC_APP_URL`:** se ficar com o valor de desenvolvimento no deploy, "Ir para adesão" e "Acessar o sistema" quebram. Conferir no deploy.
- **`cacheComponents`/`next/image`:** confirmar no doc da versão 16.4.3 que imports estáticos e `sizes` funcionam sem ajustes de cache; validar com `npm run build`.
- **Funcionalidades mutáveis:** o GIPE evolui rápido (versão 1.0.216); o conteúdo reflete 23/10/2026 e pode envelhecer. Revisar a cada release relevante.

## Fora de escopo técnico
- Nova rota, página separada ou rota por funcionalidade.
- Seção de notas fiscais, relatórios e gestão de usuários.
- Vídeos, carrossel, lightbox/zoom das telas e animações elaboradas.
- Medição de visitas/cliques, cookies e banner de consentimento.
- Mudanças no formulário de contato, no WhatsApp e no GIPE (apenas leitura e capturas).
- Preços e planos públicos.
- Automação das capturas (Playwright); feitas manualmente nesta versão.
