import { api } from './api'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthError {
  status: number
  message: string
}

function toAuthError(error: unknown): AuthError {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const axiosError = error as { response: { status: number; data: { message: string | string[] } } }
    const status = axiosError.response.status
    const raw = axiosError.response.data?.message
    const message = Array.isArray(raw) ? raw[0] : (raw ?? 'Não foi possível conectar. Tente novamente.')
    return { status, message }
  }
  return { status: 0, message: 'Não foi possível conectar. Tente novamente.' }
}

export async function login(email: string, password: string): Promise<{ accessToken: string }> {
  try {
    const { data } = await api.post<{ data: { accessToken: string } }>('/auth/login', { email, password })
    return data.data
  } catch (error) {
    throw toAuthError(error)
  }
}

export async function register(name: string, email: string, password: string): Promise<User> {
  try {
    const { data } = await api.post<{ data: User }>('/auth/register', { name, email, password })
    return data.data
  } catch (error) {
    throw toAuthError(error)
  }
}

export async function me(): Promise<User> {
  try {
    const { data } = await api.get<{ data: User }>('/auth/me')
    return data.data
  } catch (error) {
    throw toAuthError(error)
  }
}
