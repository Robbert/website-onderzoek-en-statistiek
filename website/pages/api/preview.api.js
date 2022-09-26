import qs from 'qs'

import CONTENT_TYPES from '~/constants/contentTypes'
import { fetchAPI } from '../../lib/utils'

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  if (!req.query.slug) {
    return res.status(401).json({
      message:
        'Onjuiste url, de slug ontbreekt. Neem contact op met redactie.os@amsterdam.nl voor vragen.',
    })
  }

  // check if item exists
  const pageData = await fetchAPI(
    `/api/${req.query.type}s?${qs.stringify(
      {
        filters: {
          slug: { $eq: req.query.slug },
          publishedAt: { $null: true },
        },
        fields: ['slug'],
        publicationState: 'preview',
      },
      { encodeValuesOnly: true },
    )}`,
  )

  if (!pageData.data?.length > 0) {
    return res.status(401).json({
      message:
        'Onjuiste url, deze slug bestaat niet. Neem contact op met redactie.os@amsterdam.nl voor vragen.',
    })
  }
  res.setPreviewData({})

  res.writeHead(307, {
    Location: `/${CONTENT_TYPES[req.query.type].name}/${pageData.data[0].slug}`,
  })
  res.end()
}
