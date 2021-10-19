/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import Paragraph from '../Paragraph/Paragraph'

export const Link = styled.a`
  display: block;
  text-decoration: none;
  overflow: hidden;
  margin-bottom: 60px;

  img {
    transition: transform 0.3s ease-in-out;
  }

  :hover,
  :focus {
    h1 {
      color: ${themeColor('primary')};
    }

    img {
      transform: scale(1.07);
    }
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  height: ${({ large }) => (large ? '534px' : '360px')};

  ${({ large }) => large
  && css`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-left: -12px;
    margin-right: -12px;
  }`
}
`

export const Type = styled(Paragraph)`
  text-transform: capitalize;
  margin-top: 20px;
`

export const Teaser = styled(Paragraph)`
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
