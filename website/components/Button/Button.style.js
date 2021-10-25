/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { themeColor, svgFill } from '@amsterdam/asc-ui'

import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

const baseStyle = css`
  font-weight: 500;
  letter-spacing: 0.0125rem;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  border: none;
  cursor: pointer;

  :disabled {
    ${svgFill('white')}

    cursor: default;
    outline: none;
    border: none;
    color: white;
    background-color: ${themeColor('tint', 'level4')};
    text-decoration: none;
  }
`

export const primaryButtonStyle = css`
  ${svgFill('white')}

  background-color: ${themeColor('primary')};
  color: white;
  padding: 12px 24px;

  :focus,
  :hover {
    background-color: ${themeColor('primary', 'dark')};
  }

  ${baseStyle}
`

export const secondaryButtonStyle = css`
  ${svgFill(themeColor('primary'))}

  background-color: white;
  color: ${themeColor('primary')};
  padding: 12px 24px;
  box-shadow: inset 0 0 0 2px ${themeColor('primary')};

  :focus,
  :hover {
    box-shadow: inset 0 0 0 4px ${themeColor('primary')};
  }

  ${baseStyle}
`

export const textButtonStyle = css`
  ${svgFill(themeColor('primary'))}

  padding: 12px 24px;
  color: ${themeColor('primary')};
  background-color: transparent;

  :hover,
  :focus {
    text-decoration: underline;
  }

  ${baseStyle}
`

export const blankButtonStyle = css`
  ${svgFill(themeColor('tint', 'level7'))}

  padding: 12px 12px;
  background-color: white;

  &:hover {
    background-color: ${themeColor('tint', 'level3')};
  }

  ${baseStyle}
`

export const Button = styled.button`
  /*
    fluidTypoStyle sets the font-size and line-height.
    It can be overwritten with specific variant styles.
  */
  ${fluidTypoStyle}

  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return secondaryButtonStyle
      case 'textButton':
        return textButtonStyle
      case 'blank':
        return blankButtonStyle
      default:
        return primaryButtonStyle
    }
  }}

  ${typographyStyle}
`
