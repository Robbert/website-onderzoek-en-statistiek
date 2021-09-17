import { render } from '@testing-library/react'

import Container from './Container'

describe('Container', () => {
  it('should render without crashing', () => {
    const { container } = render(<Container />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
