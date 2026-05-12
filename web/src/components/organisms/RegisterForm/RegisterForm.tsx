import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import githubIcon from '../../../assets/github_icon.svg'
import googleIcon from '../../../assets/google_icon.svg'
import { useAuth } from '@/hooks/useAuth'
import type { AuthError } from '@/hooks/useAuth'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { Divider } from '../../molecules/Divider'
import { FormField } from '../../molecules/FormField'
import { SocialLoginButton } from '../../molecules/SocialLoginButton'

function errorMessage(error: AuthError): string {
  if (error.status === 409) return 'Este email já está em uso.'
  if (error.status === 400) return error.message
  return 'Não foi possível conectar. Tente novamente.'
}

export function RegisterForm() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await signUp({ name, email, password })
      navigate('/home')
    } catch (err) {
      setError(errorMessage(err as AuthError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-neutral-100">Cadastro</h1>
        <p className="text-lg text-neutral-300">Olá! Preencha seus dados.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField
          id="name"
          label="Nome"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Digite seu email"
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

          <Checkbox
            id="remember"
            label="Lembrar-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar →'}
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
        Já tem conta?{' '}
        <button
          type="button"
          className="font-semibold text-lime-400 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded"
          onClick={() => navigate('/login')}
        >
          Faça seu login! →
        </button>
      </p>
    </div>
  )
}
