/* eslint-disable import/prefer-default-export */
import { themeColor, breakpoint } from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'

import { typographyStyle } from '../../lib/typographyUtils'

export const Paragraph = styled.p`
  color: ${themeColor('tint', 'level6')};

  ${({ intro }) => intro && css`
    /* stylelint-disable indentation */
    @media screen and ${breakpoint('max-width', 'laptop')} {
      font-weight: 700;
    }
  `}

  ${typographyStyle}
`
