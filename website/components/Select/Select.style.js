/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { ascDefaultTheme } from '@amsterdam/asc-ui'
import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'

import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

export const Select = styled.select`
  appearance: none;
  padding: 8px 40px 8px 16px;
  border: none;
  box-shadow: inset 0 0 0 2px ${ascDefaultTheme.colors.primary.main};
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) center;
  background-size: 16px;
  background-color: transparent;

  ${() => `background-image: url(${ChevronDown.src});`}

  &:hover {
    box-shadow: inset 0 0 0 3px ${ascDefaultTheme.colors.primary.main};
  }

  ${fluidTypoStyle}
  ${typographyStyle}
`
