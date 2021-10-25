import {
  themeColor,
  Icon as IconASC,
  breakpoint,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { Grid as GridComponent } from '../Grid/Grid.style'
import Link from '../Link/Link'

export const Grid = styled(GridComponent)`
  padding-bottom: 48px;
  background-color: ${themeColor('primary')};
  color: white;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding-bottom: 16px;
  }
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const List = styled.ul`
  padding: 4px 0;
  margin: 0;
`

export const ListItem = styled.li`
  display: inline;
  margin-right: 40px;
`

export const BottomLink = styled(Link)`
  color: ${themeColor('tint', 'level6')};
`
