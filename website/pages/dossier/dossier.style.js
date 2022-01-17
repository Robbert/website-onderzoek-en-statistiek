/* eslint-disable indent */
import styled from 'styled-components'
import { breakpoint, Icon as IconASC } from '@amsterdam/asc-ui'

import CardListComponent from '~/components/CardList/CardList'
import { GridItem as GridItemComponent } from '~/components/Grid/Grid.style'

export const CardList = styled(CardListComponent)`
  display: block;
  column-count: 2;

  /*
    This hacky code is used to align the column gap to the grid gap.
    This will only work if CardList is 8 grid columns wide.
  */
  column-gap: calc((100% + 100% * (1 / 3)) / 50);

  @media screen and ${breakpoint('max-width', 'laptop')} {
    column-count: 1;
  }
`

export const FeatureListItem = styled.li`
  display: flex;
  break-inside: avoid;
  width: 100%;

  :nth-child(${({ listLength }) => {
        if (listLength === 2) {
          return 2
        }
        if (listLength === 3 || listLength === 4) {
          return 3
        }
        return 4
      }}) {
    padding-top: 120px;

    @media screen and ${breakpoint('max-width', 'laptop')} {
      padding-top: 0;
    }
  }
`

export const CollectionGridItem = styled(GridItemComponent)`
  margin-top: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 32px;
  }
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`
