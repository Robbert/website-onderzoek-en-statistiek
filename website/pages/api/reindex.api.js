import { writeFileSync, readdirSync, mkdirSync } from 'fs'
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

async function createNewIndex() {
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

  const data = [
    ...articles, ...publications, ...videos, ...interactives, ...collections, ...datasets,
  ]
  const content = `export default ${JSON.stringify(data)}`

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
  const searchIndex = `export default ${JSON.stringify(Fuse.createIndex(keys, data))}`

  const path = './.next/cache/search/'
  try {
    readdirSync(path)
  } catch (e) {
    mkdirSync(path)
  }

  try {
    writeFileSync(`${path}index.js`, searchIndex)
    writeFileSync(`${path}content.js`, content)
    return 'succes'
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return 'something went wrong'
  }
}

export default async function handler(req, res) {
  await createNewIndex().then((result) => {
    res.status(200).json({ result })
  })
}
