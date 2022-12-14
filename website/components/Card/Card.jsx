import NextImage from 'next/image'
import { useMatchMedia } from '@amsterdam/asc-ui'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import videoIcon from '../../public/icons/video.svg'
import interactiveIcon from '../../public/icons/interactive.svg'
import * as Styled from './Card.style'

const Card = ({
  href,
  image,
  type,
  title,
  teaser,
  large,
  headingLevel,
  clickableImage,
  aspectRatio = 4 / 3,
  priority,
  sizes,
}) => {
  let icon
  if (type === 'video') {
    icon = videoIcon
  }
  if (type === 'interactive') {
    icon = interactiveIcon
  }
  const isMobile = useMatchMedia({ maxBreakpoint: 'laptop' })

  const cardImage = (
    <Styled.ImageWrapper
      large={large}
      aspectRatio={isMobile[0] ? 16 / 9 : aspectRatio}
    >
      <NextImage
        src={image ? getStrapiMedia(image) : PLACEHOLDER_IMAGE}
        alt=""
        priority={priority}
        fill
        sizes={sizes}
        style={{
          objectFit: 'cover',
        }}
      />
      {icon && (
        <Styled.IconContainer>
          <NextImage
            src={icon.src}
            alt=""
            width={48}
            height={48}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Styled.IconContainer>
      )}
    </Styled.ImageWrapper>
  )

  return (
    <>
      {!clickableImage && cardImage}
      <Styled.Link href={href}>
        {clickableImage && cardImage}
        <Styled.TextWrapper>
          <Styled.Type small gutterBottom={large ? 8 : 4}>
            {CONTENT_TYPES[type.toLowerCase()].name}
          </Styled.Type>
          <Styled.Heading
            forwardedAs={headingLevel}
            styleAs={large ? 'h2' : 'h5'}
            gutterBottom={8}
            large={large}
          >
            {title}
          </Styled.Heading>
          <Styled.Teaser small={!large}>{teaser}</Styled.Teaser>
        </Styled.TextWrapper>
      </Styled.Link>
    </>
  )
}

export default Card
