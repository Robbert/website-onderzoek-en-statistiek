/* eslint-disable no-underscore-dangle */
import { createContext } from 'react'

import { fetchAPI } from './utils'

const SearchContext = createContext()
export { SearchContext }

const normalize = ({
  slug,
  title,
  shortTitle,
  teaser,
  intro,
  publicationDate,
  theme,
}) => ({
  slug,
  title,
  shortTitle,
  teaser,
  intro,
  publicationDate,
  theme: theme.map((item) => item.slug),
})

export async function getSearchContent() {
  const articles = await fetchAPI('/articles?_limit=-1').then((result) =>
    result.map((item) => ({
      ...normalize(item),
      type: 'article',
    })),
  )
  const publications = await fetchAPI('/publications?_limit=-1').then(
    (result) =>
      result.map((item) => ({
        ...normalize(item),
        type: 'publication',
      })),
  )
  const videos = await fetchAPI('/videos?_limit=-1').then((result) =>
    result.map((item) => ({
      ...normalize(item),
      type: 'video',
    })),
  )
  const interactives = await fetchAPI('/interactives?_limit=-1').then(
    (result) =>
      result.map((item) => ({
        ...normalize(item),
        type: 'interactive',
        intro: '',
        body: '',
      })),
  )
  const datasets = await fetchAPI('/datasets?_limit=-1').then((result) =>
    result.map((item) => ({
      ...normalize(item),
      type: 'dataset',
      shortTitle: '',
      publicationDate: item.updated_at,
      intro: item.body.reduce(
        (allText, bodyItem) => allText + bodyItem.text,
        '',
      ),
    })),
  )
  const collections = await fetchAPI('/collections?_limit=-1').then((result) =>
    result.map((item) => ({
      ...normalize(item),
      type: 'collection',
      publicationDate: item.updated_at,
      body: '',
    })),
  )

  return [
    ...articles,
    ...publications,
    ...videos,
    ...interactives,
    ...collections,
    ...datasets,
  ]
}

export const fuseOptions = {
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
  threshold: 0,
  keys: ['title', 'shortTitle', 'teaser', 'intro'],
}

const sortResults = (a, b, order) => {
  if (order === 'score') return a.score - b.score
  if (order === 'op')
    return new Date(a.publicationDate) - new Date(b.publicationDate)
  return new Date(b.publicationDate) - new Date(a.publicationDate)
}

export function getSearchResults(
  searchIndex,
  searchQuery,
  sortOrder,
  themeFilter,
  category,
) {
  if (!searchIndex) return []
  const base =
    searchQuery === ''
      ? searchIndex._docs
      : searchIndex
          .search(searchQuery)
          .map(({ score, item }) => ({ score, ...item }))

  return base
    .filter(({ type }) => !category || category === type)
    .filter(
      ({ theme }) =>
        themeFilter.length === 0 || themeFilter.some((t) => theme.includes(t)),
    )
    .sort((a, b) => sortResults(a, b, sortOrder))
}

export function calculateFacetsTotals(themes, types, results) {
  const facets = themes
    .map(({ slug }) => slug)
    .concat(Object.keys(types))
    .reduce((acc, curr) => {
      acc[curr] = 0
      return acc
    }, {})
  results.forEach((result) => {
    facets[result.type] += 1
    result.theme.forEach((theme) => {
      facets[theme] += 1
    })
  })
  return facets
}

export const formatFacetNumber = (number) => (number > 0 ? `(${number})` : '')
