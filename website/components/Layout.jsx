import { Container } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'

const StyledContainer = styled(Container)`
  background-color: white;
`

const Main = styled.main`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding-left: 44px;
  padding-right: 44px;
  padding-top: 56px;
  padding-bottom: 72px;
`

const Layout = ({ children }) => (
  <StyledContainer maxWidth={1400}>
    <Header />
    <Main>
      {children}
    </Main>
    <Footer />
  </StyledContainer>
)

export default Layout
