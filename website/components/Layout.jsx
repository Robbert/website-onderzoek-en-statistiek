import { Container } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import Header from './Header/Header'
import Footer from './Footer'

const StyledContainer = styled(Container)`
  background-color: white;
`

const Main = styled.main`
  width: 100%;
  padding-top: 56px;
  padding-bottom: 40px;
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
