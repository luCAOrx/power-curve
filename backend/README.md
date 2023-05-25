<h1 align="center">Curva de potência</h1>

<p align="center">
  <a href="#descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#conteúdo-técnico">Conteúdo técnico</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#inicializando">Inicializando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <br/>
  <a href="#execute-a-aplicação">Execute a aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#teste">Teste</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#lint">Lint</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#documentação-da-api">Documentação da API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#comandos-do-docker-compose">Comandos do docker-compose</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#visualizar-requisições-http">Visualizar requisições HTTP</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença">Licença</a>
</p>

## Descrição
API de gerenciamento de curva de potência

## Conteúdo técnico
- [DDD](https://khalilstemmler.com/articles/domain-driven-design-intro/)
- [TDD](https://khalilstemmler.com/articles/test-driven-development/introduction-to-tdd/)
- [SOLID](https://www.youtube.com/watch?v=vAV4Vy4jfkc)
- [In Memory Database](https://www.martinfowler.com/bliki/InMemoryTestDatabase.html)
- [Factory Pattern](https://www.digitalocean.com/community/tutorials/js-factory-pattern)

## Tecnologias
- [Node.JS LTS](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [JestJS](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest#readme)
- [Swagger](https://swagger.io/)


## Requisitos
- [Node.js LTS](https://nodejs.org/pt-br/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Inicializando

### Instale o gerenciador de pacotes YARN pelo gerenciador de pacotes NPM
No terminal execute o comando:
```sh
npm install -g yarn
```
Feito isso, verifique se o pacote foi realmente instalado, execute o comando:
```sh
yarn --version
```
Se retornar algo como ``1.22.19``
o pacote foi instalado com sucesso.

### Instale as dependências da aplicação
Para instalar as dependências, execute o comando:
```sh
yarn
```

### Organize as variáveis de ambiente
Copie o conteúdo do arquivo .env.example e crie um arquivo .env e cole o conteúdo lá dentro.

### Suba os containers do docker
Para subir os containers do docker, execute o comando:
```sh
sudo make up
```

### Realize as migrações
Para realizar as migrações, execute o comando:
```sh
yarn prisma migrate dev
```

## Execute a aplicação
### Ambiente de desenvolvimento
Para executar a aplicação em ambiente de desenvolvimento, execute o comando:
```sh
yarn start:dev
```
### Ambiente de produção
Para executar a aplicação em ambiente de produção, 
primeiro é preciso transpilar o código de typescript para javascript, execute o comando:
```sh
yarn build
```
Esse comando vai criar uma pasta chamada ``Dist`` na raiz do projeto.
Para executar a aplicação, execute o comando:
```sh
yarn start
```

## Teste
### Testes unitários
Para executar testes unitários, execute o comando:
```sh
yarn test
```

### Testes e2e (ponta à ponta)
Para executar testes e2e (ponta à ponta), execute o comando:
```sh
yarn test:e2e
```

### Observar alterações nos testes
Para observar alterações em testes, execute o comando:
```sh
yarn test:watch
```

### Cobertura de testes
Para realizar cobertura de testes, execute o comando:
```sh
yarn test:cov
```

## Lint
Para realizar a padronização do código, execute o comando:
```sh
yarn lint
```

## Documentação da API
Inicie o servidor em ambiente de desenvolvimento, execute o comando:
```sh
yarn start:dev
```
e [acesse](http://localhost:3333/api-docs)

## Comandos do docker-compose
### Subir containers
Para subir containers, execute o comando:
```sh
sudo make up
```

### Reiniciar containers
Para reiniciar containers, execute o comando:
```sh
sudo make restart
```

### Logs dos containers
Para visualizar os logs dos containers, execute o comando:
```sh
sudo make logs
```

### Remover os containers
Para remover os containers, execute o comando:
```sh
sudo make down
```

## Visualizar requisições HTTP
Para visualizar as requisições da api instale o cliente de requisições HTTP Insomnia

[Insomnia](https://insomnia.rest/download)

Depois é só importar o arquivo [Power Curve](insomnia-power-curve.json) para o Insomnia.

## Licença
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
