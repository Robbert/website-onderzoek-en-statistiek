import styled, { css } from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import Paragraph from '../Paragraph/Paragraph'

export const Link = styled.a`
  display: block;
  text-decoration: none;
  overflow: hidden;
  margin-bottom: 24px;

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
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 40px;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  height: ${({ large }) => (large ? '534px' : '360px')};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    height: 232px;
  }

  ${({ large }) => large
  && css`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    height: 220px;
    margin-left: -12px;
    margin-right: -12px;
  }`
}
`

export const Type = styled(Paragraph)`
  text-transform: capitalize;
  margin-top: 20px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 8px;
  }
`

export const Teaser = styled(Paragraph)`
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
