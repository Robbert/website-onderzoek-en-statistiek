/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

export const List = styled.ul`
  list-style: ${({ variant }) => {
    switch (variant) {
      case 'ordered':
        return 'auto'
      case 'unordered':
        return 'square'
      default:
        return 'none'
    }
  }};

  margin-left: ${({ variant }) => (variant ? '24px' : 0)};
  padding: 0;
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

  ${({ variant }) =>
    variant === 'unordered' &&
    css`
      & ::marker {
        color: black;
      }
    `}

  ${fluidTypoStyle}
  ${typographyStyle}
`
