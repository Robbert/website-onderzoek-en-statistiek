import styled from 'styled-components'
import { Icon as IconASC, breakpoint } from '@amsterdam/asc-ui'

import ButtonComponent from '~/components/Button/Button'

export const FilterTagContainer = styled.div`
  padding-top: 40px;
  padding-bottom: 24px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding-top: 24px;
    padding-bottom: 0;
  }
`

export const SearchResultsContainer = styled.div`
  margin-top: 16px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 8px;
  }
`

export const Button = styled(ButtonComponent)`
  margin-right: 16px;
  margin-bottom: 16px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`

export const Icon = styled(IconASC)`
  margin-right: 16px;
`
