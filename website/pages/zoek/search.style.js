import styled from 'styled-components'
import {
  Heading,
  breakpoint,
  FilterBox as FilterBoxASC,
  Spinner as SpinnerASC,
  Select as SelectASC,
  FilterOption as FilterOptionASC,
} from '@amsterdam/asc-ui'

import ContentContainer from '../../components/ContentContainer'

export const Container = styled(ContentContainer)`
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
export const FilterBox = styled(FilterBoxASC)`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const Spinner = styled(SpinnerASC)`
  margin-top: 40px;
`

export const FilterOption = styled(FilterOptionASC)`
  &:first-letter{
    text-transform: capitalize
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
