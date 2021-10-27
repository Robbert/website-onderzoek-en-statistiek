import { useState, useEffect } from 'react'
import NextImage from 'next/image'

import { prependStrapiURL, PLACEHOLDER_IMAGE } from '../../lib/utils'
import * as Styled from './InlineImage.style'

const InlineImage = ({ src, alt }) => {
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 })

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
    <Styled.ImageWrapper>
      <NextImage
        src={prependStrapiURL(src)}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        placeholder="blur"
        blurDataURL={PLACEHOLDER_IMAGE}
      />
    </Styled.ImageWrapper>
  )
}

export default InlineImage
