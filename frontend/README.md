# Financy Frontend

Aplicação web moderna para gerenciamento de finanças pessoais, desenvolvida com **React**, **TypeScript** e **Vite**.

## 🎯 Visão Geral

O Financy é uma aplicação frontend que permite aos usuários:

- **Autenticação**: Registro e login com JWT
- **Dashboard**: Visualização consolidada de saldo, receitas e despesas
- **Gerenciamento de Transações**: Criar, editar e deletar transações (receitas/despesas)
- **Categorias Personalizadas**: Criar e organizar categorias com ícones e cores customizáveis
- **Perfil de Usuário**: Visualizar e editar informações pessoais
- **Filtros Avançados**: Filtrar transações por período, categoria e tipo

## 🏗️ Arquitetura

### Stack Tecnológico

| Camada            | Tecnologia                |
| ----------------- | ------------------------- |
| **Framework**     | React 19 + TypeScript     |
| **Build**         | Vite 7                    |
| **Roteamento**    | React Router v7           |
| **Estado**        | Zustand + Persist         |
| **API/GraphQL**   | Apollo Client 4           |
| **UI Components** | Radix UI + Tailwind CSS 4 |
| **Ícones**        | Lucide React              |
| **Notificações**  | Sonner                    |

### Estrutura de Diretórios

```
src/
├── pages/               # Páginas principais
│   ├── Auth/           # Login e SignUp
│   ├── Dashboard/      # Dashboard e resumo
│   ├── Transactions/   # Gerenciamento de transações
│   ├── Categories/     # Gerenciamento de categorias
│   └── Profile/        # Perfil do usuário
├── components/         # Componentes reutilizáveis
│   ├── ui/            # Componentes primitivos (button, input, etc)
│   ├── Header.tsx     # Cabeçalho da aplicação
│   ├── Layout.tsx     # Layout principal
│   └── Page.tsx       # Wrapper de página
├── stores/            # Estado global (Zustand)
│   └── auth.ts        # Store de autenticação
├── lib/
│   ├── graphql/       # Configuração Apollo Client
│   │   ├── apollo.ts  # Client instance
│   │   ├── queries/   # GraphQL queries
│   │   └── mutations/ # GraphQL mutations
│   └── utils.ts       # Utilitários comuns
├── constants/         # Constantes da aplicação
├── types/            # Tipos TypeScript
└── assets/           # Imagens e recursos estáticos
```

## 🔐 Autenticação

- **Sistema**: JWT (Bearer Token)
- **Storage**: Zustand Persist (LocalStorage)
- **Fluxo**:
    1. Usuário faz login/signup via GraphQL
    2. Token recebido é armazenado no `useAuthStore`
    3. Token é automaticamente incluído em cada requisição GraphQL
    4. Rotas protegidas redirecionam para login se não autenticado

## 📡 Comunicação com Backend

A comunicação ocorre via **GraphQL** através do Apollo Client:

- **Endpoint**: `http://localhost:4000/graphql`
- **Queries**: Recuperação de dados (dashboard, transações, categorias, etc)
- **Mutations**: Criação, atualização e exclusão de recursos
- **Context**: Token JWT é automaticamente adicionado ao header `Authorization`

### Operações Principais

| Recurso        | Operações                               |
| -------------- | --------------------------------------- |
| **Transações** | Listar, criar, editar, deletar, filtrar |
| **Categorias** | Listar, criar, editar, deletar          |
| **Dashboard**  | Resumo de saldo, receitas, despesas     |
| **Usuário**    | Visualizar, atualizar perfil            |

## 🎨 Design & UI

- **Framework CSS**: Tailwind CSS 4 com plugin Vite
- **UI Components**: Radix UI (acessibilidade nativa)
- **Tema**: Suporte a tema claro/escuro (Next Themes)
- **Ícones**: Lucide React (16+ ícones customizáveis para categorias)
- **Notificações**: Toast com Sonner
- **Cores Customizáveis**: Categorias com 7 cores disponíveis

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento (hot reload, watch mode)
pnpm dev

# Build para produção
pnpm build

# Preview da build de produção
pnpm preview

# Lint com ESLint
pnpm lint
```

## 📋 Fluxo de Dados

```
User Interaction
    ↓
React Component
    ↓
Apollo Client Mutation/Query
    ↓
GraphQL Backend API
    ↓
Zustand Store Update
    ↓
Component Re-render
```

### TypeScript

- **Config**: `tsconfig.json` + `tsconfig.app.json`
- **Strict Mode**: Habilitado
- **Target**: ES2020

### ESLint

- **Config**: `eslint.config.js`
- **Regras**: React Hooks best practices e React Refresh

## 🔄 Fluxos Principais

### 1. Autenticação

- SignUp → Validação → Mutation Register → Store Token
- Login → Validação → Mutation Login → Store Token

### 2. Dashboard

- Load → Query getDashboard → Render Cards + Gráficos

### 3. Transações

- List → Query getTransactions (com filtros) → Table
- Create/Edit → Dialog → Mutation → List Update
- Delete → Confirmação → Mutation → List Update

### 4. Categorias

- List → Query getCategories → Cards
- Create/Edit/Delete → Dialogs → Mutations → List Update

## 🔗 Dependências Externas

A aplicação depende de:

1. **Backend GraphQL** em `http://localhost:4000/graphql`
    - Deve estar rodando para a aplicação funcionar
    - Fornece todas as operações de dados

## 📝 Desenvolvimento

### Adicionando Uma Nova Página

1. Criar arquivo em `src/pages/NovaPage/index.tsx`
2. Importar em `src/App.tsx`
3. Adicionar rota protegida/pública conforme necessário
4. Usar componentes do `ui/` e `components/`

## 📚 Recursos Adicionais

- [React Docs](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Apollo Client Docs](https://www.apollographql.com/docs/react)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
