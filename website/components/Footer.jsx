import {
  CompactThemeProvider,
  Footer as FooterComponent,
  FooterTop,
  FooterSection,
  FooterBottom,
  List,
  ListItem,
  Link,
  Column,
  Paragraph,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from './ContentContainer'

const FooterBottomContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const Footer = () => (
  <CompactThemeProvider>
    <FooterComponent>
      <FooterTop>
        <ContentContainer halign="flex-start">
          <Column
            wrap
            span={{
              small: 1,
              medium: 2,
              big: 3,
              large: 6,
              xLarge: 6,
            }}
          >
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
          </Column>
          <Column
            wrap
            span={{
              small: 1,
              medium: 2,
              big: 3,
              large: 6,
              xLarge: 6,
            }}
          >
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
          </Column>
        </ContentContainer>
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
