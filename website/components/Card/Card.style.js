import styled, { css } from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import HeadingComponent from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'

export const IconContainer = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  height: 48px;
  width: 48px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    left: calc(50% - 24px);
    bottom: calc(50% - 24px);
  }
`

export const Link = styled.a`
  display: block;
  width: 100%;
  text-decoration: none;
  overflow: hidden;
  margin-bottom: 40px;

  img {
    transition: transform 0.3s ease-in-out;
  }

  :hover,
  :focus {
    h1,h2,h3,h4,h5 {
      color: ${themeColor('primary')};
    }

    img {
      transform: scale(1.07);
    }

    ${IconContainer} img {
      transform: none;
    }
  }
`

export const ImageWrapper = styled.div`
  display: block;
  position: relative;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};

  ${({ large }) => large
    && css`
    @media screen and ${breakpoint('max-width', 'laptop')} {
      margin-left: -12px;
      margin-right: -12px;
    }`
  }
`

export const TextWrapper = styled.div`
  min-height: 220px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    min-height: 0;
  }
`

export const Type = styled(Paragraph)`
  text-transform: capitalize;
  margin-top: 20px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 8px;
  }
`

export const Heading = styled(HeadingComponent)`
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Teaser = styled(Paragraph)`
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
