/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import { Grid as GridComponent, gridItemStyle } from '../Grid/Grid.style'
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

export const Source = styled(Paragraph)`
  text-align: right;
  margin-top: 8px;
  margin-bottom: 20px;
  ${fontColor}
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
