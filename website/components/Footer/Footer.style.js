import { breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContainerComponent from '../Container/Container'

export const Container = styled(ContainerComponent)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: auto;
  }
`

export const BottomContainer = styled.div`
  margin: 0 auto;
`
