import styled from 'styled-components'
import { themeColor } from '@amsterdam/asc-ui'

import BaseLink from '../Link/Link'
import Paragraph from '../Paragraph/Paragraph'
import { calculateFluidStyle } from '../../lib/typographyUtils'

export const TypeLabel = styled(Paragraph)`
  text-transform: capitalize;
`

export const Link = styled(BaseLink)`
  font-size: ${calculateFluidStyle(18, 24, 320, 1920)};
  line-height: ${calculateFluidStyle(28, 40, 320, 1920)};
  color: ${themeColor('primary', 'main')};

  &:hover {
    color: ${themeColor('secundary', 'main')};
  }
`

export const Title = styled(Paragraph)`
  color: inherit;
`
