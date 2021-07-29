import NextLink from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  Heading,
  Paragraph,
  themeColor,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'

const StyledHeading = styled(Heading)`
  margin-bottom: 8px;
  width: 100%;
`

const Link = styled.a`
  display: block;
  text-decoration: none;
  color: ${themeColor('tint', 'level7')};
  border-bottom: ${themeColor('tint', 'level3')} 1px solid;
  width: 100%;
  min-height: 66px;
  padding: 32px 0;

  &:hover {
    border-bottom: ${themeColor('secondary')} 1px solid;

    ${StyledHeading} {
      color: ${themeColor('secondary')};
      text-decoration: underline;
    }
  }
`

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  pointer-events: none; /* FF 60 fix */
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  margin-right: 16px;
  min-height: 80px;
`

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 80px;
`

const CollectionCard = ({
  title = '',
  teaser = '',
  href,
  teaserImage,
}) => (
  <NextLink href={href} passHref>
    <Link>
      <StyledCard horizontal>
        <StyledCardContent>
          <StyledHeading forwardedAs="h3">{title}</StyledHeading>
          <Paragraph>{teaser}</Paragraph>
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

export default CollectionCard
