/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { themeColor, svgFill } from '@amsterdam/asc-ui'

import { typographyStyle, calculateFluidStyle } from '../../lib/typographyUtils'

export const defaultLinkStyle = css`
  text-decoration: none;
  font-weight: 900;
  color: ${themeColor('primary')};
  ${svgFill(themeColor('primary'))}

  &:hover {
    text-decoration: underline;
  }
`

export const standaloneLinkStyle = css`
  text-decoration: none;
  font-weight: 500;
  color: ${themeColor('primary')};
  ${svgFill(themeColor('primary'))}

  padding-bottom: 2px;
  transition: box-shadow 0.1s ease-in-out, color 0.1s ease-in-out;
  box-shadow: inset 0 -2px ${themeColor('primary')};

  :focus,
  :hover {
    box-shadow: inset 0 -4px ${themeColor('primary')};
  }

  ${({ darkBackground }) => darkBackground
  && css`
  box-shadow: inset 0 -2px white;

  &:focus,
  &:hover {
    box-shadow: inset 0 -4px white;
  }
  `}
`

export const inlineLinkStyle = css`
  font-weight: 500;
  color: ${themeColor('primary')};
  ${svgFill(themeColor('primary'))}
`

export const buttonLinkStyle = css`
  font-weight: 500;
  height: 64px;
  min-width: 90px;
  background-color: ${themeColor('primary')};
  color: white;
  ${svgFill('white')}

  white-space: nowrap;
  text-decoration: none;
  border: none;
  cursor: pointer;
  padding: 12px 24px;

  :focus,
  :hover {
    background-color: ${themeColor('primary', 'dark')};
  }
`

export const linkListStyle = css`
  font-weight: 500;
  color: ${themeColor('primary')};
  ${svgFill(themeColor('primary'))}

  text-decoration: none;

  :focus,
  :hover {
    text-decoration: underline;
  }
`

export const Link = styled.a`
  ${({ variant }) => {
    switch (variant) {
      case 'standalone':
        return standaloneLinkStyle
      case 'button':
        return buttonLinkStyle
      case 'inList':
        return linkListStyle
      case 'inline':
        return inlineLinkStyle
      default:
        return defaultLinkStyle
      }
  }}

  display: inline-flex;
  align-items: baseline;

  ${typographyStyle}

  /*
    These css blocks are not included in inlineLinkStyle and linkListStyle,
    because typographyStyle overwrites the font-size, line-height and letter-spacing.
  */

  ${({ variant }) => variant === 'inline'
  && css`
  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  `}

  ${({ variant }) => variant === 'inList'
  && css`
  font-size: ${calculateFluidStyle(16, 18)};
  line-height: 40px;
  `}
`
