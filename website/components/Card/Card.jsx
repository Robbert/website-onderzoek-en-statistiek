import NextLink from 'next/link'
import NextImage from 'next/image'

import Heading from '../Heading/Heading'
import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'
import CONTENT_TYPES from '../../constants/contentTypes'
import * as Styled from './Card.style'

const WrappedImage = ({ image, large }) => (
  <Styled.ImageWrapper large={large}>
    <NextImage
      src={
        image
          ? getStrapiMedia(image)
          : PLACEHOLDER_IMAGE
      }
      alt=""
      layout="fill"
      objectFit="cover"
    />
  </Styled.ImageWrapper>
)

const Card = ({
  href, image, type, title, teaser, large, headingLevel, clickableImage,
}) => (
  <>
    {!clickableImage && <WrappedImage image={image} large={large} />}
    <NextLink href={href} passHref>
      <Styled.Link>
        {clickableImage && <WrappedImage image={image} large={large} />}
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

export default Card
