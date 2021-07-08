import { useState, useEffect } from 'react'
import Image from 'next/image'

import { getStrapiURL } from '../lib/utils'

const InlineImage = ({ src, alt }) => {
  const [dimensions, setDimensions] = useState({ width: 3, height: 2 })

  useEffect(() => {
    const abortController = new AbortController()
    fetch(`${getStrapiURL()}/upload/files?url=${src}`, { signal: abortController.signal })
      .then((response) => response.json())
      .then((result) => result[0])
      .then(({ width, height }) => setDimensions({ width, height }))
    return () => abortController.abort()
  }, [])

  return (
    <Image
      src={getStrapiURL() + src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      placeholder="blur"
    />
  )
}

export default InlineImage
