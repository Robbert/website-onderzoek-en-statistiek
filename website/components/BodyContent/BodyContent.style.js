import styled from 'styled-components'
import { Icon as IconASC } from '@amsterdam/asc-ui'

import LinkComponent from '~/components/Link/Link'

export const Link = styled(LinkComponent)`
  display: flex;
`

export const ChevronIcon = styled(IconASC)`
  margin-right: 12px;
`

export const LinkText = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }
`

export const ExternalIcon = styled(IconASC)`
  padding-left: 12px;
  margin-left: auto;
`
