import styled from 'styled-components'
import { Icon as IconASC } from '@amsterdam/asc-ui'

export const Icon = styled(IconASC)`
  margin-right: 12px;
  margin-left: ${({ marginLeft }) => marginLeft}px;
`

export const ContentType = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }
`
