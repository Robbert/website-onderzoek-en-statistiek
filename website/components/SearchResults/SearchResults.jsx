import { useEffect, useState } from 'react'
import { List, ListItem } from '@amsterdam/asc-ui'

import Pagination from '../Pagination/Pagination'
import Paragraph from '../Paragraph/Paragraph'
import { formatDate } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import * as Styled from './SearchResults.style'

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
            <ListItem key={`${type}-${slug}`}>
              <Styled.TypeLabel small gutterBottom={4}>
                {CONTENT_TYPES[type].name}
              </Styled.TypeLabel>
              <Styled.Link
                href={`/${CONTENT_TYPES[type].name}/${slug}`}
              >
                {title}
              </Styled.Link>
              <Paragraph gutterBottom={4}>
                {teaser}
              </Paragraph>
              <Paragraph small gutterBottom={64}>
                {formatDate(publicationDate)}
              </Paragraph>
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
