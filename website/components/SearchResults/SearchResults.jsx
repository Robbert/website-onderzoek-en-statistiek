import List from '../List/List'
import SearchCard from '../SearchCard/SearchCard'
import { formatDate } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'

const SearchResults = ({
  results, page = 1, pageSize = 10, cardGutterBottom, cardHeadingLevel,
}) => (
  <>
    <List>
      {results
        .slice((page - 1) * pageSize, page * pageSize)
        .map(({
          slug, title, teaser, type, publicationDate,
        }) => (
          <li key={`${type}-${slug}`}>
            <SearchCard
              type={type}
              href={`/${CONTENT_TYPES[type].name}/${slug}`}
              title={title}
              teaser={teaser}
              date={formatDate(publicationDate)}
              gutterBottom={cardGutterBottom}
              headingLevel={cardHeadingLevel}
            />
          </li>
        ))}
    </List>
  </>
)

export default SearchResults
