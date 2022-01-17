import { themeColor, Icon as IconASC, breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ListComponent from '../List/List'
import { Grid as GridComponent } from '../Grid/Grid.style'
import Link from '../Link/Link'

export const Grid = styled(GridComponent)`
  background-color: ${themeColor('primary')};
  color: white;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding-bottom: 16px;
  }
`

export const List = styled(ListComponent)`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 40px;
  }
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const BottomList = styled.ul`
  padding: 4px 0;
  margin: 0;
`

export const BottomListItem = styled.li`
  display: inline;
  margin-right: 40px;
`

export const FirstLink = styled(Link)`
  padding-top: 8px;
`

export const BottomLink = styled(Link)`
  color: ${themeColor('tint', 'level6')};
`
