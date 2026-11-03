# PRD: Teste Grátis por 30 dias

## Problema
O visitante que ainda não tem certeza se a Murel serve para o pátio dele só encontra "Ir para adesão" ou a escolha de um plano pago. Quem está em dúvida não quer decidir uma periodicidade nem se comprometer antes de ver o sistema funcionando no próprio pátio. Sem uma opção de teste, essa pessoa sai da página ou pede ajuda à equipe só para experimentar.

## Objetivo
A home passa a oferecer um teste grátis de 30 dias, com todas as funcionalidades, sem cartão de crédito e sem compromisso. O visitante entende as condições do teste em qualquer ponto da página e começa o teste com um clique, a partir do topo, da seção de planos ou do contato.

## Usuário-alvo
- Dono de pátio (estacionamento, valet, lava-rápido) que quer ver o sistema no próprio pátio antes de pagar. Lê no celular, entre tarefas.
- Gerente/administrador que precisa de uma prova prática para convencer o dono, em geral no desktop.

## Requisitos funcionais
- RF1: A home tem uma chamada principal "Testar grátis por 30 dias" no topo, ao lado de "Falar com a equipe".
- RF2: Logo abaixo da chamada do topo, três garantias curtas: "Todas as funcionalidades", "Sem cartão de crédito" e "Sem compromisso".
- RF3: O cabeçalho da página tem um botão "Testar grátis" sempre acessível.
- RF4: A seção de planos tem uma faixa de destaque do teste grátis, antes dos cartões de plano, com título "Teste grátis por 30 dias", explicação curta (sistema completo, sem cartão, nada cobrado automaticamente, escolha do plano no fim do teste), as três garantias do RF2 e o botão "Começar meu teste grátis".
- RF5: A seção de planos deixa claro que todos os planos começam com 30 dias grátis e que o visitante só paga depois do teste.
- RF6: O teste grátis aparece como chamada, e não como um quinto cartão de plano. Os quatro planos (Mensal, Trimestral, Semestral, Anual) continuam como estão.
- RF7: A seção de resumo do sistema e o bloco de contato repetem a chamada "Testar grátis" / "Testar grátis por 30 dias".
- RF8: A home tem perguntas frequentes sobre o teste, cobrindo: se precisa de cartão; se tem todas as funcionalidades; o que acontece depois dos 30 dias; se o que foi cadastrado continua valendo ao assinar; se pode cancelar quando quiser.
- RF9: Todas as chamadas de teste levam à tela de adesão do sistema (GIPE, `/adesao`) com o tipo de plano `0` (Trial) no parâmetro `tipoPlanoAdesao`. Os valores 1 a 4 continuam sendo os planos pagos (ver `planos-adesao`).
- RF10: O texto segue o tom de voz da marca (direto, próximo, sem jargão, sem exageros, sem emojis) e o visual da referência `docs/specs/murel-teste-gratis.html` (fundo escuro, faixa com borda amarela, botão primário amarelo).
- RF11: O balão flutuante do WhatsApp aparece só a partir das perguntas frequentes (penúltima seção) e some se a pessoa voltar para cima, como na referência.

## Fora de escopo
- Formulário de cadastro do teste dentro do site; o cadastro continua na tela de adesão do sistema.
- Cobrança, cartão e contratação no site.
- Prorrogação do teste, teste com prazo diferente de 30 dias ou teste por tipo de operação.
- Lembretes por e-mail de fim de teste e pausa/retenção de dados (regras do sistema, não do site).
- Mudanças nos preços e nas periodicidades dos planos.
- Nova rota ou página separada; tudo fica na home.

## Critérios de aceite
- [ ] O topo da home mostra "Testar grátis por 30 dias" como ação principal e as três garantias.
- [ ] O cabeçalho tem o botão "Testar grátis" e ele leva à faixa do teste grátis ou à adesão.
- [ ] A seção de planos tem a faixa do teste grátis acima dos quatro cartões, e os cartões não mudaram.
- [ ] A nota "Todos os planos começam com 30 dias grátis. Você só paga depois do teste." aparece abaixo dos planos.
- [ ] A seção de resumo e o contato têm chamada para o teste.
- [ ] As cinco perguntas do RF8 estão na página e funcionam por teclado.
- [ ] Clicar em cada chamada de teste abre a adesão com `tipoPlanoAdesao=0` (verificado clicando em todas).
- [ ] Clicar em um plano pago continua abrindo a adesão com `tipoPlanoAdesao` 1, 2, 3 ou 4.
- [ ] O balão do WhatsApp fica oculto até as perguntas frequentes, não recebe foco enquanto oculto e respeita `prefers-reduced-motion`.
- [ ] Layout legível a partir de 360 px, sem rolagem horizontal.
- [ ] Navegação por teclado, foco visível e contraste atendem WCAG 2.2 AA.
- [ ] Nenhum texto promete algo que o sistema não faz (ver pontos a confirmar).

## Métricas de sucesso (se aplicável)
- Cliques em "Testar grátis" por visita à home: [A DEFINIR meta; baseline não medido].
- Testes iniciados por origem da chamada (topo, cabeçalho, planos, contato): [A DEFINIR].
- Conversão de teste para plano pago: [A DEFINIR; depende do sistema].

## Riscos e observações
- **Parâmetro Trial:** o PRD `planos-adesao` já registra que `tipoPlanoAdesao=0` (Trial) existe no sistema, mas a adesão (GIPE, `/adesao`) ainda não lê o parâmetro. Sem isso, o clique abre a adesão e o visitante não é identificado como teste. Definir com o GIPE o que acontece com valor ausente ou inválido.
- **Regras do teste a confirmar antes de publicar** (a referência as afirma, mas não há fonte no sistema):
  - o teste não pede cartão nem nenhum dado de pagamento;
  - nada é cobrado automaticamente no fim dos 30 dias;
  - sem escolher plano, o acesso é pausado e os dados ficam guardados por 30 dias;
  - o que foi cadastrado no teste continua valendo ao assinar;
  - cancelamento a qualquer momento depois do teste.
- **Decisão de preço público:** a seção de planos já foi decidida em `planos-adesao`; este teste apenas se soma a ela.
- **Referência:** `docs/specs/murel-teste-gratis.html` é só visual e de texto. O resumo de funcionalidades e os preços dele são ilustrativos; valem os de `planos-adesao`. O link `#cadastro` dele é um marcador, não o destino real.
- Referências: `docs/input.md`, `docs/specs/planos-adesao/prd.md`, `docs/specs/whatsapp-contato/prd.md` e `docs/Marca_Murel.html`.
