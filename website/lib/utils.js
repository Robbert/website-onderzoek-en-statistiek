/* eslint-disable no-underscore-dangle */
import { ApolloClient, InMemoryCache } from '@apollo/client'

import CONTENT_TYPES from '../constants/contentTypes'

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
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

export const translateContentType = (contentType) => Object.values(CONTENT_TYPES)
  .find(({ name }) => name === contentType).type

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
    ...section.interactives?.map((entry) => (
      {
        ...entry,
        type: 'interactive',
        name: 'interactief',
        path: `/interactief/${entry.slug}`,
      }
    )) || [],
    ...section.datasets?.map((entry) => (
      {
        ...entry,
        type: 'dataset',
        name: 'dataset',
        path: `/dataset/${entry.slug}`,
      }
    )) || [],
  ]
  )).flat()
}

export function flattenFeatureObject(featureObject) {
  return !featureObject ? [] : Object.values(featureObject)
    .flat()
    .filter((el) => typeof (el) === 'object')
    .map((entry) => (
      {
        ...entry,
        type: entry.__typename.toLowerCase(),
        name: CONTENT_TYPES[entry.__typename.toLowerCase()].name,
        path: `/${CONTENT_TYPES[entry.__typename.toLowerCase()].name}/${entry.slug}`,
      }
    ))
}

export function formatBytes(bytes, decimals = 0) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm)).toLocaleString('nl-NL')} ${sizes[i]}`
}

export function formatDate(d) {
  return new Intl.DateTimeFormat('nl', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour12: false,
  }).format(new Date(d))
}
