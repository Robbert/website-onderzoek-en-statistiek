import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

export const MegaMenu = styled.ul`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  background-color: white;
  top: calc(100% + 20px);
  right: -32px;
  width: 100vw;
  max-width: 1440px;
  padding: 60px 32px 120px;
  z-index: 2;
  overflow: auto;
  max-height: 100vh;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    right: -12px;
    grid-template-columns: 1fr;
  }
`

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 44px;
`

export const Item = styled.li`
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;
`

export const ItemMobile = styled(Item)`
  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`
