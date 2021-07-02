import {
  AmsterdamLogo,
  breakpoint,
  Header as HeaderComponent,
  styles,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import Nav from './Nav'

const HeaderWrapper = styled.section`
  width: 100%;

  @media print {
    display: none;
  }
`

const StyledHeader = styled(HeaderComponent)`
  max-width: 960px;
  a {
    /* Making sure the anchors in the header have a decent clickable area size */
    display: flex;
    height: 100%;
    align-items: start;
  }
  ${styles.HeaderNavigationStyle} {
    @media screen and ${breakpoint('min-width', 'desktop')} {
      margin-left: 29px;
      margin-right: 29px;
    }
    @media screen and ${breakpoint('min-width', 'tabletM')} {
      justify-content: space-between;
    }
  }
`

const Header = () => (
  <HeaderWrapper>
    <StyledHeader
      tall
      title="Onderzoek en Statistiek"
      homeLink="/"
      navigation={Nav()}
      ssr
      logo={AmsterdamLogo}
    />
  </HeaderWrapper>
)

export default Header
