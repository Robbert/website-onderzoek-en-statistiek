import styled from 'styled-components'

import Card from './Card'

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
        title, slug, teaser, teaserImage,
      }) => (
        <StyledListItem key={slug}>
          <Card
            href={`/dossier/${slug}`}
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
