import NextLink from 'next/link'
import Image from 'next/image'
import {
  breakpoint,
  Card,
  CardContent,
  Heading,
  themeColor,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'

const Title = styled(Heading)`
  margin-bottom: 8px;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`

const Link = styled.a`
  text-decoration: none;
  color: ${themeColor('tint', 'level7')};
  width: 100%;
  min-height: 120px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: white;
  margin-bottom: 24px;

  &:hover {
    ${Title} {
      color: ${themeColor('secondary')};
      text-decoration: underline;
    }
  }
`

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  pointer-events: none; /* FF 60 fix */

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin: 16px 8px;
  }
`
const StyledCardContent = styled(CardContent)`
  padding: 0;
  margin-right: 16px;
  min-height: 88px; // TODO: the default ASC min height of this component is 90px, which doesnt adhere to the 4px grid. Fix this in ASC
`

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 80px;
`

const LatestCard = ({
  title = '',
  href,
  teaserImage,
}) => (
  <NextLink href={href} passHref>
    <Link>
      <StyledCard horizontal>
        <StyledCardContent>
          <Title as="h4">{title}</Title>
        </StyledCardContent>
        <ImageWrapper>
          <Image
            src={
              teaserImage
                ? getStrapiMedia(teaserImage)
                : PLACEHOLDER_IMAGE
            }
            alt=""
            width="100"
            height="100"
            layout="responsive"
            placeholder="blur"
            sizes="96px"
            blurDataURL={PLACEHOLDER_IMAGE}
          />
        </ImageWrapper>
      </StyledCard>
    </Link>
  </NextLink>
)

export default LatestCard
