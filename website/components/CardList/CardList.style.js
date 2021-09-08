import { breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: 24px;
  row-gap: 24px;
  margin-bottom: 24px;

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

export const ListItem = styled.li`
  margin-bottom: 0;
`
