import { themeColor, Button as ButtonASC } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { calculateFluidStyle } from '../../lib/typographyUtils'
import ContainerComponent from '../Container/Container'
import BaseLink from '../Link/Link'

export const Container = styled(ContainerComponent)`
  margin: 24px 0;
  padding-bottom: 24px;
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin-bottom: 80px;
  font-size: ${calculateFluidStyle(18, 24, 320, 1920)};
  line-height: ${calculateFluidStyle(28, 40, 320, 1920)};
`

export const ListItem = styled.li`
  list-style: none;
  display: inline;
  padding-right: 1em;
`

export const FilterButton = styled(ButtonASC)`
  text-transform: capitalize;
  font-size: inherit;
  text-decoration: none;
  color: ${({ active }) => (active ? themeColor('tint', 'level7') : themeColor('primary'))};
  font-weight: ${(props) => (props.active ? 800 : 400)};
  cursor: ${(props) => (props.active ? 'auto' : 'pointer')};

  &:hover {
    color: ${({ active }) => (active ? themeColor('tint', 'level7') : themeColor('secondary'))};
  }
`
export const Link = styled(BaseLink)`
  &:hover {
    text-decoration: none;
  }
`
