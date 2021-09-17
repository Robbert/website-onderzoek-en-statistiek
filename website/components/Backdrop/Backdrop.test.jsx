import { render } from '@testing-library/react'

import Backdrop from './Backdrop'

describe('Backdrop', () => {
  it('should render without crashing', () => {
    const { container } = render(<Backdrop />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
