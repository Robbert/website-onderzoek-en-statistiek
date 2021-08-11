import { Heading, breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import Card from '../Card'
import ContentContainer from '../ContentContainer'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const StyledHeading = styled(Heading)`
  width: 100%;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 24px;
  row-gap: 24px;
  margin-bottom: 24px;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'mobileL')} {
    grid-template-columns: 1fr;
  }
`

const StyledListItem = styled.li`
  margin-bottom: 0;
`

const ThemeSection = ({ themes }) => (
  <Container>
    <StyledHeading gutterBottom={24}>Thema‘s</StyledHeading>
    <StyledList>
      {themes
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(({ title, slug, teaserImage }) => (
          <StyledListItem key={slug}>
            <Card
              href={`/thema/${slug}`}
              title={title}
              teaserImage={teaserImage}
              imageAspect={16 / 9}
              shadow
            />
          </StyledListItem>
        ))}
    </StyledList>
  </Container>
)

export default ThemeSection
