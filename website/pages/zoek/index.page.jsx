import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Heading, Label, Checkbox, List, ListItem, Paragraph,
} from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import Link from '../../components/Link'
import {
  contentTypes, formatDate, apolloClient, prependRootURL,
} from '../../lib/utils'
import useFetch from '../../lib/useFetch'
import QUERY from './search.query.gql'
import * as Styled from './search.style'

const Results = (props) => {
  const params = Object.entries(props).filter(([, value]) => value.length > 0)
  const queryString = new URLSearchParams(params).toString()
  const url = prependRootURL(`/api/search?${queryString}`)
  const { data, error, isLoading } = useFetch(url)

  if (isLoading || !data) return null
  if (error) return <Paragraph>Er ging iets mis, probeer opnieuw te zoeken.</Paragraph>

  return (
    <List>
      {data.results.map(({
        slug, title, type, publicationDate,
      }) => (
        <ListItem key={`${type}-${slug}`}>
          <Link
            href={`/${contentTypes[type].name}/${slug}`}
            inList
          >
            {`${contentTypes[type].name}: ${title} | ${formatDate(publicationDate)}`}
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

const Search = ({ themes }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [category, setCategory] = useState('')
  const [themeFilter, setThemeFilter] = useState([])

  const handleThemeChange = (slug) => {
    const newSelection = themeFilter.includes(slug)
      ? themeFilter.filter((item) => item !== slug)
      : [...themeFilter, slug]
    setThemeFilter(newSelection)
  }

  const router = useRouter()

  useEffect(() => {
    const query = {}
    if (searchQuery) query.q = encodeURI(searchQuery)
    if (sortOrder !== 'desc') query.sort = encodeURI(sortOrder)
    if (themeFilter.length > 0) query.theme = encodeURI(themeFilter)
    if (category) query.category = encodeURI(category)
    router.push({
      pathname: '/zoek',
      query,
    })
  }, [searchQuery, sortOrder, themeFilter, category])

  useEffect(() => {
    if (router.isReady) {
      const {
        q, sort, category: cat, theme,
      } = router.query
      if (q) setSearchQuery(decodeURI(q))
      if (sort) setSortOrder(sort)
      if (cat) setCategory(cat)
      if (theme) setThemeFilter(theme.split(','))
    }
  }, [router.isReady])

  return (
    <>
      <Seo />
      <Styled.Container>
        <div>
          <Label htmlFor="searchfield" label="Zoeken" hidden />
          <Styled.SearchBar id="searchfield" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Styled.PageTitle forwardedAs="h2">Resultaten</Styled.PageTitle>
          <Styled.SortBar>
            <Label htmlFor="selectSort" label="Sorteren" hidden />
            <Styled.Select id="selectSort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="desc">Aflopend datum</option>
              <option value="asc">Oplopend datum</option>
              <option value="score">Relevantie</option>
            </Styled.Select>
          </Styled.SortBar>
          <Results
            q={searchQuery}
            sort={sortOrder}
            theme={themeFilter}
            category={category}
          />
        </div>
        <Styled.SideBar>
          <Heading forwardedAs="h2">Filters</Heading>
          <Styled.FilterBox label="Thema's">
            {
              themes.map(({ title, slug }) => (
                <Label key={slug} align="flex-start" htmlFor={slug} label={title}>
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
                  {plural}
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

  return {
    props: data,
    revalidate: 1,
  }
}

export default Search
