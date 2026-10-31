# PRD: Contato por WhatsApp

**Status:** Rascunho
**Autor:** Renato Roessler
**Data:** 2026-10-31
**Versão:** 1.0

---

## Problema

Hoje o único caminho de contato do site é o formulário, que depende de o visitante escrever uma mensagem e esperar resposta por e-mail. O dono de pátio, que costuma navegar no celular entre uma tarefa e outra, tem uma forma mais natural de falar com uma empresa: o WhatsApp. Sem esse caminho, dúvidas simples (inclusive sobre preço, que o site não exibe) esfriam antes de virar conversa.

## Objetivo

O visitante consegue iniciar uma conversa de WhatsApp com a Murel em um toque, de qualquer ponto da página, e a seção de contato oferece o WhatsApp ao lado do formulário já existente.

## Usuário-alvo

- Dono de pátio (estacionamento, valet, lava-rápido) ainda não cliente, no celular, com dúvida rápida ou querendo falar com uma pessoa antes de aderir.
- Gerente/administrador que avalia o sistema e prefere conversar a preencher formulário.

## Requisitos funcionais

- RF1: A página exibe, em todas as seções, um botão de WhatsApp fixo na tela, no canto inferior direito, composto por um rótulo ("Estamos online!") e o ícone do WhatsApp, conforme a imagem de referência (`c:\murel\GIPE\docs\specs\image.png`).
- RF2: Ao tocar no botão, o visitante abre uma conversa de WhatsApp com o número +55 19 99221-5384, no aplicativo (celular) ou no WhatsApp Web (desktop).
- RF3: A conversa abre com uma mensagem inicial já escrita, que identifica que o visitante veio do site da Murel. [A DEFINIR: texto da mensagem inicial.]
- RF4: A seção de contato (a que já contém o formulário) passa a oferecer também a chamada "Chamar no WhatsApp", que leva à mesma conversa, deixando claro que o visitante escolhe entre falar agora ou deixar a mensagem pelo formulário.
- RF5: O rodapé inclui o WhatsApp entre as formas de falar com a Murel.
- RF6: O botão fixo não cobre conteúdo essencial: não esconde botões de ação, campos do formulário nem o texto de nenhuma seção em celular a partir de 360 px.
- RF7: O botão fixo e as chamadas de WhatsApp seguem a identidade visual da Murel, exceto o verde e o ícone do WhatsApp, que mantêm o reconhecimento da marca do WhatsApp. [A DEFINIR: confirmar se o verde do WhatsApp vale como na referência ou se segue a paleta da Murel.]
- RF8: Os textos das chamadas dizem exatamente o que acontece ao clicar e seguem o tom de voz do guia de marca (direto, próximo, sem jargão, sem emojis).

## Fora de escopo

- Chat dentro do site, bot de atendimento e resposta automática.
- Integração com a API oficial do WhatsApp Business, fila de atendimento ou distribuição entre atendentes.
- Indicação de status real de presença (online/offline) em tempo real: o rótulo é texto fixo. Ver riscos.
- Alterações no formulário de contato existente (campos, validação, envio por e-mail).
- Medição detalhada de conversas; apenas o clique no botão, se a ferramenta de medição do site já existir.
- Outros canais (Instagram, telefone por ligação, Telegram).

## Critérios de aceite

- [ ] O botão de WhatsApp aparece fixo no canto inferior direito, com o rótulo "Estamos online!" e o ícone, em qualquer ponto da página, em celular (a partir de 360 px) e em desktop.
- [ ] Tocar no botão abre uma conversa de WhatsApp com +55 19 99221-5384, com a mensagem inicial definida.
- [ ] A seção de contato mostra a chamada "Chamar no WhatsApp" junto ao formulário, e ela abre a mesma conversa.
- [ ] O rodapé oferece o WhatsApp como forma de contato.
- [ ] O botão fixo não impede o uso de nenhum botão, campo ou texto da página em 360 px de largura (incluindo o envio do formulário e o rodapé).
- [ ] O botão e as chamadas são acessíveis por teclado, têm foco visível e nome acessível que diz que abre o WhatsApp; contraste do texto do rótulo atende WCAG 2.2 AA.
- [ ] Respeita a preferência por menos movimento, caso o botão tenha animação.
- [ ] O número de WhatsApp vem de um único ponto de configuração, e não repetido pelo conteúdo.
- [ ] Os fluxos existentes (cabeçalho, "Ir para adesão", formulário de contato) continuam funcionando como antes.

## Métricas de sucesso (se aplicável)

| Métrica | Baseline | Meta |
|---------|----------|------|
| Cliques no WhatsApp por visita | Não medido | [A DEFINIR] |
| Conversas iniciadas a partir do site | Não medido | [A DEFINIR] |

A medição depende de ferramenta de registro de visitas e cliques; a escolha fica para a Tech Spec.

## Dependências e riscos

| Dependência/Risco | Impacto | Mitigação |
|-------------------|---------|-----------|
| Rótulo "Estamos online!" promete disponibilidade imediata que a equipe pode não ter fora do horário | Médio | Definir horário de atendimento e decidir se o rótulo muda fora dele, ou usar texto que não prometa presença [A DEFINIR] |
| Alguém precisa monitorar o WhatsApp +55 19 99221-5384 e responder | Alto | Confirmar quem atende e em que horário antes de publicar |
| O PRD do site institucional lista WhatsApp como fora de escopo | Baixo | Esta feature o substitui nesse ponto; atualizar o PRD `site-institucional` para refletir |
| O número fica público e pode receber spam | Baixo | Aceito; tratar no próprio WhatsApp (bloqueio e denúncia) |
| Botão fixo sobrepor o formulário ou o rodapé no celular | Médio | Regra RF6 e teste em 360 px |

## Referências

- `c:\murel\GIPE\docs\specs\input.md` — pedido original.
- `c:\murel\GIPE\docs\specs\image.png` — referência visual do botão.
- `docs/specs/site-institucional/prd.md` — PRD do site, incluindo o formulário de contato (RF-07) e o rodapé (RF-08).
- `docs/Marca_Murel.html` — guia de marca.
