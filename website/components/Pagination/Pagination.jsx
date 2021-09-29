// Based on https://github.com/Amsterdam/amsterdam-styled-components/tree/main/packages/asc-ui/src/components/Pagination

import { useMemo, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from '@amsterdam/asc-assets'

import * as Styled from './Pagination.style'

const DEFAULT_PAGINATION_LENGTH = 7

const Pagination = ({
  collectionSize,
  onPageChange,
  page = 1,
  pageSize = 10,
  paginationLength = DEFAULT_PAGINATION_LENGTH,
  ...otherProps
}) => {
  const [currentPage, setCurrentPage] = useState(page)

  useEffect(() => { setCurrentPage(page) }, [page])

  const totalPages = useMemo(
    () => Math.ceil(collectionSize / pageSize),
    [collectionSize, pageSize],
  )

  /**
     * This returns an array of the range, including spacers
     *
     * @example
     * currentPage = 4, totalPages = 7
     * // returns [1, 2, 3, 4, 5, 6, 7]
     *
     * @example
     * currentPage = 5, totalPages = 100
     * // returns [1, 'firstSpacer', 4, 5, 6, 'lastSpacer', 100]
     *
     * @example
     * currentPage = 97, totalPages = 100
     * // returns [1, 'firstSpacer', 96, 97, 98, 99, 100]
     */
  const range = useMemo(() => {
    const min = 1
    let paginatedLength = paginationLength < 5 ? DEFAULT_PAGINATION_LENGTH : paginationLength
    if (paginationLength > totalPages) {
      paginatedLength = totalPages
    }

    let start = currentPage - Math.floor(paginatedLength / 2)
    start = Math.max(start, min)
    start = Math.min(start, min + totalPages - paginatedLength)

    return Array
      .from({ length: paginatedLength }, (el, i) => start + i)
      .reduce((acc, pageNr, index) => {
        if (index === 0 && pageNr !== 1) {
          return [1, 'firstSpacer']
        }
        if (
          totalPages > paginatedLength
          && index === paginatedLength - 2
          && currentPage < totalPages - 2
        ) {
          return [...acc, 'lastSpacer', totalPages]
        }
        // Skip a number when spacer is already add
        if (
          (acc.includes('firstSpacer') && index === 1)
          || (acc.includes('lastSpacer') && index === paginatedLength - 1)
        ) {
          return acc
        }
        return [...acc, pageNr]
      }, [])
  }, [currentPage, totalPages, paginationLength])

  const onChangePage = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage)
    }
    setCurrentPage(newPage)
  }

  const onPrevious = () => {
    onChangePage(currentPage - 1)
  }

  const onNext = () => {
    onChangePage(currentPage + 1)
  }

  if (collectionSize < pageSize) {
    return null
  }

  return (
    <nav aria-label="paginering" role="navigation" {...otherProps}>
      <Styled.List>
        <Styled.ListItem>
          <Styled.Button
            type="button"
            aria-label="Vorige pagina"
            data-testid="previousButton"
            onClick={onPrevious}
            iconSize={10}
            iconLeft={<ChevronLeft />}
            variant="textButton"
            disabled={currentPage === 1}
          >
            vorige
          </Styled.Button>
        </Styled.ListItem>
        {range.map((pageNumberOrSpacer) => (typeof pageNumberOrSpacer === 'number' ? (
          <Styled.ListItem key={`pag-${pageNumberOrSpacer}`}>
            <Styled.PageNumberButton
              aria-label={
                    pageNumberOrSpacer === currentPage
                      ? `Pagina ${pageNumberOrSpacer}`
                      : `Ga naar pagina ${pageNumberOrSpacer}`
                  }
              aria-current={pageNumberOrSpacer === currentPage}
              data-testid={`pageButton-${pageNumberOrSpacer}`}
              onClick={() => onChangePage(pageNumberOrSpacer)}
              isCurrent={pageNumberOrSpacer === currentPage}
              tabIndex={pageNumberOrSpacer === currentPage ? -1 : 0}
              type="button"
            >
              {pageNumberOrSpacer}
            </Styled.PageNumberButton>
          </Styled.ListItem>
        ) : (
          <Styled.ListItem key={pageNumberOrSpacer} data-testid={pageNumberOrSpacer}>
            {'\u2026'}
          </Styled.ListItem>
        )))}
        <Styled.ListItem>
          <Styled.Button
            type="button"
            aria-label="Volgende pagina"
            data-testid="nextButton"
            onClick={onNext}
            iconSize={10}
            iconRight={<ChevronRight />}
            variant="textButton"
            disabled={currentPage === totalPages}
          >
            volgende
          </Styled.Button>
        </Styled.ListItem>
      </Styled.List>
    </nav>
  )
}

export default Pagination
