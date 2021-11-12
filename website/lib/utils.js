/* eslint-disable no-underscore-dangle */
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { themeColor } from '@amsterdam/asc-ui'

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

export const translateColor = (name) => {
  const translations = {
    groen: 'darkgreen',
    lichtblauw: 'lightblue',
    lichtgroen: 'lightgreen',
    oranje: 'orange',
    roze: 'pink',
    paars: 'purple',
    geel: 'yellow',
  }
  return themeColor('supplement', translations[name])
}

export const normalizeItemList = (list) => (
  !list ? [] : list
    .map((section) => (Object.values(section)[0])).flat()
    .filter((item) => item)
    .map((item) => (
      item?.__typename && item.__typename !== 'ComponentSharedExternalLinks'
        ? {
          type: item.__typename.toLowerCase(),
          name: CONTENT_TYPES[item.__typename.toLowerCase()].name,
          path: `/${CONTENT_TYPES[item.__typename.toLowerCase()].name}/${item.slug}`,
          ...item,
        }
        : {
          type: 'externalLink',
          name: 'link',
          path: item.path,
          title: item.title,
        }
    ))
)

export const normalizeBody = (body) => (
  !body ? [] : body
    .map((item) => (
      item.__typename ? {
        type: item.__typename.replace('ComponentShared', '').toLowerCase(),
        ...item,
      } : null
    ))
    .map((item) => {
      if (item.type === 'textwithlinks') {
        return ({
          type: item.type,
          text: item.text,
          id: item.id,
          links: Object.values(item)
            .filter((list) => Array.isArray(list) && list.length > 0)
            .flat()
            .map((link) => (link.__typename !== 'ComponentSharedExternalLinks'
              ? {
                type: link.__typename.toLowerCase(),
                name: CONTENT_TYPES[link.__typename.toLowerCase()].name,
                path: `/${CONTENT_TYPES[link.__typename.toLowerCase()].name}/${link.slug}`,
                ...link,
              }
              : {
                type: 'externalLink',
                name: 'link',
                ...link,
              })),
        })
      }
      return item
    })
)

export const formatBytes = (bytes, decimals = 0) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm)).toLocaleString('nl-NL')} ${sizes[i]}`
}

export const formatDate = (d) => new Intl.DateTimeFormat('nl', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour12: false,
}).format(new Date(d))
