@AGENTS.md

# Convenções do projeto Murel Site

Estas regras valem sempre, em qualquer interação neste repositório.

- **Stack**: Next.js (App Router) + TypeScript + styled-components. Seguir as skills `code-best-practices` e `styled-components-best-practices` para qualquer código novo ou revisado.
- **Layouts**: ao criar ou redesenhar qualquer tela/layout (não pequenos ajustes pontuais), usar a skill `.agents/skills/impeccable` para conduzir a decisão visual.
- **Features novas**: seguir o fluxo spec-driven `criar-prd → claude-design → criar-techspec → criar-tasks → executar-task`, com os artefatos em `docs/specs/<slug>/`. A skill `claude-design` ainda não existe neste projeto; criá-la quando o design system do site estiver definido.
- **Commits**: usar a skill `commit` (Conventional Commits, separando por tipo/assunto) sempre que for pedido para commitar.
- **Antes de finalizar qualquer mudança de código**: rodar `npm run lint` e, se a mudança for relevante, `npm run build`.
