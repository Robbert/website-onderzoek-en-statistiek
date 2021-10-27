/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

import Paragraph from '../../components/Paragraph/Paragraph'
import { GridItem } from '../../components/Grid/Grid.style'

export const HeroSection = styled(GridItem)`
  z-index: 1;
  min-height: 400px;
`

export const Caption = styled(Paragraph)`
  text-align: right;
`

export const ColorBar = styled(GridItem)`
  background-color: ${({ barColor }) => barColor};
  height: 542px;
  margin: -400px -32px 24px -32px;
  z-index: 0;
`
