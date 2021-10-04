import { useState, useEffect, useContext } from 'react'
import { debounce } from 'lodash'
import { Button } from '@amsterdam/asc-ui'

import { SearchContext, getSearchResults } from '../../lib/searchUtils'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Heading from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'
import CONTENT_TYPES from '../../constants/contentTypes'
import * as Styled from './ThemeSearch.style'

const ThemeSearch = ({ themeTitle, slug }) => {
  const searchIndex = useContext(SearchContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [results, setResults] = useState(getSearchResults(searchIndex, '', 'af', [slug], category))
  const numberOfResults = 5

  useEffect(() => {
    const throttledUpdate = debounce(() => {
      const updatedResults = getSearchResults(searchIndex, searchQuery, 'af', [slug], category)
      setResults(updatedResults)
    }, 300)

    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [slug, searchIndex, searchQuery, category])

  return (
    <Styled.Container>
      <Heading gutterBottom={24} as="h2">
        {`Meer over ${themeTitle}`}
      </Heading>
      <SearchBar
        id="searchTheme"
        type="text"
        value={searchQuery}
        onChange={(text) => setSearchQuery(text)}
      />
      <Styled.List>
        <Styled.ListItem>
          <Styled.FilterButton
            variant="textButton"
            active={category === ''}
            onClick={() => setCategory('')}
          >
            Alles
          </Styled.FilterButton>
        </Styled.ListItem>
        {Object.values(CONTENT_TYPES)
          .filter((cat) => cat.type !== 'theme')
          .map(({ type, plural }) => (
            <Styled.ListItem key={type}>
              <Styled.FilterButton
                variant="textButton"
                active={category === type}
                onClick={() => setCategory(type)}
              >
                {plural}
              </Styled.FilterButton>
            </Styled.ListItem>
          ))}
      </Styled.List>
      <SearchResults
        results={results.slice(0, numberOfResults)}
      />

      {results.length === 0 && <Paragraph>Niets gevonden</Paragraph>}

      {results.length > numberOfResults && (
        <Styled.Link href={`/zoek?thema=${slug}`}>
          <Button variant="primary">
            {`Alles over ${themeTitle}`}
          </Button>
        </Styled.Link>
      )}
    </Styled.Container>
  )
}

export default ThemeSearch
