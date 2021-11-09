/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { themeColor, svgFill } from '@amsterdam/asc-ui'

import { fluidTypoStyle, calculateFluidStyle, typographyStyle } from '../../lib/typographyUtils'

export const defaultLinkStyle = css`
  ${svgFill(themeColor('primary'))}

  text-decoration: none;
  font-weight: 900;
  color: ${themeColor('primary')};

  &:hover {
    text-decoration: underline;
  }
`

export const standaloneLinkStyle = css`
  ${svgFill(themeColor('primary'))}

  text-decoration: none;
  font-weight: 500;
  color: ${themeColor('primary')};
  padding-bottom: 4px;
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
  ${svgFill(themeColor('primary'))}

  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  font-weight: 500;
  color: ${themeColor('primary')};
`

export const linkListStyle = css`
  ${svgFill(themeColor('primary'))}

  font-size: ${calculateFluidStyle(16, 18)};
  line-height: ${calculateFluidStyle(24, 26)};
  font-weight: 500;
  color: ${themeColor('primary')};
  text-decoration: none;
  padding-top: 12px;
  padding-bottom: 12px;

  :focus,
  :hover {
    text-decoration: underline;
  }
`

export const Link = styled.a`
  /*
    fluidTypoStyle sets the font-size and line-height.
    It can be overwritten with specific variant styles.
  */
  ${fluidTypoStyle}

  ${({ variant }) => {
    switch (variant) {
      case 'standalone':
        return standaloneLinkStyle
      case 'inList':
        return linkListStyle
      case 'inline':
        return inlineLinkStyle
      default:
        return defaultLinkStyle
      }
  }}

  ${typographyStyle}

  display: inline-flex;
  align-items: baseline;
`
