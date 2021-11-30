import { useState, useEffect } from 'react'
import { useMatchMedia } from '@amsterdam/asc-ui'
import NextLink from 'next/link'
import NextImage from 'next/image'

import Heading from '../Heading/Heading'
import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import videoIcon from '../../public/icons/video.svg'
import interactiveIcon from '../../public/icons/interactive.svg'
import datasetIcon from '../../public/icons/dataset.svg'
import * as Styled from './Card.style'

const WrappedImage = ({
  image, large, isMobile, alwaysRectangularImage, type,
}) => {
  const defaultWidth = isMobile || alwaysRectangularImage ? 16 : 1
  const defaultHeight = isMobile || alwaysRectangularImage ? 9 : 1

  let icon

  if (type === 'video') {
    icon = videoIcon
  }
  if (type === 'interactive') {
    icon = interactiveIcon
  }
  if (type === 'dataset') {
    icon = datasetIcon
  }

  return (
    <Styled.ImageWrapper large={large}>
      <NextImage
        src={
          image
            ? getStrapiMedia(image)
            : PLACEHOLDER_IMAGE
        }
        alt=""
        width={image ? image.width : defaultWidth}
        height={image ? image.height : defaultHeight}
        layout="responsive"
      />
      {icon
      && (
        <Styled.IconContainer>
          <NextImage
            src={icon.src}
            alt=""
            width={48}
            height={48}
          />
        </Styled.IconContainer>
      )}
    </Styled.ImageWrapper>
  )
}

const Card = ({
  href,
  image,
  mobileImage,
  type,
  title,
  teaser,
  large,
  headingLevel,
  clickableImage,
  alwaysRectangularImage,
}) => {
  const isMobile = useMatchMedia({ maxBreakpoint: 'laptop' })
  const [imageSrc, setImageSrc] = useState(image)

  useEffect(() => {
    if (mobileImage && isMobile[0]) {
      setImageSrc(mobileImage)
    } else {
      setImageSrc(image)
    }
  }, [isMobile])

  const ImageComponent = (
    <WrappedImage
      image={imageSrc}
      large={large}
      isMobile={isMobile[0]}
      alwaysRectangularImage={alwaysRectangularImage}
      type={type}
    />
  )

  return (
    <>
      {!clickableImage && ImageComponent}
      <NextLink href={href} passHref>
        <Styled.Link>
          {clickableImage && ImageComponent}
          <Styled.Type
            small
            gutterBottom={large ? 8 : 4}
          >
            {CONTENT_TYPES[type.toLowerCase()].name}
          </Styled.Type>
          <Heading
            styleAs={large ? 'h2' : 'h5'}
            as={headingLevel}
            gutterBottom={8}
          >
            {title}
          </Heading>
          <Styled.Teaser small={!large}>{teaser}</Styled.Teaser>
        </Styled.Link>
      </NextLink>
    </>
  )
}

export default Card
