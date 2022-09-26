import qs from 'qs'

import CONTENT_TYPES from '~/constants/contentTypes'
import { fetchAPI } from '../../lib/utils'

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  if (
    req.query.secret !== process.env.STRAPI_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({
      message:
        'Incorrecte code. Neem contact op met redactie.os@amsterdam.nl voor vragen.',
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
        'Incorrecte slug. Neem contact op met redactie.os@amsterdam.nl voor vragen.',
    })
  }
  res.setPreviewData({})

  res.writeHead(307, {
    Location: `/${CONTENT_TYPES[req.query.type].name}/${pageData.data[0].slug}`,
  })
  res.end()
}
