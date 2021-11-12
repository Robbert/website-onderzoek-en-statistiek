import { useEffect, useState } from 'react'

import List from '../List/List'
import Pagination from '../Pagination/Pagination'
import SearchCard from '../SearchCard/SearchCard'
import { formatDate } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'

const SearchResults = ({ results, cardGutterBottom, cardHeadingLevel }) => {
  const [page, setPage] = useState(1)
  const pageSize = 10

  useEffect(() => { setPage(1) }, [results])

  return (
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
      <Pagination
        page={page}
        pageSize={pageSize}
        collectionSize={results.length}
        onPageChange={(pageNumber) => {
          window.scrollTo(0, 0)
          return setPage(pageNumber)
        }}
      />
    </>
  )
}

export default SearchResults
