# Planejamento do projeto

## Tecnologias a serem utilizadas

### Front

- Next
  - Next tem end to end. Devo utilizar
  - Caso não use, seria mais interessante utilizar outros frameworks SPA?
  - embora seja um projeto rápido, essa estrutura pode ser mantida a longo prazo?
  - Deploy, release, distribuição de responsabilidades
  - São apenas 2 rotas mas o NextJs me permite ter um gerenciamento fácil delas
  - Por ser uma página de consulta, o ideal é que seja de rápido carregamento. Foco em redução de bundle, carregamento otimizado, cache e SSR (faz sentido?)
  - Pensando em uma página de consulta, SEo seria importante? (ssr)

Não posso esquecer de verificar bundles

Vite?

- NEXT permite velocidade, vite permite ajustes finos. Para esse projeto faz sentido a velocidade de um pacote inicial mais preparado
- Vai entregar velociadde mas pode pecar no SEO

Biblioteca de componentes?

DaisyUI

- Reduzir bundle

Mantine

- Zero runtime css (que isso)
- simples e direto ao ponto. integração com next

next UI

- React server components
  Acessibilidade (WAI-ARIA)
  Possibilidade de instalar só pacotes que vão ser utilizados
  ts
  zero runtime css
  Ainda em desenvolvimento :/

MObile first development
React server components?

### Back

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

- Hono como middleware?
- Schema First para manter os tipos de acordo com o schema

## Confecção(?)

Multi repo ou repositório único?

Embora prefira multiplos repos, utilizarei um único prezando a centralização de todas as etapas do desafio em um repositório único em conjunto com a documentação do mesmo.
A questão dos multiplos repos pdoeria ser resolvida utilizando apenas o Next

Qual arquitetura eu devo seguir?

# Execução
