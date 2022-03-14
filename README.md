# API Todo List

## Description

```bash
API for to-do list control
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Creating database

```bash
$ docker-compose up -d
$ npm run db:recreate

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```


## Credentiais
```bash
# User Admin
email: admin@admin.com
senha: admin
```

## Documentation Swagger
```bash
# Link
http://localhost:3000/documentation/

```

## Observations
```bash
Login is required to access other routes (except registration).
The login function returns an access token (access_token), which must be used for authentication in other routes

PT-BR: É necessário fazer login para ter acesso as demais rotas (exceto a de cadastro).
A função login retorna um token de acesso (access_token), que deve ser utilizado para autenticação nas demais rotas

```


## License

Nest is [MIT licensed](LICENSE).
