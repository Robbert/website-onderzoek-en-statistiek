import {
  breakpoint,
  ListItem as ListItemASC,
  List as ListASC,
  Icon as IconASC,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const List = styled(ListASC)`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: 4px;
  row-gap: 4px;
  padding-bottom: ${({ gutterBottom }) => gutterBottom}px;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    grid-template-columns: repeat(${({ columns }) => columns - 1}, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: repeat(${({ columns }) => columns - 1}, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'mobileL')} {
    grid-template-columns: 1fr;
  }
`

export const ListItem = styled(ListItemASC)`
  margin-bottom: 0;
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`
