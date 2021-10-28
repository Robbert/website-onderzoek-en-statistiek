import styled from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import { calculateFluidStyle } from '../../lib/typographyUtils'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const SearchBar = styled.input`
  border-width: 0 0 1px 0;
  border-color: ${themeColor('tint', 'level5')};
  font-size: ${calculateFluidStyle(18, 24)};
  line-height: ${calculateFluidStyle(28, 40)};
  appearance: none;
  border-radius: 0;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding: 8px;
  }
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
`
