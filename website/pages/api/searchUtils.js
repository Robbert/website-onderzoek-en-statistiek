import { writeFileSync } from 'fs'
import Fuse from 'fuse.js'

import { fetchAPI } from '../../lib/utils'

const normalize = ({
  slug, title, shortTitle, teaser, intro, body, publicationDate, theme,
}) => ({
  slug,
  title,
  shortTitle,
  teaser,
  intro,
  body,
  publicationDate,
  theme: theme.map((item) => item.slug),
})

export const CACHEFILE = './.next/searchData.js'

export default async function createNewIndex() {
  const articles = await fetchAPI('/articles?_limit=-1')
    .then((result) => result.map((item) => ({
      ...normalize(item),
      type: 'article',
    })))
  const publications = await fetchAPI('/publications?_limit=-1')
    .then((result) => result.map((item) => ({
      ...normalize(item),
      type: 'publication',
    })))
  const videos = await fetchAPI('/videos?_limit=-1')
    .then((result) => result.map((item) => ({
      ...normalize(item),
      type: 'video',
    })))
  const interactives = await fetchAPI('/interactives?_limit=-1')
    .then((result) => result.map((item) => ({
      ...normalize(item),
      type: 'interactive',
      intro: '',
      body: '',
    })))
  const datasets = await fetchAPI('/datasets?_limit=-1')
    .then((result) => result.map((item) => ({
      ...normalize(item),
      type: 'dataset',
      publicationDate: item.updated_at,
      teaser: item.legalFoundation,
      intro: item.description,
      body: '',
    })))
  const collections = await fetchAPI('/collections?_limit=-1')
    .then((result) => result.map((item) => ({
      ...normalize(item),
      type: 'collection',
      publicationDate: item.updated_at,
      body: '',
    })))

  const content = [
    ...articles, ...publications, ...videos, ...interactives, ...collections, ...datasets,
  ]

  const keys = [
    {
      name: 'title',
      weight: 1,
    },
    {
      name: 'teaser',
      weight: 0.8,
    },
    {
      name: 'intro',
      weight: 0.8,
    },
    {
      name: 'body',
      weight: 0.5,
    }]

  const index = Fuse.createIndex(keys, content)
  const searchData = { content, index }
  const file = `exports.searchData = ${JSON.stringify(searchData)}`

  try {
    writeFileSync(CACHEFILE, file)
    return 'succes'
  } catch (e) {
    return 'something went wrong'
  }
}
