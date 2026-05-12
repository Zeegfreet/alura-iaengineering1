# Projeto Full-Stack com Autenticação JWT

> Projeto desenvolvido durante a aula de **Prompt Engineering** da [Alura](https://www.alura.com.br).

Aplicação full-stack com autenticação completa, construída como monorepo npm workspaces. O backend expõe uma API REST em NestJS com JWT, e o frontend é uma SPA em React com fluxo de login e cadastro.

---

## Tecnologias

### Backend (`api/`)
- **NestJS 11** — framework Node.js para APIs REST
- **JWT** (`@nestjs/jwt`) — autenticação stateless com tokens
- **bcryptjs** — hash seguro de senhas
- **class-validator / class-transformer** — validação de DTOs
- **Swagger** (`@nestjs/swagger`) — documentação automática da API
- **Jest** — testes unitários e e2e

### Frontend (`web/`)
- **React 19** — interface de usuário
- **Vite** — bundler e dev server
- **TypeScript** — tipagem estática
- **Tailwind CSS v4** — estilização utilitária
- **React Router v7** — roteamento client-side
- **Zustand** — gerenciamento de estado global
- **Axios** — cliente HTTP
- **Vitest + React Testing Library** — testes de componentes

---

## Estrutura do Projeto

```
.
├── api/                        # Backend NestJS
│   └── src/
│       ├── auth/               # Módulo de autenticação (login, registro, guard JWT)
│       │   ├── dto/            # Data Transfer Objects (LoginDto, RegisterDto)
│       │   ├── decorators/     # @CurrentUser decorator
│       │   └── responses/      # Tipos de resposta da API
│       └── users/              # Módulo de usuários
└── web/                        # Frontend React
    └── src/
        ├── components/
        │   ├── atoms/          # Button, Input, Label, Checkbox, ProtectedRoute
        │   ├── molecules/      # FormField, Divider, SocialLoginButton
        │   ├── organisms/      # LoginForm, RegisterForm, AuthBanner
        │   └── templates/      # AuthLayout
        ├── pages/              # LoginPage, RegisterPage, HomePage
        ├── hooks/              # useAuth
        ├── stores/             # authStore (Zustand)
        └── lib/                # api.ts (Axios), auth.ts (helpers)
```

---

## Pré-requisitos

- Node.js 20+
- npm 10+

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/Zeegfreet/alura-iaengineering1.git
cd alura-iaengineering1

# Instale todas as dependências
npm run install:all
```

---

## Executando

```bash
# Inicia backend (porta 3000) e frontend (porta 5173) simultaneamente
npm run dev

# Apenas o backend
npm run dev:api

# Apenas o frontend
npm run dev:web
```

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api`
- Frontend: `http://localhost:5173`

---

## Endpoints da API

Todas as rotas são prefixadas com `/v1`.

| Método | Rota              | Descrição                        | Auth |
|--------|-------------------|----------------------------------|------|
| POST   | `/v1/auth/register` | Cadastra um novo usuário        | Não  |
| POST   | `/v1/auth/login`    | Autentica e retorna um JWT      | Não  |
| GET    | `/v1/auth/me`       | Retorna o usuário autenticado   | Sim  |

---

## Testes

```bash
# Todos os testes
npm run test

# Apenas API
npm run test:api

# Apenas frontend
npm run test:web

# Frontend em modo watch
cd web && npm run test:watch

# Testes e2e da API
cd api && npm run test:e2e
```

---

## Build

```bash
npm run build
```

Os artefatos da API ficam em `api/dist/` e os do frontend em `web/dist/`.
