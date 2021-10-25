import { List, ShowMoreShowLess } from '@amsterdam/asc-ui'

import Card from '../Card/Card'
import * as Styled from './ContentList.style'

const ContentList = ({ title, list }) => (
  <Styled.ListContainer>
    <Styled.Heading gutterBottom={24}>{title}</Styled.Heading>
    <ShowMoreShowLess maxHeight="420px">
      <List>
        {list.map(({
          title: cardTitle, shortTitle, teaserImage, path,
        }) => (
          <Styled.ListItem key={path}>
            <Card
              href={path}
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

export default ContentList
