import { List, ListItem } from '@amsterdam/asc-ui'

import { contentTypes, formatDate } from '../../lib/utils'
import Link from '../Link/Link'

const SearchResults = ({ results }) => (
  <List>
    {results.slice(0, 20).map(({
      slug, title, type, publicationDate,
    }) => (
      <ListItem key={`${type}-${slug}`}>
        <Link
          href={`/${contentTypes[type].name}/${slug}`}
          inList
          strong
        >
          {`${contentTypes[type].name}: ${title} | ${formatDate(publicationDate)}`}
        </Link>
      </ListItem>
    ))}
  </List>
)

export default SearchResults
