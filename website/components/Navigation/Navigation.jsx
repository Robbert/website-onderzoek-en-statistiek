import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useActionOnEscape } from '@amsterdam/asc-ui'

import FlyOutButton from '../FlyOutButton/FlyOutButton'
import MegaMenu from '../MegaMenu/MegaMenu'
import HEADER_LINKS from '../../constants/contentLinks'
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
        {HEADER_LINKS.menuItems.map(({ label, slug }) => (
          <Styled.Item key={slug}>
            <Styled.Link
              href={slug}
              aria-current={router.asPath === slug && 'page'}
              variant="inList"
            >
              {label}
            </Styled.Link>
          </Styled.Item>
        ))}
        <Styled.FlyOutItem>
          <FlyOutButton
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            aria-expanded={isOpen}
            aria-controls="menu"
            ref={flyOutButtonRef}
          >
            Menu
          </FlyOutButton>
          <MegaMenu isOpen={isOpen} currentPath={router.asPath} />
        </Styled.FlyOutItem>
      </Styled.List>
    </nav>
  )
}

export default Navigation
