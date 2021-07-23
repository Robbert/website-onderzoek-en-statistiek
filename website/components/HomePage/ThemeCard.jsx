import NextLink from 'next/link'
import Image from 'next/image'
import {
  Card, CardContent, Heading, CardActions, Icon, themeColor, styles, svgFill,
} from '@amsterdam/asc-ui'
import { ChevronRight } from '@amsterdam/asc-assets'
import styled from 'styled-components'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'

const Link = styled.a`
  width: 100%;
  text-decoration: none;
  border-style: solid;
  border-width: 0 2px 2px 0;
  border-color: ${themeColor('tint', 'level3')};

  :hover {
    border-color: ${themeColor('secondary', 'main')};

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
`

const ThemeCard = ({ href, title, teaserImage }) => (
  <NextLink href={href} passHref>
    <Link>
      <Card>
        <ImageWrapper>
          <Image
            src={
              teaserImage
                ? getStrapiMedia(teaserImage)
                : PLACEHOLDER_IMAGE
            }
            width="100"
            height="100"
            layout="responsive"
            placeholder="blur"
            sizes="384px"
            blurDataURL={PLACEHOLDER_IMAGE}
          />
        </ImageWrapper>
        <CardContent>
          <Heading as="h6">{title}</Heading>
        </CardContent>
        <CardActions>
          <Icon size={15}>
            <ChevronRight />
          </Icon>
        </CardActions>
      </Card>
    </Link>
  </NextLink>
)

export default ThemeCard
