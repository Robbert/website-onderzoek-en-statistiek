import { useState } from 'react'
import Fuse from 'fuse.js'
import {
  Heading, Input, Label, Checkbox, FilterOption, List, ListItem,
} from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import Link from '../../components/Link'
import {
  contentTypes, formatDate, fetchAPI,
} from '../../lib/utils'
import * as Styled from './search.style'

const sortResults = (a, b, order) => {
  if (order === 'desc') return new Date(b.publicationDate) - new Date(a.publicationDate)
  if (order === 'asc') return new Date(a.publicationDate) - new Date(b.publicationDate)
  return a.score - b.score
}

const Results = ({
  content, searchQuery, sortOrder, category, themeFilter, searchIndex,
}) => {
  const list = searchQuery !== ''
    ? searchIndex.search(searchQuery).map(({ score, item }) => ({ score, ...item }))
    : content

  const results = list
    .filter(({ type }) => (category === 'all' || category === type))
    .filter(({ theme }) => (
      themeFilter.length === 0
      || themeFilter.some((t) => theme.includes(t))
    ))
    .sort((a, b) => sortResults(a, b, sortOrder))
    .slice(0, 20)

  return (
    <List>
      {results.map(({
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

const Search = ({ themes, content }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [category, setCategory] = useState('all')
  const [themeFilter, setThemeFilter] = useState([])

  const handleThemeChange = (slug) => {
    const newSelection = themeFilter.includes(slug)
      ? themeFilter.filter((item) => item !== slug)
      : [...themeFilter, slug]
    setThemeFilter(newSelection)
  }

  const fuseOptions = {
    includeScore: true,
    keys: ['title', 'teaser', 'intro'],
  }

  const searchIndex = new Fuse(content, fuseOptions)

  return (
    <>
      <Seo />
      <Styled.Container>
        <div>
          <Label htmlFor="searchfield" label="Zoeken" hidden />
          <Input id="searchfield" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
            content={content}
            searchIndex={searchIndex}
            searchQuery={searchQuery}
            sortOrder={sortOrder}
            themeFilter={themeFilter}
            category={category}
          />
        </div>
        <Styled.SideBar>
          <Heading forwardedAs="h2">Filters</Heading>
          <Styled.FilterBox label="Categorieën">
            <FilterOption
              active={category === 'all'}
              href="#"
              onClick={() => setCategory('all')}
            >
              Alle categorieën
            </FilterOption>
            {
            Object.values(contentTypes).filter((cat) => cat.type !== 'theme').map(({ type, plural }) => (
              <Styled.FilterOption
                key={type}
                active={category === type}
                href="#"
                onClick={() => setCategory(type)}
              >
                {plural}
              </Styled.FilterOption>
            ))
          }
          </Styled.FilterBox>
          <Styled.FilterBox label="Thema's">
            {
              themes.map(({ title, slug }) => (
                <Label key={slug} align="flex-start" htmlFor={slug} label={title}>
                  <Checkbox id={slug} variant="primary" onChange={() => handleThemeChange(slug)} checked={themeFilter.includes(slug)} />
                </Label>
              ))
            }
          </Styled.FilterBox>
        </Styled.SideBar>
      </Styled.Container>
    </>
  )
}

export async function getStaticProps() {
  const themes = await fetchAPI('/themes').then((res) => res.map(({ title, slug }) => ({ title, slug })))
  const articles = await fetchAPI('/articles?_limit=-1').then((res) => res.map((c) => ({ ...c, type: 'article' })))
  const publications = await fetchAPI('/publications?_limit=-1').then((res) => res.map((c) => ({ ...c, type: 'publication' })))
  const videos = await fetchAPI('/videos?_limit=-1').then((res) => res.map((c) => ({ ...c, type: 'video' })))
  const interactives = await fetchAPI('/interactives?_limit=-1').then((res) => res.map((c) => ({ ...c, type: 'interactive', intro: '' })))
  const datasets = await fetchAPI('/datasets?_limit=-1').then((res) => res.map((c) => ({
    ...c, type: 'dataset', publicationDate: c.updated_at, teaser: c.legalFoundation, intro: c.description,
  })))
  const collections = await fetchAPI('/collections?_limit=-1').then((res) => res.map((c) => ({
    ...c, type: 'collection', publicationDate: c.updated_at,
  })))

  const content = [
    ...articles, ...publications, ...videos, ...interactives, ...collections, ...datasets,
  ].map(({
    slug, title, teaser, intro, publicationDate, type, theme,
  }) => ({
    slug, title, teaser, intro, publicationDate, type, theme: theme.map((item) => item.slug),
  }))

  return {
    props: { themes, content },
    revalidate: 10,
  }
}

export default Search
