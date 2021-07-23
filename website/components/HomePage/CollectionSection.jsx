import {
  Column, Heading, themeColor, breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../ContentContainer'
import CollectionCard from './CollectionCard'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const CardContainer = styled(Column)`
  // Add border-top to first row of dossier cards when three cards are shown
  &:nth-child(-n+4) {
    border-top: ${themeColor('tint', 'level3')} 1px solid;
  }

  // Add border-top to first row of dossier cards when two cards are shown
  @media screen and ${breakpoint('max-width', 'laptop')} {
    &:nth-child(4) {
      border-top: none;
    }
  }

  // Add border-top to first row of dossier cards when one card is shown
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    &:nth-child(n+3) {
      border-top: none;
    }
  }
`

const CollectionSection = ({ collections }) => (
  <Container>
    <Column span={{
      small: 1, medium: 2, big: 6, large: 12, xLarge: 12,
    }}
    >
      <Heading gutterBottom={24}>Dossiers</Heading>
    </Column>
    {collections?.map(({
      title, teaser, slug, teaserImage,
    }) => (
      <CardContainer
        key={slug}
        span={{
          small: 1, medium: 2, big: 3, large: 4, xLarge: 4,
        }}
      >
        <CollectionCard
          href={`/dossier/${slug}`}
          title={title}
          teaser={teaser}
          teaserImage={teaserImage}
        />
      </CardContainer>
    ))}
  </Container>
)

export default CollectionSection
