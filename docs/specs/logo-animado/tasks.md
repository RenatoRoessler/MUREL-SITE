# Tasks: Logo animado do Murel no site

Referências: ./prd.md, ./techspec.md, ./prototipo.html

- [x] T1 — Trajeto do carro (função pura), copiado do GIPE, com testes.
  - Arquivos: `src/components/brand/carroTrajeto.ts`, `src/components/brand/carroTrajeto.test.ts`
  - Pronto quando: os testes passam (repouso no início e no fim, dois ciclos, rua logo abaixo das vagas, vazio invisível, freio e ré nas fases certas).

- [x] T2 — Hook `useAnimacaoDoCarro` com escala medida no `svg`.
  - Arquivos: `src/components/brand/useAnimacaoDoCarro.ts`
  - Pronto quando: tipa e é coberto pelos testes da T3.

- [x] T3 — `Simbolo` e `LogoMurel` animados: luzes, refs, `viewBox` estendido no uso sozinho, faixa da rua no logo, parada por interação e pelo `ref`, regra de impressão; sai a animação antiga.
  - Arquivos: `src/components/brand/Simbolo.tsx`, `src/components/brand/Simbolo.styles.ts`, `src/components/brand/LogoMurel.tsx`, `src/components/brand/LogoMurel.styles.ts`, `src/components/brand/Simbolo.test.tsx`
  - Pronto quando: sem animação o SVG é o de hoje; com animação agenda quadros, não agenda com movimento reduzido, para pelo `ref` e pelo toque e não recomeça.

- [x] T4 — Cabeçalho com o logo animado e o link que só para no primeiro clique.
  - Arquivos: `src/components/layout/Header/Header.tsx`, `src/components/layout/Header/Header.test.tsx`
  - Pronto quando: clique durante a animação não segue o link e para; o seguinte segue; foco e hover de mouse param.

- [x] T5 — Verificação: `npm run lint`, `npm test`, `npm run build` e conferência no navegador (cabeçalho e Hero animam e terminam estacionados; hover para; rodapé estático; carro sem cobrir texto).
  - Arquivos: —
  - Pronto quando: tudo passa e o resultado fica registrado aqui.

  - Resultado (2026-11-18):
    - `npm run lint`: 0 erros (94 avisos já existentes; nenhum nos arquivos alterados). `npm test`: 35 arquivos, 206 testes passando.
    - `npm run build`: passa. Às vezes para com `SecurityFatalError` (Next.js 16.4.3 com vulnerabilidade conhecida) depois de compilar; repetir passa. Não é desta mudança.
    - Navegador, celular (390×844) e computador (1280×800): cabeçalho e Hero fazem o ciclo (ré, rua com facho e freio, entrada pela direita) e terminam com o carro na vaga; hover no Hero para só o carro dele; o rodapé fica estático (só dois carros animados na página); o carro do Hero passa na faixa reservada abaixo das vagas, sem cobrir texto.
    - Não conferido no navegador: impressão e "menos movimento" (cobertos por regra CSS e por teste unitário, respectivamente).
