# Tech Spec: Sistema por perfil, com Lavador, Conveniado e as novidades do GIPE

## Referências
- PRD: ./prd.md
- Spec anterior (base desta): `docs/specs/sistema-por-perfil/` (PRD, Tech Spec e tasks)
- Design: seção "Design" abaixo. A skill `claude-design` ainda não existe; o layout do seletor de cinco perfis precisa de escolha do usuário (RF17 do PRD) e fica como a primeira task.

## Design

### Telas e estados
- Seção "Tudo o que o pátio precisa, no mesmo sistema" com seletor de perfis em abas (padrão WAI-ARIA já usado), um painel por perfil e, dentro dele, o carrossel de telas com moldura de aparelho. Nada disso muda de estrutura.
- Perfis, na ordem proposta: **Cliente, Operador, Lavador, Conveniado, Gestor** (de quem usa no celular para quem administra). Abre em **Operador** (RF2).
- Moldura: celular para telas em retrato (Cliente, Operador, Lavador, Conveniado, se as capturas forem de celular), notebook para telas em paisagem (Gestor). A moldura já é escolhida pela orientação da imagem.

### Seletor com cinco abas (decisão do usuário, RF17)
**Escolhido: modelo A (abas em duas linhas no celular), em 20/11/2026.** Protótipos em `layouts.html` e `layouts.png`.

Com 5 abas, "Conveniado" não cabe numa linha de 328 px (celular de 360 px). Três modelos a apresentar:

| Modelo | Como funciona | Prós / contras |
|---|---|---|
| A. Abas em duas linhas | As abas quebram de linha no celular (3 + 2) e ficam numa linha de `sm` para cima | Tudo visível, sem gesto. Duas linhas de abas ocupam altura. **Recomendado** |
| B. Trilho com rolagem horizontal | Uma linha rolável, com a aba ativa sempre trazida para a vista | Uma linha só. Perfis fora da vista ficam escondidos (descoberta pior) |
| C. Dois grupos | "No pátio" (Cliente, Operador, Lavador, Conveniado) e "Administração" (Gestor), em linhas com rótulo | Explica a divisão. Mais UI para uma escolha simples |

Cada modelo é mostrado como protótipo estático (HTML em `docs/specs/sistema-lavador-conveniado/`), como foi feito em `sistema-por-perfil` (`layouts.png`).

### Componentes do design system reaproveitados
`Section`, `Button`, `TelaSistema` (molduras), `CarrosselTelas` (rolagem com encaixe, pontos e setas), `SeletorPerfil` (abas), `Revelar` (revelação ao rolar, da spec `animacoes-site`).

### Componentes novos
Nenhum. A mudança é de dados, imagens e estilo do seletor.

### Tokens de tema
Sem novos tokens.

## Arquitetura da solução

### Tipos (`src/types/sistema.ts`)
- `IdPerfil` passa a `"cliente" | "operador" | "lavador" | "conveniado" | "gestor"`. O compilador aponta todo uso que precise de ajuste (ex.: `Record<IdPerfil, ...>`).

### Dados (`src/components/home/Sistema/Sistema.data.ts`)
- `perfilInicial = "operador"`.
- Dois perfis novos com `rotulo`, `resumo` e `telas`:
  - **Lavador:** fila de serviços por status, detalhe do serviço e mudança de status.
  - **Conveniado:** carimbo do ticket e pátio da conveniada.
  O conjunto final de telas de cada um é o que a conta de teste mostrar de fato (RF4 e RF6); nada é descrito sem ter sido visto.
- **Gestor:** a tela `dashboard` é substituída pela Visão Geral atual; entram telas dos menus que faltam (Serviços/catálogo, Faturas, Configurações e outros que a captura mostrar).
- **Operador:** substituir as telas que mudaram (ticket de entrada, saída com valor e troco, pátio) e acrescentar serviços no ticket, se o perfil os vê.
- **Cliente:** acrescentar a consulta do ticket pela placa, se for tela pública acessível sem login.
- Cada tela continua com `id`, `imagem`, `alt`, `titulo` e `explicacao`, e o cabeçalho do arquivo registra a data e a versão do sistema das capturas.

### Imagens (`src/assets/telas/<perfil>/*.webp`)
- Novas pastas `lavador/` e `conveniado/`; imagens novas ou trocadas em `operador/`, `gestor/` e `cliente/`.
- Mesmo formato das atuais (`.webp`), nomes descritivos, sem EXIF nem nome de origem, e largura dimensionada para o `sizes` do `TelaPerfil` (sem imagem maior que o necessário no celular).
- **Captura:** logar nas contas de teste fornecidas e capturar com dados fictícios, em celular (retrato) para os perfis de celular e em desktop (paisagem) para o Gestor, na mesma versão do sistema. Credenciais ficam só em variáveis de ambiente da sessão e nunca entram em arquivo, script versionado, captura ou commit. A captura em si é feita fora do repositório.

### Seletor (`SeletorPerfil.styles.ts`, conforme o modelo escolhido)
- Hoje: `flex: 1 1 0` abaixo de `sm`, que espreme cinco abas. Modelo A muda para `flex: 1 1 auto` com `flex-wrap` (já existe) e `min-width` mínima, para quebrar em duas linhas. Modelos B e C pedem mais CSS e, no B, um efeito que traz a aba ativa para a vista.
- `SeletorPerfil.tsx` não muda de lógica (setas, Home e End já cobrem N abas).

### Plano, FAQ e textos
- `Planos.data.ts` (`areasDoSistema`): acrescentar as áreas novas conferidas (Serviços para lava-rápido, faturas das conveniadas, pátio da conveniada, perfil Lavador em "Equipe e permissões", configurações da empresa, tour do primeiro acesso) e atualizar o comentário com a versão conferida. `Planos.data.test.ts` troca o "13 áreas" pelo total novo e mantém a trava contra o que o sistema ainda não tem.
- `Faq.data.ts`: ajustar a resposta de "Que tipo de negócio a Murel atende?" e, se couber, uma pergunta sobre lava-rápido. `Faq.test.tsx` acompanha.
- Texto `lede` da seção e o `resumo` de cada perfil seguem o tom da marca.

### Server vs Client
- Tudo continua como está: `Sistema`, `TelaPerfil` e `Section` são Server Components; `SeletorPerfil` e `CarrosselTelas` são Client (estado e rolagem). Nenhum componente novo.

### Testes
- `Sistema.data.test.ts`: ordem dos cinco perfis, `perfilInicial` igual a `operador`, número de telas por perfil, imagem/alt/título/explicação preenchidos, sem id nem alt repetido por perfil, sem emoji, sem dado pessoal real (padrões de CPF, CNPJ, e-mail e telefone nos textos).
- `Sistema.test.tsx` e `SeletorPerfil.test.tsx`: abre no Operador, cinco abas, navegação por setas, Home e End, e painel certo para Lavador e Conveniado.
- `Planos.data.test.ts` e `Faq.test.tsx`: total novo e textos.

## Decisões e trade-offs
- **Dados, não código novo:** a spec anterior já deixou a seção guiada por dados. Adicionar perfis é adicionar entradas, o que mantém o risco baixo.
- **Operador como padrão:** é o perfil que mostra o fluxo central (entrada e saída), o que o visitante mais precisa ver primeiro. Gestor, que era o padrão, vira a última aba.
- **Modelo A recomendado para o seletor:** não esconde perfis e dispensa gestos. Quem escolhe, porém, é o usuário.
- **Recapturar tudo na mesma versão do sistema:** evita a mistura de telas de versões diferentes (v1.0.356 e a atual) na mesma seção.
- **Perfis Gerente, Caixa, Manobrista e Financeiro continuam fora:** o Operador e o Gestor os representam; separar multiplicaria telas sem ganho claro.
- **Sem componente novo e sem dependência nova.**

## Riscos / pontos de atenção
- **Credenciais:** as contas de teste aparecem em texto em `docs/input.md`, versionado. Não podem ir para nenhum artefato novo, e as senhas devem ser trocadas depois das capturas. Revisar cada captura antes de publicar (nome, CPF, placa, telefone, e-mail, nome de empresa real).
- **Telas dos novos perfis não verificadas:** o relatório do GIPE diz que só o Administrador foi testado com login real. Pode haver tela vazia, quebrada ou com menu diferente do esperado para Lavador e Conveniado; o que não funcionar não entra.
- **Dados fictícios nas contas:** a fila do Lavador e o pátio da Conveniada só ficam boas de mostrar com veículos e serviços cadastrados. Pode ser necessário criar dados de teste no sistema, o que muda o ambiente de quem fornece as contas.
- **Peso da página:** mais telas, mais imagens. Manter `.webp`, tamanhos corretos e carregamento sob demanda do que está fora da vista.
- **Altura do seletor no celular:** o modelo A usa duas linhas de abas; conferir em 360 px e em 320 px.
- **Texto desatualizado:** a explicação de cada tela descreve só o que aparece na captura; o sistema muda rápido (v1.0.356 para v1.0.486 em duas semanas). Registrar a versão de cada captura.
- **Next.js:** consultar `node_modules/next/dist/docs/` antes de mexer em `next/image` e nos componentes de cliente, como pede o `AGENTS.md`.

## Fora de escopo técnico
- Novas rotas, páginas ou componentes.
- Perfis Gerente, Caixa, Manobrista e Financeiro como abas.
- Relatórios, permissões por módulo e NFS-e (o GIPE ainda não tem).
- Automatizar a captura de telas no repositório.
- Medição de cliques e de abertura de perfis (não há analytics no código).
