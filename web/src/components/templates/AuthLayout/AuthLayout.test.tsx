import { render, screen } from '@testing-library/react'
import { AuthLayout } from './AuthLayout'

describe('AuthLayout', () => {
  it('renders children in the content slot', () => {
    render(<AuthLayout><p>Form goes here</p></AuthLayout>)
    expect(screen.getByText('Form goes here')).toBeInTheDocument()
  })
})
