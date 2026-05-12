import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LoginForm } from './LoginForm'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('@/lib/auth', () => ({
  login: vi.fn(),
  me: vi.fn(),
}))

import * as authLib from '@/lib/auth'

const renderWithRouter = () => render(<MemoryRouter><LoginForm /></MemoryRouter>)

beforeEach(() => {
  mockNavigate.mockReset()
  vi.mocked(authLib.login).mockReset()
  vi.mocked(authLib.me).mockReset()
})

describe('LoginForm', () => {
  it('renders heading and subtitle', () => {
    renderWithRouter()
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText(/Boas-vindas/)).toBeInTheDocument()
  })

  it('renders email and password fields', () => {
    renderWithRouter()
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('renders remember-me checkbox', () => {
    renderWithRouter()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders social login buttons', () => {
    renderWithRouter()
    expect(screen.getByText('Github')).toBeInTheDocument()
    expect(screen.getByText('Gmail')).toBeInTheDocument()
  })

  it('navigates to /home on successful login', async () => {
    vi.mocked(authLib.login).mockResolvedValue({ accessToken: 'tok123' })
    vi.mocked(authLib.me).mockResolvedValue({ id: '1', name: 'Ada', email: 'ada@test.com' })

    renderWithRouter()
    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'ada@test.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'senha123')
    await userEvent.click(screen.getByRole('button', { name: /Login/ }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/home'))
  })

  it('shows error message on 401', async () => {
    vi.mocked(authLib.login).mockRejectedValue({ status: 401, message: 'Unauthorized' })

    renderWithRouter()
    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'ada@test.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'errada')
    await userEvent.click(screen.getByRole('button', { name: /Login/ }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Email ou senha inválidos.'),
    )
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
