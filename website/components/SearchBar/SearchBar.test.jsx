import { render, screen, fireEvent } from '@testing-library/react'

import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('should render search box and icon', () => {
    const { container } = render(<SearchBar />)
    const icon = container.querySelector('span')

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('should render close button when SearchBox has text', () => {
    render(<SearchBar value="text" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should call onChange function when input value changes', () => {
    const mockFn = jest.fn()
    render(<SearchBar onChange={mockFn} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'text' } })

    expect(mockFn).toHaveBeenCalled()
  })

  it('should call onChange function when close button is clicked', () => {
    const mockFn = jest.fn()
    render(<SearchBar value="text" onChange={mockFn} />)
    const closeButton = screen.getByRole('button')

    fireEvent.click(closeButton)

    expect(mockFn).toHaveBeenCalled()
  })
})
