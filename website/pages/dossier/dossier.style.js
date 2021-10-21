/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { breakpoint, Icon as IconASC } from '@amsterdam/asc-ui'

import { GridItem as GridItemComponent } from '../../components/Grid/Grid.style'

export const GridItem = styled(GridItemComponent)`
  margin-bottom: 40px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 0;
  }

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

export const CollectionGridItem = styled(GridItemComponent)`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 128px;
  }
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`
