/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { themeColor, svgFill } from '@amsterdam/asc-ui'
import {
  Button as CommunityButton,
  LinkButton as CommunityLinkButton,
} from '@utrecht/component-library-react'

import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

const baseStyle = css`
  font-weight: 400;
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
  padding: 8px 16px;

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
  padding: 8px 16px;
  box-shadow: inset 0 0 0 2px ${themeColor('primary')};

  :focus,
  :hover {
    box-shadow: inset 0 0 0 3px ${themeColor('primary')};
  }

  ${baseStyle}
`

export const textButtonStyle = css`
  ${svgFill(themeColor('primary'))}

  padding: 8px 16px;
  color: ${themeColor('primary')};
  background-color: transparent;

  :hover {
    text-decoration: underline;
  }

  ${baseStyle}
`

export const blankButtonStyle = css`
  ${svgFill(themeColor('tint', 'level7'))}

  padding: 8px;
  background-color: white;

  &:hover {
    ${svgFill(themeColor('primary'))}
  }

  ${baseStyle}
`

export const _Button = styled.button`
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

export const Button = ({ variant, ...restProps }) => {
  switch (variant) {
    case 'secondary':
      return (
        <CommunityButton appearance="secondary-action-button" {...restProps} />
      )
    case 'textButton':
      return <CommunityLinkButton {...restProps} />
    case 'blank':
      return <CommunityButton appearance="subtle-button" {...restProps} />
    default:
      return (
        <CommunityButton appearance="primary-action-button" {...restProps} />
      )
  }
}
