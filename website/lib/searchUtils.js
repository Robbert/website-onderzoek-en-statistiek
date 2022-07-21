/* eslint-disable no-underscore-dangle */
import { createContext } from 'react'

import { fetchAPI, dateConfig } from './utils'

const SearchContext = createContext()
export { SearchContext }

const normalize = ({
  slug,
  title,
  teaser,
  intro,
  themes,
  keywords,
  publicationDate,
  updatedAt,
  formatPublicationDate,
}) => ({
  slug,
  title,
  titleWords: title,
  teaser,
  intro: intro ? `${keywords} ${intro}` : `${keywords} ${teaser}`,
  theme: themes.map((item) => item.slug),
  keywords,
  publicationDate: publicationDate || updatedAt,
  dateConfig: dateConfig(formatPublicationDate),
})

export async function getSearchContent() {
  const articles = await fetchAPI('/api/articles?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/articles?&pagination[pageSize]=${metaResult.meta.pagination.total}&populate=*`,
      ).then((result) =>
        result.data.map((item) => ({
          ...normalize(item),
          type: 'article',
        })),
      ),
  )

  const publications = await fetchAPI('/api/publications?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/publications?&pagination[pageSize]=${metaResult.meta.pagination.total}&populate=*`,
      ).then((result) =>
        result.data.map((item) => ({
          ...normalize(item),
          type: 'publication',
        })),
      ),
  )

  const videos = await fetchAPI('/api/videos?fields=id').then((metaResult) =>
    fetchAPI(
      `/api/videos?&pagination[pageSize]=${metaResult.meta.pagination.total}&populate=*`,
    ).then((result) =>
      result.data.map((item) => ({
        ...normalize(item),
        type: 'video',
      })),
    ),
  )

  const interactives = await fetchAPI('/api/interactives?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/interactives?&pagination[pageSize]=${metaResult.meta.pagination.total}&populate=*`,
      ).then((result) =>
        result.data.map((item) => ({
          ...normalize(item),
          type: 'interactive',
        })),
      ),
  )

  const datasets = await fetchAPI('/api/datasets?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/datasets?&pagination[pageSize]=${metaResult.meta.pagination.total}&populate=*`,
      ).then((result) =>
        result.data.map((item) => ({
          ...normalize(item),
          type: 'dataset',
        })),
      ),
  )

  const collections = await fetchAPI('/api/collections?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/collections?&pagination[pageSize]=${metaResult.meta.pagination.total}&populate=*`,
      ).then((result) =>
        result.data.map((item) => ({
          ...normalize(item),
          type: 'collection',
        })),
      ),
  )

  return [
    ...articles,
    ...publications,
    ...videos,
    ...interactives,
    ...collections,
    ...datasets,
  ].sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
}

export const fuseOptions = {
  includeScore: true,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  useExtendedSearch: true,
  findAllMatches: false,
  includeMatches: true,
  threshold: 0.2,
  minMatchCharLength: 2,
  keys: [
    {
      name: 'title',
      weight: 4,
    },
    {
      name: 'keywords',
      weight: 3,
    },
    {
      name: 'titleWords',
      weight: 2,
    },
    {
      name: 'intro',
      weight: 1,
    },
  ],
}

export function getSearchResults(
  searchIndex,
  searchQuery,
  themeFilter,
  category,
) {
  if (!searchIndex) return []
  const fuzzyWords = searchQuery
    .trim()
    .split(' ')
    .filter((d) => d.length > 2)

  // The score is based on the weighted assertion of:
  // 1. title matches query verbatim or
  // 2. keywords matches query verbatim or
  // 3. title contains all query words (excluding two letter words) or
  // 4. intro combined with keywords contains all query words (excluding two letter words)

  // The results can be tweaked further using these constants
  // const exactWords= fuzzyItems.map((d) => `'${d}`)
  // const someWords = `${exactWords.toString().replaceAll(',', ' | ')}`
  // See for documentation https://fusejs.io/api/query.html and
  // https://fusejs.io/examples.html#extended-search

  const verbatim = `'"${searchQuery.trim()}"`
  const allWords = `${fuzzyWords.toString().replaceAll(',', ' ')}`
  const query = {
    $or: [
      { keywords: verbatim },
      { title: verbatim },
      { titleWords: allWords },
      { intro: allWords },
    ],
  }

  const base =
    searchQuery.trim() === ''
      ? searchIndex._docs
      : searchIndex
          .search(query)
          .map(({ score, matches, item }) => ({ score, matches, ...item }))

  return base
    .filter(({ type }) => !category || category === type)
    .filter(
      ({ theme }) =>
        themeFilter.length === 0 || themeFilter.some((t) => theme.includes(t)),
    )
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
