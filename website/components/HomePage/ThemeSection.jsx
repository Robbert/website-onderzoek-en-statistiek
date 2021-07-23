import {
  Column, Heading,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ThemeCard from './ThemeCard'
import ContentContainer from '../ContentContainer'

const Container = styled(ContentContainer)`
  margin-bottom: 20px;
`

const StyledColumn = styled(Column)`
  margin-bottom: 24px;
`

const ThemeSection = ({ themes }) => (
  <Container>
    <Column span={{
      small: 1, medium: 2, big: 6, large: 12, xLarge: 12,
    }}
    >
      <Heading gutterBottom={24}>Thema‘s</Heading>
    </Column>
    {themes
      .slice() // strict mode freezes arrays, so we need to make a copy to be able to sort
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(({ title, slug, teaserImage }) => (
        <StyledColumn
          key={slug}
          span={{
            small: 1, medium: 1, big: 2, large: 3, xLarge: 3,
          }}
        >
          <ThemeCard href={`/thema/${slug}`} title={title} teaserImage={teaserImage} />
        </StyledColumn>
      ))}
  </Container>
)

export default ThemeSection
