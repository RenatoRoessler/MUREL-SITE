# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Dono de estacionamento, valet ou lava-rápido** que ainda não é cliente: chega por indicação, busca ou rede social, lê no celular entre uma tarefa e outra do pátio e quer entender rápido o que a Murel faz e se serve para o negócio dele.
- **Gerente ou administrador** que avalia o sistema para o dono: pesquisa no computador, compara com o que usa hoje e procura funcionalidades concretas (pátio, caixa, preços, mensalistas, conveniadas, notas fiscais).
- **Cliente atual da Murel**: só precisa chegar ao sistema pelo botão do cabeçalho.

## Product Purpose

O site institucional apresenta a Murel (sistema de gestão para estacionamentos, valets e lava-rápidos) e leva o visitante a começar o mês grátis. Sucesso é o visitante entender o produto na primeira tela, ver o sistema funcionando com telas reais e ter um caminho curto até a adesão.

## Positioning

Ticket 100% digital, com QR Code: sem impressora e sem pedir e-mail ou telefone do cliente. Avulso, mensalista e conveniado funcionam no mesmo pátio, e o lava-rápido tem uma fila de serviços para quem lava o carro. Um plano único, tudo incluso, sem fidelidade.

## Operating Context

- O visitante decide no celular, em momentos curtos, e muitas vezes depois de uma indicação de outro dono.
- A adesão e o sistema ficam em outro endereço (app); o site leva até lá pelos botões "Começar grátis" e "Acessar o sistema".
- Preço, promoção e duração do mês grátis vêm do back-end e podem estar indisponíveis; o site tem estado de contingência.
- O site tem uma só página (home), com seções por âncora.

## Capabilities and Constraints

- Stack: Next.js (App Router), TypeScript e styled-components, já definidos no repositório.
- Conteúdo só do que o sistema faz hoje; relatórios, tela de permissões por módulo e NFS-e ainda não existem e ficam de fora.
- As telas mostradas no site usam dados fictícios; nenhuma credencial, CPF, CNPJ, telefone ou e-mail real pode aparecer.
- Acessibilidade WCAG 2.2 AA; "menos movimento" desliga animações; tudo legível sem JavaScript e na impressão.
- Ainda indefinido: ferramenta de medição de cliques e metas de conversão.

## Brand Commitments

- Nome: Murel. Guia de marca em `docs/Marca_Murel.html` (identidade, paleta asfalto e amarelo, tipografia Plus Jakarta Sans e JetBrains Mono, faixa de pista tracejada, símbolo com o carro).
- Tom de voz: direto e próximo, sem jargão, sem exagero e sem emoji.

## Evidence on Hand

- Telas reais do sistema (capturadas em 20/11/2026, v1.0.486, dados fictícios) em `src/assets/telas/`.
- Specs do site em `docs/specs/` (institucional, planos, sistema por perfil, logo animado, animações).
