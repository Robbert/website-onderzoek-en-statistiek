import { render, screen } from '@testing-library/react'

import FlyOutButton from './FlyOutButton'

describe('FlyOutButton', () => {
  it('should render without crashing', () => {
    render(<FlyOutButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
