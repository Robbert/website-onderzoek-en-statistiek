import NextLink from 'next/link'
import {
  Card as BaseCard, Heading, CardActions, Icon,
} from '@amsterdam/asc-ui'
import { ChevronRight } from '@amsterdam/asc-assets'

import * as Styled from './Card.style'
import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'

const Card = ({
  href, shortTitle, title, teaser, image, height, marginBottom,
  hasIcon = true, hasTeaser = true, hasBorder = false, ...props
}) => (
  <NextLink href={href} passHref>
    <Styled.Link marginBottom={marginBottom} hasBorder={hasBorder}>
      <BaseCard {...props}>
        <Styled.ImageWrapper {...props}>
          <Styled.Image
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
            ratio={props.ratio}
          />
        </Styled.ImageWrapper>
        <Styled.CardContent>
          <Heading as="h6">{title}</Heading>
          {hasTeaser && teaser && <p>{teaser}</p>}
        </Styled.CardContent>
        <CardActions>
          {hasIcon
          && (
          <Icon size={15}>
            <ChevronRight />
          </Icon>
          )}
        </CardActions>
      </BaseCard>
    </Styled.Link>
  </NextLink>
)

export default Card
