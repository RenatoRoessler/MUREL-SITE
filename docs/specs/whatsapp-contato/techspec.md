# Tech Spec: Contato por WhatsApp

## Referências
- PRD: ./prd.md
- Design: seção "Design" abaixo (a skill `claude-design` ainda não existe neste projeto; as decisões visuais ficam aqui, apoiadas nos tokens de `src/styles/theme.ts`).

## Design
- **Telas/estados:**
  - Botão flutuante (`BotaoWhatsapp`): fixo em `bottom/right` com 16px de folga (24px a partir de `md`), em todas as seções. Pílula com rótulo "Estamos online!" + círculo com o ícone do WhatsApp, como na referência. Estados: repouso, hover (escurece levemente), foco visível (anel `giz` com offset), ativo.
  - Em telas estreitas (< `sm`, 480px) o rótulo continua visível, pois cabe em 360px (rótulo ~140px + ícone 56px). Se o rótulo se mostrar largo demais no teste de 360px, esconder o rótulo abaixo de `sm` e manter só o ícone com `aria-label`. Decisão final no teste visual.
  - Seção de contato: acima do formulário, um bloco curto "Prefere falar agora?" com o botão "Chamar no WhatsApp" (variante `whatsapp` do `Button`), separado do formulário por um divisor "ou deixe sua mensagem abaixo".
  - Rodapé: novo link "WhatsApp: (19) 99221-5384" na coluna de contato, ao lado do e-mail.
- **Componentes do design system reaproveitados:** `Button` (ganha a variante `whatsapp`), `Section`, tokens de `theme`.
- **Componentes novos:**
  - `src/components/ui/IconeWhatsapp/IconeWhatsapp.tsx`: SVG inline do glifo do WhatsApp, `aria-hidden`, `fill="currentColor"`.
  - `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.tsx` + `BotaoWhatsapp.styles.ts`: botão flutuante.
- **Tokens de tema criados:** `colors.whatsapp: "#25D366"` e `colors.whatsappEscuro: "#1EBE5B"` (hover). Os tokens do WhatsApp ficam nomeados à parte, por serem cor de terceiro e não da paleta Murel.
- **Contraste (RF7 / WCAG AA):** a referência usa texto branco sobre verde, que dá cerca de 2:1 e reprova AA. O rótulo e o ícone usam `asfalto` (#0E1729) sobre `#25D366`, cerca de 8:1. O verde e o glifo do WhatsApp se mantêm; só a cor do texto muda em relação à referência. Isso responde ao [A DEFINIR] do RF7 do PRD: verde do WhatsApp mantido.
- **Movimento:** sem animação de pulso. Só transição de cor no hover, já coberta pelo padrão do `Button`. Nada a tratar para `prefers-reduced-motion`.

## Arquitetura da solução

### Arquivos
| Arquivo | Mudança | Tipo |
|---------|---------|------|
| `src/lib/config.ts` | Adiciona `numeroWhatsapp` (`"5519992215384"`), `numeroWhatsappExibicao` (`"(19) 99221-5384"`), `mensagemWhatsapp` e `urlWhatsapp` | Módulo compartilhado |
| `src/lib/config.test.ts` | Testes dos novos exports | Teste |
| `src/styles/theme.ts` | Tokens `whatsapp` e `whatsappEscuro` | Tema |
| `src/components/ui/Button/Button.styles.ts` | Variante `whatsapp` em `VarianteBotao` | Client (`"use client"` já presente) |
| `src/components/ui/Button/Button.test.tsx` | Caso da variante nova | Teste |
| `src/components/ui/IconeWhatsapp/IconeWhatsapp.tsx` | SVG do ícone | Server Component (sem estado) |
| `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.tsx` | Link flutuante | Server Component |
| `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.styles.ts` | Estilos (`"use client"` por causa do styled-components, como os demais `.styles.ts`) | Client |
| `src/components/layout/BotaoWhatsapp/BotaoWhatsapp.test.tsx` | Testes | Teste |
| `src/components/home/Contato/Contato.tsx` | Renderiza o bloco "Prefere falar agora?" antes do formulário | Server Component |
| `src/components/home/Contato/Contato.styles.ts` | Estilos do bloco e do divisor | Client |
| `src/components/layout/Footer/Footer.tsx` | Link do WhatsApp | Server Component |
| `src/components/layout/Footer/Footer.test.tsx` | Teste do link | Teste |
| `src/app/page.tsx` | Monta `<BotaoWhatsapp />` depois do `<Footer />` | Server Component |

### Dados e tipos
Não há tipos novos em `src/types`. O contrato é de configuração, em `src/lib/config.ts`:

```ts
export const numeroWhatsapp = "5519992215384"; // formato internacional, só dígitos
export const numeroWhatsappExibicao = "(19) 99221-5384";
export const mensagemWhatsapp =
  "Olá! Vim pelo site da Murel e quero conhecer o sistema."; // [A DEFINIR no PRD: texto final]
export const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;
```

`wa.me` abre o aplicativo no celular e o WhatsApp Web no desktop (RF2), sem depender de script.

### Link
- `<a href={urlWhatsapp} target="_blank" rel="noopener noreferrer">`, com nome acessível "Falar com a Murel pelo WhatsApp (abre em nova aba)". O rótulo visível "Estamos online!" fica dentro do nome acessível, o que atende WCAG 2.5.3 (rótulo no nome).
- O mesmo `urlWhatsapp` é usado no botão flutuante, no `Button` da seção de contato e no rodapé (critério do PRD: número num único ponto de configuração).

### Posicionamento (RF6)
- `position: fixed; z-index` abaixo do cabeçalho se houver sobreposição com menus; hoje não há menu aberto, então um valor simples basta.
- O `Base` do rodapé já tem `padding-block: 40px 64px` embaixo, então o botão não cobre o último texto. Validar em 360px com o formulário e o rodapé na tela. Se cobrir o botão "Enviar", adicionar `padding-bottom` extra ao `Faixa` da seção de contato em telas pequenas.
- `bottom: calc(16px + env(safe-area-inset-bottom))` para não colidir com a barra de início do iPhone.

### Server vs. Client
Todas as peças novas são Server Components. Nenhuma tem estado ou evento: são links. Os arquivos `.styles.ts` seguem o padrão do projeto (`"use client"` no topo). A página já usa `StyledComponentsRegistry` para SSR de CSS.

## Decisões técnicas e trade-offs
- **Link `wa.me` em vez da API do WhatsApp Business:** zero dependência e zero custo. Não há controle de fila ou métricas de conversa, que o PRD deixou fora de escopo.
- **Rótulo "Estamos online!" fixo:** segue a referência. Como não há status real, o risco de promessa vazia está no PRD. Para trocar o texto depois, basta uma constante; a spec propõe `rotuloWhatsapp` em `config.ts` para isso.
- **Texto escuro sobre o verde, em vez de branco:** foge da referência, mas é o que atende AA. Mantém a identidade do WhatsApp (verde + glifo).
- **Ícone SVG inline em vez de biblioteca de ícones:** é um único glifo, e o projeto não tem biblioteca de ícones hoje. Evita dependência e requisição extra.
- **Estender `Button` com a variante `whatsapp` em vez de criar outro componente para o bloco de contato:** reaproveita tamanho, foco e transições. O botão flutuante é um componente próprio porque a forma (pílula + círculo) e o posicionamento fixo são distintos.
- **Sem medição de cliques agora:** o PRD deixa a ferramenta para a Tech Spec, e o site não tem registro de visitas. Fica fora; a métrica continua [A DEFINIR] no PRD.

## Riscos / pontos de atenção
- **Sobreposição em 360px:** o botão fixo pode cobrir "Enviar mensagem" ou texto do rodapé. Testar com o formulário em foco e com o teclado virtual aberto.
- **Foco e leitores de tela:** o botão vem depois do rodapé no DOM, então é o último item da tabulação. Aceitável; não deve virar armadilha de foco.
- **Pop-up bloqueado:** `target="_blank"` em link direto não é bloqueado, por ser ação do usuário.
- **Segurança:** `rel="noopener noreferrer"` obrigatório em todos os links externos. O texto do `?text=` passa por `encodeURIComponent`.
- **Teste de `config`:** os testes atuais recarregam o módulo com `vi.resetModules`; manter esse padrão para os novos exports.
- **Content Security Policy / bloqueadores:** `wa.me` redireciona a `api.whatsapp.com`; não há script externo carregado, então não há impacto de CSP.
- **Next.js:** `AGENTS.md` avisa que esta versão do Next tem mudanças. Nenhuma API nova de rota é usada aqui (só componentes e CSS), mas ler `node_modules/next/dist/docs/` antes de implementar, caso algo em `page.tsx` ou `layout.tsx` precise mudar.

## Fora de escopo técnico
- Registro de cliques e eventos de analytics.
- Status real de presença (online/offline) e horário de atendimento dinâmico.
- Integração com a API do WhatsApp Business, chatbot e resposta automática.
- Mudanças no formulário de contato, na action `enviarContato` e no envio de e-mail.
- Atualização do PRD `site-institucional`, que ainda lista WhatsApp como fora de escopo (ajuste de documentação, não de código).
