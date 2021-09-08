import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import * as Styled from './Layout.style'

const Layout = ({ children }) => (
  <Styled.Container maxWidth={1400}>
    <Header />
    <Styled.Main>
      {children}
    </Styled.Main>
    <Footer />
  </Styled.Container>
)

export default Layout
