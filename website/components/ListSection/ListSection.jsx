import { List, ShowMoreShowLess } from '@amsterdam/asc-ui'

import Card from '../Card/Card'
import { flattenFeatureList } from '../../lib/utils'
import * as Styled from './ListSection.style'

const ContentList = ({ title, list, listsLength }) => (
  <Styled.ListContainer listsLength={listsLength}>
    <Styled.Heading gutterBottom={24}>{title}</Styled.Heading>
    <ShowMoreShowLess maxHeight="420px">
      <List>
        {flattenFeatureList([list]).map(({
          title: cardTitle, shortTitle, teaserImage, name, slug,
        }) => (
          <Styled.ListItem key={slug}>
            <Card
              href={`/${name}/${slug}`}
              title={shortTitle || cardTitle}
              image={teaserImage}
              horizontal
              imageSize={80}
              marginBottom={24}
            />
          </Styled.ListItem>
        ))}
      </List>
    </ShowMoreShowLess>
  </Styled.ListContainer>
)

const ListSection = ({ lists }) => (
  <Styled.Wrapper>
    <Styled.Grid>
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
    </Styled.Grid>
  </Styled.Wrapper>
)

export default ListSection
