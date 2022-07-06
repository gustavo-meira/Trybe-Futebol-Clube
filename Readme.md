
# Trybe Futebol Clube

Esse projeto foi desenvolvido na @trybe com o objetivo de consolidar o conhecimento sobre Orientação a Objetos, SOLID e TDD.

## Funcionalidades

- Logar no sistema
- Visualizar as partidas
- Cadastrar novas partidas
- Editar partidas
- Deletar partidas


## Tecnologias Utilizadas

-  Express - Framework para criar APIS.
-  Typescript - Linguagem de programação.
-  Sequelize - ORM para acesso ao banco de dados.
-  BCryptJS - Ferramenta para criptografar senhas.
-  JSONWebToken - Ferramenta para autenticação de usuários.
-  UUID - Ferramenta para geração de UUIDS.
-  Mocha, Chai e Sinon - Ferramentas para testes.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT` - Porta em que o servidor irá abrir no seu computador.

`DB_USER` - Nome de usuário para autenticação no banco de dados.

`DB_PASS` - Senha para autenticação no banco de dados.

`DB_NAME` - Nome da tabela no banco de dados.

`DB_HOST` - Endereço do banco de dados.

`DB_PORT` - Porta do banco de dados.

Todas essas chaves estão no arquivo .env.example, apenas renomeie ele para .env

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:gustavo-meira/Trybe-Futebol-Clube.git
```

Entre no diretório do projeto

```bash
  cd Trybe-Futebol-Clube
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

Para ver a cobertura dos testes, rode o seguinte comando

```bash
  npm run test:coverage
```
## Documentação da API

#### Pega um token JWT de acesso para o usuário

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | Email que o usuário se cadastrou |
| `password` | `string` | Senha que o usuário se cadastrou |

#### Retorna se o usuário é um administrador

```http
  GET /login/validate
```
Essa rota não recebe nenhum parâmetro mas é necessário enviar o token JWT no header da requisição no campo `authorization`.

#### Retorna todos os times

```http
  GET /teams
```

Essa rota não precisa de parâmetros.

#### Retorna dados de um time específico

```http
  GET /teams/:id
```
Essa rota não precisa de parâmetros.

#### Retorna todas as partidas

```http
  GET /matches
```

Essa rota não precisa de parâmetros, porém ela pode receber uma query string `inProgress` que pode ter os valores `true` ou `false`.

#### Cadastrar uma nova partida

```http
  POST /matches
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `homeTeam` | `number` | Id do time da casa |
| `awayTeam` | `number` | Id do time de fora |
| `homeTeamGoals` | `number` | Número de gols do time da casa |
| `awayTeamGoals` | `number` | Número de gols do time de fora |

#### Finalizar uma partida em andamento
  
```http
  PATCH /matches/:id/finish
```

Essa rota não recebe nenhum parâmetro mas é necessário enviar o token JWT no header da requisição no campo `authorization`.
