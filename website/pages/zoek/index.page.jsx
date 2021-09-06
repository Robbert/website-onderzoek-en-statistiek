import {
  useState, useEffect, useMemo,
} from 'react'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import { debounce } from 'lodash'
import { Heading, Label, Checkbox } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import SearchResults from '../../components/SearchResults/SearchResults'
import {
  contentTypes, translateContentType, apolloClient,
} from '../../lib/utils'
import QUERY from './search.query.gql'
import {
  getSearchContent, searchContent, calculateFacetsTotals, formatFacetNumber, fuseOptions,
} from './searchUtils'
import * as Styled from './search.style'

const Search = ({ themes, content }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('af')
  const [category, setCategory] = useState('')
  const [themeFilter, setThemeFilter] = useState([])
  const [results, setResults] = useState(content)
  const [facetCount, setfacetCount] = useState(calculateFacetsTotals(themes, contentTypes, content))

  const router = useRouter()

  const index = useMemo(() => new Fuse(content, fuseOptions), [content, fuseOptions])

  const handleThemeChange = (slug) => {
    const newSelection = themeFilter.includes(slug)
      ? themeFilter.filter((item) => item !== slug)
      : [...themeFilter, slug]
    setThemeFilter(newSelection)
  }

  const throttledUpdate = debounce(() => {
    const updatedResults = searchContent(content, index, searchQuery,
      sortOrder, themeFilter, category)
    setResults(updatedResults)
    setfacetCount(calculateFacetsTotals(themes, contentTypes, updatedResults))
  }, 300)

  useEffect(() => {
    throttledUpdate()
  }, [searchQuery, sortOrder, themeFilter, category])

  useEffect(() => () => {
    throttledUpdate.cancel()
  }, [])

  useEffect(() => {
    const query = {}
    if (searchQuery) query.tekst = searchQuery
    if (sortOrder !== 'af') query.sorteer = sortOrder
    if (themeFilter.length > 0) query.thema = themeFilter.join(' ')
    if (category) query.categorie = contentTypes[category].name
    router.push(
      {
        pathname: '/zoek',
        query,
      }, undefined, {
        shallow: true,
        scroll: false,
      },
    )
  }, [searchQuery, sortOrder, themeFilter, category])

  useEffect(() => {
    if (router.isReady) {
      const {
        tekst: q, sorteer: sort, categorie: cat, thema: theme,
      } = router.query
      if (q) setSearchQuery(decodeURI(q))
      if (sort) setSortOrder(sort)
      if (cat) setCategory(translateContentType(cat))
      if (theme) setThemeFilter(theme.split(' '))
    }
  }, [router.isReady])

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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Styled.PageTitle forwardedAs="h2">
            Resultaten (
            {results.length}
            )
          </Styled.PageTitle>
          <Styled.SortBar>
            <Label htmlFor="selectSort" label="Sorteren" hidden />
            <Styled.Select id="selectSort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
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
            Object.values(contentTypes).filter((cat) => cat.type !== 'theme').map(({ type, plural }) => (
              <Styled.FilterButton
                key={type}
                variant="textButton"
                active={category === type}
                onClick={() => setCategory(type)}
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
