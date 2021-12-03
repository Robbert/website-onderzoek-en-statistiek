import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useActionOnEscape } from '@amsterdam/asc-ui'

import FlyOutButton from '../FlyOutButton/FlyOutButton'
import MegaMenu from '../MegaMenu/MegaMenu'
import useFocusWithArrows from '../../lib/useFocusWithArrows'
import * as Styled from './Navigation.style'

const Navigation = ({ isOpen, setIsOpen }) => {
  const menuRef = useRef()
  const flyOutButtonRef = useRef()
  const router = useRouter()

  // close the menu when navigating to a different page
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [router.asPath])

  // close the menu and focus on flyOutButton on 'Escape' button press
  const { onKeyDown: closeAndFocusOnEscape } = useActionOnEscape(() => {
    setIsOpen(false)
    return isOpen && flyOutButtonRef.current.focus()
  })

  // focus on menu items with arrow keys
  const menuItemSelectors = [
    'a[href]:not([disabled])',
    'button:not([disabled])',
  ]

  const { keyDown: focusMenuWithArrowKeys } = useFocusWithArrows(
    menuRef, false, menuItemSelectors,
  )

  return (
    <nav aria-label="Hoofdmenu">
      <Styled.List
        ref={menuRef}
        onKeyDown={(e) => {
          closeAndFocusOnEscape(e)
          focusMenuWithArrowKeys(e)
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsOpen(false)
          }
        }}
      >
        <Styled.Item>
          <Styled.Link
            href="/zoek"
            aria-current={router.asPath === '/zoek' && 'page'}
            variant="inList"
          >
            Zoeken
          </Styled.Link>
        </Styled.Item>
        <li>
          <FlyOutButton
            type="button"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            aria-expanded={isOpen}
            aria-controls="menu"
            ref={flyOutButtonRef}
            small
          >
            Menu
          </FlyOutButton>
          <MegaMenu isOpen={isOpen} currentPath={router.asPath} />
        </li>
      </Styled.List>
    </nav>
  )
}

export default Navigation
