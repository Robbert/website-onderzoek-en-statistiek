/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import { useMatchMedia } from '@amsterdam/asc-ui'
import { Close } from '@amsterdam/asc-assets'

import Seo from '~/components/Seo/Seo'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import SearchBar from '~/components/SearchBar/SearchBar'
import SearchResults from '~/components/SearchResults/SearchResults'
import Pagination from '~/components/Pagination/Pagination'
import SearchFilterSection from '~/components/SearchFilterSection/SearchFilterSection'
import { translateContentType, decodeQuerySafe } from '~/lib/utils'
import apolloClient from '~/lib/apolloClient'
import { trackSearchQuery } from '~/lib/analyticsUtils'
import CONTENT_TYPES from '~/constants/contentTypes'
import QUERY from './search.query.gql'
import { SearchContext, getSearchResults } from '~/lib/searchUtils'
import * as Styled from './search.style'

const Search = ({ themes }) => {
  const searchIndex = useContext(SearchContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('af')
  const [category, setCategory] = useState('')
  const [themeFilter, setThemeFilter] = useState([])
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)

  const router = useRouter()

  const setUrlParameters = useCallback((paramName, paramValue) => {
    const { query } = router
    delete query[paramName]

    if (paramName === 'thema' && paramValue.length > 0)
      query.thema = paramValue.join(' ')
    if (paramName === 'categorie' && paramValue)
      query.categorie = CONTENT_TYPES[paramValue].name
    if (paramName === 'sorteer' && paramName !== 'af')
      query.sorteer = paramValue
    if (paramName === 'tekst' && paramValue !== '') query.tekst = paramValue

    router.push({ query }, undefined, {
      shallow: true,
      scroll: false,
    })
  })

  const handleThemeChange = (slug) => {
    const newThemeFilter = themeFilter.includes(slug)
      ? themeFilter.filter((item) => item !== slug)
      : [...themeFilter, slug]

    setUrlParameters('thema', newThemeFilter)
  }

  useEffect(() => {
    if (searchIndex) {
      setResults(searchIndex._docs)
    }
  }, [searchIndex])

  useEffect(() => {
    const {
      tekst: q,
      sorteer: sort,
      categorie: cat,
      thema: theme,
    } = router.query

    setSearchQuery(q ? decodeQuerySafe(q) : '')
    setSortOrder(sort || 'af')
    setCategory(translateContentType(cat) || '')
    setThemeFilter(theme ? theme.split(' ') : [])
  }, [router.query])

  useEffect(() => {
    const throttledUpdate = debounce(() => {
      const updatedResults = getSearchResults(
        searchIndex,
        searchQuery,
        sortOrder,
        themeFilter,
        category,
      )
      setResults(updatedResults)
    }, 300)
    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [searchIndex, searchQuery, sortOrder, themeFilter, category])

  useEffect(() => {
    const tracker = trackSearchQuery(searchQuery, category)
    return () => tracker.cancel()
  }, [searchQuery, category])

  useEffect(() => {
    setPage(1)
  }, [results])

  const isMobile = useMatchMedia({ maxBreakpoint: 'laptop' })

  return (
    <>
      <Seo
        title="Zoeken"
        description="Zoek naar artikelen, publicaties, factsheets, animaties, dashboards en cijfers op de website van Onderzoek en Statistiek."
      />
      <Grid>
        <GridItem
          colRange={{ small: 4, large: 7 }}
          colStart={{ small: 1, large: 5 }}
        >
          <Paragraph gutterBottom={8}>
            {`${results.length} ${
              results.length === 1 ? 'resultaat' : 'resultaten'
            }`}
          </Paragraph>
          <Heading gutterBottom={{ small: 24, large: 16 }} styleAs="h2">
            Zoeken
          </Heading>
          <SearchBar
            id="searchfield"
            type="text"
            value={searchQuery}
            onChange={(q) => setUrlParameters('tekst', q)}
            autoFocus={!isMobile[0]}
          />
        </GridItem>
        <GridItem
          colRange={{ small: 4, large: 8 }}
          colStart={{ small: 1, large: 5 }}
        >
          <Styled.FilterTagContainer>
            {Object.values(CONTENT_TYPES)
              .filter((cat) => cat.type === category)
              .map(({ type, plural }) => (
                <Styled.Button
                  key={type}
                  type="button"
                  small
                  onClick={() => setUrlParameters('categorie', null)}
                >
                  <Styled.Icon size={20}>
                    <Close />
                  </Styled.Icon>
                  <span>{plural}</span>
                </Styled.Button>
              ))}
            {themes
              .filter((item) => themeFilter.includes(item.slug))
              .map(({ title, slug }) => (
                <Styled.Button
                  key={slug}
                  type="button"
                  variant="secondary"
                  small
                  onClick={() => handleThemeChange(slug)}
                >
                  <Styled.Icon size={20}>
                    <Close />
                  </Styled.Icon>
                  {title}
                </Styled.Button>
              ))}
          </Styled.FilterTagContainer>
          <Styled.SearchResultsContainer>
            <SearchResults
              results={results}
              page={page}
              cardGutterBottom={{ small: 40, large: 80 }}
              cardHeadingLevel="h2"
            />
          </Styled.SearchResultsContainer>
        </GridItem>
        <GridItem colRange={{ small: 4, large: 12 }}>
          <Pagination
            page={page}
            collectionSize={results.length}
            onPageChange={(pageNumber) => {
              window.scrollTo(0, 0)
              return setPage(pageNumber)
            }}
          />
        </GridItem>
        <SearchFilterSection
          results={results}
          themes={themes}
          themeFilter={themeFilter}
          handleThemeChange={handleThemeChange}
          category={category}
          setUrlParameters={setUrlParameters}
          sortOrder={sortOrder}
        />
      </Grid>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.query({ query: QUERY }).catch() // TODO: log this error in sentry

  return {
    props: { themes: data.themes },
    revalidate: 10,
  }
}

export default Search
