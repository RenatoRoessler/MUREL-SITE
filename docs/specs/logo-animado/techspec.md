# Tech Spec: Logo animado do Murel no site

## Referências
- PRD: ./prd.md
- Implementação de origem: GIPE, `src/components/ui/Logo/` (`carroTrajeto.ts`, `useAnimacaoDoCarro.ts`, `MurelSymbol.tsx`) e `docs/specs/logo-animado/design.md` (linha do tempo, geometria, luzes).

## Design
(O site ainda não tem a skill `claude-design`; as decisões visuais ficam aqui.)
- **Estados**: repouso (carro na vaga, sem luzes), animando, parada (some em 150 ms, volta na vaga em 150 ms).
- **Linha do tempo** (≈ 24 s): espera 1,2 s → [ré 1,5 · troca 0,35 · saída 1,7 · vazio 1,2 · entrada 3,4 · estacionado 6] → [ré · troca · saída · vazio · entrada] → assentamento 0,6 s → repouso. Igual ao sistema. Do repouso, recomeça depois de 2 minutos (`INTERVALO_REINICIO_MS`); parada pelo usuário, não recomeça.
- **Geometria** (unidades do `viewBox` 240×160): vaga (120, 95); rua y 168, logo abaixo da linha de baixo das vagas; curva de raio 60 com centro (180, 108). O carro deitado vai até y 186, então a faixa da rua tem 28 unidades (17,5% da altura do símbolo), reservada no layout.
- **Luzes**: facho (gradiente creme), freio (vermelho com halo), ré (branco com halo), cores da marca fixas, como o amarelo do carro já é no `Simbolo`. Abaixo de 40 px de altura, só facho e halos.
- **Recorte**: o carro só aparece dentro da área do logo (símbolo + palavra no cabeçalho; só o símbolo no Hero), estendida para baixo até a rua.
- **Componentes reaproveitados**: `brand/Simbolo` e `brand/LogoMurel`. Nenhum componente novo de UI; nenhum token novo no tema.

## Arquitetura da solução
Tudo em `src/components/brand/`. `Simbolo` e `LogoMurel` passam a ser Client Components (`"use client"`): têm hooks. `Hero` e `Footer` continuam Server Components e importam esses componentes de cliente normalmente.

1. **`carroTrajeto.ts`** (novo, função pura): cópia do módulo do GIPE (`poseNoTempo`, `terminou`, `DURACAO_TOTAL`, `POSE_REPOUSO`, `FASES`, `RUA_Y`, `VAGA_X`, `VAGA_Y`), com testes.
2. **`useAnimacaoDoCarro.ts`** (novo): o controlador do GIPE (laço de `requestAnimationFrame` escrevendo atributos por ref, delta limitado a 50 ms, parada com fade, preferência de movimento reduzido, sem recomeçar). Diferença: a escala não vem de uma altura em pixels conhecida (o Hero é dimensionado por CSS), e sim da medida do próprio `svg`: `unidadesPorPixel = 240 / svg.getBoundingClientRect().width`, e `inicioX = larguraDaArea × unidadesPorPixel + 40`. Recebe `area` e `simbolo` como refs.
3. **`Simbolo.tsx`**:
   - Props novas: `carro?: CarroRefs` e `svgRef` (uso interno do `LogoMurel`) e `animado` com o novo significado.
   - Com `carro`, o grupo do carro recebe o ref e desenha as luzes (`data-carro`, `data-luz`, ids por `useId`).
   - Com `animado` (uso sozinho, no Hero), o próprio `Simbolo` roda o hook; a área é o `svg`, com `viewBox="0 0 240 188"` (a faixa da rua entra no desenho e no layout) e `overflow="hidden"` para recortar o carro.
   - Sem `animado` e sem `carro`, o SVG fica idêntico ao de hoje (rodapé, Open Graph).
   - Sai o `Carro` com keyframes de `Simbolo.styles.ts`; o arquivo passa a ter a transição de opacidade e a regra de impressão do grupo do carro.
4. **`LogoMurel.tsx` / `LogoMurel.styles.ts`**:
   - Props novas: `animado?: boolean`, `pararAoInteragir?: boolean` (padrão `true`) e `ref?: Ref<LogoHandle>` (`{ parar(): boolean }`).
   - Com `animado`, roda o hook com `area` = o `span` do logo e passa `carro` ao `Simbolo`; o `span` ganha `overflow: hidden` e `padding-bottom` de 17,5% da altura do símbolo (a faixa da rua) e o símbolo fica por cima da palavra.
   - Com `pararAoInteragir`, para em `pointerenter` de mouse e em `pointerdown`.
5. **`layout/Header/Header.tsx`**: `<LogoMurel animado ref={logoRef} pararAoInteragir={false} />`; no link `Marca`, hover de mouse e foco param; `onClick` cancela o clique só se `parar()` devolver `true`.
6. **`home/Hero/Hero.tsx`**: continua `<Simbolo animado />` (agora com o novo ciclo). `Footer` não muda.

## Decisões técnicas e trade-offs
- **Copiar o módulo do GIPE em vez de compartilhar um pacote**: os dois projetos são repositórios separados, sem pacote comum hoje. A cópia é pequena e pura; se a marca ganhar mais peças compartilhadas, vale extrair um pacote.
- **Escala medida no `svg`**: o Hero usa largura em `clamp()`, então só a medida real dá a conversão de pixels para unidades.
- **`viewBox` estendido no Hero** em vez de wrapper: o símbolo sozinho não tem outro elemento para recortar, e a faixa da rua passa a ocupar layout naturalmente (altura automática).

## Riscos / pontos de atenção
- O Hero fica cerca de 17,5% mais alto no símbolo (a faixa da rua). Conferir o encaixe ao lado do texto no computador e abaixo dele no celular.
- O cabeçalho do site tem `min-height: 44px` no link; o logo de 24 px com a faixa (5 px) cabe sem mudar a altura da barra.

## Fora de escopo técnico
- Pacote compartilhado entre GIPE e site.
- Animar rodapé, Open Graph ou favicon.
