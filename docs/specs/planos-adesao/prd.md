# PRD: Seção de Planos com Adesão

## Problema
A home explica o que a Murel faz, mas não diz quanto custa nem deixa o visitante escolher como quer pagar. Quem decide aderir precisa sair da página, perguntar o preço à equipe e depois refazer o caminho até a adesão. Isso tira a decisão do momento em que o interesse é maior.

## Objetivo
A home passa a ter uma seção de planos em que o visitante compara quatro periodicidades (mensal, trimestral, semestral e anual), vê que todas dão acesso a todas as funcionalidades do sistema e, ao escolher uma, chega à tela de adesão com o plano já selecionado.

## Usuário-alvo
- Dono de pátio (estacionamento, valet, lava-rápido) que já entendeu o que a Murel faz e quer saber o preço antes de aderir. Lê no celular, entre tarefas do pátio.
- Gerente/administrador que compara as periodicidades para recomendar uma ao dono, em geral no desktop.

## Requisitos funcionais
- RF1: A home tem uma seção de planos com quatro opções, nesta ordem: Mensal, Trimestral, Semestral e Anual.
- RF2: Cada opção mostra o valor por mês:
  - Mensal: R$ 149,90/mês
  - Trimestral: R$ 134,90/mês
  - Semestral: R$ 119,90/mês
  - Anual: R$ 79,90/mês
- RF3: Cada opção mostra também o total cobrado no período (trimestral R$ 404,70; semestral R$ 719,40; anual R$ 958,80) e a economia em relação ao plano mensal, para o visitante comparar sem fazer conta.
- RF4: A seção destaca todas as funcionalidades do sistema, agrupadas pelas áreas da lista abaixo ("Funcionalidades do sistema"), e deixa claro que elas valem para os quatro planos; a única diferença entre os planos é a periodicidade e o valor.
- RF5: O plano Anual aparece em destaque visual como o recomendado, com um selo que não depende só de cor.
- RF6: Cada opção tem um botão que leva à tela de adesão. O botão diz exatamente o que acontece ao clicar.
- RF7: Ao clicar, a tela de adesão recebe o tipo do plano escolhido no parâmetro `tipoPlanoAdesao`, com os valores 1 = Mensal, 2 = Trimestral, 3 = Semestral e 4 = Anual. O valor 0 (Trial) existe no sistema, mas não é uma das quatro opções desta seção.
- RF7a: A tela de adesão do sistema (GIPE, `/adesao`) hoje não lê esse parâmetro. Passar o parâmetro é responsabilidade do site; o sistema precisa passar a lê-lo e enviá-lo no cadastro (ver Riscos).
- RF8: As chamadas "Ir para adesão" que já existem na home continuam levando à adesão sem plano pré-selecionado.
- RF9: O texto segue o tom de voz da marca (direto, próximo, sem jargão, sem exageros, sem emojis).
- RF10: O layout segue o visual de `docs/murel-planos.html` (fundo escuro, cartões com borda, destaque amarelo no plano recomendado, valor em destaque, lista de funcionalidades com marcação), adaptado para quatro cartões por periodicidade.
- RF11: Mostrar apenas funcionalidades que funcionam hoje no sistema; a lista abaixo foi levantada no código e nos documentos do GIPE e exclui o que ainda não existe.

## Funcionalidades do sistema (base para a seção)
Levantadas em `C:\murel\GIPE` (relatório de funcionalidades de 23/10/2026, histórico de atualizações até a versão 1.0.333 de 31/10/2026 e specs). Só entra o que funciona hoje.

1. **Entrada e saída de veículos:** entrada com placa, modelo, categoria e cor, com leitura da placa pela câmera do celular; aviso de placa que já está no pátio; ticket digital com QR Code e página pública do ticket, sem login; saída em tela única (localiza por placa ou QR e paga); recibo público da saída; mensalista identificado na entrada e liberado sem cobrança; teclados próprios no celular (placa, número e letras).
2. **Pátio:** veículos presentes com busca e filtros, saída direto pela lista, botões Entrada e Saída no topo.
3. **Quadro de chaves:** quadros com linhas e colunas, escolha do gancho na entrada com sugestão do primeiro livre, posição da chave no card do veículo e indicador de chaves fora do quadro.
4. **Preços:** tabelas por categoria de veículo, faixa de dia e horário, tolerância, diária e degraus de valor por tempo; tabelas de convênio; vigência; cadastro em etapas com resumo ao vivo; simulador de cobrança.
5. **Caixa:** abertura, retirada (sangria), passagem de turno e fechamento com diferença apurada; movimentos por forma de pagamento; comprovantes em PDF; histórico de caixas anteriores com exportação em CSV e PDF (Administrador e Gerente).
6. **Meios de pagamento:** a empresa escolhe os que aceita e a saída oferece só esses.
7. **Mensalistas:** cadastro com veículos e condutores, tipos de mensalidade com dias de atendimento, contrato com aceite por link no e-mail, registro de pagamento, agenda de vencimentos.
8. **Empresas conveniadas:** cadastro do convênio com o responsável da conveniada, lista de convênios por situação; **carimbo de convênio** pelo QR Code do ticket, que faz a saída ser cobrada pela tabela de convênio.
9. **Financeiro:** lançamento de receitas e despesas por categoria (inclusive pela gaveta do caixa) e fluxo de caixa do período, que junta pátio, mensalidades e lançamentos (Administrador, Gerente e Financeiro).
10. **Notas fiscais:** solicitação de nota pelo recibo da saída, com e-mail, CPF ou CNPJ, e lista de solicitações e notas lançadas.
11. **Equipe e permissões:** usuários com perfis Administrador, Gerente, Caixa, Manobrista e Financeiro; menus e ações conforme o perfil; proteção do último Administrador ativo.
12. **Acesso e empresa:** login por CPF e senha, escolha da empresa para quem tem mais de uma, recuperação de senha, primeiro acesso, dados da empresa e adição de nova empresa pelo Administrador.
13. **Uso no dia a dia:** instalável como aplicativo no celular ou no computador, tema claro e escuro, funciona em celular, tablet e computador.

**Fora da lista, de propósito:** Relatórios (tem só a casca da tela); tela para configurar permissões por módulo (a API existe, a tela não); reset de senha pelo Administrador (sem tela); troca de empresa sem sair do sistema; emissão automática de NFS-e (o sistema registra a solicitação e as notas lançadas, não emite).

## Fora de escopo
- Planos por tipo de operação (Estacionamento e Valet) e níveis Essencial/Profissional/Premium do `murel-planos.html`; esta versão tem um único conjunto de funcionalidades.
- Opção "Trial" na seção, embora o parâmetro aceite o valor 0.
- Cobrança, meios de pagamento e contratação dentro do site; isso continua na tela de adesão do sistema.
- Cupons, desconto por indicação e preços diferentes por quantidade de pátios.
- Nova rota ou página separada; a seção fica na home.
- Mudanças na tela de adesão do sistema (GIPE), exceto ler o parâmetro `tipoPlanoAdesao`, se ainda não lê.

## Critérios de aceite
- [ ] A home tem uma seção com os quatro planos, nas quatro periodicidades e com os valores do RF2.
- [ ] Cada plano mostra valor mensal, total do período e economia em relação ao mensal, e os números conferem com o RF2 e o RF3.
- [ ] A seção lista as funcionalidades do sistema e informa que valem para todos os planos.
- [ ] O botão de cada plano abre a adesão com `tipoPlanoAdesao` igual a 1, 2, 3 ou 4, conforme o plano (verificado clicando nos quatro).
- [ ] O plano recomendado se distingue sem depender só de cor.
- [ ] A seção cobre as 13 áreas de "Funcionalidades do sistema" e não cita nada da lista "Fora da lista, de propósito".
- [ ] O plano Anual aparece como recomendado.
- [ ] Os cartões são legíveis em celular (a partir de 360 px) e no desktop, sem rolagem horizontal.
- [ ] Navegação por teclado, foco visível e contraste atendem WCAG 2.2 AA.
- [ ] Textos seguem o tom de voz do guia de marca.

## Métricas de sucesso (se aplicável)
- Cliques em cada plano por visita à home: [A DEFINIR meta; baseline não medido].
- Distribuição das adesões por tipo de plano: [A DEFINIR].
- Visitantes que chegam à adesão vindos da seção de planos, em relação aos vindos das outras chamadas: [A DEFINIR].

## Riscos e observações
- **Layout x conteúdo:** `docs/murel-planos.html` tem três níveis por tipo de operação, com preços e funcionalidades diferentes (R$ 79, 129, 189 e outros). Esta seção usa só o visual dele. Os preços e os níveis daquele arquivo não valem.
- **Funcionalidades do `murel-planos.html`:** o arquivo cita itens que o sistema não tem hoje (emissão de NFS-e, fotos de avarias, pagamento por tag, auditoria, relatórios de permanência e pico). Eles não entram na seção.
- **Levantamento:** o relatório do GIPE é de 23/10/2026 e não cobre quadro de chaves, carimbo, empresas conveniadas e financeiro; estes foram incluídos pelo histórico de atualizações e pelas specs. Reconferir a lista com o GIPE antes de publicar.
- **Preço público:** o PRD `home-vendas-detalhada` deixou preços e planos públicos fora de escopo. Esta feature muda essa decisão.
- **Parâmetro de adesão:** o nome `tipoPlanoAdesao` está confirmado. Falta o GIPE ler o parâmetro em `/adesao` (hoje não há nenhuma referência a ele no código) e enviá-lo no cadastro, e definir o que acontece com valor ausente ou inválido (sugestão: ignorar e seguir sem plano). Sem isso, o clique abre a adesão, mas o plano escolhido se perde.
- Referências: `docs/input.md`, `docs/murel-planos.html`, `docs/specs/home-vendas-detalhada/prd.md`, `docs/specs/site-institucional/prd.md` e `docs/Marca_Murel.html`.
