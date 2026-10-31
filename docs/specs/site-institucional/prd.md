# PRD: Site Institucional da Murel

**Status:** Rascunho  
**Autor:** Renato Roessler  
**Data:** 2026-10-27  
**Versão:** 1.0

---

## 1. Objetivo

Apresentar a Murel (sistema de gestão para estacionamentos, valets e lava-rápidos) a donos de pátio e levá-los a aderir ao sistema. O site precisa explicar, logo na primeira frase, o que a Murel faz, mostrar o sistema funcionando com telas reais e ter um caminho curto até a adesão.

## 2. Contexto e Motivação

- Hoje o site é uma página provisória com título, uma frase e o botão "Acessar o sistema".
- O sistema (GIPE) já está em produção e tem fluxo público de adesão de empresas, mas não existe uma vitrine que explique o produto para quem ainda não é cliente.
- A visão da marca é ser "o sistema mais indicado de dono para dono": o site é o lugar para onde o dono indicado vai.
- O guia de marca (`docs/Marca_Murel.html`, v1.1) já define identidade, tom de voz, paleta, tipografia e uma referência de layout de site. O novo site deve seguir essa identidade, a mesma usada pelo sistema.

## 3. Usuários-Alvo

| Perfil | Necessidade | Contexto de uso |
|--------|-------------|-----------------|
| Dono de pátio (estacionamento, valet, lava-rápido) ainda não cliente | Entender rápido o que a Murel faz, se serve para o seu negócio e como começar | Chega por indicação de outro dono, busca ou rede social; navega no celular entre uma tarefa e outra do pátio |
| Gerente/administrador que avalia o sistema para o dono | Ver funcionalidades reais (pátio, caixa, preços, mensalistas, notas fiscais) e tirar dúvidas | Pesquisa em desktop, compara com o que usa hoje |
| Cliente atual da Murel | Chegar ao sistema sem procurar link | Acessa pelo botão no cabeçalho, em qualquer dispositivo |

## 4. Escopo

### Dentro do Escopo
- Página institucional pública, em português do Brasil, com as seções: cabeçalho, hero com proposta de valor, funcionalidades com telas do sistema, como funciona o ticket digital, perguntas frequentes, formulário de contato e rodapé.
- Formulário de contato para interessados, cujas mensagens chegam ao e-mail `contato@murel.com.br`.
- Botão "Acessar o sistema" no cabeçalho, levando ao sistema existente.
- Chamada principal para a adesão ("Ir para adesão"), repetida ao longo da página.
- Telas reais do sistema como prova visual, com dados fictícios.
- Identidade visual e tom de voz do guia de marca.
- Uso confortável em celular e desktop.

### Fora do Escopo
- Preços e planos públicos (a Murel não exibe valores no site nesta entrega).
- Agendamento de demonstração, blog, área de conteúdo e chat. (O contato por WhatsApp foi tratado depois, em `docs/specs/whatsapp-contato/prd.md`.)
- Resposta automática ao interessado e acompanhamento das mensagens (a equipe responde pelo e-mail, fora do site).
- Login, cadastro ou qualquer funcionalidade do sistema dentro do site (o site apenas encaminha).
- Depoimentos e casos de clientes (não há conteúdo real disponível).
- Páginas legais completas (termos, privacidade) além do que o rodapé exigir; ver riscos.
- Versão em outros idiomas.

## 5. Requisitos Funcionais

### RF-01: Cabeçalho com acesso ao sistema
**Critério de aceite:**
- Dado que o visitante está em qualquer ponto da página, quando olha o topo, então vê a marca Murel e o botão "Acessar o sistema".
- Dado que clica em "Acessar o sistema", quando o link é seguido, então chega à entrada do sistema existente.
- Dado um celular, quando abre a página, então o botão continua visível e tocável no cabeçalho.
- Dado o cabeçalho, quando o visitante usa os links de seção, então a página rola até a seção correspondente.

### RF-02: Hero com proposta de valor
**Critério de aceite:**
- Dado que o visitante abre a página, quando vê a primeira tela, então lê o que a Murel faz (estacionamentos, valets e lava-rápidos) na primeira frase, sem jargão de tecnologia.
- Dado o hero, quando o visitante procura o próximo passo, então encontra a chamada principal para a adesão, em destaque.
- Dado o hero, então a mensagem destaca o diferencial: ticket 100% digital, sem impressora e sem pedir e-mail ou telefone do cliente.

### RF-03: Chamada para adesão
**Critério de aceite:**
- Dado qualquer chamada "Ir para adesão" na página, quando o visitante clica, então chega ao fluxo público de adesão do sistema.
- Dado que a página é longa, quando o visitante chega ao fim de cada bloco principal, então há uma chamada para adesão ao alcance, sem precisar voltar ao topo.

### RF-04: Funcionalidades com telas do sistema
**Critério de aceite:**
- Dado a seção de funcionalidades, quando o visitante a lê, então vê as áreas principais do sistema: pátio (entrada e saída), caixa, tabela de preços e convênios, mensalistas e notas fiscais.
- Dado cada funcionalidade, então há um texto curto no tom da marca e uma tela real do sistema que a ilustre.
- Dado as telas exibidas, então todos os dados (placas, nomes, CNPJs, valores) são fictícios e nenhum dado de cliente real aparece.
- Dado um celular, quando o visitante vê as telas, então elas continuam legíveis.

### RF-05: Como funciona o ticket digital
**Critério de aceite:**
- Dado a seção, quando o visitante a lê, então entende o fluxo em ordem: entrada (placa, modelo e cor), ticket com QR Code, acompanhamento pelo cliente e saída com baixa do ticket.
- Dado a seção, então mostra as duas formas de o cliente levar o ticket: foto da tela ou leitura do QR Code.
- Dado a seção, então reforça que não há impressora e que não se pedem e-mail nem telefone do cliente.

### RF-06: Perguntas frequentes
**Critério de aceite:**
- Dado a seção de perguntas frequentes, quando o visitante a abre, então encontra respostas curtas sobre: tipos de negócio atendidos, funcionamento sem impressora, dados pedidos ao cliente, uso no celular e como começar.
- Dado cada pergunta, quando o visitante interage, então consegue abrir e fechar a resposta pelo mouse, toque e teclado.
- Dado uma pergunta sobre preço, então a resposta orienta o visitante a falar com a equipe, sem informar valores.

### RF-07: Formulário de contato
**Critério de aceite:**
- Dado a seção de contato, quando o visitante a vê, então encontra um formulário com os campos: nome, nome do pátio, tipo de negócio (estacionamento, valet, lava-rápido ou mais de um), telefone ou e-mail para retorno e mensagem. Nome, mensagem e ao menos um meio de retorno são obrigatórios. O restante é opcional. [A DEFINIR: confirmar os campos.]
- Dado que preencheu os campos obrigatórios, quando envia, então a mensagem chega em `contato@murel.com.br` com todos os dados informados e o visitante vê uma confirmação clara de que foi enviada.
- Dado que deixou um campo obrigatório vazio ou com e-mail/telefone inválido, quando tenta enviar, então nada é enviado e o formulário diz qual campo corrigir, sem perder o que já foi digitado.
- Dado que o envio falhou, quando o visitante vê o erro, então o texto diz o que houve e como seguir, e o que foi digitado continua no formulário.
- Dado que o visitante clica duas vezes em enviar, então só uma mensagem é enviada.
- Dado um envio automático (robô), então a mensagem não chega à caixa de contato.
- Dado o formulário, então avisa de forma breve para que os dados informados serão usados (retornar o contato).
- Dado o formulário, então é totalmente utilizável por teclado e leitor de tela, com rótulos e erros anunciados.

### RF-08: Rodapé
**Critério de aceite:**
- Dado o rodapé, quando o visitante procura como falar com a Murel, então encontra o e-mail `contato@murel.com.br` e a ligação para o formulário.
- Dado o rodapé, então repete os botões "Acessar o sistema" e "Ir para adesão".

### RF-09: Tom de voz e conteúdo
**Critério de aceite:**
- Dado qualquer texto do site, então segue o tom de voz do guia: direto, próximo, sem jargão ("plataforma", "solução", "ecossistema"), sem exageros ("revolucionário") e sem emojis.
- Dado qualquer botão, então o texto diz exatamente o que acontece ao clicar.

## 6. Requisitos Não-Funcionais

- **Performance:** primeira tela legível rápido em celular com conexão móvel comum; imagens das telas otimizadas para não pesar a página.
- **Acessibilidade:** WCAG 2.2 nível AA (contraste, navegação por teclado, foco visível, textos alternativos nas telas do sistema, respeito a preferência por menos movimento).
- **Compatibilidade:** versões atuais de Chrome, Safari, Edge e Firefox; celular a partir de 360 px de largura e desktop.
- **Segurança:** nenhuma credencial, dado real de cliente ou dado pessoal aparece nas telas, no conteúdo ou no código do site. Os dados do formulário são usados só para responder ao interessado e não ficam expostos publicamente.
- **SEO e compartilhamento:** título, descrição e pré-visualização de compartilhamento próprios, já que a indicação entre donos é o principal canal.
- **Identidade:** seguir `docs/Marca_Murel.html` (paleta, tipografia, símbolo das três vagas com o carro, tema escuro).

## 7. Fluxos Principais

### Fluxo 1: Dono indicado que quer começar
1. Visitante abre o site pelo celular.
2. Site mostra o que a Murel faz e a chamada "Ir para adesão".
3. Visitante rola, vê as telas do sistema e o fluxo do ticket digital.
4. Visitante clica em "Ir para adesão".
5. Sistema abre o fluxo público de adesão de empresas.

### Fluxo 2: Visitante com dúvidas
1. Visitante lê as funcionalidades e não encontra o que procura.
2. Abre as perguntas frequentes e lê a resposta.
3. Se ainda tiver dúvida (ou quiser saber preço), preenche o formulário de contato.
4. Site confirma o envio e a equipe responde por e-mail ou telefone.

### Fluxo 3: Cliente atual
1. Cliente abre o site.
2. Clica em "Acessar o sistema" no cabeçalho.
3. Chega à entrada do sistema.

## 8. Critérios de Sucesso

| Métrica | Baseline | Meta |
|---------|----------|------|
| Cliques em "Ir para adesão" por visita | Não medido (site atual não tem chamada) | [A DEFINIR] |
| Adesões iniciadas a partir do site | Não medido | [A DEFINIR] |
| Mensagens enviadas pelo formulário por visita | Não medido | [A DEFINIR] |
| Mensagens legítimas que chegam em `contato@murel.com.br` | Não medido | 100% das enviadas com sucesso; spam fora da caixa |
| Cliques em "Acessar o sistema" por clientes atuais | Não medido | Mantém o acesso em 1 clique |
| Acessibilidade e boas práticas (auditoria automática) | Não medido | Sem falhas críticas de WCAG 2.2 AA |

> A medição exige um registro de visitas e cliques; a escolha da ferramenta fica para a Tech Spec.

## 9. Dependências e Riscos

| Dependência/Risco | Impacto | Mitigação |
|-------------------|---------|-----------|
| Caixa `contato@murel.com.br` precisa existir e receber as mensagens do site | Alto | Confirmar a caixa e quem a monitora antes de publicar; testar o envio ponta a ponta |
| Serviço de envio de e-mail do formulário **[A DEFINIR]** | Alto | Definir na Tech Spec; mensagens não podem se perder em silêncio nem cair no spam |
| Spam e abuso no formulário | Médio | Proteção contra robôs e limite de envios por visitante |
| Tempo de resposta da equipe às mensagens **[A DEFINIR]** | Médio | Definir um prazo e comunicá-lo na confirmação do envio |
| Telas reais do sistema precisam ser capturadas com dados fictícios | Alto | Capturar numa conta de teste, sem dados de clientes; revisar cada tela antes de publicar |
| Fluxo de adesão e entrada do sistema mudarem de endereço | Médio | Endereços do sistema vêm de configuração única, não repetidos pelo conteúdo |
| Funcionalidades que ainda não existem (ex.: Relatórios está em branco no sistema) | Médio | Mostrar apenas o que está funcionando hoje |
| Páginas legais (termos e privacidade, LGPD) **[A DEFINIR]** | Médio | O formulário coleta dados pessoais (nome e contato): incluir aviso breve no formulário e avaliar uma política de privacidade; confirmar se a medição de visitas pede aviso |
| Credenciais de teste do sistema estão em texto no arquivo de insumos (`docs/input.md`) | Alto | Não copiar para o site nem para a documentação; considerar trocar a senha e remover do repositório |
| Manter a identidade visual igual à do sistema | Médio | Usar o guia de marca como fonte única |

## 10. Referências

- `docs/input.md` — pedido original.
- `docs/Marca_Murel.html` — guia de marca v1.1 (essência, tom de voz, logotipo, paleta, tipografia, referência de site, redes sociais, pátio e papelaria).
- Sistema atual (GIPE): `C:\murel\GIPE` — `PRODUCT.md` e `docs/relatorio-funcionalidades.txt` descrevem o que está em produção.
- Página provisória atual: `src/app/page.tsx`.
