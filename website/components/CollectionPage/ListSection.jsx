import {
  themeColor, Heading, breakpoint, ShowMoreShowLess, List, ListItem,
} from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'

import ContentContainer from '../ContentContainer'
import Card from '../Card'
import { flattenFeatureList } from '../../lib/utils'

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

  // if there are more than 3 lists...
  ${({ listsLength }) => listsLength > 3 && css`
    // ...add border-bottom to first row of content lists
    &:nth-child(-n+2) {
      border-bottom: 2px solid;
    }

    // ...add border-bottom to all rows of content cards except the last
    @media screen and ${breakpoint('max-width', 'laptop')} {
      border-bottom: 2px solid;

      &:last-child {
        border-bottom: none;
      }
    }
  `}
`

const StyledHeading = styled(Heading)`
  text-transform: capitalize;
`

const StyledListItem = styled(ListItem)`
  margin-bottom: 0;
`

const ContentList = ({ title, list, listsLength }) => (
  <ListContainer listsLength={listsLength}>
    <StyledHeading gutterBottom={24}>{title}</StyledHeading>
    <ShowMoreShowLess maxHeight="420px">
      <List>
        {flattenFeatureList([list]).map(({
          title: cardTitle, shortTitle, teaserImage, name, slug,
        }) => (
          <StyledListItem key={slug}>
            <Card
              href={`/${name}/${slug}`}
              title={shortTitle || cardTitle}
              image={teaserImage}
              horizontal
              imageSize={80}
              marginBottom={24}
            />
          </StyledListItem>
        ))}
      </List>
    </ShowMoreShowLess>
  </ListContainer>
)

const ListSection = ({ lists }) => (
  <Wrapper>
    <Grid>
      {lists.map(({
        id, title, ...otherProps
      }) => (
        <ContentList
          key={id}
          title={title}
          list={otherProps}
          listsLength={lists.length}
        />
      ))}
    </Grid>
  </Wrapper>
)

export default ListSection
