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
} from '@amsterdam/asc-ui'

import * as Styled from './Footer.style'

const Footer = () => (
  <CompactThemeProvider>
    <FooterComponent>
      <FooterTop>
        <Styled.Container>
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
        </Styled.Container>
      </FooterTop>
      <Styled.BottomContainer>
        <FooterBottom>
          <Link href="/" inList>
            Privacy and cookies
          </Link>
        </FooterBottom>
      </Styled.BottomContainer>
    </FooterComponent>
  </CompactThemeProvider>
)

export default Footer
