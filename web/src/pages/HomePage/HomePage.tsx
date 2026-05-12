import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function HomePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-neutral-800 p-10 text-center shadow-lg">
        <h1 className="text-3xl font-semibold text-neutral-100">
          Olá, {user?.name ?? '...'}!
        </h1>
        <p className="text-neutral-400">{user?.email}</p>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg bg-lime-400 px-6 py-2 font-semibold text-neutral-900 hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
