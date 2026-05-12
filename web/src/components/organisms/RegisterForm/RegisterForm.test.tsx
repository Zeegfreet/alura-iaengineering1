import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('@/lib/auth', () => ({
  register: vi.fn(),
  login: vi.fn(),
  me: vi.fn(),
}))

import * as authLib from '@/lib/auth'

const renderWithRouter = () => render(<MemoryRouter><RegisterForm /></MemoryRouter>)

beforeEach(() => {
  mockNavigate.mockReset()
  vi.mocked(authLib.register).mockReset()
  vi.mocked(authLib.login).mockReset()
  vi.mocked(authLib.me).mockReset()
})

it('renders all form fields', () => {
  renderWithRouter()
  expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
})

it('navigates to /home on successful registration', async () => {
  vi.mocked(authLib.register).mockResolvedValue({ id: '1', name: 'Maria Silva', email: 'maria@example.com' })
  vi.mocked(authLib.login).mockResolvedValue({ accessToken: 'tok123' })
  vi.mocked(authLib.me).mockResolvedValue({ id: '1', name: 'Maria Silva', email: 'maria@example.com' })

  renderWithRouter()
  await userEvent.type(screen.getByLabelText(/nome/i), 'Maria Silva')
  await userEvent.type(screen.getByLabelText(/email/i), 'maria@example.com')
  await userEvent.type(screen.getByLabelText(/senha/i), 'secret123')
  await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/home'))
})

it('shows error message when email is already in use (409)', async () => {
  vi.mocked(authLib.register).mockRejectedValue({ status: 409, message: 'Email already in use' })

  renderWithRouter()
  await userEvent.type(screen.getByLabelText(/nome/i), 'Maria Silva')
  await userEvent.type(screen.getByLabelText(/email/i), 'maria@example.com')
  await userEvent.type(screen.getByLabelText(/senha/i), 'secret123')
  await userEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() =>
    expect(screen.getByRole('alert')).toHaveTextContent('Este email já está em uso.'),
  )
  expect(mockNavigate).not.toHaveBeenCalled()
})

it('toggles the remember-me checkbox', async () => {
  renderWithRouter()
  const checkbox = screen.getByRole('checkbox', { name: /lembrar-me/i })
  expect(checkbox).not.toBeChecked()
  await userEvent.click(checkbox)
  expect(checkbox).toBeChecked()
})

it('renders link to login page', () => {
  renderWithRouter()
  expect(screen.getByRole('button', { name: /faça seu login/i })).toBeInTheDocument()
})
