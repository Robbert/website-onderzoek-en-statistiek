import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Card as BaseCard, CardContent, Heading, CardActions, Icon, themeColor, styles, svgFill,
} from '@amsterdam/asc-ui'
import { ChevronRight } from '@amsterdam/asc-assets'
import styled from 'styled-components'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../lib/utils'

const Link = styled.a`
  display: block;
  width: 100%;
  text-decoration: none;
  color: inherit;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px` || '0px'};

  ${styles.CardContentStyle} {
    min-height: 72px;
    padding: 16px 16px;
  }

  :hover {

    ${styles.CardContentStyle} h6 {
      text-decoration: underline;
      color: ${themeColor('secondary', 'main')};
    }

    ${styles.IconStyle} {
      ${svgFill(themeColor('secondary', 'main'))};
    }
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  max-width: ${({ imageSize }) => (imageSize ? `${imageSize}px` : '100%')};
  aspect-ratio: ${({ ratio }) => ratio || 1};
  overflow: hidden;
`

// center image vertical if aspect ratio is not 1
const Image = styled(NextImage)`
  top: ${(props) => (props.ratio ? '-50% !important' : '0px')}; 
`

const Card = ({
  href, title, teaser, image, icon = true, height, marginBottom, ...props
}) => (
  <NextLink href={href} passHref>
    <Link marginBottom={marginBottom}>
      <BaseCard {...props}>
        <ImageWrapper {...props}>
          <Image
            src={
              image
                ? getStrapiMedia(image)
                : PLACEHOLDER_IMAGE
            }
            alt=""
            width="1"
            height="1"
            layout="responsive"
            sizes="384px"
            priority
            ratio={props.ratio}
          />
        </ImageWrapper>
        <CardContent>
          <Heading as="h6">{title}</Heading>
          {teaser && <p>{teaser}</p>}
        </CardContent>
        <CardActions>
          {icon
          && (
          <Icon size={15}>
            <ChevronRight />
          </Icon>
          )}
        </CardActions>
      </BaseCard>
    </Link>
  </NextLink>
)

export default Card
