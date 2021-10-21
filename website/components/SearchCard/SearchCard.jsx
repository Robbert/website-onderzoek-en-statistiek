import NextLink from 'next/link'

import Heading from '../Heading/Heading'
import CONTENT_TYPES from '../../constants/contentTypes'
import * as Styled from './SearchCard.style'

const Card = ({
  href, type, title, teaser,
}) => (
  <>
    <NextLink href={href} passHref>
      <Styled.Link>
        <Styled.Type
          small
          gutterBottom={4}
        >
          {CONTENT_TYPES[type.toLowerCase()].name}
        </Styled.Type>
        <Heading
          as="h3"
          styleAs="h5"
          gutterBottom={8}
        >
          {title}
        </Heading>
        <Styled.Teaser>{teaser}</Styled.Teaser>
      </Styled.Link>
    </NextLink>
  </>
)

export default Card
