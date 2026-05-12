import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RegisterPage } from './RegisterPage'

it('renders the register page with form', () => {
  render(<MemoryRouter><RegisterPage /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: /cadastro/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
})
