import Image from 'next/image'
import {
  themeColor, Heading, Paragraph,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import {
  getStrapiMedia,
  PLACEHOLDER_IMAGE,
} from '../../lib/utils'
import ContentContainer from '../ContentContainer'

const Container = styled.div`
  position: relative;
  height: 393px;
  margin-bottom: 80px;
`

const HighlightBlock = styled.section`
  position: absolute;
  bottom: 28px;
  width: 600px;
  max-width: calc(100% - 40px);
  background-color: ${themeColor('primary', 'main')};
  padding: 24px;
  color: white;
`

const Title = styled(Heading)`
  color: white;
`
/**
 * TODO: this component is exactly the same as the HeroSection in the ThemePage folder.
 * I've kept these as seperate components because these will probably change in the next design
 * iterations. If they don't, we should merge these two components.
 */

const HeroSection = ({ title, image, intro }) => (
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
        <Title gutterBottom={24}>{title}</Title>
        <Paragraph>{intro}</Paragraph>
      </HighlightBlock>
    </ContentContainer>
  </Container>
)

export default HeroSection
