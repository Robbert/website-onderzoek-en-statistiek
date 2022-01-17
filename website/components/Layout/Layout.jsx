import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import * as Styled from './Layout.style'

const Layout = ({ children }) => (
  <Styled.Container>
    <Styled.SkipNavigationLink href="#main" external>
      Direct naar inhoud
    </Styled.SkipNavigationLink>
    <Styled.SkipNavigationLink href="#footer" external>
      Direct naar contactgegevens
    </Styled.SkipNavigationLink>
    <Header title="Onderzoek en Statistiek" homeLink="/" />
    <Styled.Main id="main">{children}</Styled.Main>
    <Footer id="footer" />
  </Styled.Container>
)

export default Layout
