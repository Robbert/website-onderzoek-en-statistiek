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

const ContentList = ({ items, imageSize = 144, hasTeaser = true }) => (
  <StyledList>
    {items
      .map(({
        title, slug, teaserImage, coverImage, __typename, teaser,
      }) => (
        <StyledListItem key={slug}>
          <Card
            href={`/${contentTypes[__typename.toLowerCase()].name}/${slug}`}
            title={title}
            teaser={hasTeaser && teaser}
            image={teaserImage || coverImage}
            horizontal
            imageSize={imageSize}
            marginBottom={24}
            icon={false}
          />
        </StyledListItem>
      ))}
  </StyledList>
)

export default ContentList
