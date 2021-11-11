/* eslint-disable no-underscore-dangle */
import {
  useState, useEffect, useCallback, useContext,
} from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import { Label } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import SearchBar from '../../components/SearchBar/SearchBar'
import SearchResults from '../../components/SearchResults/SearchResults'
import Heading from '../../components/Heading/Heading'
import Fieldset from '../../components/Fieldset/Fieldset'
import Checkbox from '../../components/Checkbox/Checkbox'
import { translateContentType, apolloClient } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import QUERY from './search.query.gql'
import {
  SearchContext, getSearchResults, calculateFacetsTotals, formatFacetNumber,
} from '../../lib/searchUtils'
import * as Styled from './search.style'

const Search = ({ themes }) => {
  const searchIndex = useContext(SearchContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('af')
  const [category, setCategory] = useState('')
  const [themeFilter, setThemeFilter] = useState([])
  const [results, setResults] = useState([])
  const [facetCount, setfacetCount] = useState(null)

  const router = useRouter()

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
    if (searchIndex) {
      setResults(searchIndex._docs)
      setfacetCount(calculateFacetsTotals(themes, CONTENT_TYPES, searchIndex._docs))
    }
  }, [searchIndex, themes, CONTENT_TYPES])

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
      const updatedResults = getSearchResults(searchIndex, searchQuery,
        sortOrder, themeFilter, category)
      setResults(updatedResults)
      setfacetCount(calculateFacetsTotals(themes, CONTENT_TYPES, updatedResults))
    }, 300)

    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [searchIndex, searchQuery, sortOrder, themeFilter, category])

  return (
    <>
      <Seo />
      <Styled.Container>
        <div>
          <SearchBar
            id="searchfield"
            type="text"
            value={searchQuery}
            onChange={(q) => setUrlParameters('tekst', q)}
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
          <Heading as="h2" gutterBottom={24}>Filters</Heading>
          <Fieldset
            legend={
              <Heading as="h3" gutterBottom={24}>Thema‘s</Heading>
            }
          >
            {themes.map(({ title, slug }) => (
              <Checkbox
                key={slug}
                id={slug}
                onChange={() => handleThemeChange(slug)}
                checked={themeFilter.includes(slug)}
              >
                {`${title} ${facetCount && formatFacetNumber(facetCount[slug])}`}
              </Checkbox>
            ))}
          </Fieldset>
          <Fieldset
            legend={
              <Heading as="h3" gutterBottom={24}>Categorieën</Heading>
            }
          >
            <Styled.Radio
              name="categories"
              id="alles"
              onChange={() => setCategory('')}
              checked={category === ''}
            >
              Alle categorieën
            </Styled.Radio>
            {Object
              .values(CONTENT_TYPES)
              .filter((cat) => cat.type !== 'theme')
              .map(({ type, plural }) => (
                <Styled.Radio
                  key={type}
                  name="categories"
                  id={type}
                  onChange={() => setUrlParameters('categorie', type)}
                  checked={category === type}
                >
                  {`${plural} ${facetCount && formatFacetNumber(facetCount[type])}`}
                </Styled.Radio>
              ))}
          </Fieldset>
        </Styled.SideBar>
      </Styled.Container>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.query({ query: QUERY })
    .catch() // TODO: log this error in sentry

  return {
    props: { themes: data.themes },
    revalidate: 10,
  }
}

export default Search
