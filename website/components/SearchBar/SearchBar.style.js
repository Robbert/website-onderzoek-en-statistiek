import styled from 'styled-components'
import {
  svgFill, themeColor, Button as ButtonASC,
} from '@amsterdam/asc-ui'

import { calculateFluidStyle } from '../../lib/typographyUtils'

export const Wrapper = styled.div`
  position: relative;
`

export const SearchBar = styled.input`
  border-width: 0 0 1px 0;
  border-color: ${themeColor('tint', 'level5')};
  font-size: ${calculateFluidStyle(18, 24, 320, 1920)};
  line-height: ${calculateFluidStyle(28, 40, 320, 1920)};
  appearance: none;
  border-radius: 0;
  box-sizing: border-box;
  padding: 4px;
  width: 100%;
  height: 44px;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
  }

`

export const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 0;
`

export const Button = styled(ButtonASC)`
  width: 44px;
  height: 44px;
  padding: 4px;
  background-color: transparent;
  border: none;

  :hover {
    border: none;
    outline: none;
    background-color: transparent;
    ${svgFill(themeColor('secondary'))}
  }
`
