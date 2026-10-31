# PRD: Home de Vendas Detalhada

## Problema
A home atual apresenta a Murel de forma curta. O dono de pátio que chega por indicação vê o que o sistema é, mas não encontra detalhe suficiente sobre cada funcionalidade para decidir aderir. Falta uma apresentação de venda que mostre, tela por tela, como a Murel resolve o dia a dia do pátio.

## Objetivo
A home passa a funcionar como página de vendas: explica o sistema em profundidade, com uma seção detalhada por área (pátio, entrada e saída, caixa e preços, mensalistas e empresas conveniadas), cada uma ilustrada por telas reais do sistema. Ao terminar de ler, o dono de pátio sabe o que a Murel faz, o que ganha com ela e como começar.

## Usuário-alvo
- Dono de pátio (estacionamento, valet, lava-rápido) que ainda não é cliente e chegou por indicação, busca ou rede social. Lê no celular, entre tarefas do pátio.
- Gerente/administrador que avalia o sistema para o dono e quer ver funcionalidades concretas, em geral no desktop.

## Requisitos funcionais
- RF1: A home mantém a proposta de valor no topo (o que a Murel faz, na primeira frase) e a chamada principal para a adesão.
- RF2: Há uma seção detalhada sobre o sistema, que apresenta a visão geral e organiza as áreas descritas abaixo.
- RF3: **Pátio e entrada/saída de veículos:** seção que detalha o registro de entrada (placa, modelo e cor), o ticket digital com QR Code, o acompanhamento pelo cliente e a saída com baixa do ticket, com telas reais.
- RF4: **Caixa e preços:** seção que detalha o caixa e a tabela de preços, com telas reais.
- RF5: **Mensalistas:** seção que detalha o cadastro e a gestão de mensalistas, com telas reais.
- RF6: **Empresas conveniadas:** seção que detalha os convênios com empresas, com telas reais.
- RF7: Cada seção de funcionalidade traz: o benefício para o dono (o que ele ganha), uma descrição do que o sistema faz nessa área, a lista das funcionalidades e ao menos uma tela real do sistema.
- RF8: Todas as telas mostradas usam apenas dados fictícios; nenhum dado de cliente real, credencial ou dado pessoal aparece.
- RF9: Chamada "Ir para adesão" ao final de cada seção principal, sem o visitante precisar voltar ao topo.
- RF10: O texto segue o tom de voz da marca (direto, próximo, sem jargão, sem exageros, sem emojis) e cada botão diz exatamente o que acontece ao clicar.
- RF11: Mostrar apenas funcionalidades que funcionam hoje no sistema.

## Fora de escopo
- Preços e planos públicos.
- Seção dedicada a notas fiscais (não selecionada para esta versão).
- Depoimentos e casos de clientes (sem conteúdo real disponível).
- Nova rota ou página separada; o conteúdo fica na home.
- Mudanças no formulário de contato, no contato por WhatsApp e no cabeçalho/rodapé, exceto o que for necessário para encaixar as novas seções.
- Vídeos, demonstração agendada, blog e versão em outros idiomas.

## Critérios de aceite
- [ ] A home tem uma seção detalhada para cada área: pátio, entrada e saída, caixa e preços, mensalistas e empresas conveniadas.
- [ ] Cada seção tem benefício, descrição, lista de funcionalidades e ao menos uma tela real do sistema.
- [ ] Nenhuma tela exibe dado real de cliente, credencial ou dado pessoal; revisadas uma a uma antes de publicar.
- [ ] Toda funcionalidade descrita existe e funciona hoje no sistema.
- [ ] A primeira tela explica o que a Murel faz sem jargão e traz a chamada para adesão em destaque.
- [ ] Há uma chamada "Ir para adesão" ao fim de cada seção principal e ela leva ao fluxo público de adesão.
- [ ] As telas permanecem legíveis em celular (a partir de 360 px) e no desktop.
- [ ] Textos alternativos descrevem cada tela; navegação por teclado e contraste atendem WCAG 2.2 AA.
- [ ] Imagens otimizadas para não pesar a página no celular.
- [ ] Textos seguem o tom de voz do guia de marca.

## Métricas de sucesso (se aplicável)
- Cliques em "Ir para adesão" por visita: [A DEFINIR meta; baseline não medido].
- Profundidade de rolagem: parcela dos visitantes que chega às seções de funcionalidades [A DEFINIR].
- Mensagens enviadas pelo formulário por visita: [A DEFINIR].

## Riscos e observações
- As telas devem ser capturadas numa conta de teste do sistema (GIPE) rodando localmente, com dados fictícios. As credenciais de teste estão em texto em `docs/input.md`: não podem ser copiadas para o site nem para a documentação, e convém trocar a senha e removê-las do repositório.
- Relatórios está em branco no sistema; não deve ser apresentado.
- Referências: `docs/specs/site-institucional/prd.md`, `docs/Marca_Murel.html` e a documentação de funcionalidades do GIPE (`C:\murel\GIPE`).
