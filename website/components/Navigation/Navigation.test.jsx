import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import Navigation from './Navigation'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Navigation', () => {
  useRouter.mockImplementation(() => ({ asPath: '/' }))

  it('should render without crashing', () => {
    render(<Navigation />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
