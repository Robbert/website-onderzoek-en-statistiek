import {
  CompactThemeProvider, Heading, themeColor, breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { flattenFeatureObject } from '../../lib/utils'
import ContentContainer from '../ContentContainer'
import Card from '../Card'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 24px;
  margin-bottom: 24px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: 1fr;
  }
`

const StyledListItem = styled.li`
  margin-bottom: 0;

  // Add border-top to first row of dossier cards
  &:nth-child(-n+3) {
    border-top: ${themeColor('tint', 'level3')} 1px solid;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    &:nth-child(3) {
      border-top: none;
    }
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    &:nth-child(2) {
      border-top: none;
    }
  }
`

const CollectionSection = ({ collections }) => (
  <CompactThemeProvider>
    <Container>
      <Heading gutterBottom={24}>Dossiers</Heading>
      <StyledList>
        {flattenFeatureObject(collections).map(({
          title, teaser, slug, teaserImage,
        }) => (
          <StyledListItem key={slug}>
            <Card
              href={`/dossier/${slug}`}
              title={title}
              teaser={teaser}
              image={teaserImage}
              horizontal
              imageSize={80}
            />
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  </CompactThemeProvider>
)

export default CollectionSection
