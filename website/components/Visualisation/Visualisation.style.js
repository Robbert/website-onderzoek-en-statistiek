/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { breakpoint, Icon as IconASC } from '@amsterdam/asc-ui'
import { VegaLite } from 'react-vega'

import { Grid as GridComponent, gridItemStyle } from '../Grid/Grid.style'
import HeadingComponent from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'

export const Grid = styled(GridComponent)`
  margin-bottom: ${({ variant }) =>
    variant === 'kleurenbalk' ? '120px' : '40px'};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 40px;
  }
`

const fontColor = css`
  color: ${({ backgroundColor, variant }) =>
    variant === 'kleurenbalk' &&
    (backgroundColor === 'paars' || backgroundColor === 'roze')
      ? 'white'
      : 'black'};
`

export const VegaVisualisation = styled(VegaLite)`
  background-color: #fff;
  width: 100%;
`

export const Heading = styled(HeadingComponent)`
  margin-top: 12px;
`

export const VisualisationFooter = styled.div`
  min-height: 60px;
  margin-bottom: 24px;
  background-color: white;
  display: flex;
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: block;
  }
`

export const Source = styled(Paragraph)`
  padding: 12px 24px;
  align-self: center;
  margin-left: auto;
`

export const ColorBar = styled.div`
  min-height: 200px;
  margin-top: -120px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-left: -32px;
  margin-right: -32px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: -100px;
    margin-left: -12px;
    margin-right: -12px;
    min-height: 160px;
  }
  ${gridItemStyle}
`

export const Text = styled(Paragraph)`
  margin-bottom: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 60px;
  }
  ${fontColor}
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`
