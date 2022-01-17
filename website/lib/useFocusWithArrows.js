import { KeyboardKeys } from '@amsterdam/asc-ui/lib/types'

/**
 * Focus on children with arrow keys and home / end buttons.
 *
 * @param ref Component ref
 * @param rotating Jump to first item from last or vice versa
 * @param selectors Supply css selectors for selecting focus group
 */
const useFocusWithArrows = (ref, rotating = false, selectors) => {
  const keyDown = (e) => {
    if (ref.current) {
      const element = ref.current

      const { activeElement } = window.document

      const focusableEls = Array.from(element.querySelectorAll(selectors))
        // filter out elements that are hidden
        .filter((el) => {
          const rect = el.getBoundingClientRect()
          return rect.height !== 0 && rect.width !== 0
        })

      const getIndex = (el) =>
        el && focusableEls.includes(el) ? focusableEls.indexOf(el) : 0

      let el

      switch (e.key) {
        case KeyboardKeys.ArrowRight:
        case KeyboardKeys.ArrowDown: {
          if (getIndex(activeElement) !== focusableEls.length - 1) {
            el = focusableEls[getIndex(activeElement) + 1]
            // If there is nothing focussed yet, set the focus on the first element
            if (activeElement && !focusableEls.includes(activeElement)) {
              ;[el] = focusableEls
            }
          } else if (rotating) {
            ;[el] = focusableEls
          } else {
            el = focusableEls[focusableEls.length - 1]
          }

          break
        }

        case KeyboardKeys.ArrowLeft:
        case KeyboardKeys.ArrowUp: {
          if (getIndex(activeElement) !== 0) {
            el = focusableEls[getIndex(activeElement) - 1]
          } else if (rotating) {
            el = focusableEls[focusableEls.length - 1]
          } else {
            ;[el] = focusableEls
          }
          break
        }

        case KeyboardKeys.Home: {
          ;[el] = focusableEls
          break
        }

        case KeyboardKeys.End: {
          el = focusableEls[focusableEls.length - 1]
          break
        }

        default:
      }

      if (
        (e.key === KeyboardKeys.ArrowDown ||
          e.key === KeyboardKeys.ArrowUp ||
          e.key === KeyboardKeys.ArrowLeft ||
          e.key === KeyboardKeys.ArrowRight ||
          e.key === KeyboardKeys.Home ||
          e.key === KeyboardKeys.End) &&
        el instanceof HTMLElement
      ) {
        el.focus()
        e.preventDefault()
      }
    }
  }

  return {
    keyDown,
  }
}

export default useFocusWithArrows
