# Tech Spec: Site Institucional da Murel

## Referências
- PRD: ./prd.md
- Guia de marca: `docs/Marca_Murel.html` (v1.1)
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe no projeto, então as decisões visuais derivam direto do guia de marca. A execução do layout deve passar pela skill `.agents/skills/impeccable` (regra do `CLAUDE.md`).
- Docs do Next consultados (`node_modules/next/dist/docs/01-app/02-guides`): `css-in-js.md`, `forms.md`.

## Estado atual do repositório (importante)
- As skills `styled-components-best-practices` e `code-best-practices` descrevem `src/lib/registry.tsx`, `src/styles/theme.ts` e `compiler.styledComponents`, **mas nada disso existe ainda**. `package.json` só tem `next`, `react` e `react-dom`.
- `src/app` tem só `layout.tsx`, `page.tsx`, `page.module.css` e `globals.css` (template do Create Next App, fonte Geist, tema claro/escuro).
- `.env.example` só define `NEXT_PUBLIC_APP_URL` (botão "Acessar o sistema").
- A Tech Spec inclui, portanto, a preparação da base (styled-components, registry, tema, fontes).

## Design
- **Tema:** único e escuro, como o guia de marca (`color-scheme: dark`). Sem alternância claro/escuro.
- **Página única** (`/`) com âncoras. Ordem das seções:
  1. Cabeçalho fixo: marca (símbolo das 3 vagas + "murel"), links de seção, botão "Acessar o sistema" (secundário/contorno) e "Ir para adesão" (amarelo, a partir de `md`).
  2. Hero (RF-02): "Seu pátio sob controle.", subtítulo com estacionamentos/valets/lava-rápidos, chamada para adesão, símbolo animado (carro estaciona; só com `prefers-reduced-motion: no-preference`).
  3. Diferencial: 3 números (0 impressoras, 0 dados pessoais pedidos, 2 formas de levar o ticket).
  4. Funcionalidades (RF-04): pátio, caixa, preços e convênios, mensalistas, notas fiscais; cada uma com texto curto e print.
  5. Como funciona (RF-05): 5 passos do ticket digital, com o QR Code.
  6. Perguntas frequentes (RF-06): acordeão.
  7. Contato (RF-07): formulário. Estados: inicial, com erro por campo, enviando, enviado, falha de envio.
  8. Rodapé (RF-08): e-mail de contato, "Acessar o sistema", "Ir para adesão".
- **Responsivo:** mobile primeiro (a partir de 360 px). Menu do cabeçalho vira linha de ações compacta no celular (links de seção ficam em um menu simples abaixo de `md`).
- **Componentes do design system reaproveitados:** nenhum (`src/components/ui` não existe). Os componentes base são criados aqui, com o vocabulário do guia (faixas tracejadas entre seções, chip mono, cartões `asfalto-2`).
- **Componentes novos** (todos em `src/components/`, ver Arquitetura).
- **Tokens de tema** (de `Marca_Murel.html`, em `src/styles/theme.ts`):
  - Cores: `asfalto #0E1729`, `asfalto2 #16223A`, `asfalto3 #22304B`, `faixaCinza #3A4C6B`, `bordaControle #6B80A4`, `amarelo #FFC20E`, `amareloEscuro #E0A800`, `giz #F4F1E8`, `nevoa #9AA3B5`, `ok #3CCB7F`, `alerta #FF5A5F`.
  - Fontes: Plus Jakarta Sans (400–800) e JetBrains Mono (500, 600), via `next/font/google`, expostas como `--font-plus-jakarta` e `--font-jetbrains` (mesmos nomes do GIPE).
  - Escalas de espaço, raios e breakpoints (`sm 480`, `md 768`, `lg 1024`) iguais às do tema do GIPE em `C:\murel\GIPE\src\styles\theme.ts`, para manter as duas pontas coerentes.
  - Contraste: texto `nevoa` sobre `asfalto` e botão amarelo com texto `asfalto` atendem AA (conferir na implementação). Amarelo nunca como cor de texto pequeno sobre fundo claro; foco visível com anel amarelo.

## Arquitetura da solução

### Dependências novas
- `styled-components` (^6) e `@types/styled-components` não é necessário (v6 traz tipos).
- `zod` para validar o formulário no servidor (mesma versão major do GIPE, ^4).
- Sem SDK de e-mail: o envio usa `fetch` na API HTTP do provedor (ver decisões).
- Testes: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom` (o GIPE já usa Vitest; o site não tem nenhum teste hoje).

### Arquivos
```
next.config.ts                      # compiler.styledComponents: true
src/
  app/
    layout.tsx                      # Server. next/font, metadata, registry + ThemeProvider
    page.tsx                        # Server. Compõe as seções
    globals.css                     # reset mínimo (substitui o template)
    opengraph-image.tsx             # (ou arquivo estático em public/) imagem de compartilhamento
    icon.svg                        # símbolo das 3 vagas
    contato/actions.ts              # "use server": enviarContato
  lib/
    registry.tsx                    # Client. StyledComponentsRegistry
    contato/schema.ts               # zod: contatoSchema + tipos
    contato/enviarEmail.ts          # server-only: chamada ao provedor
    contato/limitarEnvios.ts        # server-only: limite por IP
    config.ts                       # URLs do sistema (acesso e adesão), e-mail de contato
  styles/
    theme.ts                        # tema tipado
    styled.d.ts                     # DefaultTheme (module augmentation)
    GlobalStyle.ts                  # createGlobalStyle (foco, âncoras, reduced-motion)
  types/
    contato.ts                      # EstadoContato, CamposContato
  components/
    layout/Header/                  # Header.tsx (Client: menu mobile), Header.styles.ts
    layout/Footer/
    ui/Button/                      # <Button as="a"> variantes primary | ghost
    ui/Section/                     # Section + SectionHeader (eyebrow, h2, lede)
    brand/LogoMurel.tsx             # Server. SVG símbolo + palavra (do guia)
    brand/Simbolo.tsx               # SVG vagas + carro (com máscara dos vidros)
    home/Hero/
    home/Diferencial/
    home/Funcionalidades/           # dados em Funcionalidades.data.ts
    home/ComoFunciona/
    home/Faq/                       # Client? não: usa <details>/<summary> nativo
    home/Contato/                   # ContatoForm.tsx (Client), Contato.styles.ts
public/
  telas/*.webp                      # prints com dados fictícios
.env.example                        # novas variáveis
```
Estrutura de pasta por componente: `Componente.tsx`, `Componente.styles.ts`, `Componente.test.tsx` quando houver lógica.

### Tipos e contratos
```ts
// src/types/contato.ts
export type TipoNegocio = "estacionamento" | "valet" | "lava-rapido" | "mais-de-um";

export type CamposContato = {
  nome: string;
  patio: string;        // opcional
  tipo: TipoNegocio | ""; // opcional
  email: string;        // um dos dois obrigatório
  telefone: string;
  mensagem: string;
};

export type EstadoContato =
  | { status: "inicial" }
  | { status: "erro-validacao"; erros: Partial<Record<keyof CamposContato, string>>; valores: CamposContato }
  | { status: "falha-envio"; valores: CamposContato }
  | { status: "enviado" };
```
- `contatoSchema` (zod): `nome` 2–100; `mensagem` 10–2000; `email` válido (se informado); `telefone` 10–13 dígitos após limpar máscara (se informado); refinamento "ao menos um entre e-mail e telefone"; campos de texto com `trim`. Mensagens de erro em português, no tom da marca.
- `enviarContato(estado: EstadoContato, formData: FormData): Promise<EstadoContato>` — assinatura de `useActionState`.

### Server vs Client
| Peça | Tipo | Motivo |
|---|---|---|
| `layout.tsx`, `page.tsx`, seções estáticas (Hero, Diferencial, Funcionalidades, ComoFunciona, Faq, Footer) | Server | só conteúdo; os `styled.*` ficam em arquivos `.styles.ts` com `"use client"` conforme a skill, mas os componentes de composição ficam no servidor onde possível |
| `registry.tsx` | Client | `useServerInsertedHTML` |
| `Header` | Client | estado do menu no celular |
| `ContatoForm` | Client | `useActionState`, estado de envio, foco no primeiro erro |
| `actions.ts` | Server Action | valida, limita e envia |

Observação: como styled-components exige `"use client"` em todo arquivo que declara `styled.*`, as seções que importam estilos viram, na prática, Client Components. A skill pede manter o conteúdo no servidor e isolar o estilo; seguir isso e aceitar o custo (ver riscos).

### Fluxo do formulário
1. `ContatoForm` usa `useActionState(enviarContato, { status: "inicial" })` e `<form action={formAction}>`; botão desabilita com `useFormStatus` (evita clique duplo no cliente).
2. Na action: (a) honeypot — campo oculto `site`; se preenchido, responde "enviado" sem enviar nada; (b) limite por IP; (c) `contatoSchema.safeParse`; (d) `enviarEmail`; (e) retorna o novo estado.
3. Erros devolvem `valores` para repreencher os campos (RF-07: "sem perder o que digitou"); o form usa `defaultValue` vindo do estado.
4. Sucesso troca o formulário por mensagem de confirmação com `role="status"`; erros usam `aria-invalid`, `aria-describedby` e um resumo com `role="alert"` que recebe foco.

### Envio de e-mail
- `enviarEmail` faz `POST` para a API do provedor com `fetch`, `from` = remetente verificado do domínio `murel.com.br`, `to` = `process.env.CONTATO_DESTINO` (valor: `contato@murel.com.br`), `reply_to` = e-mail do interessado quando existir.
- Assunto: `Contato pelo site: {nome}` (+ pátio, se houver). Corpo em texto simples com todos os campos. Valores do usuário entram só como texto (sem HTML), evitando injeção.
- Remove quebras de linha de campos usados em cabeçalhos (`nome`, assunto) para evitar injeção de cabeçalho.
- Timeout de 10 s (`AbortSignal.timeout`). Qualquer resposta não 2xx vira `falha-envio` e é registrada com `console.error` sem dados pessoais (só status e id).
- Variáveis (`.env.example`, todas **server-only**, sem `NEXT_PUBLIC_`): `EMAIL_API_KEY`, `EMAIL_REMETENTE`, `CONTATO_DESTINO`.

### Configuração de URLs
- `NEXT_PUBLIC_APP_URL` já existe. Novo `src/lib/config.ts` exporta `urlAcesso = APP_URL` e `urlAdesao = APP_URL + "/adesao"` (rota pública de adesão confirmada no GIPE: `src/app/adesao`). A adesão herda a base do sistema; só `/adesao` é fixo no site.

### Telas do sistema
- Capturas feitas manualmente numa conta de teste do GIPE (nunca no repositório, nunca com dados reais), salvas em `public/telas/` em WebP (largura máx. 1280 px) e servidas com `next/image` (`sizes`, `priority` só na primeira, `alt` descritivo).
- Dados fictícios: placas, nomes, CNPJs e valores inventados; revisar cada imagem antes de commitar.
- **Credenciais do sistema não entram em código, docs nem variáveis do site.** O login citado em `docs/input.md` é só para a captura e deve ser trocado.

### SEO e compartilhamento
- `metadata` com `title`, `description`, `openGraph`, `twitter`, `metadataBase` (variável `NEXT_PUBLIC_SITE_URL`), `lang="pt-BR"`.
- Imagem de compartilhamento 1200×630 com a marca. `robots`/`sitemap` simples (`src/app/robots.ts`, `src/app/sitemap.ts`).
- Dados estruturados (`Organization`) via JSON-LD, conforme `json-ld.md` dos docs do Next.

### Acessibilidade
- Estrutura semântica (`header`, `main`, `section` com `aria-labelledby`, `footer`), um único `h1`.
- Link "Ir para o conteúdo" no topo; foco visível; âncoras com `scroll-margin-top` por causa do cabeçalho fixo.
- FAQ com `<details>/<summary>` nativos (teclado e leitor de tela sem JavaScript).
- Animações só sob `prefers-reduced-motion: no-preference`.

### Testes (Vitest + Testing Library)
- `contatoSchema`: obrigatórios, e-mail/telefone inválido, "ao menos um meio de retorno", limites, trim.
- `enviarContato`: sucesso (provedor mockado), validação, falha do provedor, honeypot, limite excedido, sem `EMAIL_API_KEY` configurada (falha controlada).
- `ContatoForm`: mantém valores após erro, mostra erro por campo, estado "enviando" desabilita o botão, mensagem de sucesso.
- `config.ts`: composição de URLs.
- Header/Hero: botões apontam para `urlAcesso` e `urlAdesao`.
- Verificação final: `npm run lint`, `npm run build` e checagem manual no navegador (celular e desktop), mais auditoria de acessibilidade automática.

## Decisões técnicas e trade-offs
1. **Server Action em vez de rota `/api`.** O formulário é único e interno ao site; a Server Action dá aprimoramento progressivo (funciona antes da hidratação) e menos código. Trade-off: menos fácil de reutilizar por outro cliente; aceitável.
2. **Provedor de e-mail: Resend via HTTP (recomendado) — a confirmar.** Plano gratuito cobre o volume esperado, API simples e sem SDK. Exige verificar o domínio `murel.com.br` (registros DNS de SPF/DKIM) para o remetente. Alternativas: SMTP do domínio (Nodemailer, exige servidor Node de longa duração e credenciais) ou outro provedor transacional. **Decisão em aberto para o dono do produto.**
3. **Antispam: honeypot + limite por IP, sem CAPTCHA.** CAPTCHA piora a acessibilidade e a conversão. Trade-off: menos proteção; se aparecer abuso, adicionar Cloudflare Turnstile.
4. **Limite por IP em memória** (mapa com janela de 10 min, máx. 5 envios). Em ambiente serverless cada instância tem seu mapa, então o limite é "melhor esforço". Aceitável para a v1; troca por Redis/KV se necessário.
5. **Validação com zod nos dois lados da regra:** HTML nativo (`required`, `type`) para feedback imediato e zod no servidor como fonte de verdade.
6. **Página única com âncoras**, sem rotas extras: menor superfície e foco na conversão. Política de privacidade fica para outra entrega (risco legal registrado no PRD).
7. **Medição de visitas e cliques:** não incluída. O PRD deixa as metas `[A DEFINIR]`; adicionar uma ferramenta (ex.: analytics sem cookies) é decisão separada, pois pode exigir aviso de privacidade.
8. **Sem biblioteca de componentes.** Poucos componentes de UI (Button, Section); criar apenas o que a página usa, sem abstração antecipada.
9. **Tema único escuro**, sem `prefers-color-scheme`: decisão do guia de marca. Remove o CSS de tema claro/escuro do template.
10. **Prints como imagens estáticas** e não iframes do sistema: nada de dados reais, carregamento leve e independência do sistema estar no ar.

## Riscos / pontos de atenção
- **Skills desatualizadas em relação ao repositório** (styled-components não instalado). Corrigir ao executar a Task de base; considerar atualizar o texto das skills.
- **Entrega de e-mail:** domínio sem SPF/DKIM faz mensagens caírem no spam ou serem recusadas. Teste ponta a ponta com a caixa `contato@murel.com.br` antes de publicar.
- **Segredo do provedor** só em variável de ambiente do servidor; nunca com prefixo `NEXT_PUBLIC_`. Não registrar dados pessoais em logs.
- **Styled-components e Server Components:** todo arquivo com `styled.*` vira bundle de cliente; a página pode ter mais JS do que o ideal. Mitigar mantendo `.styles.ts` isolados e medindo no `build`; não otimizar antes de medir.
- **FOUC / hidratação:** validar com `npm run build` e recarga no navegador (checklist da skill).
- **Fontes:** `next/font/google` baixa em build; sem rede o build falha. Já é o padrão do layout atual (Geist).
- **Imagens pesadas** dos prints prejudicam o celular: WebP, dimensões limitadas, `loading="lazy"` abaixo da dobra.
- **LGPD:** o formulário coleta dados pessoais. Incluir aviso curto e definir quem acessa a caixa de contato.
- **Dependência do endereço do sistema:** `NEXT_PUBLIC_APP_URL` precisa apontar para o ambiente de produção no deploy; se ficar com o valor de desenvolvimento, os botões quebram. Verificar no build/deploy.
- **Funcionalidades mostradas** devem ser as que existem hoje (Relatórios está vazio no sistema e não deve aparecer).

## Fora de escopo técnico
- Medição de visitas, cookies e banner de consentimento.
- Política de privacidade e termos.
- CAPTCHA, fila de reenvio de mensagens e painel de leads.
- Resposta automática ao interessado.
- Internacionalização e CMS (conteúdo fica no código).
- Alteração do sistema GIPE (apenas leitura e capturas de tela).
- Deploy/CI (definição de hospedagem e domínio do site).
