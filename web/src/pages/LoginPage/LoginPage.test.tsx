import { render, screen } from '@testing-library/react'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('renders the Login heading', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })
})
