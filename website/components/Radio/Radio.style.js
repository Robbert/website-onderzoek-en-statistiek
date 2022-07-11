import styled, { css, keyframes } from 'styled-components'
import { themeColor } from '@amsterdam/asc-ui'

import { calculateFluidStyle } from '~/lib/typographyUtils'

const radioTransition = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

export const RadioSymbol = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid ${themeColor('primary')};
  border-radius: 100%;
`

/*
  The radio symbol span is wrapped in this container with the same width and height
  as the line height of the text it should align to. This ensures the symbol
  stays aligned, even for multiline text
*/

export const RadioSymbolContainer = styled.span`
  display: inline-block;
  width: 26px;
  height: 26px;
  padding: 1px;
  margin-right: 16px;
  flex-shrink: 0;
`

export const Label = styled.label`
  display: inline-flex;
  font-size: ${calculateFluidStyle(16, 18)};
  line-height: ${calculateFluidStyle(24, 29)};
  font-weight: 400;
  padding: 8px 16px 8px 0;
  cursor: pointer;
  margin-top: 4px;
  margin-bottom: 4px;

  :first-of-type {
    margin-top: 0;
  }

  :last-of-type {
    margin-bottom: 0;
  }

  :hover ${RadioSymbol} {
    border-width: 3px;
  }

  ${({ checked }) =>
    checked &&
    css`
      cursor: default;

      :hover ${RadioSymbol} {
        border-width: 2px;
      }

      ${RadioSymbol}:after {
        content: '';
        position: absolute;
        top: 10%;
        left: 10%;
        border-radius: 100%;
        background-color: ${themeColor('primary')};
        width: 80%;
        height: 80%;
        animation: ${radioTransition} 0.1s ease-in-out;
      }
    `}
`

export const Radio = styled.input`
  appearance: none;
  /* to hide native input field in iOS */
  display: contents;

  /*
    Focus is first set on the label next to a focussed radio button, and then
    overwritten when the focussed radio button doesn't have focus-visible.
    This progressive enhancement means you get the benefits of focus-visible
    while still supporting browsers that don't support it (like Safari)
  */
  &:focus + label {
    outline: auto;
  }

  &:focus:not(:focus-visible) + label {
    outline: 0;
  }
`
