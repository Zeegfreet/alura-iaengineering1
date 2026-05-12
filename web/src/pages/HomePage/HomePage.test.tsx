import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { HomePage } from './HomePage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

function renderPage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  mockNavigate.mockReset()
  useAuthStore.setState({
    status: 'authenticated',
    token: 'tok',
    user: { id: '1', name: 'Ada Lovelace', email: 'ada@example.com' },
  })
})

it('renders user name and email', () => {
  renderPage()
  expect(screen.getByText(/Ada Lovelace/)).toBeInTheDocument()
  expect(screen.getByText('ada@example.com')).toBeInTheDocument()
})

it('calls signOut and navigates to /login on button click', async () => {
  renderPage()
  await userEvent.click(screen.getByRole('button', { name: /sair/i }))
  expect(useAuthStore.getState().status).toBe('unauthenticated')
  expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
})
