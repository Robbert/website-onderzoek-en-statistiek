import styled from 'styled-components'
import { breakpoint, themeColor } from '@amsterdam/asc-ui'

import LinkComponent from '../Link/Link'

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
`

export const Item = styled.li`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

export const Link = styled(LinkComponent)`
  line-height: 24px;
  height: 100%;
  color: ${themeColor('tint', 'level6')};
  align-items: center;
  font-weight: 400;
  padding-left: 20px;
  padding-right: 20px;
`

export const FlyOutItem = styled.li`
  position: relative;
`
