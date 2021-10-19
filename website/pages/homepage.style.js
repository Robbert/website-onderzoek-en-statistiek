/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import { GridItem as GridItemComponent } from '../components/Grid/Grid.style'

export const GridItem = styled(GridItemComponent)`
  @media screen and ${breakpoint('min-width', 'laptop')} {
    ${({ index }) => {
      if (index % 2 === 0 && index !== 0) {
        return css`margin-top: -120px;`
      }
      if (index === 1) {
        return css`margin-top: 120px;`
      }
      return null
    }}
  }
`
