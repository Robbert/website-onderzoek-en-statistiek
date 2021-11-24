import NextLink from 'next/link'

import Heading from '../Heading/Heading'
import CONTENT_TYPES from '../../constants/contentTypes'
import * as Styled from './SearchCard.style'

const SearchCard = ({
  href, type, title, teaser, small, date, gutterBottom = 40, headingLevel,
}) => (
  <>
    <NextLink href={href} passHref>
      <Styled.Link gutterBottom={gutterBottom}>
        {type && (
          <Styled.Type
            small
            gutterBottom={4}
          >
            {CONTENT_TYPES[type.toLowerCase()].name}
          </Styled.Type>
        )}
        <Heading
          as={headingLevel}
          styleAs="h5"
          gutterBottom={8}
        >
          {title}
        </Heading>
        <Styled.Teaser small={small}>{teaser}</Styled.Teaser>
        {date && <Styled.Date small>{date}</Styled.Date>}
      </Styled.Link>
    </NextLink>
  </>
)

export default SearchCard
