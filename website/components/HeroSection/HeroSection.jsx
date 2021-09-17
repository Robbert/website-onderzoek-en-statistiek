import Image from 'next/image'
import { Heading } from '@amsterdam/asc-ui'

import { getStrapiMedia, PLACEHOLDER_IMAGE } from '../../lib/utils'
import Container from '../Container/Container'
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
    <Container>
      <Styled.ContentBlock offSet={offSet}>
        <Heading gutterBottom={24} color="bright">{title}</Heading>
        {children}
      </Styled.ContentBlock>
    </Container>
  </Styled.Container>
)

export default HeroSection
