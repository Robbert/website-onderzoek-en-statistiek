import NextLink from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import {
  Paragraph, themeColor, Icon, styles, svgFill,
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
  position: relative;
  width: 100%;
  text-decoration: none;
  color: ${themeColor('tint', 'level7')};
  border-style: solid;
  border-width: 0 2px 2px 0;
  border-color: ${themeColor('tint', 'level3')};

  :hover {
    border-color: ${themeColor('secondary', 'main')};

    ${BottomBar} {
      text-decoration: underline;
      color: ${themeColor('secondary', 'main')};
    }

    ${styles.IconStyle} {
      ${svgFill(themeColor('secondary', 'main'))};
    }
  }
`
const FeatureCard = ({ href, title, teaserImage }) => (
  <NextLink href={href} passHref>
    <Link>
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
        blurDataURL={PLACEHOLDER_IMAGE}
      />
      <BottomBar>
        <Paragraph styleAs="h4" strong gutterBottom={0}>
          {title}
        </Paragraph>
        <Icon inline size={16} padding={0}>
          <ChevronRight />
        </Icon>
      </BottomBar>
    </Link>
  </NextLink>
)

export default FeatureCard
