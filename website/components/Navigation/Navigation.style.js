import {
  breakpoint, MenuInline as MenuInlineASC, MenuItem as MenuItemASC, MenuToggle as MenuToggleASC,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const MenuInline = styled(MenuInlineASC)`
  width: 100%;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    display: none;
  }
`

export const MenuItem = styled(MenuItemASC)`
  margin-left: auto;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    margin-left: initial;
  }
`

export const MenuToggle = styled(MenuToggleASC)`
  margin-left: auto;

  @media screen and ${breakpoint('min-width', 'laptopM')} {
    display: none;
  }
`
