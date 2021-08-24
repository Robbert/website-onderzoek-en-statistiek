import { render, screen } from '@testing-library/react'

import Header from './Header'

describe('Header', () => {
  it('should render without crashing', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
