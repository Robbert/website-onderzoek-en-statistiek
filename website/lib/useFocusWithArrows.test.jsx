/* eslint-disable react/display-name */
import { useRef } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { KeyboardKeys } from '@amsterdam/asc-ui/lib/types'

import useFocusWithArrows from './useFocusWithArrows'

describe('useFocusWithArrows', () => {
  const onFocusOneMock = jest.fn()
  const onFocusTwoMock = jest.fn()
  const onFocusThreeMock = jest.fn()
  const getComponent =
    (rotate = undefined) =>
    () => {
      const ref = useRef(null)
      const { keyDown } = useFocusWithArrows(ref, rotate, 'button')
      return (
        <div onKeyDown={keyDown} tabIndex={0} role="menu" ref={ref}>
          <button onFocus={onFocusOneMock} type="button">
            One
          </button>
          <button onFocus={onFocusTwoMock} type="button">
            Two
          </button>
          <button onFocus={onFocusThreeMock} type="button">
            Three
          </button>
        </div>
      )
    }

  afterEach(() => {
    onFocusOneMock.mockReset()
    onFocusTwoMock.mockReset()
    onFocusThreeMock.mockReset()
  })

  // mock getBoundingClientRect, because the default returns all 0's
  Element.prototype.getBoundingClientRect = () => ({
    width: 1,
    heigth: 1,
  })

  it('should set the focus when using the Arrow keys', () => {
    const Component = getComponent()
    const { container } = render(<Component />)
    const { firstChild } = container
    expect(onFocusOneMock).not.toHaveBeenCalled()

    // 4 times, so we can check if there are no other elements focussed after reaching the last one
    Array.from(Array(4).keys()).forEach(() => {
      fireEvent.keyDown(firstChild, {
        key: KeyboardKeys.ArrowDown,
      })
    })

    expect(onFocusOneMock).toHaveBeenCalledTimes(1)
    expect(onFocusTwoMock).toHaveBeenCalledTimes(1)
    expect(onFocusThreeMock).toHaveBeenCalledTimes(1)

    // Same here
    Array.from(Array(4).keys()).forEach(() => {
      fireEvent.keyDown(firstChild, {
        key: KeyboardKeys.ArrowUp,
      })
    })
    expect(onFocusTwoMock).toHaveBeenCalledTimes(2)
    expect(onFocusOneMock).toHaveBeenCalledTimes(2)
  })

  it('should rotate the focussed elements', () => {
    const Component = getComponent(true)
    const { container } = render(<Component />)
    const { firstChild } = container

    Array.from(Array(9).keys()).forEach(() => {
      fireEvent.keyDown(firstChild, {
        key: KeyboardKeys.ArrowDown,
      })
    })

    expect(onFocusOneMock).toHaveBeenCalledTimes(3)

    Array.from(Array(9).keys()).forEach(() => {
      fireEvent.keyDown(firstChild, {
        key: KeyboardKeys.ArrowUp,
      })
    })
    expect(onFocusOneMock).toHaveBeenCalledTimes(6)
  })
})
