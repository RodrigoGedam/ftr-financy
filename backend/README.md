# Financy Backend

API GraphQL para gerenciamento de finanças pessoais, construída com **Apollo Server**, **Express**, **Prisma** e **Type-GraphQL**.

## 🎯 Visão Geral

O Financy Backend é um servidor GraphQL que fornece todas as operações necessárias para:

- **Autenticação**: Registro e login com JWT e suporte a refresh token
- **Gerenciamento de Usuários**: Criar, atualizar e recuperar perfil
- **Transações**: CRUD completo com filtragem por categoria e período
- **Categorias Personalizadas**: Criar e gerenciar categorias com ícones e cores
- **Dashboard**: Resumo financeiro consolidado (saldo, receitas, despesas)
- **Segurança**: Middleware de autenticação e proteção de rotas

## 🏗️ Arquitetura

### Stack Tecnológico

| Camada             | Tecnologia              |
| ------------------ | ----------------------- |
| **API GraphQL**    | Apollo Server 5         |
| **Runtime**        | Express 5 + TypeScript  |
| **ORM**            | Prisma 6                |
| **Schema GraphQL** | Type-GraphQL 2          |
| **Banco de Dados** | SQLite                  |
| **Autenticação**   | JWT + bcryptjs          |
| **Validação**      | Type-GraphQL decorators |

### Estrutura de Diretórios

```
src/
├── index.ts                      # Ponto de entrada da aplicação
├── dtos/                         # Data Transfer Objects
│   ├── input/                   # Inputs de requisição
│   │   ├── auth.input.ts        # Login/Register
│   │   ├── user.input.ts
│   │   ├── transaction.input.ts
│   │   ├── category.input.ts
│   │   └── transaction-filter.input.ts
│   └── output/                  # Outputs de resposta
│       └── auth.output.ts       # Token + User
├── models/                       # GraphQL Models (Type-GraphQL)
│   ├── user.model.ts
│   ├── transaction.model.ts
│   ├── category.model.ts
│   ├── dashboard.model.ts
│   └── enums.ts                 # TransactionType, IconName, CategoryColor
├── graphql/
│   ├── context/                 # Contexto GraphQL (User, Token)
│   │   └── index.ts
│   └── decorator/               # Decoradores customizados
│       └── user.decorator.ts    # @User() para extração do usuário
├── resolvers/                    # Resolvers GraphQL
│   ├── auth.resolver.ts         # Login, Register
│   ├── user.resolver.ts         # GetUser, UpdateUser
│   ├── transaction.resolver.ts  # CRUD Transactions
│   ├── category.resolver.ts     # CRUD Categories
│   └── dashboard.resolver.ts    # Dashboard Summary
├── services/                     # Lógica de negócio
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── transaction.service.ts
│   ├── category.service.ts
│   └── dashboard.service.ts
├── middlewares/                  # Middlewares GraphQL
│   └── auth.middleware.ts       # @UseMiddleware(IsAuth) para proteção
├── utils/                        # Utilitários
│   ├── hash.ts                  # hashPassword, comparePassword
│   └── jwt.ts                   # signJwt, verifyJwt
└── prisma/
    ├── schema.prisma            # Definição do banco de dados
    └── migrations/              # Histórico de migrações
```

## 📊 Modelo de Dados

### Relacionamentos

```
User (1) ────────► (N) Transaction
  │                    │
  │                    └──────► Category
  │
  └──────────► (N) Category
```

## 🔐 Autenticação & Autorização

### Fluxo JWT

1. **Login/Register** → Backend valida credenciais e gera JWT
2. **Token** → Frontend armazena token no localStorage
3. **Requisições** → Frontend inclui `Authorization: Bearer <token>`
4. **Contexto** → Apollo Server extrai user ID do token e injeta em `context`
5. **Proteção** → Middlewares verificam autenticação em resolvers protegidos

### Segurança

- **Senhas**: Hash com bcryptjs
- **JWT**: Assinado com `JWT_SECRET` do `.env`
- **Token Expiry**: 1 dia
- **Refresh Token**: 1 dia (estrutura pronta para implementação completa)
- **CORS**: Configurado para `http://localhost:5173` (frontend)

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+
- pnpm 10+

### Instalação

```bash
# Instalar dependências
pnpm install

# Configurar ambiente
cp .env.example .env

# Executar migrações do banco de dados
pnpm run prisma:migrate
```

### Scripts Disponíveis

```bash
# Desenvolvimento (watch mode com tsx)
pnpm dev

# Gerar schema GraphQL (automático em dev)
pnpm run prisma:generate

# Aplicar migrações
pnpm run prisma:migrate

# Abrir Prisma Studio (visualizar banco de dados)
pnpm run prisma:studio

# Lint com TypeScript
pnpm run type-check
```

## 📋 Fluxo de Requisição

```
1. Client → GraphQL Query/Mutation
                ↓
2. Apollo Server recebe requisição
                ↓
3. buildContext extrai JWT do header Authorization
                ↓
4. Verifica JWT e injeta user ID no contexto
                ↓
5. Resolver executado com @UseMiddleware(IsAuth) se necessário
                ↓
6. Service executa lógica de negócio
                ↓
7. Prisma Client interage com SQLite
                ↓
8. Resultado retornado ao Client
```

## 🏛️ Padrão de Arquitetura

### Camadas

```
Controller (Resolver)
        ↓
   Service
        ↓
   Prisma
        ↓
  SQLite
```

## 🔄 Principais Recuros

### 1. Autenticação

- `AuthResolver` → `AuthService` → `prismaClient.user`
- Hash de senhas com bcryptjs
- JWT gerado com 1 dia de expiração

### 2. Transações

- Filtragem por data, categoria e tipo
- Relacionamento com categoria (obrigatório)
- Soft delete pode ser implementado

### 3. Categorias

- Customizáveis por usuário
- Ícones e cores pré-definidos
- Cascata delete com transações

### 4. Dashboard

- Cálculo de saldo total
- Agregação por categoria
- Últimas transações

## 🛠️ Banco de Dados (Prisma)

### Migrações

A aplicação usa Prisma Migrations para versionamento do schema:

```bash
# Criar nova migração após alterar schema.prisma
pnpm prisma migrate dev --name descricao_mudanca

# Ver status das migrações
pnpm prisma migrate status

# Resetar banco (⚠️ deleta dados)
pnpm prisma migrate reset
```

## 🔗 Integração com Frontend

### Endpoint

- **URL**: `http://localhost:4000/graphql`
- **Port**: `4000`
- **CORS**: Permite origem `http://localhost:5173`
- **Credentials**: `true`

### Headers Esperados

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 📚 Recursos Adicionais

- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server)
- [Prisma Docs](https://www.prisma.io/docs)
- [Type-GraphQL Docs](https://typegraphql.com)
- [Express Docs](https://expressjs.com)
- [GraphQL Spec](https://spec.graphql.org)

## 📝 Convenções de Código

- **Naming**: camelCase em TypeScript, PascalCase em classes/types
- **Errors**: Throw `new Error("mensagem")` em services
- **GraphQL**: Todos os types usam Type-GraphQL decorators
- **Database**: Prisma para todas as operações de database
- **DTOs**: Separação clara entre inputs e outputs
