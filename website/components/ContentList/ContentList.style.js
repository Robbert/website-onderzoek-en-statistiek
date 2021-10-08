import styled from 'styled-components'
import {
  Heading as HeadingASC,
  ListItem as ListItemASC,
} from '@amsterdam/asc-ui'

import Container from '../Container/Container'

export const ListContainer = styled(Container)`
  padding-top: 44px;
  padding-bottom: 44px;
  display: flex;
  flex-direction: column;
`

export const Heading = styled(HeadingASC)`
  text-transform: capitalize;
`

export const ListItem = styled(ListItemASC)`
  margin-bottom: 0;
`
