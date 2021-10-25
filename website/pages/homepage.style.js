/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { breakpoint, ListItem as ListItemASC, Icon as IconASC } from '@amsterdam/asc-ui'

import { GridItem as GridItemComponent, Grid } from '../components/Grid/Grid.style'
import CardList from '../components/CardList/CardList'

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
    margin-top: 0;

    ${({ show }) => !show && css`display: none;`}
  }
`

export const ListItem = styled(ListItemASC)`
  margin-bottom: 0;
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 44px;

  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`

const toggleStyle = css`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    ${({ show }) => !show && css`display: none;`}
  }
`

export const HighLightGridItem = styled(GridItem)`
  ${toggleStyle}
`

export const HighLightCardList = styled(CardList)`
  ${toggleStyle}
`

export const CollectionGrid = styled(Grid)`
  ${toggleStyle}
`
