import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import { Grid, GridItem } from '../Grid/Grid.style'
import Link from '../Link/Link'

export const MegaMenu = styled(Grid)`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
  background-color: white;
  top: 100%;
  left: 0;
  padding-top: 80px;
  padding-bottom: 80px;
  z-index: 2;
  overflow: auto;
  max-height: 100vh;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    right: 0;
  }
`

export const Item = styled.li`
  padding-top: 8px;
  padding-bottom: 8px;

  :first-child {
    padding-top: 0;
  }
`

export const MobileGridItem = styled(GridItem)`
  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`

export const LightLink = styled(Link)`
  font-weight: 500;
`
