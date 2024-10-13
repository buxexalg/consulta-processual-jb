# Registro de progresso de implementação do projeto de Consulta Processual

Após analisar os requisitos necessários para a entrega do projeto, foi iniciado um estudo para entender quais as melhores soluções de implementação para que fosse alcançado um projeto funcional, coeso, legível e sustentável. A ideia inicial no levantamento de possíveis tecnologias eram tecnologias que eu já tivesse pelo menos um pouco de familiaridade, para quer não fosse gasto muito tempo no processo de setup inicial de mogo que esse esforço fosse alocado em partes mais essenciais do sistema. A ideia inicial era levantar uma base forte rapidamente e construir a partir disso. 

## Frontend

### SSR ou SSG?

A sugestão da página do projeto consistia em uma aplicação de busca e consulta de processos jurídicos, e pensando nisso imaginei que seria uma página com diversas palavras chave para indexação em SEO. Com isso em mente, direcionei o projeto para performance de carregamento e melhores soluções de SEO com a utilização de SSR e React Server Components.

### Frameworks

Visando a velocidade de setup, iniciei o estudo de possibilidades com tecnologias que me permitissem agilizar o processo inicial de um `create-react-app` e tivesse robustez de possibilidades para abarcar esse projeto. A partir disso, pensei em:

#### Vite

- O Vite permite otimizar diversas etapas iniciais de configuração de um projeto React, além de introduzir tecnologias voltadas para otimização do projeto
- Permite a implementação de componentes e estrutura em SSR, porém demandaria um esforço maior na implementação desses casos. A utilização da técnica de SSG seria possível para esse caso, mas pensando em uma página de consulta e agregamento de informações, otimizações de SEO através de SSR são pontos importantes a se considerar. 

#### NextJs

- Ao considerar iniciar a aplicação em NextJs, a possibilidade de fazer uma implementação end to end em cima do Nest API foi levada em consideração. Essa possibilidade permitiria a utilização de uma aplicação única tendo a responsabilidade da aplicação e do client API. 
- O sistema de gerenciamento de rotas do Next, seja por `App Router` ou por `Page Router`, permite um rápido gerenciamento de componentes e roteamento, reduzindo a necessidade de investimento de tempo em setup de um `react-router` e gerenciamento de pastas de componentes e páginas.
- NextJs entrega uma série de tecnologias como, redução de bundle, carregamento orimizado, cache e SSR nativo, permitindo otimização de tempo de carregamento e SEO, pontos importantes a se considerar em uma página de consulta.

Nesse primeiro momento, por conta das vantagens de otimização, gerenciamento de rotas, CLI de configuração com rapidez e facilidade de uso, o NextJs foi escolhido como framework de trabalho para a aplicação frontend. Porém, após alguns testes iniciais, a possibilidade de utilizar esse frameworm como uma aplicação end to end foi descartada.

Utilizar uma outra aplicação para o gerenciamento do banco de dados, rotas de Apis e interação com o GraphQl traria mais vantagens pensando em separação de responsabilidades, manutenção a longo prazo, deploy e release (principalmente considerando que nesse ponto do desenvolvimento não tinha certeza se faria um deploy em prd dessas aplicações)

### Biblioteca de componentes

A utilização de uma biblioteca de componentes foi um dos pontos fixos desde a conecpção desse projeto. A possibilidade de utilizar componentes já preparados com temas definidos, regras de estilização robustas, acessibilidade e responsividade garantia que seria possível entregar uma aplicação visualmente funcional. Dentre as opções levantadas inicialmente, estavam:

#### DaisyUI

NextJs é otimizado para a utilização com Tailwind CSS, com isso em mente foi levantada a possibilidade de utilizar o DaisyUI já que é uma biblioteca de componentes específica para Tailwind.

- Um dos principais pontos de ataque do DaisyUi é legibilidade de código, já que Tailwind pode acabar tendo uma estilização verborrágica no HTML.
- Uma das consequências do DaisyUI ter pacotes de estilização dentro do código é a redução do tamanho do bundle, permitindo uma aplicação melhor otimizada.
- Além disso, por ser uma biblioteca de Zero Runtime CSS, ela é otimizada para a implementação de React Server Components, que vão ser a base do projeto.

#### Mantine UI

O destaque do Mantine UI vem a partir da possibilidade de ter componentes mais próximos da prontidão de uso em relação ao Daisy, sem a necessidade de manipular quaisquer classes. Além disso:

- Biblioteca de componentes englobando componentes essenciais e de layout
- Possibilidade de utilização de componentes Server Side
- Possibilidade de instalar só pacotes que vão ser utilizados

#### Next UI

A biblioteca de componentes do Next, permite uma série de coisas interessantes:

- Utilização nativa de React server components
- Acessibilidade (WAI-ARIA) já implementada em seus componentes
- Possibilidade de instalar só pacotes que vão ser utilizados
- Zero runtime css
- Embora tenha uma série de pontos interessantes, é uma biblioteca ainda em desenvolvimento que não detém alguns componentes básicos para utilização.

Houve uma versão inicial do projeto em que o Daisy UI foi escolhido como biblioteca de componentes inicial, mas ao avaliar que muito tempo estava sendo dedicado a pequenos ajustes de estilização nos componentes disponibilizados, foi feita uma transição para o Mantine UI, que foi utilizado até o fim do desenvolvimento.


### Implementação

Alguns pontos relevantes surgiram ao longo da implementação desse projeto. O primeiro deles foi a decisão de implementar o layout pensando em uma experiência Mobile First, já que seria mais eficiente escalonar os componentes Mobile -> Desktop, do que o caminho inverso.

Houveram algumas idas e vindas em relação a execução correta das tecnologias de SSR e React Server Components, em parte por conta da incompatibilidade dos componentes SSR do Mantine UI com o novo roteamento de `App Routes` do NextJs. Mas depois de uma série de pesquisas e testes, foi decidido utilizar o roteamento `Page Routes` já que permitiria a implementação nativa de React Server Components com o Mantine. 

Também houve um momento de decisão em relação a utilizar uma página única com um componente de busca e exibição de processos, mas foi decidido que seria mais interessante para manutenção de aplicação dividir as responsabilidade de cada página. Além disso, foi pensado na possibilidade do componente de `select` exibir apenas os tribunais que tinham processos associados a eles, removendo os que trariam um array vazio como resposta, mas isso traria atrito com o usuário podendo resultar em reclamações como "Gostaria de conferir os professos do TJBA mas eles não aparecem para selecionar".

### Testes

Por serem duas páginas básica o fluxo de testes acabou sendo simples e direto ao ponto. Com alguns testes de interação, snapshots, interações com API e roteamento, todos através do Jest e React Testing Library. Por conta disso, houve tempo hábil para uma implementação básica de testes e2e através do Cypress, permitindo alguns testes de UI e usabilidade.


### Backend

- Next?
  - Simplicidade
  - não comporta escalabilidade mas nesse peojeto é irrelevante

- NestJs com GraphQL
  - Responsabilidade separada para o backend
  - Familiaridade com o framework
  - Plugável
  - E se ao longo do processo eu desistir de usar Next? Terei que refazer o backend (ou transicionar)
  - Robustez de documentação (embora seja um projeto simples, sempre acaba aparecendo algum errinho)
  - Facilidade para testar e manter
  - Decoradores e implementação com typescript tornam código mais confiável, tipado e mais fácil de ser debugável
  - Escalável (irrelevante)
  - CLI intuitiva
  - Facilidade de implementar testes
  - Arquitetura modular

Pq não outras?
- Familiaridade
- Dedicar tempo que usaria em uma melhor opção para refinar outras partes do projeto

- Postgraphile
	- Performance
	- Db solucionado automaticamente, mutations/seed de CRUD feito de forma automatizada
	- sorting, filtering, pagination (evolução)
	- Documentação feita através de CLI
  Setup pelo nodejs foi fácil demais, entao nem precisou

- Hono como middleware?
- Schema First para manter os tipos de acordo com o schema

PRisma
- Open Source
Typescripe ecosystem
type-safety guarantees

tratamento de erros?

Arquitetura modular 
- Model
- Service
- Controler

vantagem pela injeção de dependencias

TESTES?

seed com apenas 1 conexão por vez

## Confecção(?)

Multi repo ou repositório único?

Embora prefira multiplos repos, utilizarei um único prezando a centralização de todas as etapas do desafio em um repositório único em conjunto com a documentação do mesmo.
A questão dos multiplos repos pdoeria ser resolvida utilizando apenas o Next

Qual arquitetura eu devo seguir?

### Banco de dados
1 tabela para processos e 1 para movimentações
- Normalização de dados
- Manutenção
- escalabilidade (irrelevante)

Tribunal
- Enum ou cadastro?
- Já que são fixos, o ideal seria um enum. Mas para evitar o trabalho braçal, deixei livre

(Explicar mais a fundo o schema do banco de dados)
Tabela intermediária
- Esta tabela intermediária mapeia a relação N para N entre as tabelas Processo e Parte. Isso é necessário porque uma parte pode estar envolvida em muitos processos e vice-versa.
Relation table

ID
- Por ser um projeto pequeno, segui pelo Integer. Mas isso afetaria a escalabilidade, nesse caso usaria GUID

Vale a pena data e hora da movimentação?

Informações placeholder do seed geradas pelo ChatGPT. São informações públicas mas decidi não utilizar informações reais.

rodando apenas com 1 resource, em uma aplicação com crud completo talvez fosse interessante fechar o resource de parte e movimentacao

adicionar tipagem no graphql.ts

dificuldade no schema (puxando pontos errados)

qual arquitetura?
# Execução
Aumentaria cobertura de testes. Tem uma base boa, mas dá para melhorar

verificar comentarios // e logs