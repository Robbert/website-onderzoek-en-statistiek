import styled from 'styled-components'
import { Select as SelectASC, Icon as IconASC } from '@amsterdam/asc-ui'

import SearchBarComponent from '../../components/SearchBar/SearchBar'
import ButtonComponent from '../../components/Button/Button'
import FieldsetComponent from '../../components/Fieldset/Fieldset'
import RadioComponent from '../../components/Radio/Radio'

export const SearchBar = styled(SearchBarComponent)``

export const FilterTagContainer = styled.div`
  padding-top: 40px;
  padding-bottom: 24px;
`

export const SearchResultsContainer = styled.div`
  margin-top: 16px;
`

export const Button = styled(ButtonComponent)`
  margin-right: 16px;
  margin-bottom: 16px;

  span:first-letter {
    text-transform: capitalize;
  }
`

export const Icon = styled(IconASC)`
  margin-right: 16px;
`

export const Fieldset = styled(FieldsetComponent)`
  margin-top: 80px;
`

export const Radio = styled(RadioComponent)`
  span:first-letter {
    text-transform: capitalize;
  }
`

export const SortBar = styled.div`
  display: flex;
  margin-bottom: 24px;
`

export const Select = styled(SelectASC)`
  width: 220px;
  font-size: 18px;
`
