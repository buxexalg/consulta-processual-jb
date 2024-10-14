# Consulta Processual

Este repositório consiste em uma aplicação com o objetivo de gerar um banco de dados capaz de armazenar processos jurídicos e servi-los atravez de uma página de busca e exibição. [Para mais informações sobre o processo de idealização, implementação e próximos passos do projeto, acesse o documento de registro de progresso.](COMMENTS.md)

## Stack

- [React](https://github.com/facebook/react);
- [NextJS como framework de frontend](https://github.com/vercel/next.js/);
- [NestJS como framewoek de backend](https://github.com/nestjs/nest);
- [Typescript](https://github.com/microsoft/TypeScript);
- [GraphQL](https://github.com/graphql/graphql-spec);
- [Prisma ORM](https://github.com/prisma/prisma)
- [Mantine UI como biblioteca de componentes](https://github.com/mantinedev/mantine);
- [Jest](https://github.com/jestjs/jest), [React Testing Library](https://github.com/testing-library/react-testing-library) e [Cypress](https://github.com/cypress-io/cypress), para testes unitários e e2e

## Instruções de uso

### Execução

A instalação local dos repositórios não é necessária, já que a execução pode ser feita através do Docker.

1. Clone o repositório e
2. Renomeie o .env em `consulta-processual-client` para `.env`
3. Insira o `DATABASE_URL` que pode ser acessado [neste PasteBin](https://pastebin.com/cH1vBEEw).
4. Na raiz do repositório, execute

```
docker compose up --build
```

Os testes unitários de ambos os ambientes são executados junto com o comando de inicialização acima. Mas, caso queira executá-los manualmente, a categoria abaixo exemplifica como. 

O App frontend estará disponível em:

```
http://localhost:3000/
```

E a API backend estará disponível em:

```
http://localhost:4000/graphql
```

## Testando a aplicação

### consulta-processual-client

A documentação da API pode ser consultada através da url do GraphQL Playground

```
http://localhost:4000/graphql
```

Para executar os testes unitários, execute na raíz do diretório `consulta-processual-client`

```
npm install && npm run test:cov
```

### consulta-processual-app

Para executar os testes unitários, execute na raíz do diretório `consulta-processual-app`

```
npm install && npm run test
```

E para executar os testes e2e através do cypress, execute na raíz do diretório `consulta-processual-app` o seguinte comando com a aplicação em execução

```
npm install && npm run cypress:open
```

#### Páginas

- `/`: Homepage, onde é possível fazer a consulta de um processo através do número de CNJ e de um ou mais processos através do tribunal o qual eles foram registrados.

  - O banco de dados já está populado com valores de teste, caso queira seguem alguns valores cadastrados para realizar a consulta:
    - Tribunal: `STF`
    - Tribunal: `STJ`
    - Tribunal: `TST`
    - CNJ Nº `7001234-22.2020.8.18.0041`
    - CNJ Nº `8000017-78.2022.8.04.0000`

- `/processos/[id]`: Tela de exibição que exibe uma lista de processos em um componente Accordion, que quando aberto exibe a listagem de movimentações e partes envolvidas nos processos.. Quando ID equivale a um Tribunal, todos os processos relacionados a ele serão listados e quando equivale a um CNJ, apenas o processo equivalente será listado.;
