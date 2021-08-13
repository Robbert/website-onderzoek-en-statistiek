import Image from 'next/image'
import {
  Heading, themeColor, breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../lib/utils'
import ContentContainer from './ContentContainer'

const Container = styled.div`
  position: relative;
  height: 390px;
  margin-bottom: ${({ offSet }) => (offSet ? '104px' : '80px')};
`

const ContentBlock = styled.div`
  position: absolute;
  width: 600px;
  max-width: calc(100% - 48px);
  padding: 24px;
  color: white;
  background-color: ${themeColor('primary', 'main')};

  top: ${({ offSet }) => (offSet ? 'unset' : 0)};
  bottom: ${({ offSet }) => (offSet ? '-56px' : 0)};
  left: ${({ offSet }) => (offSet ? '84px' : 0)};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    top: unset;
    bottom: -56px;
    left: 24px;
  }
`
// TODO: IMHO ASC Heading should have color: inherit as default.
// Maybe we can compose a PR with some small changes like this?
const StyledHeading = styled(Heading)`
  color: inherit;
`

const HeroSection = ({
  image, title, children, offSet,
}) => (
  <Container offSet={offSet}>
    <Image
      src={
        image
          ? getStrapiMedia(image)
          : PLACEHOLDER_IMAGE
      }
      alt=""
      layout="fill"
      objectFit="cover"
      priority
    />
    <ContentContainer>
      <ContentBlock offSet={offSet}>
        <StyledHeading gutterBottom={24}>{title}</StyledHeading>
        {children}
      </ContentBlock>
    </ContentContainer>
  </Container>
)

export default HeroSection
