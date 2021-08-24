import { AmsterdamLogo } from '@amsterdam/asc-ui'

import Nav from '../Nav'
import * as Styled from './Header.style'

const Header = () => (
  <Styled.HeaderWrapper>
    <Styled.Header
      tall
      title="Onderzoek en Statistiek"
      homeLink="/"
      navigation={Nav()}
      ssr
      logo={AmsterdamLogo}
    />
  </Styled.HeaderWrapper>
)

export default Header
