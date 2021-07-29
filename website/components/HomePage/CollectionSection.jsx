import {
  CompactThemeProvider, Heading, themeColor, breakpoint, List, ListItem,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../ContentContainer'
import CollectionCard from './CollectionCard'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const StyledHeading = styled(Heading)`
  width: 100%;
`

const StyledList = styled(List)`
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

const StyledListItem = styled(ListItem)`
  margin-bottom: 0;

  // Add border-top to first row of dossier cards when three cards are shown
  &:nth-child(-n+3) {
    border-top: ${themeColor('tint', 'level3')} 1px solid;
  }

  // Add border-top to first row of dossier cards when two cards are shown
  @media screen and ${breakpoint('max-width', 'laptop')} {
    &:nth-child(3) {
      border-top: none;
    }
  }

  // Add border-top to first row of dossier cards when one card is shown
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    &:nth-child(2) {
      border-top: none;
    }
  }
`

const CollectionSection = ({ collections }) => (
  <CompactThemeProvider>
    <Container>
      <StyledHeading gutterBottom={24}>Dossiers</StyledHeading>
      <StyledList>
        {collections?.map(({
          title, teaser, slug, teaserImage,
        }) => (
          <StyledListItem key={slug}>
            <CollectionCard
              href={`/dossier/${slug}`}
              title={title}
              teaser={teaser}
              teaserImage={teaserImage}
            />
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  </CompactThemeProvider>
)

export default CollectionSection
