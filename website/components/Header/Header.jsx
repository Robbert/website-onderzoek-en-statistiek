import { useState } from 'react'

import Navigation from '../Navigation/Navigation'
import Backdrop from '../Backdrop/Backdrop'
import * as Styled from './Header.style'

const Header = ({ title, homeLink }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Styled.Container as="header" sticky>
        <Styled.Heading>
          <Styled.Link href={homeLink}>
            <Styled.LargeLogo src="/logo-gemeente-amsterdam-large.svg" alt="Onderzoek en Statistiek Gemeente Amsterdam" />
            <Styled.SmallLogo src="/logo-gemeente-amsterdam-small.svg" alt="Onderzoek en Statistiek Gemeente Amsterdam" />
            {title && <Styled.Text>{title}</Styled.Text>}
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
