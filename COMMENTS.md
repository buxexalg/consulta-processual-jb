# Registro de progresso de implementação do projeto de Consulta Processual

Após analisar os requisitos necessários para a entrega do projeto, foi iniciado um estudo para entender quais as melhores soluções de implementação para que fosse alcançado um projeto funcional, coeso, legível e sustentável. A ideia inicial no levantamento de possíveis tecnologias eram tecnologias que eu já tivesse pelo menos um pouco de familiaridade, para que não fosse gasto muito tempo no processo de setup inicial de modo que esse esforço fosse alocado em partes mais essenciais do sistema. A ideia inicial era levantar uma base forte rapidamente e construir a partir disso.

## Frontend

### SSR ou SSG?

A sugestão da página do projeto consistia em uma aplicação de busca e consulta de processos jurídicos, e pensando nisso imaginei que seria uma página com diversas palavras chave para indexação em SEO. Com isso em mente, direcionei o projeto para performance de carregamento e melhores soluções de SEO com a utilização de SSR e React Server Components.

### Frameworks

Visando a velocidade de setup, iniciei o estudo de possibilidades com tecnologias que me permitissem agilizar o processo inicial de um `create-react-app` e tivesse robustez de possibilidades para abarcar esse projeto. A partir disso, pensei em:

#### Vite

- O Vite permite otimizar diversas etapas iniciais de configuração de um projeto React, além de introduzir tecnologias voltadas para otimização do projeto
- Permite a implementação de componentes e estrutura em SSR, porém demandaria um esforço maior na implementação desses casos. A utilização da técnica de SSG seria possível para esse caso, mas pensando em uma página de consulta e agregamento de informações, otimizações de SEO através de SSR são pontos importantes a se considerar.

#### NextJs

- Ao considerar iniciar a aplicação em NextJs, a possibilidade de fazer uma implementação end to end em cima do Nest API foi levada em consideração. Essa possibilidade permitiria a utilização de uma aplicação única tendo a responsabilidade da aplicação e do cliente API.
- O sistema de gerenciamento de rotas do Next, seja por `App Router` ou por `Page Router`, permite um rápido gerenciamento de componentes e roteamento, reduzindo a necessidade de investimento de tempo em setup de um `react-router` e gerenciamento de pastas de componentes e páginas.
- NextJs entrega uma série de tecnologias como, redução de bundle, carregamento otimizado, cache e SSR nativo, permitindo otimização de tempo de carregamento e SEO, pontos importantes a se considerar em uma página de consulta.

##### Conclusão

Nesse primeiro momento, por conta das vantagens de otimização, gerenciamento de rotas, CLI de configuração com rapidez e facilidade de uso, o NextJs foi escolhido como framework de trabalho para a aplicação frontend. Porém, após alguns testes iniciais, a possibilidade de utilizar este framework como uma aplicação end to end foi descartada.

Utilizar uma outra aplicação para o gerenciamento do banco de dados, rotas de Apis e interação com o GraphQl traria mais vantagens pensando em separação de responsabilidades, manutenção a longo prazo, deploy e release (principalmente considerando que nesse ponto do desenvolvimento não tinha certeza se faria um deploy em prd dessas aplicações)

### Biblioteca de componentes

A utilização de uma biblioteca de componentes foi um dos pontos fixos desde a concepção desse projeto. A possibilidade de utilizar componentes já preparados com temas definidos, regras de estilização robustas, acessibilidade e responsividade garantia que seria possível entregar uma aplicação visualmente funcional. Dentre as opções levantadas inicialmente, estavam:

#### DaisyUI

NextJs é otimizado para a utilização com Tailwind CSS, com isso em mente foi levantada a possibilidade de utilizar o DaisyUI já que é uma biblioteca de componentes específica para Tailwind.

- Um dos principais pontos de ataque do DaisyUi é a legibilidade de código, já que Tailwind pode acabar tendo uma estilização verborrágica no HTML.
- Uma das consequências do DaisyUI ter pacotes de estilização dentro do código é a redução do tamanho do bundle, permitindo uma aplicação melhor otimizada.
- Além disso, por ser uma biblioteca de Zero Runtime CSS, ela é otimizada para a implementação de React Server Components, que vão ser a base do projeto.

#### Mantine UI

O destaque do Mantine UI vem da possibilidade de ter componentes mais próximos da prontidão de uso em relação ao Daisy, sem a necessidade de manipular quaisquer classes. Além disso:

- Biblioteca de componentes englobando componentes essenciais e de layout
- Possibilidade de utilização de componentes Server Side
- Possibilidade de instalar apenas os pacotes que vão ser utilizados

#### Next UI

A biblioteca de componentes do Next, permite uma série de coisas interessantes:

- Utilização nativa de React server components
- Acessibilidade (WAI-ARIA) já implementada em seus componentes
- Possibilidade de instalar apenas os pacotes que vão ser utilizados
- Zero runtime css
- Embora tenha uma série de pontos interessantes, é uma biblioteca ainda em desenvolvimento que não detém alguns componentes básicos para utilização.

##### Conclusão

Houve uma versão inicial do projeto em que o Daisy UI foi escolhido como biblioteca de componentes inicial, mas ao avaliar que muito tempo estava sendo dedicado a pequenos ajustes de estilização nos componentes disponibilizados, foi feita uma transição para o Mantine UI, que foi utilizado até o fim do desenvolvimento.

### Implementação

Alguns pontos relevantes surgiram ao longo da implementação desse projeto. O primeiro deles foi a decisão de implementar o layout pensando em uma experiência Mobile First, já que seria mais eficiente escalonar os componentes Mobile -> Desktop, do que o caminho inverso.

Houveram algumas idas e vindas em relação a execução correta das tecnologias de SSR e React Server Components, em parte por conta da incompatibilidade dos componentes SSR do Mantine UI com o novo roteamento de `App Routes` do NextJs. Mas depois de uma série de pesquisas e testes, foi decidido utilizar o roteamento `Page Routes` já que permitiria a implementação nativa de React Server Components com o Mantine.

Também houve um momento de decisão em relação a utilizar uma página única com um componente de busca e exibição de processos, mas foi decidido que seria mais interessante para manutenção de aplicação dividir as responsabilidade de cada página. Além disso, foi pensado na possibilidade do componente de `select` exibir apenas os tribunais que tinham processos associados a eles, removendo os que trariam um array vazio como resposta, mas isso traria atrito com o usuário podendo resultar em reclamações como "Gostaria de conferir os professos do TJBA mas eles não aparecem para selecionar".

### Testes

Por serem duas páginas básicas, o fluxo de testes acabou sendo simples e direto ao ponto. Com alguns testes de interação, snapshots, interações com API e roteamento, todos através do Jest e React Testing Library. Por conta disso, houve tempo hábil para uma implementação básica de testes e2e através do Cypress, permitindo alguns testes de UI e usabilidade.

## Backend

### Frameworks

#### Next

- Utilizar o NextJs como framework de backend traria simplicidade de implementação, já que seria utilizada a mesma estrutura e configuração já estabelecida para o frontend.
- Embora para esse projeto em específico seja menos relevante, essa arquitetura não comportaria escalabilidade do projeto e poderia trazer instabilidade de fluxo já que seria uma pipeline de deploy única tanto para frontend quanto para backend.
- E se ao longo do processo fosse decidido abandonar o Next como framework de frontend? Ele teria que ser mantido apenas como backend ou uma migração teria que ser feita.

#### NestJs

- Familiaridade com a tecnologia aumentou a prioridade de utilização do Nest
- Não utilizar NextJs permitiria separação de responsabilidades para o Frontend e Backend, além de permitir que o backend fosse uma aplicação plugável em outras aplicações.
- Robustez de documentação (embora seja um projeto simples, sempre acaba aparecendo algum errinho)
- Popularidade do framework e robustez da documentação proporcionam facilidade de manutenção, debug e testes.
- Decoradores e implementação com typescript tornam o código mais confiável, tipado e mais fácil de ser debugável.
- NestJs apresenta uma arquitetura escalável
- Nest CLI é intuitiva e fácil de ser utilizada, podendo levantar uma estrutura básica de controllers, modules e services com apenas um comando `nest g resource`, por exemplo.
- A arquitetura modular apresentada por padrão por esse framework permite facilidade de definir responsabilidades, facilita a injeção de dependências e testes

##### Conclusão

Por conta desses pontos apresentados, o NestJS foi escolhido como framework de backend. Outras tecnologias não foram cogitadas pois a familiaridade com as duas acima permitiriam que o tempo não dedicado a aprender o framework pudesse ser investido em outras partes do projeto.

### Banco de Dados

#### Postgraphile

Postgraphile é uma solução que permite facilitar o desenvolvimento de uma aplicação GraphQL com Postgres, detectando tabelas e relações e gerando queries GraphQL com base nelas (e vice-versa). Alguns pontos de destaque para o uso do Postgraphile:

  - Performance
  - Schema e seed do banco de dados solucionado automaticamente. Queries e Mutations feitos de forma automatizada.
  - Facilidade de implementação de sorting, filtering e pagination nas queries.
  - Documentação feita através de CLI

#### Prisma

O Prisma é um ORM que visa a facilidade de integração e gerenciamento do seu banco de dados trazendo consigo facilidade de gerenciamento de schemas, migrations e seeds. Além disso, é um ecossistema feito visando o Typescript e com garantias Type-Safety, que em conjunto com os tipos gerados pelo Schema-First GraphQL, permitiriam tipagens consistentes ao longo de todo o fluxo.

##### Conclusão

O Postgraphile foi cogitado inicialmente como possibilidade por conta da automação na interação do Postgres com o GraphQl, porém o NestJs se mostrou tão eficiente no setup inicial de uma aplicação backend utilizando GraphQL que foi decidido utilizar o Prisma por conta das suas soluções Type-Safety e forma intuitiva de geração de schemas.

#### Schema

A estrutura do schema foi feita com base na sugestão do projeto, tendo processos, partes e movimentações tabelas únicas e utilizando uma tabela relacional para a relação n...n de Partes e Processos. Esta tabela intermediária mapeia a relação N para N entre as tabelas Processo e Parte. Isso é necessário porque uma parte pode estar envolvida em muitos processos e vice-versa. [O Diagrama entidade relacionamento pode ser visto aqui.](./consulta-processual-client/prisma/ERD.png)

Informações placeholder do seed geradas pelo Chat GPT. São informações públicas mas decidi não utilizar informações reais. Em relação a escalabilidade do projeto, cada recurso tem uma tabela própria, então pensando em um CRUD completo de múltiplos pontos, seria necessário apenas reordenar os recursos no NestJS, dando responsabilidades próprias para as Movimentações e Partes no processo.

### Testes

A divisão entre Modules, Services e Resolvers apresentada pelo NestJS permite uma facilidade de implementação de testes unitários, podendo testar responsabilidades específicas de cada um dos módulos. 

## Arquitetura

Do lado da aplicação backend, foi utilizada uma arquitetura modular padrão do próprio framework, utilizando Model Service Controler(Resolver), que proporciona facilidade de injeção de dependências dentro do projeto e plugar ou desplugar serviços diferentes em caso de refatoração, escalabilidade ou depreciação de serviços. Seguindo a mesma lógica, o frontend recebeu uma adaptação da arquitetura modular, mas voltada para cada uma das páginas do NextJs e com uma separação entre as camadas do App e do Client.

## Finalização

### Dockerização

O grande desafio do processo de dockerização dessa aplicação foi distribuir os builds de forma adequada para que um único comando levantasse toda a infraestrutura. Houve sucesso para realizar esse feito nos contêineres do app e do client, permitindo que eles fossem servidos nos seus devidos containers e se comunicando entre si. 

Porém, durante a dockerização de um banco de dados local que seria servido para o consumo do backend o container do NestJs não conseguia encontrar o database. Alguns dias foram investidos durante esse processo, buscando issues, alterando variáveis de ambiente, procurando similaridades no StackOverflow, apontando para portas e containers diferentes e solicitando ajuda de desenvolvedores amigos com conhecimento mais aprofundado em Docker. Depois de desprender todo esse tempo e não conseguir uma solução, [foi decidido que um banco de dados em Cloud](https://aiven.io/docs/) seria populado e ele seria utilizado para o consumo do backend.

### Aprendizados e dificuldades

Muitos pontos dessa aplicação eram familiares anteriormente, mas foi surpreendente descobrir a facilidade da integração entre o GraphQl <> Prisma <> NestJs, assim como a inserção de testes e2e através do Cypress, os quais não eram familiares antes deste projeto. As 3 principais dificuldades foram: 

- O bloqueio da comunicação entre os contêineres do backend com o banco de dados local em Docker, que resultou em muitos dias de debug que não solucionaram o problema.
- Conciliar as restrições de React Server Components com a forma em que havia sido idealizada a aplicação
- Entender a necessidade da implementação de uma tabela relacional para que a relação Partes <> Processos, pudesse ser feita e consultada através de um Join.

### Próximos passos

Dentro do projeto proposto, os testes são os que mais se beneficiariam de mais tempo de implementação. Tanto para a implementação de testes e2e mais complexos com o Cypress, possibilidade de snapshot com o Storybook, mas também testes de alguns casos mais específicos do backend e teste de integração e2e, que foi modelado, teve uma base codificada, mas não houve tempo hábil para implementar corretamente e testar.


