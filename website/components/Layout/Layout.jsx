import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import * as Styled from './Layout.style'

const Layout = ({ children }) => (
  <Styled.Container>
    <Header
      title="Onderzoek en Statistiek"
      homeLink="/"
    />
    <Styled.Main>
      {children}
    </Styled.Main>
    <Footer />
  </Styled.Container>
)

export default Layout
