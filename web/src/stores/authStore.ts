import { create } from 'zustand'
import type { User } from '@/lib/auth'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  token: string | null
  user: User | null
  status: AuthStatus
  setToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  status: 'idle',

  setToken(token) {
    localStorage.setItem('accessToken', token)
    set({ token, status: 'authenticated' })
  },

  setUser(user) {
    set({ user })
  },

  logout() {
    localStorage.removeItem('accessToken')
    set({ token: null, user: null, status: 'unauthenticated' })
  },

  hydrate() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      set({ token, status: 'authenticated' })
    } else {
      set({ status: 'unauthenticated' })
    }
  },
}))
