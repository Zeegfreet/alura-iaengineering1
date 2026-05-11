# Plano — Tela de Login (CodeConnect)

## Context

A pasta `web/` é um app React 19 + Vite + Tailwind v4 que hoje contém apenas o template demo do Vite e um único atom (`Button`). O usuário pediu uma tela de Login seguindo Atomic Design, baseada num mockup com:

- Layout em duas colunas: banner à esquerda (`banner_login.png`) e formulário à direita;
- Tema escuro com **botão de Login em verde lime**;
- Inputs de email/usuário e senha, checkbox "Lembrar-me", link "Esqueci a senha";
- Botões sociais (GitHub e Google) com ícones já fornecidos em `web/src/assets/`;
- Link "Crie seu cadastro!" no rodapé.

Como a página de Cadastro reusará o mesmo layout, **componentes precisam ser pensados para reuso** (especialmente o template `AuthLayout` e o banner). O Cadastro em si **não** será criado agora.

### Decisões alinhadas com o usuário
1. **Cor do tema**: atualizar `--accent` (e relacionadas) em `index.css` de roxo para verde lime (`#a3e635`) e atualizar o `Button` `primary` para a mesma cor.
2. **Roteamento**: instalar `react-router-dom` e configurar as rotas em `main.tsx`.
3. **Link de cadastro**: renderizado como botão com `onClick` noop + `console.log` (rota `/register` ainda não existe).

---

## Mudanças preparatórias

### 1. Dependências

```bash
cd web && npm install react-router-dom
```

### 2. Tema (web/src/index.css)

- Trocar tokens `--accent`, `--accent-bg`, `--accent-border` em ambos `:root` e `@media (prefers-color-scheme: dark)` para tons verdes (`#a3e635` / lime-400 + opacidades correspondentes).
- **Remover** as restrições de `#root` que travam a largura (`width: 1126px`, `border-inline`, `text-align: center`, `margin: 0 auto`). Substituir por `min-height: 100svh; display: flex; flex-direction: column;` apenas.
- Remover/limpar regras específicas do template demo (`#social .button-icon`, `h1`/`h2` com tamanhos exagerados, `code`, `.counter`) — não serão mais usadas.
- Forçar dark mode no `body` (`background: var(--bg)`) já que o design é só dark.

### 3. Arquivos demo a remover/limpar

- `web/src/App.tsx` — substituído pelo Router (ver passo 9).
- `web/src/App.css` — apagar (não será mais usado).
- Assets demo (`hero.png`, `react.svg`, `vite.svg`) e `public/icons.svg` — manter por enquanto, sem importações.

---

## Componentes (Atomic Design)

### Atoms — `web/src/components/atoms/`

#### `Input/Input.tsx` (novo)
```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
```
- `<input>` com classes Tailwind: fundo cinza-escuro (`bg-neutral-700`), texto claro, sem borda visível, padding confortável, `rounded-md`, `focus-visible:ring-2 ring-lime-400`.
- Encaminha todas as props HTML nativas (placeholder, type, value, onChange, etc.).
- Teste: renderiza, aceita digitação, dispara `onChange`.

#### `Checkbox/Checkbox.tsx` (novo)
```tsx
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}
```
- Wrapper `<label>` contendo `<input type="checkbox">` + texto `label`.
- Estilizado para combinar com o design (caixa verde lime quando marcada).
- Teste: renderiza label, alterna quando clicado.

#### `Label/Label.tsx` (novo)
```tsx
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
```
- `<label>` com classe de texto branco `font-medium text-sm`.
- Teste: renderiza children, associa via `htmlFor`.

#### `Button/Button.tsx` (atualizar)
- **Trocar todas as referências `violet-*` por `lime-*`** no `variantClasses` e no `focus-visible:ring`.
- `primary`: `bg-lime-400 text-neutral-900 hover:bg-lime-500 disabled:bg-lime-200`.
- `secondary` e `ghost`: ajustar para lime equivalente.
- Atualizar `Button.test.tsx` (asserções `toHaveClass('border-violet-600')` → `border-lime-400`).

### Molecules — `web/src/components/molecules/`

#### `FormField/FormField.tsx` (novo)
```tsx
interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
```
- Compõe `Label` + `Input` empilhados verticalmente com `gap-2`.
- `Label` recebe `htmlFor={id}`; `Input` recebe `id`.
- Teste: renderiza label e input corretamente associados via `getByLabelText`.

#### `Divider/Divider.tsx` (novo)
```tsx
interface DividerProps { children?: ReactNode }
```
- Linha horizontal com texto opcional centralizado. Quando há children: `flex items-center gap-3` com `<span class="flex-1 h-px bg-neutral-600" />` em cada lado e o texto no meio.
- Quando vazio: apenas `<hr />`.
- Teste: renderiza com e sem texto.

#### `SocialLoginButton/SocialLoginButton.tsx` (novo)
```tsx
interface SocialLoginButtonProps {
  icon: string  // src do SVG
  label: string
  onClick?: () => void
}
```
- `<button>` com layout vertical: ícone em cima, label embaixo.
- Sem fundo/borda visível, cursor pointer, hover suave (`hover:opacity-80`).
- Teste: renderiza ícone + label, dispara `onClick`.

### Organisms — `web/src/components/organisms/`

#### `LoginForm/LoginForm.tsx` (novo)
- Composição completa do lado direito do mockup:
  - Título "Login" (`<h1>`) + subtítulo "Boas-vindas! Faça seu login.";
  - Dois `FormField` (email/usuário, senha);
  - Linha com `Checkbox` "Lembrar-me" (esquerda) + link "Esqueci a senha" (direita) usando `flex justify-between`;
  - `Button` primary tamanho `lg` com texto "Login →" e `width: 100%`;
  - `Divider` com texto "ou entre com outras contas";
  - Linha com 2× `SocialLoginButton` (Github, Gmail) centralizados;
  - Texto "Ainda não tem conta?" + botão de link "Crie seu cadastro!" verde com onClick `console.log('register')`.
- Estado local: `useState` para email, senha, lembrar-me. `onSubmit` só faz `console.log` por enquanto.
- Teste: renderiza todos os campos, dispara submit ao clicar em Login.

#### `AuthBanner/AuthBanner.tsx` (novo)
- `<aside>` que renderiza `<img src={bannerLogin} alt="" class="w-full h-full object-cover rounded-lg" />`.
- Importa o asset de `web/src/assets/banner_login.png`.
- Teste: renderiza img com src correto.

### Templates — `web/src/components/templates/`

#### `AuthLayout/AuthLayout.tsx` (novo)
```tsx
interface AuthLayoutProps {
  children: ReactNode  // formulário (LoginForm/RegisterForm)
}
```
- Container full-screen `min-h-screen` com `bg-neutral-900` e padding.
- Card central com `grid grid-cols-2 gap-8 p-6 bg-neutral-800 rounded-2xl max-w-5xl mx-auto`.
- Coluna 1: `<AuthBanner />`.
- Coluna 2: `{children}` envolvido em `flex flex-col justify-center`.
- Em telas pequenas (`md:` breakpoint), banner some e formulário ocupa toda a largura.
- Teste: renderiza children no slot correto.

### Pages — `web/src/pages/`

#### `LoginPage/LoginPage.tsx` (novo)
```tsx
export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
```
- Página de rota `/login`.
- Teste: renderiza heading "Login".

---

## Roteamento

### `web/src/main.tsx` (atualizar)

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
```

### `web/src/App.tsx`
- **Apagar** o conteúdo atual; manter o arquivo apenas se quisermos um wrapper, **ou apagar** completamente já que `main.tsx` agora referencia `LoginPage` direto (mais limpo). Vou **apagar** `App.tsx` e `App.css`.

---

## Regras Atomic Design (validação)

- ✅ `Input`, `Checkbox`, `Label`, `Button` (atoms) não importam outros componentes.
- ✅ `FormField`, `Divider`, `SocialLoginButton` (molecules) só importam atoms.
- ✅ `LoginForm`, `AuthBanner` (organisms) importam molecules + atoms.
- ✅ `AuthLayout` (template) importa organisms.
- ✅ `LoginPage` (page) importa template + organism.

---

## Arquivos críticos

| Caminho | Ação |
|---|---|
| `web/package.json` | Adicionar `react-router-dom` |
| `web/src/index.css` | Atualizar tema (verde) + remover restrições `#root` + limpar regras demo |
| `web/src/main.tsx` | Configurar `BrowserRouter` + rotas |
| `web/src/App.tsx` | **Deletar** (não mais necessário) |
| `web/src/App.css` | **Deletar** |
| `web/src/components/atoms/Button/Button.tsx` | Atualizar variantes para lime |
| `web/src/components/atoms/Button/Button.test.tsx` | Atualizar asserções para lime |
| `web/src/components/atoms/Input/{Input.tsx,Input.test.tsx,index.ts}` | Criar |
| `web/src/components/atoms/Checkbox/{Checkbox.tsx,Checkbox.test.tsx,index.ts}` | Criar |
| `web/src/components/atoms/Label/{Label.tsx,Label.test.tsx,index.ts}` | Criar |
| `web/src/components/molecules/FormField/{FormField.tsx,FormField.test.tsx,index.ts}` | Criar |
| `web/src/components/molecules/Divider/{Divider.tsx,Divider.test.tsx,index.ts}` | Criar |
| `web/src/components/molecules/SocialLoginButton/{SocialLoginButton.tsx,SocialLoginButton.test.tsx,index.ts}` | Criar |
| `web/src/components/organisms/LoginForm/{LoginForm.tsx,LoginForm.test.tsx,index.ts}` | Criar |
| `web/src/components/organisms/AuthBanner/{AuthBanner.tsx,AuthBanner.test.tsx,index.ts}` | Criar |
| `web/src/components/templates/AuthLayout/{AuthLayout.tsx,AuthLayout.test.tsx,index.ts}` | Criar |
| `web/src/pages/LoginPage/{LoginPage.tsx,LoginPage.test.tsx,index.ts}` | Criar |

---

## Verificação

1. **Type check + lint**: `cd web && npm run lint` deve passar sem erros.
2. **Testes unitários**: `cd web && npm run test` — todos os testes (Button atualizado + novos atoms/molecules/organisms/template/page) devem passar.
3. **Smoke test no browser**: `npm run dev:web` e abrir `http://localhost:5173/`:
   - Confirmar redirect `/` → `/login`.
   - Layout em duas colunas com banner à esquerda e formulário à direita.
   - Inputs aceitam digitação; checkbox alterna; ícones GitHub/Google visíveis.
   - Clicar em "Login" loga `{ email, password, rememberMe }` no console.
   - Clicar em "Crie seu cadastro!" loga `'register'` no console.
   - Botão e foco do input em verde lime; texto do botão em escuro.
4. **Responsividade**: redimensionar para `< 768px` — banner some, formulário ocupa largura total.
