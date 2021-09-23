import {
  CompactThemeProvider,
  Footer as FooterComponent,
  List,
  ListItem,
  Link as LinkASC,
  Heading,
  Paragraph,
} from '@amsterdam/asc-ui'
import { Phone, Email } from '@amsterdam/asc-assets'

import Container from '../Container/Container'
import LinkNext from '../Link/Link'
import * as Styled from './Footer.style'

const Footer = () => (
  <CompactThemeProvider>
    <FooterComponent>
      <Styled.Container>
        <Styled.Section>
          <Heading styleAs="h2" color="bright" gutterBottom={28}>Contact</Heading>
          <Paragraph>
            Heeft u een vraag en kunt u het antwoord niet vinden op deze website?
            Neem dan contact met ons op.
          </Paragraph>
          <List>
            <ListItem>
              <LinkASC darkBackground href="mailto:redactie.ois@amsterdam.nl">
                <Styled.Icon size={20}>
                  <Email />
                </Styled.Icon>
                <span>E-mail</span>
              </LinkASC>
            </ListItem>
            <ListItem>
              <LinkASC darkBackground href="tel:+31202510333">
                <Styled.Icon size={20}>
                  <Phone />
                </Styled.Icon>
                <span>020 251 0333</span>
              </LinkASC>
            </ListItem>
          </List>
        </Styled.Section>
        <Styled.Section>
          <Heading styleAs="h2" color="bright" gutterBottom={28}>Panels en enquêtes</Heading>
          <Paragraph gutterBottom={16}>
            Bent u uitgenodigd om mee te doen aan onderzoek
            of wilt u lid worden van ons panel?
          </Paragraph>
          <List>
            <ListItem>
              <LinkASC darkBackground href="https://www.amsterdam.nl/onderzoek/" inList>
                Meedoen aan onderzoek
              </LinkASC>
            </ListItem>
          </List>
        </Styled.Section>
        <Styled.Section>
          <Heading styleAs="h2" color="bright" gutterBottom={28}>Onderzoek en Statistiek</Heading>
          <List>
            <ListItem>
              <LinkNext darkBackground href="/artikel/over-onderzoek-en-statistiek" inList>
                Over Onderzoek en Statistiek
              </LinkNext>
            </ListItem>
            <ListItem>
              <LinkNext darkBackground href="/artikel/veelgestelde-vragen" inList>
                Veelgestelde vragen
              </LinkNext>
            </ListItem>
            <ListItem>
              <LinkASC darkBackground href="https://www.amsterdam.nl/nieuwsbrieven/bestuur-organisatie/dienstverlening/nieuwsbrief-data-informatie/nieuwsbrief-data-informatie/" inList>
                Nieuwsbrief
              </LinkASC>
            </ListItem>
            <ListItem>
              <LinkASC darkBackground href="https://www.amsterdam.nl/bestuur-organisatie/werkenbij/externe/?zoeken=true&zoeken_term=&selectie_zoeken_op_maanden=AllYears&zoek_clustered_keywords_cluster=3669_3670_3671_3672_3673_3674_3675_3676_3677_3678_3679_3717_3681_3682_3683_3684_3685_3686_3688&zoek_clustered_keywords=3717&zoek_clustered_keywords_cluster=3662_3664_3665_3666_3667_3668_3715&zoek_clustered_keywords_cluster=3689_3690_3692_3693" inList>
                Vacatures
              </LinkASC>
            </ListItem>
          </List>
        </Styled.Section>
      </Styled.Container>
      <Container verticalPadding={0}>
        <Styled.List>
          <Styled.ListItem>
            <LinkASC href="https://www.amsterdam.nl/privacy/">
              Privacy
            </LinkASC>
          </Styled.ListItem>
          <Styled.ListItem>
            <LinkNext href="/artikel/toegankelijkheidsverklaring">
              Toegankelijkheid
            </LinkNext>
          </Styled.ListItem>
        </Styled.List>
      </Container>
    </FooterComponent>
  </CompactThemeProvider>
)

export default Footer
