import NextLink from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import {
  Heading, themeColor, Icon, styles, svgFill,
} from '@amsterdam/asc-ui'
import { ChevronRight } from '@amsterdam/asc-assets'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`

const Link = styled.a`
  display: block;
  position: relative;
  width: 100%;
  text-decoration: none;
  color: ${themeColor('tint', 'level7')};
  border-style: solid;
  border-width: 0 2px 2px 0;
  border-color: ${themeColor('tint', 'level3')};

  :hover {
    border-color: ${themeColor('secondary', 'main')};

    ${styles.HeadingStyle} {
      text-decoration: underline;
      color: ${themeColor('secondary', 'main')};
    }

    ${styles.IconStyle} {
      ${svgFill(themeColor('secondary', 'main'))};
    }
  }
`

/**
 * TODO: this component is exactly the same as the FeatureCard in the HomePage folder.
 * I've kept these as seperate components because these will probably change in the next design
 * iterations. If they don't, we should merge these two components.
 */

const FeatureCard = ({ href, title, teaserImage }) => (
  <NextLink href={href} passHref>
    <Link>
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
        blurDataURL={PLACEHOLDER_IMAGE}
      />
      <BottomBar>
        <Heading styleAs="h4" as="h3" strong gutterBottom={0}>
          {title}
        </Heading>
        <Icon inline size={16} padding={0}>
          <ChevronRight />
        </Icon>
      </BottomBar>
    </Link>
  </NextLink>
)

export default FeatureCard
