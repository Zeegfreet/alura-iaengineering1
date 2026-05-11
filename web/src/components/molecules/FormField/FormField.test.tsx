import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renders label and input associated via htmlFor', () => {
    render(<FormField id="email" label="Email ou usuário" />)
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const onChange = vi.fn()
    render(<FormField id="email" label="Email" onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('Email'), 'test')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders as password type when specified', () => {
    render(<FormField id="pwd" label="Senha" type="password" />)
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })
})
