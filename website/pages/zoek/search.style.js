import styled from 'styled-components'
import {
  Heading,
  breakpoint,
  themeColor,
  Input,
  FilterBox as FilterBoxASC,
  Spinner as SpinnerASC,
  Select as SelectASC,
  Button as ButtonASC,
} from '@amsterdam/asc-ui'

import ContainerComponent from '../../components/Container/Container'

export const Container = styled(ContainerComponent)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 36px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: 1fr;
  }
`

export const SearchBar = styled(Input)`
  &:-webkit-autofill {
    &,
    &:hover,
    &:focus {
      transition: background-color 5000s ease-in-out 0s;
    }
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

export const FilterButton = styled(ButtonASC)`
  color: ${themeColor('tint', 'level7')};
  border-left: 4px solid transparent;
  font-weight: ${(props) => (props.active ? 700 : 400)};
  text-decoration: none;
  font-size: 16px;
  width: 100%;
  margin-top: 0 !important;
  border-style: solid;
  border-width: 1px 1px 1px 4px;
  border-color: ${({ active }) => (active ? themeColor('primary') : 'transparent')};

  &:hover {
    color: ${({ active }) => (active ? themeColor('tint', 'level7') : themeColor('secondary'))};
  }
`

export const FilterButtonLabel = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }

  padding: 12px;
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
