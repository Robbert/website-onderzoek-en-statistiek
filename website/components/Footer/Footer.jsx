import {
  Footer as FooterComponent,
  List,
} from '@amsterdam/asc-ui'
import { Phone, Email, ChevronRight } from '@amsterdam/asc-assets'

import Container from '../Container/Container'
import { GridItem } from '../Grid/Grid.style'
import Heading from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'
import Link from '../Link/Link'
import * as Styled from './Footer.style'

const Footer = () => (
  <FooterComponent>
    <Styled.Grid>
      <GridItem colRange={{ small: 3, large: 4 }}>
        <Heading styleAs="h5" gutterBottom={28} darkBackground>Contact</Heading>
        <Paragraph
          small
          darkBackground
          gutterBottom={16}
        >
          Heeft u een vraag en kunt u het antwoord niet vinden op deze website?
          Neem dan contact met ons op.
        </Paragraph>
        <List>
          <li>
            <Link
              darkBackground
              href="mailto:redactie.ois@amsterdam.nl"
              external
              variant="inList"
            >
              <Styled.Icon size={20}>
                <Email />
              </Styled.Icon>
              E-mail
            </Link>
          </li>
          <li>
            <Link
              darkBackground
              href="tel:+31202510333"
              external
              variant="inList"
            >
              <Styled.Icon size={20}>
                <Phone />
              </Styled.Icon>
              020 251 0333
            </Link>
          </li>
        </List>
      </GridItem>
      <GridItem colRange={{ small: 3, large: 4 }}>
        <Heading styleAs="h5" gutterBottom={28} darkBackground>Panels en enquêtes</Heading>
        <Paragraph gutterBottom={16} small darkBackground>
          Bent u uitgenodigd om mee te doen aan onderzoek
          of wilt u lid worden van ons panel?
        </Paragraph>
        <List>
          <li>
            <Link
              darkBackground
              href="https://www.amsterdam.nl/onderzoek/"
              variant="inList"
              external
            >
              <Styled.Icon size={14}>
                <ChevronRight />
              </Styled.Icon>
              Meedoen aan onderzoek
            </Link>
          </li>
        </List>
      </GridItem>
      <GridItem colRange={{ small: 3, large: 4 }}>
        <Heading
          styleAs="h5"
          gutterBottom={28}
          darkBackground
        >
          Onderzoek en Statistiek
        </Heading>
        <List>
          <li>
            <Link
              darkBackground
              href="/artikel/over-onderzoek-en-statistiek"
              variant="inList"
            >
              <Styled.Icon size={14}>
                <ChevronRight />
              </Styled.Icon>
              Over Onderzoek en Statistiek
            </Link>
          </li>
          <li>
            <Link
              darkBackground
              href="/artikel/veelgestelde-vragen"
              variant="inList"
            >
              <Styled.Icon size={14}>
                <ChevronRight />
              </Styled.Icon>
              Veelgestelde vragen
            </Link>
          </li>
          <li>
            <Link
              darkBackground
              href="https://www.amsterdam.nl/nieuwsbrieven/bestuur-organisatie/dienstverlening/nieuwsbrief-data-informatie/nieuwsbrief-data-informatie/"
              variant="inList"
              external
            >
              <Styled.Icon size={14}>
                <ChevronRight />
              </Styled.Icon>
              Nieuwsbrief
            </Link>
          </li>
          <li>
            <Link
              darkBackground
              href="https://www.amsterdam.nl/bestuur-organisatie/werkenbij/externe/?zoeken=true&zoeken_term=&selectie_zoeken_op_maanden=AllYears&zoek_clustered_keywords_cluster=3669_3670_3671_3672_3673_3674_3675_3676_3677_3678_3679_3717_3681_3682_3683_3684_3685_3686_3688&zoek_clustered_keywords=3717&zoek_clustered_keywords_cluster=3662_3664_3665_3666_3667_3668_3715&zoek_clustered_keywords_cluster=3689_3690_3692_3693"
              variant="inList"
              external
            >
              <Styled.Icon size={14}>
                <ChevronRight />
              </Styled.Icon>
              Vacatures
            </Link>
          </li>
        </List>
      </GridItem>
    </Styled.Grid>
    <Container verticalPadding={0}>
      <Styled.List>
        <Styled.ListItem>
          <Styled.BottomLink
            href="https://www.amsterdam.nl/privacy/"
            external
            variant="inList"
          >
            Privacy
          </Styled.BottomLink>
        </Styled.ListItem>
        <Styled.ListItem>
          <Styled.BottomLink href="/artikel/toegankelijkheidsverklaring" variant="inList">
            Toegankelijkheid
          </Styled.BottomLink>
        </Styled.ListItem>
      </Styled.List>
    </Container>
  </FooterComponent>
)

export default Footer
