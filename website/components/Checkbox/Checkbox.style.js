import styled, { css } from 'styled-components'
import { themeColor } from '@amsterdam/asc-ui'

export const Checkmark = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid ${themeColor('primary')};
`

/*
  The checkmark span is wrapped in this container with the same width and height
  as the line height of the text it should align to. This ensures the checkmark
  stays aligned, even for multiline text
*/

export const CheckmarkContainer = styled.span`
  display: inline-block;
  width: 26px;
  height: 26px;
  padding: 1px;
  margin-right: 16px;
  flex-shrink: 0;
`

export const Label = styled.label`
  display: inline-flex;
  font-size: 18px;
  line-height: 26px;
  font-weight: 500;
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

  :hover ${Checkmark} {
    border-width: 4px;
  }

  ${({ checked }) =>
    checked &&
    css`
      ${Checkmark} {
        background-color: ${themeColor('primary')};
      }

      :hover ${Checkmark} {
        border-width: 2px;
      }

      ${Checkmark}:after {
        content: '';
        position: absolute;
        left: 25%;
        width: 50%;
        height: 75%;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `}
`

export const Checkbox = styled.input`
  appearance: none;
  /* to hide native input field in iOS */
  display: contents;

  /*
    Focus is first set on the label next to a focussed checkbox button, and then
    overwritten when the focussed checkbox button doesn't have focus-visible.
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
