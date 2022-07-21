/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useContext } from 'react'
import debounce from 'lodash.debounce'

import { SearchContext, getSearchResults } from '../../lib/searchUtils'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Heading from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'
import Link from '../Link/Link'
import { trackSearchQuery } from '../../lib/analyticsUtils'
import CONTENT_TYPES from '../../constants/contentTypes'
import * as Styled from './ThemeSearch.style'

const ThemeSearch = ({ themeTitle, slug }) => {
  const searchIndex = useContext(SearchContext)

  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [results, setResults] = useState(
    getSearchResults(searchIndex, '', [slug], category),
  )
  const numberOfResults = 5
  useEffect(() => {
    const throttledUpdate = debounce(() => {
      const updatedResults = getSearchResults(
        searchIndex,
        searchQuery,
        [slug],
        category,
      )
      setResults(updatedResults)
    }, 300)
    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [slug, searchIndex, searchQuery, category])

  useEffect(() => {
    const tracker = trackSearchQuery(searchQuery, category)
    return () => tracker.cancel()
  }, [searchQuery, category])

  useEffect(() => {
    setCategory('')
  }, [slug])

  return (
    <Styled.Container>
      <Heading gutterBottom={16} as="h2">
        {`Meer over ${themeTitle}`}
      </Heading>
      <SearchBar
        id="searchTheme"
        type="text"
        value={searchQuery}
        onChange={(text) => setSearchQuery(text)}
      />
      <Styled.ButtonGroup role="group" aria-label="Filter zoekresultaten">
        <Styled.Button
          type="button"
          variant="textButton"
          onClick={() => setCategory('')}
          aria-pressed={category === ''}
        >
          Alles
        </Styled.Button>
        {Object.values(CONTENT_TYPES)
          .filter((cat) => cat.type !== 'theme')
          .map(({ type, plural }) => (
            <Styled.Button
              key={plural}
              type="button"
              variant="textButton"
              onClick={() => setCategory(type)}
              aria-pressed={category === type}
            >
              {plural}
            </Styled.Button>
          ))}
      </Styled.ButtonGroup>

      <SearchResults
        results={results.slice(0, numberOfResults)}
        cardHeadingLevel="h3"
      />

      {results.length === 0 && <Paragraph>Niets gevonden</Paragraph>}

      {results.length > numberOfResults && (
        <Link variant="standalone" href={`/zoek?thema=${slug}`}>
          {`Alles over ${themeTitle}`}
        </Link>
      )}
    </Styled.Container>
  )
}

export default ThemeSearch
