/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import Paragraph from '../Paragraph/Paragraph'

export const Link = styled.a`
  display: block;
  text-decoration: none;
  overflow: hidden;
  margin-bottom: 36px;
  min-height: 108px;

  h3 {
    color: ${themeColor('primary')};
  }

  :hover,
  :focus {
    h3 {
      text-decoration: underline;
    }
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    min-height: auto;
    margin-bottom: 24px;
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
