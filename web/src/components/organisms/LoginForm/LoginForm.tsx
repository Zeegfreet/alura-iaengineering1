import { useState } from 'react'
import githubIcon from '../../../assets/github_icon.svg'
import googleIcon from '../../../assets/google_icon.svg'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { Divider } from '../../molecules/Divider'
import { FormField } from '../../molecules/FormField'
import { SocialLoginButton } from '../../molecules/SocialLoginButton'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log({ email, password, rememberMe })
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-neutral-100">Login</h1>
        <p className="text-neutral-400">Boas-vindas! Faça seu login.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField
          id="email"
          label="Email ou usuário"
          placeholder="usuario123"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-3">
          <FormField
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              id="remember"
              label="Lembrar-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <button
              type="button"
              className="text-sm text-neutral-300 underline underline-offset-2 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded"
              onClick={() => console.log('forgot-password')}
            >
              Esqueci a senha
            </button>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full font-bold">
          Login →
        </Button>
      </form>

      <Divider>ou entre com outras contas</Divider>

      <div className="flex justify-center gap-6">
        <SocialLoginButton
          icon={githubIcon}
          label="Github"
          onClick={() => console.log('github-login')}
        />
        <SocialLoginButton
          icon={googleIcon}
          label="Gmail"
          onClick={() => console.log('google-login')}
        />
      </div>

      <p className="text-center text-sm text-neutral-400">
        Ainda não tem conta?{' '}
        <button
          type="button"
          className="font-semibold text-lime-400 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded"
          onClick={() => console.log('register')}
        >
          Crie seu cadastro! 📋
        </button>
      </p>
    </div>
  )
}
