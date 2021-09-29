import { useEffect, useState } from 'react'
import { List, ListItem } from '@amsterdam/asc-ui'

import { formatDate } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import Link from '../Link/Link'
import Pagination from '../Pagination/Pagination'

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
