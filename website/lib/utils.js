import { ApolloClient, InMemoryCache } from '@apollo/client'

export const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII='

export function prependStrapiURL(path = '') {
  let root = 'http://localhost:1337'

  if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'acceptance') {
    root = 'https://acc.cms.onderzoek-en-statistiek.nl'
  } else if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production') {
    root = 'https://cms.onderzoek-en-statistiek.nl'
  }

  return `${root}${path}`
}

export function prependRootURL(path = '') {
  let root = 'http://localhost:3000'

  if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'acceptance') {
    root = 'https://acc.onderzoek-en-statistiek.nl'
  } else if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production') {
    root = 'https://onderzoek-en-statistiek.nl'
  }

  return `${root}${path}`
}

export function getStrapiMedia(media) {
  if (!media) return null
  const imageUrl = media.url.startsWith('/')
    ? prependStrapiURL(media.url)
    : media.url
  return imageUrl
}

export async function fetchAPI(path) {
  const requestUrl = prependStrapiURL(path)
  const response = await fetch(requestUrl).catch((err) => err)
  if (response.status === 200) {
    const data = await response.json()
    return data
  }
  return []
}

export const apolloClient = new ApolloClient({
  uri: prependStrapiURL('/graphql'),
  cache: new InMemoryCache(),
})

export function getLatestContent(list, number) {
  return list
    .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
    .slice(0, number)
}

export const contentTypes = {
  article: {
    type: 'article',
    name: 'artikel',
    plural: 'artikelen',
  },
  publication: {
    type: 'publication',
    name: 'publicatie',
    plural: 'publicaties',
  },
  video: {
    type: 'video',
    name: 'video',
    plural: 'videos',
  },
  interactive: {
    type: 'interactive',
    name: 'interactief',
    plural: 'interactief',
  },
  theme: {
    type: 'theme',
    name: 'thema',
    plural: 'themas',
  },
  collection: {
    type: 'collection',
    name: 'dossier',
    plural: 'dossiers',
  },
  dataset: {
    type: 'dataset',
    name: 'dataset',
    plural: 'datasets',
  },
}

export function flattenFeatureList(list) {
  return !list ? [] : list.map((section) => ([
    ...section.articles?.map((entry) => (
      {
        ...entry,
        type: 'article',
        name: 'artikel',
        path: `/artikel/${entry.slug}`,
      }
    )) || [],
    ...section.publications?.map((entry) => (
      {
        ...entry,
        type: 'publication',
        name: 'publicatie',
        path: `/publicatie/${entry.slug}`,
      }
    )) || [],
    ...section.videos?.map((entry) => (
      {
        ...entry,
        type: 'video',
        name: 'video',
        path: `/video/${entry.slug}`,
      }
    )) || [],
    ...section.collections?.map((entry) => (
      {
        ...entry,
        type: 'collection',
        name: 'dossier',
        path: `/dossier/${entry.slug}`,
      }
    )) || [],
  ]
  )).flat()
}
