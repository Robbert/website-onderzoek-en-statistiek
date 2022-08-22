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
  period,
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
    .filter((item) => {
      if (period[0] && period[1]) {
        const pubDate = new Date(item.publicationDate)
        const min = new Date(period[0], 0, 1)
        const max = new Date(period[1], 11, 31, 23, 59, 59)

        return pubDate >= min && pubDate <= max
      }
      return true
    })
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

export function getPeriodRange(index) {
  if (index) {
    const allDates = index._docs.map(
      (item) => +item.publicationDate.slice(0, 4),
    )
    const min = Math.min(...allDates).toString()
    const max = Math.max(...allDates).toString()

    return [min, max]
  }
  return [null, null]
}

// only show period if the period array is filled
// and the selected period is not the same as the entire period range
export const showPeriod = (period, periodRange) =>
  period[0] &&
  period[1] &&
  !(period[0] === periodRange[0] && period[1] === periodRange[1])

// check if value is a number with 4 digits and is in the total range
export const isInRange = (value, totalRange) =>
  /^[0-9]{4}/.test(value) && value >= totalRange[0] && value <= totalRange[1]

export const sanitizePeriodParamString = (periodParamString, totalRange) => {
  const selectedRange = periodParamString.split('-')
  return [
    isInRange(parseInt(selectedRange[0], 10), totalRange)
      ? selectedRange[0]
      : totalRange[0],
    isInRange(parseInt(selectedRange[1], 10), totalRange)
      ? selectedRange[1]
      : totalRange[1],
  ]
}
