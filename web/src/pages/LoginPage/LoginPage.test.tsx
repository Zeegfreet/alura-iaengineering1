import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('renders the Login heading', () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })
})
