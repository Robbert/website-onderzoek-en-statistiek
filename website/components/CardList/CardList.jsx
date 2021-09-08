import Card from '../Card/Card'
import { contentTypes } from '../../lib/utils'
import * as Styled from './CardList.style'

const CardList = ({
  items, columns = 1, ...rest
}) => (
  <Styled.List columns={columns}>
    {items
      .map(({
        title, shortTitle, teaser, slug, teaserImage, coverImage, __typename,
      }) => (
        <Styled.ListItem key={slug}>
          <Card
            href={`/${contentTypes[__typename.toLowerCase()].name}/${slug}`}
            title={shortTitle || title}
            teaser={teaser}
            image={teaserImage || coverImage}
            marginBottom={24}
            {...rest}
          />
        </Styled.ListItem>
      ))}
  </Styled.List>
)

export default CardList
