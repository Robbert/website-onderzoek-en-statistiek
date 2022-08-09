/* eslint-disable import/prefer-default-export */
import { ascDefaultTheme } from '@amsterdam/asc-ui'
import VegaLite from 'react-vega/lib/VegaLite'
import styled from 'styled-components'
import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'

import { calculateFluidStyle } from '~/lib/typographyUtils'

export const VegaVisualisation = styled(VegaLite)`
  background-color: #fff;
  width: 100%;

  & .vega-bind {
    display: inline-block;
  }

  & .vega-bindings label {
    display: inline-flex;
    flex-direction: column;
    margin-right: 24px;
  }

  & .vega-bind-name {
    font-size: ${calculateFluidStyle(16, 18)};
    line-height: ${calculateFluidStyle(22, 24)};
    font-weight: 800;
    margin-bottom: 16px;
  }

  & .vega-bindings select {
    appearance: none;
    padding: 8px 40px 8px 16px;
    border: none;
    box-shadow: inset 0 0 0 2px ${ascDefaultTheme.colors.primary.main};
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: calc(100% - 16px) center;
    background-size: 16px;
    background-color: transparent;
    margin-bottom: 16px;
    font-size: ${calculateFluidStyle(16, 18)};
    line-height: ${calculateFluidStyle(24, 26)};

    ${() => `background-image: url(${ChevronDown.src});`}

    &:hover {
      box-shadow: inset 0 0 0 3px ${ascDefaultTheme.colors.primary.main};
    }
  }
`
