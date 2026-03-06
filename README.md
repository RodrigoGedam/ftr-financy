# Financy

## Descrição

Financy é uma aplicação de gerenciamento financeiro que permite aos usuários controlar suas transações, categorias e visualizar dashboards personalizados. O projeto é dividido em duas partes principais: um frontend responsivo e um backend robusto baseado em GraphQL.

## Funcionalidades Principais

- **Autenticação de Usuários**: Login e cadastro seguro.
- **Gerenciamento de Transações**: Criar, editar, excluir e filtrar transações financeiras.
- **Categorias**: Organizar transações em categorias personalizáveis.
- **Dashboard**: Visualizar resumos e estatísticas de finanças.
- **Perfil do Usuário**: Gerenciar informações pessoais.

## Tecnologias Utilizadas

### Frontend

- **React** com **TypeScript**
- **Vite** para build e desenvolvimento
- **Apollo Client** para integração com GraphQL
- **shadcn/ui** para componentes de UI
- **Tailwind CSS** para estilização

### Backend

- **Node.js** com **TypeScript**
- **GraphQL** com resolvers e schema
- **Prisma** como ORM para banco de dados
- **JWT** para autenticação
- **bcrypt** para hash de senhas

## Estrutura do Projeto

- `frontend/`: Código do cliente web.
- `backend/`: Código do servidor e API GraphQL.

## Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)
- Banco de dados compatível com Prisma (ex.: PostgreSQL)

### Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/RodrigoGedam/ftr-financy.git
    cd ftr-financy
    ```

2. Instale as dependências para frontend e backend:

    ```bash
    cd frontend
    pnpm install
    cd ../backend
    pnpm install
    ```

3. Configure o banco de dados no `backend/.env` (baseado em `.env.example`).

4. Execute as migrações do Prisma:

    ```bash
    cd backend
    pnpm prisma migrate dev
    ```

5. Inicie o backend:

    ```bash
    pnpm run dev
    ```

6. Em outro terminal, inicie o frontend:
    ```bash
    cd frontend
    pnpm run dev
    ```

Acesse o aplicativo em `http://localhost:5173` (frontend) e a API GraphQL em `http://localhost:4000/graphql` (backend).

## Contribuição

Contribuições são bem-vindas! Abra issues ou pull requests no repositório.

## Licença

Este projeto está sob a licença MIT.
