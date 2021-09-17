import { List, ListItem } from '@amsterdam/asc-ui'

import { formatDate } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import Link from '../Link/Link'

const SearchResults = ({ results }) => (
  <List>
    {results.slice(0, 20).map(({
      slug, title, type, publicationDate,
    }) => (
      <ListItem key={`${type}-${slug}`}>
        <Link
          href={`/${CONTENT_TYPES[type].name}/${slug}`}
          inList
          strong
        >
          {`${CONTENT_TYPES[type].name}: ${title} | ${formatDate(publicationDate)}`}
        </Link>
      </ListItem>
    ))}
  </List>
)

export default SearchResults
