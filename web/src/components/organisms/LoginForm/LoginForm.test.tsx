import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders heading and subtitle', () => {
    render(<LoginForm />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText(/Boas-vindas/)).toBeInTheDocument()
  })

  it('renders email and password fields', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('renders remember-me checkbox', () => {
    render(<LoginForm />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders social login buttons', () => {
    render(<LoginForm />)
    expect(screen.getByText('Github')).toBeInTheDocument()
    expect(screen.getByText('Gmail')).toBeInTheDocument()
  })

  it('logs form data on submit', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<LoginForm />)
    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'user@test.com')
    await userEvent.click(screen.getByRole('button', { name: /Login/ }))
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'user@test.com' }),
    )
    consoleSpy.mockRestore()
  })
})
