import * as authService from '@/lib/auth'
import type { AuthError } from '@/lib/auth'
import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const { token, user, status, logout } = useAuthStore()

  async function signIn(credentials: { email: string; password: string }): Promise<void> {
    useAuthStore.getState().setToken('')
    const { accessToken } = await authService.login(credentials.email, credentials.password)
    useAuthStore.getState().setToken(accessToken)
    const fetchedUser = await authService.me()
    useAuthStore.getState().setUser(fetchedUser)
  }

  async function signUp(data: { name: string; email: string; password: string }): Promise<void> {
    await authService.register(data.name, data.email, data.password)
    await signIn({ email: data.email, password: data.password })
  }

  function signOut(): void {
    logout()
  }

  return { token, user, status, signIn, signUp, signOut }
}

export type { AuthError }
