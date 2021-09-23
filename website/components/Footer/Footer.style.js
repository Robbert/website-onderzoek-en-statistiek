import {
  breakpoint,
  themeColor,
  Icon as IconASC,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContainerComponent from '../Container/Container'

export const Container = styled(ContainerComponent)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 32px;
  padding-top: 32px;
  padding-bottom: 48px;
  background-color: ${themeColor('primary')};
  color: white;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: auto;
  }
`

export const Section = styled.div`
  max-width: 440px;
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const List = styled.ul`
  padding: 12px 0;
  margin: 0;
`

export const ListItem = styled.li`
  display: inline;
  margin-right: 40px;
`
