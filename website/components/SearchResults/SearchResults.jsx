import { useEffect, useState } from 'react'

import List from '../List/List'
import Pagination from '../Pagination/Pagination'
import SearchCard from '../SearchCard/SearchCard'
import { formatDate } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'

const SearchResults = ({ results }) => {
  const [page, setPage] = useState(1)
  const pageSize = 20

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
              />
            </li>
          ))}
      </List>
      <Pagination
        page={page}
        pageSize={pageSize}
        collectionSize={results.length}
        onPageChange={(pageNumber) => setPage(pageNumber)}
      />
    </>
  )
}

export default SearchResults
