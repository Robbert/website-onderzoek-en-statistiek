import {
  useState, useEffect, useMemo, useCallback,
} from 'react'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import { debounce } from 'lodash'
import { Heading, Label, Checkbox } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import SearchResults from '../../components/SearchResults/SearchResults'
import {
  translateContentType, apolloClient,
} from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import QUERY from './search.query.gql'
import {
  getSearchContent, getSearchResults, calculateFacetsTotals, formatFacetNumber, fuseOptions,
} from './searchUtils'
import * as Styled from './search.style'

const Search = ({ themes, content }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('af')
  const [category, setCategory] = useState('')
  const [themeFilter, setThemeFilter] = useState([])
  const [results, setResults] = useState(content)
  const [facetCount, setfacetCount] = useState(
    calculateFacetsTotals(themes, CONTENT_TYPES, content),
  )

  const router = useRouter()

  const index = useMemo(() => new Fuse(content, fuseOptions), [content, fuseOptions])

  const setUrlParameters = useCallback((paramName, paramValue) => {
    const { query } = router
    delete query[paramName]

    if (paramName === 'thema' && paramValue.length > 0) query.thema = paramValue.join(' ')
    if (paramName === 'categorie') query.categorie = CONTENT_TYPES[paramValue].name
    if (paramName === 'sorteer' && paramName !== 'af') query.sorteer = paramValue
    if (paramName === 'tekst' && paramValue !== '') query.tekst = paramValue

    router.push({ query },
      undefined,
      {
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
    const {
      tekst: q, sorteer: sort, categorie: cat, thema: theme,
    } = router.query
    setSearchQuery(q ? decodeURI(q) : '')
    setSortOrder(sort || 'af')
    setCategory(cat ? translateContentType(cat) : '')
    setThemeFilter(theme ? theme.split(' ') : [])
  }, [router.query])

  useEffect(() => {
    const throttledUpdate = debounce(() => {
      const updatedResults = getSearchResults(content, index, searchQuery,
        sortOrder, themeFilter, category)
      setResults(updatedResults)
      setfacetCount(calculateFacetsTotals(themes, CONTENT_TYPES, updatedResults))
    }, 300)

    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [searchQuery, sortOrder, themeFilter, category])

  return (
    <>
      <Seo />
      <Styled.Container>
        <div>
          <Label htmlFor="searchfield" label="Zoeken" hidden />
          <Styled.SearchBar
            id="searchfield"
            type="text"
            value={searchQuery}
            onChange={(e) => setUrlParameters('tekst', e.target.value)}
          />
          <Styled.PageTitle forwardedAs="h2">
            Resultaten (
            {results.length}
            )
          </Styled.PageTitle>
          <Styled.SortBar>
            <Label htmlFor="selectSort" label="Sorteren" srOnly />
            <Styled.Select id="selectSort" value={sortOrder} onChange={(e) => setUrlParameters('sorteer', e.target.value)}>
              <option value="af">Aflopend datum</option>
              <option value="op">Oplopend datum</option>
              <option value="score">Relevantie</option>
            </Styled.Select>
          </Styled.SortBar>
          <SearchResults results={results} />
        </div>
        <Styled.SideBar>
          <Heading forwardedAs="h2">Filters</Heading>
          <Styled.FilterBox label="Thema's">
            {
              themes.map(({ title, slug }) => (
                <Label key={slug} align="flex-start" htmlFor={slug} label={`${title} ${formatFacetNumber(facetCount[slug])}`}>
                  <Checkbox
                    id={slug}
                    variant="primary"
                    onChange={() => handleThemeChange(slug)}
                    checked={themeFilter.includes(slug)}
                  />
                </Label>
              ))
            }
          </Styled.FilterBox>
          <Styled.FilterBox label="Categorieën">
            <Styled.FilterButton
              active={category === ''}
              variant="textButton"
              onClick={() => setCategory('')}
            >
              <Styled.FilterButtonLabel>Alle categorieën</Styled.FilterButtonLabel>
            </Styled.FilterButton>
            {
            Object.values(CONTENT_TYPES).filter((cat) => cat.type !== 'theme').map(({ type, plural }) => (
              <Styled.FilterButton
                key={type}
                variant="textButton"
                active={category === type}
                onClick={() => setUrlParameters('categorie', type)}
              >
                <Styled.FilterButtonLabel>
                  {`${plural} ${formatFacetNumber(facetCount[type])}`}
                </Styled.FilterButtonLabel>
              </Styled.FilterButton>
            ))
          }
          </Styled.FilterBox>
        </Styled.SideBar>
      </Styled.Container>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.query({ query: QUERY })
    .catch() // TODO: log this error in sentry

  const content = await getSearchContent()

  return {
    props: { themes: data.themes, content },
    revalidate: 10,
  }
}

export default Search
