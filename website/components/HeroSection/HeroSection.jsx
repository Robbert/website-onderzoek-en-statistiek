import Image from 'next/image'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'
import ContentContainer from '../ContentContainer/ContentContainer'
import * as Styled from './HeroSection.style'

const HeroSection = ({
  image, title, children, offSet,
}) => (
  <Styled.Container offSet={offSet}>
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
      <Styled.ContentBlock offSet={offSet}>
        <Styled.Heading gutterBottom={24}>{title}</Styled.Heading>
        {children}
      </Styled.ContentBlock>
    </ContentContainer>
  </Styled.Container>
)

export default HeroSection
