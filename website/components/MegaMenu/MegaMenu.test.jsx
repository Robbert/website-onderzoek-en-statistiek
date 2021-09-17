import { render, screen } from '@testing-library/react'

import MegaMenu from './MegaMenu'

describe('Mega menu', () => {
  it('should render without crashing', () => {
    render(<MegaMenu isOpen />)
    expect(screen.getByRole('heading', { name: 'Thema‘s' })).toBeInTheDocument()
  })
})
