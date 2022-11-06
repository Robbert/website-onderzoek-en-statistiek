import Heading from '../Heading/Heading'
import CONTENT_TYPES from '../../constants/contentTypes'
import * as Styled from './SearchCard.style'
import {
  PreHeading as CommunityPreHeading,
  HeadingGroup as CommunityHeadingGroup,
} from '@utrecht/component-library-react'

const SearchCard = ({
  href,
  type,
  title,
  teaser,
  small,
  date,
  gutterBottom = 40,
  headingLevel,
}) => (
  <Styled.Link href={href} $gutterBottom={gutterBottom}>
    <CommunityHeadingGroup>
      <Heading as={headingLevel} styleAs="h5" gutterBottom={8}>
        {title}
      </Heading>
      {type && (
        <CommunityPreHeading>
          <Styled.Type small gutterBottom={4}>
            {CONTENT_TYPES[type.toLowerCase()].name}
          </Styled.Type>
        </CommunityPreHeading>
      )}
    </CommunityHeadingGroup>
    <Styled.Teaser small={small}>{teaser}</Styled.Teaser>
    {date && (
      <Styled.Date small>
        {type === 'collection' || type === 'dataset' || type === 'interactive'
          ? `Laatst gewijzigd: ${date}`
          : `Gepubliceerd: ${date}`}
      </Styled.Date>
    )}
  </Styled.Link>
)

export default SearchCard
