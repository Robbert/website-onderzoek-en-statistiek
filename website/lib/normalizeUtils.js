/* eslint-disable no-underscore-dangle */
import CONTENT_TYPES from '../constants/contentTypes'
import { dateConfig } from './utils'

export const normalizeItemList = (list) => {
  const types = [
    'articles',
    'publications',
    'videos',
    'interactives',
    'datasets',
    'collections',
    'links',
  ]
  if (list) {
    const normalizedList = list.flatMap((section) =>
      Object.keys(section)
        .filter((key) => types.includes(key) && section[key])
        .flatMap((key) => {
          const item = section[key]
          const contentName = CONTENT_TYPES[key.slice(0, -1)]?.name
          return key === 'links'
            ? item.map((subItem) => ({
                type: 'externalLink',
                name: 'link',
                ...subItem,
              }))
            : {
                type: key.slice(0, -1),
                name: contentName,
                path: `/${contentName}/${item.slug}`,
                publicationDate: item.publicationDate
                  ? item.publicationDate
                  : item.publishedAt,
                dateConfig: dateConfig(item.formatPublicationDate),
                ...item,
              }
        }),
    )
    return normalizedList
  }
  return []
}

const normalizeLinkList = (type, object) => {
  if (Array.isArray(object[type]) && object[type].length > 0) {
    const newObjArray = object[type].map((item) =>
      type !== 'links'
        ? {
            type: type.toLowerCase().slice(0, -1),
            name: CONTENT_TYPES[type.toLowerCase().slice(0, -1)].name,
            path: `/${CONTENT_TYPES[type.toLowerCase().slice(0, -1)].name}/${
              item.slug
            }`,
            ...item,
          }
        : {
            type: 'externalLink',
            name: 'link',
            ...item,
          },
    )

    return newObjArray
  }

  return []
}

export const normalizeBody = (body) =>
  !body
    ? []
    : body
        .map((item) =>
          item.__component
            ? {
                type: item.__component.replace('shared.', '').toLowerCase(),
                ...item,
              }
            : null,
        )
        .map((item) => {
          if (item.type === 'text-with-links') {
            const keys = Object.keys(item)

            return {
              type: item.type,
              text: item.text,
              id: `${item.id}-${item.type}`,
              links: keys.map((key) => normalizeLinkList(key, item)).flat(),
            }
          }
          return {
            ...item,
            id: `${item.id}-${item.type}`,
          }
        })
