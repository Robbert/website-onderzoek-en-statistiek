import { forwardRef } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  ListItem, Link, themeColor, Heading, List,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import {
  getStrapiMedia,
  PLACEHOLDER_IMAGE,
  flattenFeatureObject,
} from '../lib/utils'
import ContentContainer from './ContentContainer'

const Container = styled.div`
  position: relative;
  height: 393px;
  margin-bottom: 80px;
`

const HighlightBlock = styled.div`
  position: absolute;
  bottom: -28px;
  width: 600px;
  max-width: calc(100% - 40px);
  background-color: ${themeColor('primary', 'main')};
  padding: 24px;
`

// TODO: ASC Link is wrapped by this component because it
// doesn't natively work with Next JS link
// Maybe we can fix this in ASC and remove this wrapper?
const AscLink = forwardRef(({ children, ...otherProps }, ref) => (
  <span ref={ref}>
    <Link {...otherProps}>{children}</Link>
  </span>
))

const StyledHeading = styled(Heading)`
  color: white;
`

const StyledList = styled(List)`
  margin-bottom: 0;
`

const HeroSection = ({ image, incoming }) => (
  <Container>
    <Image
      src={
        image
          ? getStrapiMedia(image)
          : PLACEHOLDER_IMAGE
      }
      alt=""
      layout="fill"
      placeholder="blur"
      objectFit="cover"
      blurDataURL={PLACEHOLDER_IMAGE}
      priority
    />
    <ContentContainer>
      <HighlightBlock>
        <StyledHeading gutterBottom={24}>Actueel</StyledHeading>
        <StyledList>
          {flattenFeatureObject(incoming).map(({ path, title }) => (
            <ListItem key={path}>
              <NextLink href={path} passHref>
                <AscLink darkBackground inList>
                  {title}
                </AscLink>
              </NextLink>
            </ListItem>
          ))}
        </StyledList>
      </HighlightBlock>
    </ContentContainer>
  </Container>
)

export default HeroSection
