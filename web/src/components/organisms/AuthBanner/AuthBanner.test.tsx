import { render } from '@testing-library/react'
import { AuthBanner } from './AuthBanner'

describe('AuthBanner', () => {
  it('renders an image', () => {
    const { container } = render(<AuthBanner />)
    expect(container.querySelector('img')).toBeInTheDocument()
  })
})
