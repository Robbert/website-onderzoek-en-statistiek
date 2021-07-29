import {
  Heading, List, ListItem, breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ThemeCard from './ThemeCard'
import ContentContainer from '../ContentContainer'

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
  row-gap: 24px;
  margin-bottom: 24px;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'mobileL')} {
    grid-template-columns: 1fr;
  }
`

const StyledListItem = styled(ListItem)`
  margin-bottom: 0;
`

const ThemeSection = ({ themes }) => (
  <Container>
    <StyledHeading gutterBottom={24}>Thema‘s</StyledHeading>
    <StyledList>
      {themes
        .slice() // strict mode freezes arrays, so we need to make a copy to be able to sort
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(({ title, slug, teaserImage }) => (
          <StyledListItem key={slug}>
            <ThemeCard href={`/thema/${slug}`} title={title} teaserImage={teaserImage} />
          </StyledListItem>
        ))}
    </StyledList>
  </Container>
)

export default ThemeSection
