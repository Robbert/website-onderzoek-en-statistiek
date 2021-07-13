import { useState, useEffect } from 'react'
import Image from 'next/image'

import { prependStrapiURL, PLACEHOLDER_IMAGE } from '../lib/utils'

const InlineImage = ({ src, alt }) => {
  const [dimensions, setDimensions] = useState({ width: 3, height: 2 })

  useEffect(() => {
    const abortController = new AbortController()
    fetch(prependStrapiURL(`/upload/files?url=${src}`), { signal: abortController.signal })
      .then((response) => response.json())
      .then((result) => result[0])
      .then(({ width, height }) => setDimensions({ width, height }))
      .catch() // TODO: log image errors in Sentry
    return () => abortController.abort()
  }, [])

  return (
    <Image
      src={prependStrapiURL(src)}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      placeholder="blur"
      blurDataURL={PLACEHOLDER_IMAGE}
    />
  )
}

export default InlineImage
