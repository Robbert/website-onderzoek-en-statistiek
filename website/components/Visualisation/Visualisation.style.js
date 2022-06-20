import styled from 'styled-components'
import { breakpoint, Icon as IconASC } from '@amsterdam/asc-ui'

import {
  Grid as GridComponent,
  gridItemStyle,
} from '~/components/Grid/Grid.style'
import HeadingComponent from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import ButtonComponent from '~/components/Button/Button'
import DownloadButtonComponent from '~/components/DownloadButton/DownloadButton'
import SelectComponent from '~/components/Select/Select'
import { getFontColor } from '~/lib/utils'
import { calculateFluidStyle } from '~/lib/typographyUtils'

export const Grid = styled(GridComponent)`
  margin-bottom: ${({ variant }) =>
    variant === 'kleurenbalk' ? '120px' : '40px'};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 40px;
  }
`

export const Heading = styled(HeadingComponent)`
  margin-top: 12px;
`

export const VisualisationFooter = styled.div`
  min-height: 60px;
  margin-bottom: 24px;
  display: flex;
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: block;
  }
`

export const Button = styled(ButtonComponent)`
  ${({ backgroundColor }) => backgroundColor && getFontColor(backgroundColor)}
`

export const DownloadButton = styled(DownloadButtonComponent)`
  ${({ backgroundColor }) => backgroundColor && getFontColor(backgroundColor)}
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const Source = styled(Paragraph)`
  padding: 12px 24px;
  align-self: center;
  margin-right: auto;
  ${({ backgroundColor }) => backgroundColor && getFontColor(backgroundColor)}
`

export const Text = styled(Paragraph)`
  margin-bottom: 80px;
  ${({ backgroundColor }) => backgroundColor && getFontColor(backgroundColor)}

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 60px;
  }
`

export const ColorBar = styled.div`
  min-height: 200px;
  margin-top: -204px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-left: -32px;
  margin-right: -32px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: -240px;
    margin-left: -12px;
    margin-right: -12px;
    min-height: 160px;
  }
  ${gridItemStyle}
`

export const Select = styled(SelectComponent)`
  margin-bottom: 24px;
`

export const Label = styled.label`
  display: inline-flex;
  flex-direction: column;
`

export const LabelText = styled.span`
  font-size: ${calculateFluidStyle(16, 18)};
  line-height: ${calculateFluidStyle(22, 24)};
  font-weight: 800;
  margin-bottom: 16px;
`
