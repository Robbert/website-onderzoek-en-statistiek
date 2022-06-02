import { css } from 'styled-components'
import { themeColor, svgFill } from '@amsterdam/asc-ui'

import CONTENT_TYPES from '../constants/contentTypes'

export const PLACEHOLDER_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII='

export function prependStrapiURL(path = '') {
  let root = 'http://localhost:1337'

  if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'acceptance') {
    root = 'https://acc.cms.onderzoek-en-statistiek.nl'
  } else if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production') {
    root = 'https://cms.onderzoek-en-statistiek.nl'
  }

  return `${root}${path}`
}

export const prependStaticContentUrl = (path = '') => {
  let root = 'http://localhost:3000'
  if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'acceptance') {
    root = 'https://acc.onderzoek.amsterdam.nl/static/acc'
  } else if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production') {
    root = '/static/prod'
  }
  return `${root}${path}`
}

export function prependRootURL(path = '') {
  let root = 'http://localhost:3000'

  if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'acceptance') {
    root = 'https://acc.onderzoek.amsterdam.nl'
  } else if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production') {
    root = 'https://onderzoek.amsterdam.nl'
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

export const translateContentType = (contentType) =>
  Object.values(CONTENT_TYPES).find(({ name }) => name === contentType)?.type

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

export const formatBytes = (bytes, decimals = 0) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm)).toLocaleString('nl-NL')} ${
    sizes[i]
  }`
}

export const dateConfig = (format) => {
  switch (format) {
    case 'MaandJaar':
      return {
        month: 'long',
        year: 'numeric',
        hour12: false,
      }
    case 'Jaar':
      return {
        year: 'numeric',
        hour12: false,
      }
    default:
      return {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour12: false,
      }
  }
}

export const formatDate = (
  d,
  config = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour12: false,
  },
) => d && new Intl.DateTimeFormat('nl', config).format(new Date(d))

export const decodeQuerySafe = (q) => {
  try {
    // this regex replaces every % NOT followed by a two-digit (hex) number with %25
    // this fixes an error when trying to decode a % symbol
    // https://stackoverflow.com/questions/7449588/why-does-decodeuricomponent-lock-up-my-browser#answer-54310080
    return decodeURIComponent(q.replace(/%(?![0-9a-fA-F]+)/g, '%25'))
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return ''
  }
}

export const getFontColor = (backgroundColor) =>
  backgroundColor === 'paars' || backgroundColor === 'roze'
    ? css`
        color: white;
        ${svgFill('white')}
      `
    : css`
        color: black;
        ${svgFill('black')}
      `
