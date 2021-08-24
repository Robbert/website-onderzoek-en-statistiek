import {
  CompactThemeProvider,
  Footer as FooterComponent,
  FooterTop,
  FooterSection,
  FooterBottom,
  List,
  ListItem,
  Link,
  Paragraph,
  breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from './ContentContainer'

const StyledContentContainer = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: auto;
  }
`

const FooterBottomContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const Footer = () => (
  <CompactThemeProvider>
    <FooterComponent>
      <FooterTop>
        <StyledContentContainer>
          <FooterSection title="Colofon" ssr>
            <List>
              <ListItem>
                <Link darkBackground href="/" inList>
                  Over Onderzoek en Statistiek
                </Link>
              </ListItem>
              <ListItem>
                <Link darkBackground href="/" inList>
                  Contact
                </Link>
              </ListItem>
            </List>
          </FooterSection>
          <FooterSection title="Panels en enquêtes" ssr>
            <Paragraph gutterBottom={8}>
              Bent u uitgenodigd om mee te doen aan onderzoek
              of wilt u lid worden van ons panel?
            </Paragraph>
            <List>
              <ListItem>
                <Link darkBackground href="https://www.amsterdam.nl/onderzoek/" inList>
                  Meedoen aan onderzoek
                </Link>
              </ListItem>
            </List>
          </FooterSection>
        </StyledContentContainer>
      </FooterTop>
      <FooterBottomContainer>
        <FooterBottom>
          <Link href="/" inList>
            Privacy and cookies
          </Link>
        </FooterBottom>
      </FooterBottomContainer>
    </FooterComponent>
  </CompactThemeProvider>
)

export default Footer
