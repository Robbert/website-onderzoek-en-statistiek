/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { breakpoint, ListItem as ListItemASC, Icon as IconASC } from '@amsterdam/asc-ui'

import { Grid, GridItem as GridItemComponent } from '../components/Grid/Grid.style'
import Heading from '../components/Heading/Heading'

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

export const SideBarGridItem = styled(GridItemComponent)`
  margin-top: 112px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

export const HighlightHeading = styled(Heading)`
  margin-top: 96px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 16px;
  }
`

export const ListItem = styled(ListItemASC)`
  margin-bottom: 0;
`
export const FeatureListItem = styled.li`
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
