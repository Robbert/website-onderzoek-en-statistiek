import styled, { css } from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import Paragraph from '../Paragraph/Paragraph'

export const Link = styled.a`
  display: block;
  text-decoration: none;
  overflow: hidden;
  margin-bottom: ${({ gutterBottom }) => gutterBottom?.large || gutterBottom || 0}px;

  ${({ gutterBottom }) => gutterBottom?.small && css`
    @media screen and ${breakpoint('max-width', 'laptop')} {
      margin-bottom: ${gutterBottom.small}px;
    }
  `}

  h1,h2,h3,h4,h5,h6 {
    color: ${themeColor('primary')};
  }

  :hover,
  :focus {
    h1,h2,h3,h4,h5,h6 {
      text-decoration: underline;
    }
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    min-height: auto;
  }
`

export const Type = styled(Paragraph)`
  text-transform: capitalize;
`

export const Teaser = styled(Paragraph)`
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Date = styled(Paragraph)`
  margin-top: 8px;
`
