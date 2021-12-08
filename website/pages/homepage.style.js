/* eslint-disable indent */
import styled from 'styled-components'
import { breakpoint, ListItem as ListItemASC, Icon as IconASC } from '@amsterdam/asc-ui'

import CardListComponent from '../components/CardList/CardList'
import { Grid, GridItem as GridItemComponent } from '../components/Grid/Grid.style'
import Heading from '../components/Heading/Heading'

export const TitleGridItem = styled(GridItemComponent)`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

export const SideBarGridItem = styled(GridItemComponent)`
  margin-top: 112px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

export const HighlightHeading = styled(Heading)`
  margin-top: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 16px;
  }
`

export const ListItem = styled(ListItemASC)`
  margin-bottom: 0;
`

export const FeatureList = styled(CardListComponent)`
  display: block;
  column-count: 2;

  /*
    This hacky code is used to align the column gap to the grid gap.
    This will only work if CardList is 8 grid columns wide.
  */
  column-gap: calc((100% + 100% * (1/3)) / 50);

  @media screen and ${breakpoint('max-width', 'laptop')} {
    column-count: 1;
  }
`

export const FeatureListItem = styled.li`
  display: flex;
  break-inside: avoid;
  width: 100%;

  :nth-child(
    ${({ listLength }) => {
      if (listLength === 2) {
        return 2
      }
      if (listLength === 3 || listLength === 4) {
        return 3
      }
      return 4
    }}
  ) {
    padding-top: 120px;

    @media screen and ${breakpoint('max-width', 'laptop')} {
      padding-top: 0;
    }
  }
`

export const CollectionListItem = styled.li`
  display: contents;
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const MobileOnlyGrid = styled(Grid)`
  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`
