import { useEffect, useState, useRef } from 'react'
import { useMatchMedia } from '@amsterdam/asc-ui'
import { useRouter } from 'next/router'

import { GridItem } from '../Grid/Grid.style'
import Navigation from '../Navigation/Navigation'
import Backdrop from '../Backdrop/Backdrop'
import * as Styled from './Header.style'

const Header = ({ title, homeLink }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [titleOnScreen, setTitleOnScreen] = useState()
  const router = useRouter()
  const observer = useRef()
  const isMobile = useMatchMedia({ maxBreakpoint: 'laptop' })

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([el]) => setTitleOnScreen(el.isIntersecting),
      { rootMargin: '-100px' },
    )
    return () => observer.current.disconnect()
  }, [])

  useEffect(() => {
    const homePageTitle = document.getElementById('homePageTitle')
    if (!homePageTitle) return
    observer.current.observe(homePageTitle)
  }, [router.asPath])

  return (
    <>
      <Styled.Container as="header" sticky>
        <GridItem colRange={8}>
          <Styled.Heading styleAs="h3">
            <Styled.Link
              href={homeLink}
              className="analytics-sitelogo"
              withTitle={title && (!titleOnScreen || isMobile[0])}
            >
              <Styled.LargeLogo src="/logo-gemeente-amsterdam-large.svg" alt="Onderzoek en Statistiek Gemeente Amsterdam" />
              <Styled.SmallLogo src="/logo-gemeente-amsterdam-small.svg" alt="Onderzoek en Statistiek Gemeente Amsterdam" />
              {title && (!titleOnScreen || isMobile[0]) && <Styled.Text>{title}</Styled.Text>}
            </Styled.Link>
          </Styled.Heading>
        </GridItem>
        <Styled.NavGridItem colRange={4}>
          <Navigation
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Styled.NavGridItem>
      </Styled.Container>
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  )
}

export default Header
