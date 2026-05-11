import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders text when provided', () => {
    render(<Divider>ou entre com outras contas</Divider>)
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })

  it('renders a plain hr when no children', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })
})
