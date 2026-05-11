import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders label text', () => {
    render(<Checkbox label="Lembrar-me" />)
    expect(screen.getByText('Lembrar-me')).toBeInTheDocument()
  })

  it('toggles when clicked', async () => {
    render(<Checkbox label="Lembrar-me" id="remember" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
