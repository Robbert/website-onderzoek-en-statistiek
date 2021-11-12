/* eslint-disable no-underscore-dangle */
import {
  useState, useEffect, useCallback, useContext,
} from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import { Label } from '@amsterdam/asc-ui'
import { Close } from '@amsterdam/asc-assets'

import Seo from '../../components/Seo/Seo'
import { Grid, GridItem } from '../../components/Grid/Grid.style'
import Paragraph from '../../components/Paragraph/Paragraph'
import SearchResults from '../../components/SearchResults/SearchResults'
import Heading from '../../components/Heading/Heading'
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
    if (paramName === 'categorie' && paramValue) query.categorie = CONTENT_TYPES[paramValue].name
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

    window.scrollTo(0, 0)
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
      <Grid>
        <GridItem
          colRange={{ small: 4, large: 7 }}
          colStart={{ small: 1, large: 5 }}
        >
          <Paragraph gutterBottom={8}>
            {`${results.length} ${results.length === 1 ? 'resultaat' : 'resultaten'}`}
          </Paragraph>
          <Heading gutterBottom={16} styleAs="h2">Zoeken</Heading>
          <Styled.SearchBar
            id="searchfield"
            type="text"
            value={searchQuery}
            onChange={(q) => setUrlParameters('tekst', q)}
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
              cardGutterBottom={80}
              cardHeadingLevel="h2"
            />
          </Styled.SearchResultsContainer>
        </GridItem>
        <GridItem
          colRange={{ small: 4, large: 3 }}
          rowStart={{ small: 3, large: 2 }}
        >
          <Styled.Fieldset
            legend={
              <Heading as="h2" styleAs="h5" gutterBottom={24}>Thema‘s</Heading>
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
          </Styled.Fieldset>
          <Styled.Fieldset
            legend={
              <Heading as="h2" styleAs="h5" gutterBottom={24}>Categorieën</Heading>
            }
          >
            <Styled.Radio
              name="categories"
              id="alles"
              onChange={() => {
                window.scrollTo(0, 0)
                return setUrlParameters('categorie', null)
              }}
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
                  onChange={() => {
                    window.scrollTo(0, 0)
                    return setUrlParameters('categorie', type)
                  }}
                  checked={category === type}
                >
                  {`${plural} ${facetCount && formatFacetNumber(facetCount[type])}`}
                </Styled.Radio>
              ))}
          </Styled.Fieldset>
          <Styled.Fieldset
            legend={
              <Heading as="h2" styleAs="h5" gutterBottom={24}>Sorteren</Heading>
            }
          >
            <Label htmlFor="selectSort" label="Sorteren" srOnly />
            <Styled.Select
              id="selectSort"
              value={sortOrder}
              onChange={(e) => {
                window.scrollTo(0, 0)
                return setUrlParameters('sorteer', e.target.value)
              }}
            >
              <option value="af">Aflopend datum</option>
              <option value="op">Oplopend datum</option>
              <option value="score">Relevantie</option>
            </Styled.Select>
          </Styled.Fieldset>
        </GridItem>
      </Grid>
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
