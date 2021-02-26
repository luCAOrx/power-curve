# Backend do Processo seletivo da logap

## Antes de iniciar o backend, é preciso seguir os seguintes passos

### Instale o package manager yarn

#### Instalando pelo npm

```sh
npm install -g yarn
```

Feito isso basta utilizar o comando ```yarn --version``` para verificar se realmente foi instalado.

### Adicione um arquivo ormconfig.env na raiz do projeto contendo

```env
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_USERNAME = nome_do_usuário
TYPEORM_PASSWORD = senha
TYPEORM_DATABASE = banco_de_dados
TYPEORM_PORT = 5432
TYPEORM_ENTITIES = ./src/models/*.ts
TYPEORM_MIGRATIONS = ./src/database/migrations/*.ts
TYPEORM_MIGRATIONS_DIR = ./src/database/migrations
```

### Adicione um arquivo ormconfig.ts na raiz do projeto contendo

```ts
export default {
  "type": process.env.TYPEORM_CONNECTION,
  "host": process.env.TYPEORM_HOST,
  "port": process.env.TYPEORM_PORT,
  "username": process.env.TYPEORM_USERNAME,
  "password": process.env.TYPEORM_PASSWORD,
  "database": process.env.TYPEORM_DATABASE,
  "migrations": [
    process.env.TYPEORM_MIGRATIONS
  ],
  "entities": [
    process.env.TYPEORM_ENTITIES
  ],
  "cli": {
    "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR
  }
}
```

### Adicione os pacotes utilizados na aplicação com o comando

```sh
yarn install
```

### Inicie as migrações com o comando

```sh
yarn typeorm migration:run
```

Seguido as instrunções acima esta tudo pronto para rodar o projeto.

### Inicie o projeto com o comando

```sh
yarn dev
```

Para visualizar as requisições da api instale o insomnia core ou o postman

[Insomnia core](https://insomnia.rest/) [Postman](https://www.postman.com/downloads/)

Depois é só importar o arquivo [Processo seletivo_logap](processo_seletivo_logap.json)
