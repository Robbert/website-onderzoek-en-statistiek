import { useState, useEffect } from 'react'
import NextImage from 'next/image'

import { prependStrapiURL, PLACEHOLDER_IMAGE } from '../../lib/utils'
import * as Styled from './InlineImage.style'

const InlineImage = ({ src, alt }) => {
  const [dimensions, setDimensions] = useState({ width: 675, height: 400 })

  useEffect(() => {
    const abortController = new AbortController()
    fetch(prependStrapiURL(`/api/upload/files?filters[url]=${src}`), {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((result) => result[0])
      .then(({ width, height }) => setDimensions({ width, height }))
      .catch((e) => e) // TODO: log image errors in Sentry
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
        layout="responsive"
      />
    </Styled.ImageWrapper>
  )
}

export default InlineImage
