import {
  themeColor, Heading, CompactThemeProvider, breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../ContentContainer'
import Card from '../Card'
import Link from '../Link'
import { contentTypes } from '../../lib/utils'

const Wrapper = styled.div`
  background-color: ${themeColor('tint', 'level2')};
`

const Grid = styled(ContentContainer)`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 24px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: 1fr;
  }
`

const ListContainer = styled.div`
  padding-top: 44px;
  padding-bottom: 44px;
  display: flex;
  flex-direction: column;

  // Add border-bottom to first row of content cards
  &:nth-child(-n+3) {
    border-bottom: 2px solid;
  }

  // Add border-bottom to first and second rows of content cards
  @media screen and ${breakpoint('max-width', 'laptop')} {
    &:nth-child(-n+4) {
      border-bottom: 2px solid;
    }
  }

  // Add border-bottom to all rows of content cards except the last
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    border-bottom: 2px solid;

    &:last-child {
      border-bottom: none;
    }
  }
`

const StyledHeading = styled(Heading)`
  text-transform: capitalize;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const StyledListItem = styled.li`
  margin-bottom: 0;
`

const ContentList = ({ type, features }) => (
  <ListContainer>
    <StyledHeading gutterBottom={24}>{contentTypes[type].plural}</StyledHeading>
    <StyledList>
      {features.map(({
        title, shortTitle, slug, teaserImage,
      }) => (
        <StyledListItem key={title}>
          <Card
            href={`/${contentTypes[type].name}/${slug}`}
            title={shortTitle || title}
            image={teaserImage}
            horizontal
            imageSize={80}
            marginBottom={24}
          />

        </StyledListItem>
      ))}
    </StyledList>
    <Link href="/zoek" inList>{`Meer ${contentTypes[type].plural}`}</Link>
  </ListContainer>
)

const LatestSection = ({
  collections, videos, interactives, articles, publications, datasets,
}) => (
  <CompactThemeProvider>
    <Wrapper>
      <Grid>
        {collections.length > 0 && <ContentList type="collection" features={collections} />}
        {videos.length > 0 && <ContentList type="video" features={videos} />}
        {interactives.length > 0 && <ContentList type="interactive" features={interactives} />}
        {articles.length > 0 && <ContentList type="article" features={articles} />}
        {publications.length > 0 && <ContentList type="publication" features={publications} />}
        {datasets.length > 0 && <ContentList type="dataset" features={datasets} />}
      </Grid>
    </Wrapper>
  </CompactThemeProvider>
)

export default LatestSection
