# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

npm workspaces monorepo with two packages:
- `api/` — NestJS backend (TypeScript), runs on port 3000
- `web/` — React 19 + Vite frontend (TypeScript, Tailwind CSS v4)

## Commands

Run from the repo root unless noted.

| Task | Command |
|------|---------|
| Dev (both) | `npm run dev` |
| Dev (API only) | `npm run dev:api` |
| Dev (web only) | `npm run dev:web` |
| Build all | `npm run build` |
| Test all | `npm run test` |
| Test API only | `npm run test:api` |
| Test web only | `npm run test:web` |
| Watch web tests | `cd web && npm run test:watch` |
| Run a single web test file | `cd web && npx vitest run src/components/atoms/Button/Button.test.tsx` |
| API e2e tests | `cd api && npm run test:e2e` |
| Run a single API test | `cd api && npx jest --testPathPattern=<filename>` |
| API lint | `cd api && npm run lint` |
| API format | `cd api && npm run format` |
| Web lint | `cd web && npm run lint` |
| Install all deps | `npm run install:all` |

## Frontend Architecture

### Atomic Design

Components live in `web/src/components/` organized by atomic level:

```
components/
  atoms/       # Indivisible UI elements: Button, Input, Badge, Avatar
  molecules/   # Combinations of atoms: FormField, SearchBar, Card
  organisms/   # Complex sections: Header, Sidebar, DataTable
  templates/   # Page-level layouts with slots, no real data
pages/         # Route-level components that compose templates with real data
```

Each component lives in its own folder with three files:

```
atoms/Button/
  Button.tsx       # Component implementation
  Button.test.tsx  # Tests
  index.ts         # Re-export: export { Button } from './Button'
```

**Rules:**
- Atoms must not import molecules or organisms.
- Molecules import only atoms.
- Organisms may import molecules and atoms.
- Templates import organisms; pages import templates.
- Every component must have a test file covering its essential behavior.

### Styling

Tailwind CSS v4 is configured via the `@tailwindcss/vite` plugin. The `@import "tailwindcss"` directive is at the top of `web/src/index.css`.

Use Tailwind utility classes directly in JSX. Do not create `.css` files for component styles.

### Testing (web)

Stack: Vitest + React Testing Library + `@testing-library/user-event`.

- Test files use `.test.tsx` suffix alongside the component file.
- `vi` (mock), `describe`, `it`, `expect` are available as globals (no import needed).
- `@testing-library/jest-dom` matchers (`toBeInTheDocument`, `toHaveClass`, etc.) are auto-imported via `web/src/test/setup.ts`.
- Every component needs at least one test covering its core rendering and interaction.

```tsx
// Minimal test example
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

it('calls onClick when clicked', async () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click me</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalledOnce()
})
```

## Backend Architecture

### REST API Adherence

**API (NestJS)** follows standard NestJS conventions: each feature has a module (`*.module.ts`), controller (`*.controller.ts`), and service (`*.service.ts`). Unit tests are `*.spec.ts` alongside source files; e2e tests in `api/test/`.

**Resource naming:** plural nouns, no verbs.
```
GET    /v1/users          # list
POST   /v1/users          # create
GET    /v1/users/:id      # read
PATCH  /v1/users/:id      # partial update
DELETE /v1/users/:id      # delete
```

**HTTP status codes:**
- `200 OK` — successful GET/PATCH
- `201 Created` — successful POST (include `Location` header)
- `204 No Content` — successful DELETE
- `400 Bad Request` — validation error
- `401 Unauthorized` — missing/invalid auth
- `403 Forbidden` — insufficient permissions
- `404 Not Found` — resource does not exist
- `422 Unprocessable Entity` — business rule violation

**Response envelope:**
```json
// Single resource
{ "data": { "id": "1", "name": "..." } }

// List
{ "data": [...], "meta": { "total": 100, "page": 1, "limit": 20 } }
```

**Error response:**
```json
{ "error": { "code": "USER_NOT_FOUND", "message": "User not found" } }
```

**NestJS implementation rules:**
- Enable `ValidationPipe` globally in `main.ts` with `whitelist: true` and `transform: true`.
- Use DTOs (decorated with `class-validator`) for all request bodies.
- Use `@HttpCode()` for responses that differ from the controller default.
- Prefix all routes with `/v1` (set globally in `main.ts` via `app.setGlobalPrefix('v1')`).

## Git — Conventional Commits

Format: `type(scope): description`

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change without feature/fix |
| `test` | Adding or fixing tests |
| `docs` | Documentation only |
| `chore` | Tooling, config, dependencies |
| `style` | Formatting, no logic change |

Scopes: `api`, `web`, or omit for root-level changes.

```
feat(web): add Button atom with primary and secondary variants
fix(api): return 404 when user not found instead of 500
test(web): add FormField molecule tests
chore: add Tailwind CSS and Vitest to web workspace
```
