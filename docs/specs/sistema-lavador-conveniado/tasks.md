# Tasks: Sistema por perfil, com Lavador, Conveniado e as novidades do GIPE

Referências: ./prd.md, ./techspec.md

Regras para todas as tasks: seguir as skills `code-best-practices` e `styled-components-best-practices`; consultar `node_modules/next/dist/docs/` antes de mexer em `next/image` e em componentes de cliente (AGENTS.md); rodar `npm run lint` e `npm test` ao final de cada task. **Nenhuma credencial** (CPF, senha, token) entra em arquivo, script, captura, commit ou mensagem. Usar variáveis de ambiente só na sessão de captura.

- [x] T1 — Apresentar os 3 modelos do seletor de cinco perfis e registrar a escolha
  - Arquivos: `docs/specs/sistema-lavador-conveniado/layouts.html` (protótipo estático) e, após a escolha, a seção "Design" de `techspec.md`
  - Pronto quando: os modelos A (abas em duas linhas), B (trilho rolável) e C (dois grupos) foram mostrados em 360 px e em desktop, o usuário escolheu um e a escolha está registrada no Tech Spec. Nada de T4 começa antes disso (RF17).

- [x] T2 — Preparar o ambiente de captura e conferir as contas de teste
  - Arquivos: nenhum no repositório
  - Pronto quando: foi feito login com cada conta de teste (Lavador, Conveniado e a do Gestor/Operador) usando variáveis de ambiente da sessão; está anotado, por perfil, o que o menu mostra e que dados existem; foi confirmado com o usuário se há dados fictícios suficientes (veículos no pátio, serviços na fila, carimbos) ou se é preciso criar. Nenhuma credencial foi gravada em arquivo.
  - Andamento (20/11/2026, sistema v1.0.486): as três contas entram. **Lavador:** abre na Fila de serviços (única aba do menu), com as abas Na fila, Em andamento e Pronto. **Conveniado:** abre em Carimbar ticket e tem a aba Pátio; entra um tour de 4 passos no primeiro acesso. **Gestor:** menu com Pátio, Caixa, Visão Geral, Conferência de pátio, Financeiro, Faturas, Notas Fiscais, Minha Empresa, Configurações, Gestão de Preços, Catálogo de serviços, Quadros de Chaves, Mensalistas, Gestão de Usuários e Empresas conveniadas. Dados de teste criados com autorização do usuário na "empresa teste": 1 serviço Lavagem simples e 1 Lavagem Completa (Na fila) e 1 ticket carimbado pela conta Conveniado. Atenção na revisão das capturas: o campo "Registrado por" mostra o nome real do usuário e o comprovante mostra CNPJ, endereço e telefone da empresa; ocultar ou trocar antes de publicar.

- [x] T3 — Capturar e revisar as telas do Lavador e do Conveniado
  - Arquivos: `src/assets/telas/lavador/*.webp`, `src/assets/telas/conveniado/*.webp`
  - Pronto quando: as telas de cada perfil foram capturadas no celular (retrato) com a mesma versão do sistema, convertidas para `.webp` com nome descritivo e sem EXIF, e revisadas uma a uma: nenhum nome, CPF, CNPJ, placa, telefone ou e-mail real. O que não funcionar na conta ficou de fora, e há uma lista do que foi visto em cada tela para escrever as explicações.

  - Resultado (20/11/2026, v1.0.486), 4 telas em 720x1558, `.webp`: `lavador/fila-na-fila`, `lavador/fila-pronto`, `conveniado/ticket-carimbado`, `conveniado/patio`. Revisadas: só placas e nomes de teste ("empresa teste", "usuario conveniado 1"); nenhum dado pessoal real. Ficou de fora a aba Em andamento do Lavador, porque o serviço de teste mostra "passou 63 h da previsão", e a tela inicial do carimbo, porque a câmera aparece bloqueada no navegador de captura.
  - Visto em cada tela (base das explicações): **Fila (Na fila):** contadores no topo, busca por placa ou prisma, abas Na fila, Em andamento e Pronto, cartão com placa, modelo, cor, categoria, serviço, hora de entrada, "na fila há X min", "leva ~30 min" e botão Iniciar. **Fila (Pronto):** "pronto às", "aguardando retirada há X", prisma e botão Voltar para em andamento. Em andamento (visto, não capturado): início, barra até a previsão, "termina ~", aviso de passou da previsão e botão Marcar como pronto. **Ticket carimbado:** selo Convênio, placa, modelo e cor, estacionamento, categoria, entrada, tabela aplicada, hora do carimbo e Carimbar outro ticket. A tela de carimbo lê o QR Code pela câmera ou aceita o token do ticket digitado. **Pátio da conveniada:** total de veículos, busca por placa, Atualizar, e por veículo a permanência, estacionamento, selo Convênio, faixa de tempo, entrada, carimbo com quem carimbou e tabela.

- [x] T4 — Recapturar e revisar as telas do Operador, do Cliente e do Gestor
  - Arquivos: `src/assets/telas/operador/*.webp`, `src/assets/telas/cliente/*.webp`, `src/assets/telas/gestor/*.webp`
  - Pronto quando: a Visão Geral atual, o ticket de entrada, a saída com valor e troco e o pátio do Operador foram recapturados na mesma versão do sistema; as telas dos menus do Gestor que faltam (Serviços/catálogo, Faturas, Configurações e outros que existirem com funcionalidade) foram capturadas em desktop; a consulta do ticket pela placa foi capturada para o Cliente, se for pública. Todas revisadas sem dado real.

  - Resultado (20/11/2026, v1.0.486): **Operador** (7 telas, 720x1558): pátio, entrada preenchida, entrada registrada, ticket com serviço, localizar veículo, confirmar saída com troco e recibo da saída. **Cliente:** comprovante público com a próxima faixa de valor. **Gestor** (1280x800): Visão Geral, Pátio, Caixa, Gestão de preços, Mensalistas, Empresas conveniadas, Financeiro e Conferência recapturados; entraram Catálogo de serviços, Faturas e Configurações; Quadros de chaves manteve a imagem antiga, porque hoje a tela está vazia na conta de teste. Ficou de fora a consulta do ticket pela placa (precisa do código da empresa).
  - Dados criados no sistema, com autorização: 1 entrada fictícia (Corolla, ainda no pátio) e 1 saída em dinheiro de R$ 845,00 de um veículo de teste, além dos serviços e do carimbo da T2.
  - Revisão: na tela capturada foram trocados por dados fictícios o nome e o e-mail do usuário, o CNPJ, o telefone e o endereço da empresa e, no catálogo, as descrições "teste" dos serviços (Higienização e Lavagem). Nenhuma imagem mostra e-mail, CPF ou telefone reais; só sobra a letra do avatar.

- [x] T5 — Tipos e dados dos cinco perfis
  - Arquivos: `src/types/sistema.ts`, `src/components/home/Sistema/Sistema.data.ts`
  - Pronto quando: `IdPerfil` tem `cliente | operador | lavador | conveniado | gestor`; `perfilInicial` é `operador`; os perfis estão na ordem Cliente, Operador, Lavador, Conveniado, Gestor, cada um com rótulo, resumo e telas (id, imagem, alt, título e explicação só do que a captura mostra); o cabeçalho do arquivo registra a data e a versão do sistema das capturas; `tsc` sem erros.

- [x] T6 — Testes dos dados e da seção
  - Arquivos: `src/components/home/Sistema/Sistema.data.test.ts`, `Sistema.test.tsx`, `SeletorPerfil.test.tsx`, `CarrosselTelas.test.tsx` e `TelaPerfil.test.tsx` se algo quebrar
  - Pronto quando: os testes cobrem a ordem dos cinco perfis, o padrão Operador, o número de telas por perfil, os campos obrigatórios, ids e alts sem repetição, ausência de emoji e de padrões de dado pessoal (CPF, CNPJ, e-mail, telefone) nos textos, e a navegação por teclado (setas, Home e End) nas cinco abas, com o painel certo para Lavador e Conveniado.

- [x] T7 — Estilo do seletor para cinco abas (modelo escolhido na T1)
  - Arquivos: `src/components/home/Sistema/SeletorPerfil.styles.ts` (e `SeletorPerfil.tsx` só se o modelo exigir)
  - Pronto quando: em 320 px e 360 px não há rolagem horizontal da página nem aba cortada, as abas mantêm 44 px de altura mínima, a aba ativa é clara, e em `sm` ou mais o seletor segue como hoje (ou como o modelo escolhido define).

- [x] T8 — "Tudo isso incluso no plano" com as novidades
  - Arquivos: `src/components/home/Planos/Planos.data.ts`, `Planos.data.test.ts`
  - Pronto quando: a lista cita Serviços para lava-rápido, faturas das conveniadas, pátio da conveniada, perfil Lavador em "Equipe e permissões", configurações da empresa e o tour do primeiro acesso, cada um conferido na T2 ou na T3; o comentário do arquivo traz a versão conferida; o teste usa o total novo e continua barrando relatórios, NFS-e e permissões por módulo.

- [x] T9 — FAQ e textos coerentes
  - Arquivos: `src/components/home/Faq/Faq.data.ts`, `Faq.test.tsx`, e o `lede` da seção em `src/components/home/Sistema/Sistema.tsx`, se precisar
  - Pronto quando: a resposta sobre os tipos de negócio menciona a fila de serviços do lava-rápido e as conveniadas, sem prometer o que o sistema não faz; os testes acompanham; o tom segue o guia de marca (sem emoji nem exagero).

- [x] T10 — Verificação final
  - Arquivos: nenhum novo (ajustes pontuais)
  - Pronto quando: `npm run lint`, `npm test` e `npm run build` passam; no navegador, a seção abre no Operador, os cinco perfis alternam por mouse, toque e teclado, as molduras estão corretas (celular e notebook), a seção funciona em 320 px, 360 px e desktop, o texto alternativo e o contraste atendem WCAG 2.2 AA, e o peso da página no celular não piorou de forma relevante. Confirmar que nenhum arquivo do repositório contém as credenciais; pedir ao usuário para trocar as senhas das contas de teste e limpar o `docs/input.md`.
  - Andamento: lint, tsc, 225 testes e build passam. Conferido no navegador (reduced motion): 320, 360 e 1280 px sem rolagem horizontal, cinco abas de 44 px, duas linhas no celular, abre no Operador. Falta fechar a T4 e conferir de novo.
  - Resultado: lint, `tsc`, 225 testes e build passam. No navegador, em 320, 360 e 1280 px não há rolagem horizontal, os cinco perfis alternam e as imagens carregam. Nenhuma credencial aparece nos arquivos do repositório fora do `docs/input.md` (conferido por busca). As imagens somam cerca de 1 MB e carregam sob demanda. **Pendente com o usuário:** trocar as senhas das contas de teste e limpar o `docs/input.md`.
