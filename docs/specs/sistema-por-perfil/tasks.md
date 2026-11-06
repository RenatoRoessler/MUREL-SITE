# Tasks: Sistema por Perfil de Usuário

Referências: ./prd.md, ./techspec.md

Regras para todas as tasks: nenhuma credencial entra em código, docs ou commit; nenhuma imagem com dado real é publicada; ao final de cada task com código, rodar `npm run lint` e os testes da pasta alterada.

- [x] T1 — Revisar as imagens de origem do Cliente (1) e do Operador (7) e registrar o que precisa ser ocultado ou recapturado
  - Arquivos: `Documentos/gipe/cliente`, `Documentos/gipe/operador` (fora do repo); anotações na própria task
  - Pronto quando: cada imagem foi vista uma a uma, com lista do que mostra, dado real encontrado (placa, nome, CPF/CNPJ, telefone, e-mail) e decisão (usar, ocultar ou recapturar)
  - Resultado da revisão (feita em 06/11/2026):
    - Vale para todas as 8 imagens: são capturas de celular com barra de status (hora, notificações do Slack, bateria, 5G) e barra de navegação do Android. **Cortar** as duas barras (T3).
    - Dado do estabelecimento que parece real e aparece em 4 imagens (comprovante do cliente, entrada registrada e recibo de saída): nome "Estacionamento do Centro", endereço (Rua Achiles Tomazelli, Chapecó/SC), telefone (54) 9963-9499 e CNPJ 40.682.574/0001-01. Decisão: **recapturar** com estabelecimento fictício (nome, endereço, telefone e CNPJ de exemplo); se não der, ocultar os campos.
    - QR Codes e link público de comprovante (`app.murel.com.br/comprovante/5EVK29FU`): podem apontar para um ticket real e ativo. Decisão: **recapturar** com QR de ticket de teste ou borrar o QR e o código do link.
    - Placas (HZR6D68, ABC1D23, GIK3V88, ELJ8V88, MRF9R43) e veículos: têm cara de dados de teste, mas não é possível confirmar daqui. Decisão: confirmar com o usuário que são fictícias; caso contrário, trocar na recaptura.
    - Por imagem:
      - `cliente/tela recibo cliente.jpeg`: comprovante de entrada visto pelo cliente (tempo de permanência, valor até agora, placa, entrada, veículo, categoria, botões Baixar PDF, Como chegar e Ligar, QR de saída). Mostra dados do estabelecimento e placa. **Recapturar**. Nome do arquivo diz "recibo", mas a tela é o comprovante de entrada.
      - `17.33.36`: registrar entrada, formulário vazio com teclado aberto. Placa ABC1D23 (exemplo). **Ocultar** teclado ou recapturar sem ele; sem dado de estabelecimento. Candidata a **não usar**: a de 17.34.36 mostra a mesma tela preenchida.
      - `17.34.36`: registrar entrada preenchida (placa, modelo, categoria, cor). Sem dado do estabelecimento. **Usar**, cortando as barras do sistema.
      - `17.34.52`: entrada registrada com comprovante e QR. Mostra estabelecimento, CNPJ, telefone, QR e link. **Recapturar**.
      - `18.27.21`: pátio com vagas ocupadas, busca e três veículos. Sem dado do estabelecimento. Placas a confirmar. **Usar**, cortando as barras do sistema.
      - `18.27.47`: localizar veículo (leitor de QR, placa, token e sequencial) na saída. Sem dado pessoal. **Usar**, cortando as barras do sistema.
      - `18.28.10`: confirmar saída (valor a cobrar, Dinheiro ou Pix, valor recebido). Placa a confirmar. **Usar**, cortando as barras do sistema.
      - `18.28.33`: saída registrada com recibo e QR. Mostra estabelecimento, CNPJ e QR. **Recapturar**.
    - Em resumo: usar 4 (17.34.36, 18.27.21, 18.27.47, 18.28.10), recapturar 4 (cliente, 17.34.52, 18.28.33 e, se o usuário quiser manter o passo, 17.33.36 sem teclado). A recaptura exige um estabelecimento fictício cadastrado no sistema.
  - Recaptura feita em 06/11/2026, no navegador em tamanho de celular (390x844, tema claro, sem barras do sistema), na empresa "teste razao", agora com dados fictícios de estabelecimento (ver "Dados alterados" na T2b). Brutas em `scratchpad/cap/cliente-raw` e `scratchpad/cap/operador-raw`:
    - Cliente: `comprovante-entrada.png` (página pública do comprovante: permanência, valor até agora, placa, ações e QR de saída).
    - Operador: `patio`, `entrada-preenchida`, `entrada-registrada` (comprovante com QR), `ticket` (detalhe do ticket, mostra "Registrado por: renato teste", ocultar na T3), `qr-ticket` (QR para o cliente), `confirmar-saida` e `saida-registrada` (recibo com valor, pagamento e QR).
    - Sem recaptura: "localizar veículo" (a câmera não abre no navegador sem permissão); usar a imagem original `18.27.47`, cortando as barras do sistema. Também é nova uma tela que as imagens originais não tinham: o **quadro de chaves** na entrada ("Gancho sugerido"), em `entrada-registrada` (passo anterior ao comprovante, capturado em `scratchpad/cap/op/03-entrada-registrada.png`).
    - Cuidado na T3: em todas há QR Code e, no comprovante, o link público de um ticket de teste; o CNPJ do recibo é o da empresa de teste (`66.326.569/0001-50`, não editável no sistema). Borrar o CNPJ por precaução.

- [x] T2 — Capturar as telas do Gestor na versão web, em conta de teste com dados fictícios, uma por menu com funcionalidade
  - Arquivos: capturas fora do repo; lista de menus anotada na task
  - Pronto quando: há uma captura por menu em uso (Relatórios e menus em branco ficam de fora), sem dado real e sem credencial visível, e a lista final de menus está registrada
  - Resultado (06/11/2026): capturas brutas em 1440x900, tema claro, somente leitura (nada foi criado ou alterado no sistema), com a conta de `docs/input.md`. Guardadas fora do repo, em `scratchpad/cap/gestor-raw`. O usuário confirmou que os nomes de mensalistas e conveniadas são fictícios.
  - Menus do sistema (12, v1.0.356; não existe menu Relatórios): Pátio, Caixa, Conferência de pátio, Dashboard, Gestão de Preços, Gestão de Usuários, Mensalistas, Empresas conveniadas, Notas Fiscais, Financeiro, Minha Empresa e Quadros de Chaves.
  - **Entram no Gestor (9)**, com a empresa de origem:
    - Pátio, Caixa, Dashboard, Gestão de Preços, Financeiro: empresa "teste razao" (18 veículos, caixa aberto, tabelas de preço, fluxo de caixa).
    - Conferência de pátio: "teste razao", com o modo "Marcar pela lista" selecionado (a conferência não foi iniciada, para não gravar dados).
    - Quadros de chaves: "teste razao", com o quadro aberto (25 ganchos, 2 ocupados).
    - Mensalistas e Empresas conveniadas: "TESTE VALIDACAO ADICIONAR EMPRESA LTDA" (nas outras elas estão vazias).
  - **Ficam de fora (3)**: Notas Fiscais (decisão do usuário); Gestão de Usuários (mostra CPF, e-mail e celular do login real) e Minha Empresa (formulário de configuração, pouco ilustrativo), por recomendação, assumida porque o usuário não pediu o contrário.
  - Dado real que sobra e passa para a T3: o cabeçalho de todas as capturas mostra o e-mail pessoal do usuário; precisa ser ocultado antes de publicar.

- [x] T2b — Cadastrar um estabelecimento fictício na empresa "teste razao" para as recapturas (autorizado pelo usuário em 06/11/2026)
  - Arquivos: nenhum no repo; valores originais salvos em `scratchpad/cap/original-teste-razao.txt`
  - Pronto quando: comprovantes e recibos mostram um estabelecimento fictício, sem os dados do estabelecimento real
  - **Dados alterados na conta de produção** (empresa "teste razao", CNPJ 66.326.569/0001-50), em Minha Empresa: razão social "teste razao" → "Estacionamento Exemplo Ltda"; nome fantasia "teste 2" → "Estacionamento Exemplo"; telefone (54) 99638-4949 → (11) 90000-0000; endereço Avenida Sete de Setembro, 123, Centro, Passo Fundo/RS (CEP 99010-121) → Rua das Palmeiras, 100, Centro, São Paulo/SP (CEP 01001-000).
  - **Dados criados** (empresa "teste razao"): 3 entradas de teste com saída registrada em dinheiro: RTK4E59 (ticket 9142, R$ 20,00), HZR6D68 (ticket 2987, R$ 0,00, saída sem cobrança) e JKQ7M42 (R$ 20,00). Somam R$ 40,00 a mais no caixa aberto e 3 tickets no histórico. Nada foi apagado.
  - Pendente: **restaurar os valores originais** de Minha Empresa quando as capturas estiverem fechadas (T3), para não deixar a empresa de teste com o nome fictício.

- [x] T3 — Preparar as imagens finais: ocultar dados (inclusive o e-mail do cabeçalho nas telas do Gestor, o "Registrado por" do ticket do Operador e o CNPJ dos recibos), remover EXIF, converter para WebP (1280 px para telas largas, 720 px para retrato) e salvar com nomes descritivos
  - Arquivos: `src/assets/telas/cliente/*.webp`, `src/assets/telas/operador/*.webp`, `src/assets/telas/gestor/*.webp`
  - Pronto quando: todas as imagens das T1 e T2 estão no repositório em WebP, sem dado pessoal, sem nome de arquivo de origem (WhatsApp) e com peso conferido (cada uma comparável às telas atuais)
  - Resultado (06/11/2026): 17 imagens WebP em `src/assets/telas/`, de 25 a 67 KB cada (as telas atuais ficam na mesma faixa), sem EXIF (conferido com `sharp`).
    - `gestor/` (1280x800): patio, caixa, conferencia, dashboard, precos, financeiro, quadros-chaves, mensalistas, conveniadas. E-mail do cabeçalho coberto em todas; "renato teste" borrado no dashboard (operador de entrada) e na conferência (última conferência).
    - `operador/` (720x1558): patio, entrada-preenchida, entrada-registrada (CNPJ borrado), ticket ("Registrado por" borrado), localizar-veiculo, confirmar-saida, saida-registrada (CNPJ borrado).
    - `cliente/` (720x1558): comprovante-entrada.
    - Revisão visual feita nos trechos borrados; as demais telas foram vistas na captura. Sem barras do sistema (capturadas no navegador, não no celular).
    - Ainda a conferir na T11: QR Codes e o link público do comprovante (ticket de teste) aparecem em `entrada-registrada`, `saida-registrada` e `comprovante-entrada`.
    - Não entrou: `qr-ticket` (redundante com `entrada-registrada`). Os antigos `patio.webp` etc. na raiz de `telas/` continuam, até a T10.

- [x] T4 — Criar os tipos do sistema por perfil
  - Arquivos: `src/types/sistema.ts`
  - Pronto quando: existem `IdPerfil`, `TelaPerfil` e `PerfilSistema` conforme o Tech Spec e `npx tsc --noEmit` passa

- [x] T5 — Escrever os dados dos três perfis, com título e explicação de cada tela (e `alt`)
  - Arquivos: `src/components/home/Sistema/Sistema.data.ts`, `src/components/home/Sistema/Sistema.data.test.ts`
  - Pronto quando: cada perfil lista as telas das T1 a T3 em ordem de uso; toda tela tem `alt`, título e explicação no tom da marca (sem emoji, sem jargão); o teste garante perfis com ao menos uma tela e textos preenchidos; cada explicação foi conferida com o comportamento real do sistema (RF7)

- [x] T6 — Criar o slide `TelaPerfil` (imagem + título + explicação), reaproveitando `TelaSistema`
  - Arquivos: `src/components/home/Sistema/TelaPerfil.tsx`, `TelaPerfil.styles.ts`, `TelaPerfil.test.tsx`
  - Pronto quando: renderiza imagem com `alt`, título e explicação; em desktop imagem e texto ficam lado a lado, no celular em coluna; imagens em retrato não são cortadas (`object-fit: contain`); teste passa

- [x] T7 — Criar o `CarrosselTelas` (trilho com rolagem por encaixe, indicador de posição, botões anterior/próximo, ARIA e teclado)
  - Arquivos: `src/components/home/Sistema/CarrosselTelas.tsx`, `CarrosselTelas.styles.ts`, `CarrosselTelas.test.tsx`
  - Pronto quando: o próximo slide aparece parcialmente; botões e indicador acompanham o slide atual; botão do primeiro/último slide desabilitado; trilho focável e rolável por teclado; `role="region"`, `aria-roledescription="carrossel"` e grupos "Tela N de M"; sem animação com `prefers-reduced-motion`; funciona sem JavaScript pela rolagem nativa; testes passam

- [x] T8 — Criar o `SeletorPerfil` (abas Cliente, Operador e Gestor, com painéis)
  - Arquivos: `src/components/home/Sistema/SeletorPerfil.tsx`, `SeletorPerfil.styles.ts`, `SeletorPerfil.test.tsx`
  - Pronto quando: `tablist`, `tab` e `tabpanel` com `aria-selected` e `aria-controls`; setas, Home e End trocam de aba; Gestor é o perfil inicial; os três painéis estão no HTML e os inativos usam `hidden`; testes de clique e teclado passam

- [x] T9 — Montar a seção `Sistema` (título, lede, abas, carrosséis e chamada "Testar grátis")
  - Arquivos: `src/components/home/Sistema/Sistema.tsx`, `Sistema.test.tsx`
  - Pronto quando: usa `Section` com id `sistema`, o botão "Testar grátis" usa `urlAdesaoTeste` e fica ao fim da seção, `SeletorPerfil` recebe os carrosséis montados no servidor; o teste confirma os três perfis, o botão e o link de adesão

- [x] T10 — Trocar `VisaoGeral` e `Funcionalidades` por `Sistema` na home e limpar o que ficou sem uso
  - Arquivos: `src/app/page.tsx`, `src/components/home/VisaoGeral/*`, `src/components/home/Funcionalidades/*`, `src/components/home/Funcionalidade/*`, `src/types/funcionalidade.ts`, `src/assets/telas/*` (somente o que não for mais usado)
  - Pronto quando: a home renderiza `Sistema` no lugar das duas seções; o link "Sistema" do cabeçalho continua levando a `#sistema`; nenhum import quebrado; componentes, testes, tipos e imagens sem uso foram removidos (conferido por busca antes de apagar); `Header.test.tsx` e `seo.test.tsx` passam
  - Resultado (06/11/2026): `page.tsx` renderiza `Sistema` no lugar de `VisaoGeral` + `Funcionalidades`. Removidos (git rm, nada commitado): `VisaoGeral`, `Funcionalidades`, `Funcionalidade`, `src/types/funcionalidade.ts` e as 7 imagens antigas de `src/assets/telas/`. Nenhum import restante (busca + `tsc`). Teste suíte: 153 de 154 passam; o que falhou, `ContatoForm`, passa quando rodado sozinho (oscila sob carga). `npm run lint` com 0 erros e `npm run build` ok.
  - Conferido no site rodando (build de produção), em 1440 px e 390 px: abas, carrosséis dos três perfis, sem rolagem horizontal da página.
  - Conteúdo que saiu junto com as seções antigas: as listas de funcionalidades por área e a seção "Tema claro e escuro" (troca de tema por botão e instalação como aplicativo). Não estão em nenhuma tela nova; avaliar se vale reaproveitar em outro lugar da home.

- [x] T11 — Revisão final de conteúdo, acessibilidade e peso
  - Arquivos: todos os da feature
  - Pronto quando: cada imagem foi revista de novo contra o RF6; nenhuma credencial aparece no repo (busca no `docs/` e `src/`); foco por teclado, contraste e `alt` conferidos (WCAG 2.2 AA); seção legível em 360 px e em desktop; `npm run lint`, `npm run test` e `npm run build` passam
  - Resultado (06/11/2026):
    - Imagens revistas de novo, as 17, em folhas de contato. Ajustes feitos: a tela de entrada registrada ainda mostrava "Operador: renato teste" e o link público do comprovante, e o pátio do gestor mostrava o nome "teste 2" da empresa antes da troca. Borrei os dois primeiros e recapturei o pátio do gestor com "Estacionamento Exemplo". Nada de credencial, e-mail pessoal ou CNPJ legível.
    - Credenciais: `grep` em todo o repo (fora de `node_modules`, `.next` e `.git`) só encontra login e senha em `docs/input.md` (T12).
    - Acessibilidade conferida no site rodando: setas trocam e movem o foco entre as abas; Tab leva ao trilho do carrossel e a seta direita o rola; foco visível (contorno amarelo de 2 px); contraste do resumo 7,06:1, da aba ativa 11,06:1 e da explicação 15,85:1; textos alternativos em todas as telas (teste de dados).
    - Responsivo: sem rolagem horizontal da página em 360 px, 390 px e 1440 px.
    - Detector da skill `impeccable` nos arquivos da seção: nenhum achado.
    - `npm run test` 154 de 154, `npm run lint` 0 erros (94 avisos que não vêm dos arquivos da seção), `npm run build` ok.
    - Fica de fora desta checagem: leitor de tela real, e a conferência da nota "Gestão de preços" e demais explicações contra versões futuras do sistema.

- [x] T12 — Remover as credenciais de `docs/input.md` e orientar a troca da senha
  - Arquivos: `docs/input.md`
  - Pronto quando: login e senha não aparecem mais no arquivo; o usuário foi avisado para trocar a senha e para verificar se o histórico do git já os contém
  - Resultado (06/11/2026): login e senha removidos de `docs/input.md` (as demais linhas, inclusive a nova sobre as telas dentro de celular e notebook, ficaram como estavam). O histórico do git não tem as credenciais (`git log -S` em todas as branches): elas só existiram no arquivo ainda não commitado. Pendente do usuário: trocar a senha, porque ela passou por esta sessão e por prints de comandos.

- [x] T13 — Colocar as telas dentro de molduras de celular e de notebook (RF12, estilo A)
  - Arquivos: `src/components/ui/TelaSistema/TelaSistema.tsx`, `TelaSistema.styles.ts`, `TelaSistema.test.tsx`, `src/components/home/Sistema/TelaPerfil.styles.ts`, `TelaPerfil.tsx`
  - Pronto quando: imagens em retrato aparecem dentro de uma moldura de celular e as em paisagem dentro de uma de notebook, no estilo A (`molduras.png`); o visor continua focável e rolável por teclado (telas largas no celular); sem rolagem horizontal da página em 360 px; o texto do notebook continua legível; testes, `tsc`, lint e build passam; conferido no navegador em 360 px e 1440 px
  - Resultado (06/11/2026): `TelaSistema` desenha celular (retrato) ou notebook (paisagem) em CSS puro, nas cores do tema. O visor é o elemento focável e rolável (`role="group"` com o texto alternativo). Coluna do celular no slide subiu para 300 px. A base do notebook ficou do mesmo tamanho da tampa: com a base mais larga, como no mockup, o trilho do carrossel cortava a ponta esquerda. Conferido no site rodando em 360 px e 1440 px: sem rolagem horizontal da página; no celular, a tela do notebook continua rolando dentro da moldura. Testes 154 de 154 (um teste novo para a moldura), lint 0 erros, build ok.

- Revisão de responsividade no celular (06/11/2026, pedida pelo usuário após a T13): medido no site rodando em 320, 360, 390, 412, 600 e 768 px, com toque emulado.
  - Corrigido: (1) nas telas largas do Gestor o slide inteiro crescia até 740 px e o texto vazava para o slide ao lado; a coluna agora tem `minmax(0, 1fr)` e a tela rola dentro da moldura do notebook; (2) as abas quebravam em duas linhas em 320 e 360 px; agora dividem a linha no celular e voltam ao tamanho do texto a partir de 480 px.
  - Conferido: sem rolagem horizontal da página de 320 a 600 px; abas e setas com 44 px de altura; texto de 16 px; botão "Próxima tela" por toque e rolagem manual até o fim atualizam o indicador; tela do notebook rola dentro da moldura.
  - Fora do escopo, encontrado de passagem: em 768 px de largura exata o cabeçalho (botão "Testar grátis") passa 30 px da tela e dá rolagem horizontal na página. Não é da seção Sistema; corrigido à parte (abaixo).
  - Cabeçalho corrigido (06/11/2026, a pedido do usuário): o menu completo (5 links, "Acessar o sistema" e "Testar grátis") só cabia a partir de ~830 px, mas aparecia a partir de 768 px (`md`). A troca entre menu de hambúrguer e menu completo passou de `md` para `lg` (1024 px) em `Header.styles.ts`; entre 768 e 1023 px o cabeçalho usa o hambúrguer. Conferido de 320 a 1440 px: sem rolagem horizontal em nenhuma largura; em 820 px o menu abre, mostra os 5 links mais "Acessar o sistema" e fecha ao escolher uma seção. Testes 156 de 156, lint 0 erros.
