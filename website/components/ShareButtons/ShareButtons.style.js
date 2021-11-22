import { themeColor, svgFill } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ListComponent from '../List/List'
import ButtonComponent from '../Button/Button'

export const List = styled(ListComponent)`
  display: inline-flex;
`

export const Button = styled(ButtonComponent)`
  ${svgFill(themeColor('primary'))}

  :hover {
    ${svgFill('black')}
  }
`
