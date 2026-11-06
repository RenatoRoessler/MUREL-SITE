# PRD: Sistema por Perfil de Usuário

## Problema
A seção "Sistema" da home organiza o produto por área (pátio, caixa e preços, mensalistas, conveniadas), todas vistas sob a ótica do gestor. Quem avalia a Murel não enxerga que o sistema atende três pessoas diferentes, cada uma com a sua experiência: o cliente que estaciona, o operador que trabalha na entrada e na saída e o gestor que administra o pátio. Sem isso, o dono de pátio não percebe o que muda no dia a dia de cada pessoa da equipe e do cliente.

## Objetivo
A seção "Sistema" passa a ser organizada por perfil de usuário (Cliente, Operador e Gestor). Cada perfil mostra as telas reais que aquela pessoa usa, cada uma com uma explicação curta do que a tela faz e de como ajuda. O visitante entende, perfil a perfil, o que a Murel entrega.

## Usuário-alvo
- Dono de pátio (estacionamento, valet, lava-rápido) que ainda não é cliente e avalia o sistema. Lê no celular, entre tarefas do pátio.
- Gerente/administrador que avalia o sistema para o dono e quer ver funcionalidades concretas, em geral no desktop.

## Requisitos funcionais
- RF1: A seção "Sistema" é dividida em três perfis: Cliente, Operador e Gestor. O visitante escolhe o perfil e vê só o conteúdo dele.
- RF2: **Cliente:** mostra as telas que o cliente final vê, a partir das imagens fornecidas da pasta do cliente (hoje, a tela de recibo).
- RF3: **Operador:** mostra as telas que o operador usa, a partir das imagens fornecidas da pasta do operador (sete imagens).
- RF4: **Gestor:** mostra uma tela de cada menu da versão web do sistema, capturadas com dados fictícios preenchidos.
- RF5: Cada tela exibida traz uma explicação própria: o que a tela mostra e o que o usuário consegue fazer nela.
- RF6: Todas as telas usam apenas dados fictícios. Nenhum dado de cliente real, credencial ou dado pessoal aparece, inclusive em imagens de origem que venham de capturas reais (placas, nomes, CPF/CNPJ, telefones).
- RF7: Mostrar apenas telas e funcionalidades que funcionam hoje no sistema. Menus em branco ou em construção (como Relatórios) ficam de fora.
- RF8: A chamada para testar grátis permanece acessível na seção, sem o visitante precisar voltar ao topo.
- RF9: O texto segue o tom de voz da marca (direto, próximo, sem jargão, sem exageros, sem emojis).
- RF10: A navegação por áreas atual (pátio, caixa e preços, mensalistas, conveniadas, tema) é substituída ou reaproveitada de forma coerente com a divisão por perfil, sem perder conteúdo útil já publicado.
- RF11: Antes de qualquer implementação, são apresentados 3 modelos de layout para a seção e o usuário escolhe um.
- RF12: As telas de celular (Cliente e Operador) aparecem dentro de uma moldura de celular, e as telas de computador (Gestor) dentro de uma moldura de notebook. Estilo escolhido pelo usuário: moldura discreta, na paleta da marca (mockup em `molduras.png`, opção A).

## Fora de escopo
- Mudanças em outras seções da home, nos planos, no teste grátis, no formulário de contato, no WhatsApp, no cabeçalho e no rodapé, exceto o necessário para encaixar a seção.
- Nova rota ou página separada; o conteúdo continua na home.
- Vídeos, demonstração interativa e versão em outros idiomas.
- Telas do aplicativo do operador ou do cliente além das imagens já fornecidas.

## Critérios de aceite
- [ ] A seção "Sistema" apresenta os três perfis (Cliente, Operador, Gestor) e permite alternar entre eles.
- [ ] O perfil Cliente mostra todas as imagens fornecidas da pasta do cliente.
- [ ] O perfil Operador mostra as sete imagens fornecidas da pasta do operador.
- [ ] O perfil Gestor mostra uma tela de cada menu da versão web que tenha funcionalidade, com dados fictícios.
- [ ] Cada tela tem uma explicação e um texto alternativo.
- [ ] Nenhuma tela exibe dado real, credencial ou dado pessoal; todas revisadas uma a uma antes de publicar.
- [ ] Nenhuma credencial de acesso é copiada para o site, para a documentação ou para o repositório.
- [ ] Telas de celular aparecem dentro de uma moldura de celular e telas do Gestor dentro de uma moldura de notebook, no estilo discreto escolhido.
- [ ] Os 3 modelos de layout foram apresentados e um foi escolhido pelo usuário antes da implementação.
- [ ] A seção é legível e navegável em celular (a partir de 360 px) e no desktop.
- [ ] Navegação por teclado, contraste e textos alternativos atendem WCAG 2.2 AA.
- [ ] Imagens otimizadas para não pesar a página no celular.
- [ ] Textos seguem o tom de voz do guia de marca.

## Métricas de sucesso (se aplicável)
- Cliques em "Testar grátis" partindo da seção Sistema: [A DEFINIR meta; baseline não medido].
- Parcela dos visitantes que abre mais de um perfil: [A DEFINIR].

## Riscos e observações
- As credenciais do ambiente de produção (app.murel.com.br) estão em texto em `docs/input.md`. Não podem ser copiadas para o site nem para a documentação. Convém trocar a senha e removê-las do repositório. Recomenda-se capturar as telas do gestor em uma conta de teste com dados fictícios, não em conta de cliente real.
- As imagens das pastas do cliente e do operador vêm de capturas de celular (WhatsApp) e podem conter dados reais; precisam de revisão e, se necessário, de recaptura ou ocultação antes de publicar.
- Explicar cada tela depende de conferir o comportamento real no sistema; o que não for confirmado não entra.
- Referências: `docs/specs/home-vendas-detalhada/prd.md`, `docs/specs/site-institucional/prd.md` e `docs/Marca_Murel.html`.
