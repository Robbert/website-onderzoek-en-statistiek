import { useRouter } from 'next/router'

import Seo from '../components/Seo/Seo'
import { Grid, GridItem } from '../components/Grid/Grid.style'
import Heading from '../components/Heading/Heading'
import Paragraph from '../components/Paragraph/Paragraph'
import Link from '../components/Link/Link'
import CONTENT_TYPES from '../constants/contentTypes'

const searchLinkLogic = (path) => {
  const segments = path.substring(1).split(/-|\//) // split path on forward slashes and minus signs
  const contentType = Object.values(CONTENT_TYPES).find((item) => item.name === segments[0])
  const isTheme = segments[0] === 'thema'

  if (isTheme) {
    return {
      type: null,
      text: segments.slice(1).join(' '),
      path: `/zoek?tekst=${segments.slice(1).join('+')}`,
    }
  }

  if (contentType) {
    return {
      type: contentType.plural !== 'interactief' ? contentType.plural : 'interactieve publicaties',
      text: segments.slice(1).join(' '),
      path: `/zoek?categorie=${segments[0]}&tekst=${segments.slice(1).join('+')}`,
    }
  }

  return {
    type: null,
    text: segments.join(' '),
    path: `/zoek?tekst=${segments.join('+')}`,
  }
}

const Custom404 = () => {
  const router = useRouter()
  const searchLinkObject = searchLinkLogic(router.asPath)

  return (
    <>
      <Seo title="Pagina niet gevonden" />
      <Grid>
        <GridItem colRange={{ small: 4, large: 7 }} colStart={{ small: 1, large: 3 }}>
          <Heading gutterBottom={40}>Pagina niet gevonden</Heading>
          <Paragraph gutterBottom={24}>
            Helaas, deze pagina bestaat niet.
          </Paragraph>
          <Link href={searchLinkObject.path}>
            {`Zoek naar ${searchLinkObject.type ? `${searchLinkObject.type} met de tekst` : ''} '${searchLinkObject.text}'`}
          </Link>
        </GridItem>
      </Grid>
    </>
  )
}

export default Custom404
