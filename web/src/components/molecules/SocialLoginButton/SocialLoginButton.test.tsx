import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLoginButton } from './SocialLoginButton'

describe('SocialLoginButton', () => {
  it('renders the label', () => {
    render(<SocialLoginButton icon="/github.svg" label="Github" />)
    expect(screen.getByText('Github')).toBeInTheDocument()
  })

  it('renders the icon img', () => {
    const { container } = render(<SocialLoginButton icon="/github.svg" label="Github" />)
    expect(container.querySelector('img')).toHaveAttribute('src', '/github.svg')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<SocialLoginButton icon="/github.svg" label="Github" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
