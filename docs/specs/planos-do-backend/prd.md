# PRD: Planos vindos do Back-end

## Problema
Os planos e preços da home estão escritos à mão no site (plano Mensal a R$ 99,90 riscado e R$ 69,90 no lançamento, prazo "até 30/06/2027", teste grátis). Toda mudança de preço, de promoção ou de nome de plano exige alterar o site e publicar de novo, e o risco é o site mostrar um valor diferente do que o sistema cobra na adesão. O back-end já expõe os planos (`GET /api/v1/Plano`), com valor de tabela, valor promocional, período da promoção e ordem de exibição, e essa passa a ser a fonte de verdade.

## Objetivo
Os planos exibidos no site (nome, preço de tabela, preço promocional, validade da promoção e ordem) refletem o que o back-end informa, sem alteração de código no site para mudar preço ou promoção. Se o back-end estiver indisponível, o visitante ainda vê uma oferta coerente e consegue chegar à adesão.

## Usuário-alvo
- Dono de pátio (estacionamento, valet, lava-rápido), em geral de pequeno porte, que lê no celular e decide pelo preço de entrada.
- Gerente/administrador que leva o preço ao dono.
- Time do negócio, que passa a ajustar preço e promoção no back-end e espera ver o resultado no site.

## Requisitos funcionais
- RF1: A seção de planos da home exibe os planos pagos devolvidos pelo back-end, na ordem de exibição que ele informa (`ordemExibicao`). Hoje isso resulta em um único cartão, o Mensal.
- RF2: O plano de teste gratuito (tipo Trial) devolvido pelo back-end não vira cartão de plano. Ele continua sendo apresentado pela faixa/chamadas do teste grátis, que seguem levando à adesão como Trial.
- RF3: Quando o plano está em promoção (`emPromocao`), o cartão mostra o preço de tabela (`valor`) riscado e o preço atual (`valorAtual`) em destaque, mais um selo com a data final da promoção (`promocaoFim`). O preço riscado é identificável por leitores de tela (ex.: "de R$ 99,90 por R$ 69,90").
- RF4: Quando o plano não está em promoção, o cartão mostra só o preço atual, sem riscado e sem selo. A virada acontece pelo dado do back-end, sem depender de nova publicação do site.
- RF5: Os valores são exibidos em reais, no formato brasileiro (R$ 69,90), a partir do número recebido, sem arredondamento que altere o centavo.
- RF6: O botão de cada plano leva à adesão com o tipo de plano correspondente ao plano exibido (`tipoPeriodoPlano`; hoje `1` para Mensal). As chamadas do teste grátis continuam levando à adesão com `0` (Trial).
- RF7: Textos do site que citam preço (FAQ de valores, hero, chamadas, menu, resumo do sistema, bloco de contato, metadados) passam a usar o valor vindo do back-end ou a não citar valor, de modo que nenhum lugar mostre um preço diferente do cartão.
- RF8: A oferta chega pronta no HTML da página, sem estado de carregamento visível, e nada desloca o layout depois que a página abre. Se um dia o dado precisar ser buscado na hora da visita, a seção reserva o espaço do cartão.
- RF9: Se a consulta falhar, demorar demais ou devolver uma lista sem plano pago, a seção continua utilizável: mostra uma versão de contingência da oferta (ver "Pontos a definir") ou, se não houver contingência confirmada, uma mensagem clara com o caminho para a adesão ou para o contato por WhatsApp. O site nunca fica com a seção vazia nem exibe erro técnico ao visitante.
- RF3a: A regra do preço de lançamento no cartão e no FAQ deixa de ser "nos primeiros 12 meses" e passa a ser derivada de `promocaoFim`: o preço promocional vale até essa data (ex.: "R$ 69,90/mês até 30/06/2027; depois, R$ 99,90/mês"). A data exibida no selo e a do texto são a mesma, vinda do back-end. Se `promocaoFim` for nulo, nenhuma data é exibida (nem no selo, nem no texto, nem no FAQ).
- RF3b: A duração do teste grátis exibida no site vem de `validadeDuracaoMeses` do plano Trial (número de meses), não de texto fixo. Hoje `1` mês; a redação ("1 mês grátis" ou equivalente) segue a marca e muda sozinha se o back-end mudar o número.
- RF10: Os textos que não são dados (descrição de "tudo incluso, sem fidelidade", lista das 13 áreas) permanecem no site, seguem o tom de voz da marca e não dependem do back-end.
- RF11: O visual segue o da seção de planos atual (fundo escuro, cartão com borda, destaque amarelo, valor em destaque, lista com marcação).

## Fora de escopo
- Alterar o back-end, o contrato de `/api/v1/Plano` ou o que a tela de adesão (GIPE) cobra.
- Cobrança, cupons, desconto por indicação e condições dos Clientes Fundadores.
- Voltar a exibir vários planos ou comparação entre eles; a decisão de plano único (`novo-preco-2026-11`) continua valendo.
- Contador de vagas ou contagem regressiva em tempo real.
- Painel para editar planos; a edição é feita no back-end.
- Nova rota ou página de planos; tudo fica na home.

## Critérios de aceite
- [ ] Com o back-end devolvendo o Mensal em promoção, a home mostra "R$ 99,90" riscado, "R$ 69,90" em destaque e o selo com a data de fim da promoção (30/06/2027), todos vindos da resposta.
- [ ] Alterando `valorPromocional`, `promocaoFim` ou `ordemExibicao` no back-end, o site reflete a mudança sem novo deploy (respeitado o tempo de atualização definido no Tech Spec).
- [ ] Com `emPromocao = true` e `promocaoFim` nulo, o cartão mostra o preço de tabela riscado e o promocional, sem nenhuma data de fim.
- [ ] Com `emPromocao = false`, o cartão mostra só o `valorAtual`, sem riscado nem selo.
- [ ] O plano Trial da resposta não aparece como cartão e as chamadas do teste grátis abrem a adesão com `tipoPlanoAdesao=0`; o botão do plano abre com o tipo do plano exibido (`1` para o Mensal) (verificado clicando em todos).
- [ ] A frase da regra do lançamento mostra a data de `promocaoFim` e não fala em "12 meses"; a duração do teste grátis exibida corresponde a `validadeDuracaoMeses` do Trial.
- [ ] Nenhum preço do site (cartão, FAQ, hero, chamadas, menu, metadados) diverge do valor recebido do back-end.
- [ ] Com o back-end fora do ar, lento ou devolvendo lista vazia, a seção não quebra, não mostra erro técnico e oferece caminho para a adesão ou contato.
- [ ] Durante o carregamento não há salto de layout perceptível.
- [ ] Layout legível a partir de 360 px e no desktop, sem rolagem horizontal.
- [ ] Navegação por teclado, foco visível e contraste atendem WCAG 2.2 AA (o selo de oferta não depende só de cor).
- [ ] Textos seguem o tom de voz do guia de marca; nenhum valor antigo (R$ 149,90, R$ 134,90, R$ 119,90, R$ 79,90) reaparece.

## Métricas de sucesso (se aplicável)
- Divergência entre preço do site e preço da adesão: zero ocorrências.
- Tempo entre mudança de preço no back-end e reflexo no site: [A DEFINIR meta].
- Taxa de visitas em que a seção cai na contingência: [A DEFINIR; baseline não medido].
- Cadastros e cliques no botão do plano por visita à home: [A DEFINIR; baseline não medido].

## Pontos a definir
- **Contingência (RF9):** decidido: mensagem sem preço, com botões de teste grátis e WhatsApp, para nunca divergir do que é cobrado. Sem cópia local de preço.
- **Frescor do dado:** proposta do Tech Spec: até 5 minutos entre a mudança no back-end e o site. **[Confirmar com o negócio]**
- **Frescor do dado (detalhe técnico, mantido):** quanto tempo o site pode manter um preço antes de consultar de novo (ex.: minutos). Decisão técnica, mas com impacto de negócio no critério de aceite acima. **[A DEFINIR no Tech Spec]**
- **Campo `diferencaPercentual`:** chega nulo; o site não exibe porcentagem de desconto nesta versão.

## Riscos e observações
- **Endereço da API:** a API é a mesma do GIPE e só existe um ambiente. Em produção vale a URL do `.env.prod` do GIPE, `https://api.murel.com.br/api/v1`. O exemplo do `docs/input.md` (`localhost:5000`) é só de desenvolvimento. O `docs/INTEGRACAO-BACKEND.md` do GIPE (que cita `api.gipepark.com.br`) está desatualizado nesse ponto.
- **Acesso público e CORS:** confirmado pelo negócio que `GET /api/v1/Plano` responde sem autenticação e que o CORS libera o domínio do site.
- **Data de fim da promoção:** se `promocaoFim` vier nulo com `emPromocao = true`, o cartão mostra o preço promocional sem selo de data e sem a frase "até <data>" (RF3a); o texto do FAQ também não cita data.
- **Datas e fuso:** `promocaoInicio`/`promocaoFim` vêm sem fuso. Definir se "assine até 30/06/2027" vale até o fim desse dia no horário de Brasília.
- **Dependência de disponibilidade:** a home de vendas passa a depender do back-end; a contingência (RF9) e o desempenho de carregamento são parte do escopo, não detalhe.
- **Parâmetro de adesão:** persiste o risco de `planos-adesao` e `teste-gratis`: o GIPE precisa ler `tipoPlanoAdesao`.
- Esta feature substitui a origem dos dados definida em `docs/specs/novo-preco-2026-11/prd.md`; as decisões de oferta daquele PRD (plano único, tom, 13 áreas) continuam valendo.
- Referências: `docs/input.md`, `docs/specs/novo-preco-2026-11/prd.md`, `docs/specs/teste-gratis/prd.md`, `docs/Marca_Murel.html`.
