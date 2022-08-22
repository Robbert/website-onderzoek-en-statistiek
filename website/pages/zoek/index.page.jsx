/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import { useMatchMedia } from '@amsterdam/asc-ui'
import { Close } from '@amsterdam/asc-assets'
import qs from 'qs'

import Seo from '~/components/Seo/Seo'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import SearchBar from '~/components/SearchBar/SearchBar'
import SearchResults from '~/components/SearchResults/SearchResults'
import Pagination from '~/components/Pagination/Pagination'
import SearchFilterSection from '~/components/SearchFilterSection/SearchFilterSection'
import { translateContentType, decodeQuerySafe, fetchAPI } from '~/lib/utils'
import { trackSearchQuery } from '~/lib/analyticsUtils'
import CONTENT_TYPES from '~/constants/contentTypes'
import {
  SearchContext,
  getSearchResults,
  getPeriodRange,
  showPeriod,
  sanitizePeriodParamString,
} from '~/lib/searchUtils'
import * as Styled from './search.style'

const Search = ({ themes }) => {
  const searchIndex = useContext(SearchContext)
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [themeFilter, setThemeFilter] = useState([])
  const [page, setPage] = useState(1)
  const [period, setPeriod] = useState([null, null])

  const [results, setResults] = useState([])

  const periodRange = getPeriodRange(searchIndex)

  const setQueries = (q, cat, theme, pageNumber, selectedPeriod) => {
    setSearchQuery(q ? decodeQuerySafe(q) : '')
    setCategory(translateContentType(cat) || '')
    setThemeFilter(
      themes?.some(({ slug }) => theme?.includes(slug)) ? theme.split(' ') : [],
    )
    setPage(pageNumber ? parseInt(pageNumber, 10) : 1)
    setPeriod(
      selectedPeriod
        ? sanitizePeriodParamString(selectedPeriod, periodRange)
        : '',
    )
  }

  // get state from url params on first render
  // and when periodRange changes
  useEffect(() => {
    if (router.isReady) {
      const {
        tekst: q,
        categorie: cat,
        thema: theme,
        pagina: pageNumber,
        periode: selectedPeriod,
      } = router.query

      setQueries(q, cat, theme, pageNumber, selectedPeriod)
    }
  }, [router.isReady, periodRange[0]])

  // get state from url params on forward and back button click
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        const queryString = as.substring(as.indexOf('?'))
        const urlParams = new URLSearchParams(queryString)

        const q = urlParams.get('tekst')
        const cat = urlParams.get('categorie')
        const theme = urlParams.get('thema')
        const pageNumber = urlParams.get('pagina')
        const selectedPeriod = urlParams.get('periode')

        setQueries(q, cat, theme, pageNumber, selectedPeriod)
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [router])

  // push state to url params
  useEffect(() => {
    const throttledUpdate = debounce(() => {
      const query = {
        ...(searchQuery !== '' && { tekst: searchQuery }),
        ...(category && { categorie: CONTENT_TYPES[category].name }),
        ...(themeFilter.length > 0 && { thema: themeFilter.join(' ') }),
        ...(page !== 1 && { pagina: page }),
        ...(showPeriod(period, periodRange) && {
          periode: `${period[0]}-${period[1]}`,
        }),
      }

      router.push({ query }, undefined, {
        shallow: true,
        scroll: false,
      })
    }, 300)
    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [searchQuery, category, themeFilter, page, period])

  useEffect(() => {
    const throttledUpdate = debounce(() => {
      const updatedResults = getSearchResults(
        searchIndex,
        searchQuery,
        themeFilter,
        category,
        period,
      )
      setResults(updatedResults)
    }, 300)
    throttledUpdate()
    return () => throttledUpdate.cancel()
  }, [searchIndex, searchQuery, themeFilter, category, period])

  const handleThemeChange = (slug) => {
    const newThemeFilter = themeFilter.includes(slug)
      ? themeFilter.filter((item) => item !== slug)
      : [...themeFilter, slug]

    setThemeFilter(newThemeFilter)
    setPage(1)
  }

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0)
    setPage(pageNumber)
  }

  useEffect(() => {
    const tracker = trackSearchQuery(searchQuery, category)
    return () => tracker.cancel()
  }, [searchQuery, category])

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
            {`${page > 1 ? `Pagina ${page} van ` : ''} ${results.length} ${
              results.length === 1 ? 'resultaat' : 'resultaten'
            }`}
          </Paragraph>
          <Heading gutterBottom={{ small: 24, large: 16 }} styleAs="h2">
            Zoeken
          </Heading>
          <SearchBar
            id="searchfield"
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q)
              setPage(1)
            }}
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
                  onClick={() => {
                    setCategory('')
                    setPage(1)
                  }}
                >
                  <Styled.Icon size={20}>
                    <Close />
                  </Styled.Icon>
                  <span>{plural}</span>
                </Styled.Button>
              ))}
            {showPeriod(period, periodRange) && (
              <Styled.Button
                type="button"
                small
                onClick={() => {
                  setPeriod([null, null])
                  setPage(1)
                }}
              >
                <Styled.Icon size={20}>
                  <Close />
                </Styled.Icon>
                <span>{`${period[0]}-${period[1]}`}</span>
              </Styled.Button>
            )}
            {themes
              .filter(({ slug }) => themeFilter.includes(slug))
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
            onPageChange={handlePageChange}
          />
        </GridItem>
        <SearchFilterSection
          results={results}
          themes={themes}
          themeFilter={themeFilter}
          handleThemeChange={handleThemeChange}
          category={category}
          setCategory={setCategory}
          setPage={setPage}
          period={period}
          setPeriod={setPeriod}
          periodRange={periodRange}
        />
      </Grid>
    </>
  )
}

export async function getStaticProps() {
  const themeQuery = qs.stringify(
    { fields: ['title', 'slug'] },
    { encodeValuesOnly: true },
  )

  const themes = await fetchAPI(`/api/themes?${themeQuery}`)

  return {
    props: { themes: themes.data },
    revalidate: 10,
  }
}

export default Search
