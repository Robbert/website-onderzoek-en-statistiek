/* eslint-disable import/prefer-default-export */
import { themeColor } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

export const Blockquote = styled.blockquote`
  color: ${themeColor('tint', 'level6')};
  font-weight: 900;
  font-style: italic;
  quotes: '“' '”';
  margin: 0;

  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }

  ${fluidTypoStyle}
  ${typographyStyle}
`
