import styled from 'styled-components'
import {
  Heading,
  breakpoint,
  Select as SelectASC,
} from '@amsterdam/asc-ui'

import ContainerComponent from '../../components/Container/Container'
import RadioComponent from '../../components/Radio/Radio'

export const Container = styled(ContainerComponent)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 36px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: 1fr;
  }
`

export const SideBar = styled.div`
  padding: 24px;
  margin-top: 44px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
  }
`

export const Radio = styled(RadioComponent)`
  span:first-letter {
    text-transform: capitalize;
  }
`

export const PageTitle = styled(Heading)`
  margin-top: 24px;
`

export const SortBar = styled.div`
  display: flex;
  margin-bottom: 24px;
`

export const Select = styled(SelectASC)`
  width: 200px;
  margin-left: auto;
`
