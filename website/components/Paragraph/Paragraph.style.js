/* eslint-disable import/prefer-default-export */
import { themeColor, breakpoint } from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'

import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

export const Paragraph = styled.p`
  color: ${themeColor('tint', 'level6')};
  letter-spacing: 0.0125rem;
  font-weight: 500;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    letter-spacing: 0;
  }

  /* 'strong' is defined here so it gets the correct styling in cms markdown blocks */
  & strong {
    font-weight: 900;
  }

  ${({ intro }) =>
    intro &&
    css`
      letter-spacing: 0.025rem;

      @media screen and ${breakpoint('max-width', 'laptop')} {
        font-weight: 900;
        letter-spacing: 0.0125rem;
      }
    `}

  ${fluidTypoStyle}
  ${typographyStyle}
`
