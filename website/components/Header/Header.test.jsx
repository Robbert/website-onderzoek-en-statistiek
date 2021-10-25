import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import Header from './Header'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Header', () => {
  it('should render without crashing', () => {
    useRouter.mockImplementation(() => ({ asPath: '/' }))

    render(<Header homeLink="www.test.nl" />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
