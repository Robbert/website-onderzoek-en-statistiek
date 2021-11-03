import styled from 'styled-components'
import { Icon as IconASC } from '@amsterdam/asc-ui'

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const ContentType = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }
`
