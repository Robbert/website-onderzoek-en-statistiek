import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import Navigation from '../Navigation/Navigation'
import Backdrop from '../Backdrop/Backdrop'
import * as Styled from './Header.style'

const Header = ({ title, homeLink }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [titleOnScreen, setTitleOnScreen] = useState()
  const router = useRouter()
  const observer = useRef()

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
        <Styled.Heading>
          <Styled.Link href={homeLink} className="analytics-sitelogo">
            <Styled.LargeLogo src="/logo-gemeente-amsterdam-large.svg" alt="Onderzoek en Statistiek Gemeente Amsterdam" />
            <Styled.SmallLogo src="/logo-gemeente-amsterdam-small.svg" alt="Onderzoek en Statistiek Gemeente Amsterdam" />
            {title && !titleOnScreen && <Styled.Text>{title}</Styled.Text>}
          </Styled.Link>
        </Styled.Heading>
        <Navigation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Styled.Container>
      <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  )
}

export default Header
