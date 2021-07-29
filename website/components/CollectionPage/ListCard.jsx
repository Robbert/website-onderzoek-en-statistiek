import NextLink from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  Heading,
  themeColor,
  CardActions,
  Icon,
  styles,
  svgFill,
} from '@amsterdam/asc-ui'
import { ChevronRight } from '@amsterdam/asc-assets'
import styled from 'styled-components'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'

const Title = styled(Heading)`
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Link = styled.a`
  text-decoration: none;
  color: ${themeColor('tint', 'level7')};
  display: block;
  margin-bottom: 24px;

  &:hover {
    ${Title} {
      color: ${themeColor('secondary')};
      text-decoration: underline;
    }

    ${styles.IconStyle} {
      ${svgFill(themeColor('secondary', 'main'))};
    }
  }
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  margin-right: 16px;
  margin-left: 16px;
  min-height: 88px; // TODO: the default ASC min height of this component is 90px, which doesnt adhere to the 4px grid. Fix this in ASC
`

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 100px;
`

const ListCard = ({
  title = '',
  href,
  teaserImage,
}) => (
  <NextLink href={href} passHref>
    <Link>
      <Card horizontal>
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
            sizes="128px"
            blurDataURL={PLACEHOLDER_IMAGE}
          />
        </ImageWrapper>
        <StyledCardContent>
          <Title as="h4">{title}</Title>
        </StyledCardContent>
        <CardActions>
          <Icon size={16}>
            <ChevronRight />
          </Icon>
        </CardActions>
      </Card>
    </Link>
  </NextLink>
)

export default ListCard
