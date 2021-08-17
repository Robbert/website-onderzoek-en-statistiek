import styled from 'styled-components'

import Card from './Card'
import { contentTypes } from '../lib/utils'

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
`

const StyledListItem = styled.li`
  margin-bottom: 0;
`

const ContentList = ({ items }) => (
  <StyledList>
    {items
      .map(({
        title, slug, teaser, teaserImage, __typename,
      }) => (
        <StyledListItem key={slug}>
          <Card
            href={`/${contentTypes[__typename.toLowerCase()].name}/${slug}`}
            title={title}
            teaser={teaser}
            image={teaserImage}
            horizontal
            imageSize={144}
            marginBottom={24}
            icon={false}
          />
        </StyledListItem>
      ))}
  </StyledList>
)

export default ContentList