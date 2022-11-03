import styled, { css } from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import Container from '../Container/Container'

export const Grid = styled(Container)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(${({ numberOfRows }) => numberOfRows || 1}, auto);
  column-gap: 2%;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const gridItemStyle = css`
  ${({ gutterBottom }) =>
    (gutterBottom || typeof gutterBottom === 'number') &&
    css`
      margin-bottom: ${typeof gutterBottom?.large === 'number'
        ? `${gutterBottom.large}px`
        : `${gutterBottom}px`};
    `}

  ${({ gutterBottom }) =>
    typeof gutterBottom?.small === 'number' &&
    css`
      @media screen and ${breakpoint('max-width', 'laptop')} {
        margin-bottom: ${gutterBottom.small}px;
      }
    `}

  grid-column: ${({ colStart, colRange }) => `
    ${colStart?.large || colStart || 'auto'} / ${
    colRange?.large || colRange ? `span ${colRange?.large || colRange}` : 'auto'
  }`};
  grid-row: ${({ rowStart, rowRange }) => `
    ${rowStart?.large || rowStart || 'auto'} / ${
    rowRange?.large || rowRange ? `span ${rowRange?.large || rowRange}` : 'auto'
  }`};

  ${({ colStart }) =>
    colStart?.small &&
    css`
      @media screen and ${breakpoint('max-width', 'laptop')} {
        grid-column-start: ${colStart.small};
      }
    `}

  ${({ colRange }) =>
    colRange?.small &&
    css`
      @media screen and ${breakpoint('max-width', 'laptop')} {
        grid-column-end: span ${colRange.small};
      }
    `}

  ${({ rowStart }) =>
    rowStart?.small &&
    css`
      @media screen and ${breakpoint('max-width', 'laptop')} {
        grid-row-start: ${rowStart.small};
      }
    `}

  ${({ rowRange }) =>
    rowRange?.small &&
    css`
      @media screen and ${breakpoint('max-width', 'laptop')} {
        grid-row-end: span ${rowRange.small};
      }
    `}
`

export const GridItem = styled.div`
  ${gridItemStyle}
`

export const subgridStyle = css`
  display: grid;
  grid-template-rows: repeat(${({ numberOfRows }) => numberOfRows || 1}, auto);

  ${({ colRange }) =>
    colRange
      ? css`
          grid-template-columns: repeat(
            ${colRange.large ? colRange.large : colRange},
            1fr
          );
          /*
            The subgrid column gap is calculated here based on how many columns the subgrid spans.
            The main grid is 12 columns with a column gap of 2%. If the subgrid is for example 6 columns
            wide, its column gap will be 4%, in order to align with the main grid.
          */
          column-gap: calc(
            (12 / ${colRange.large ? colRange.large : colRange}) * 2%
          );
        `
      : css`
          grid-template-columns: repeat(12, 1fr);
          column-gap: 2%;
        `}

  ${({ colRange }) =>
    colRange?.small
      ? css`
          @media screen and ${breakpoint('max-width', 'laptop')} {
            grid-template-columns: repeat(${colRange.small}, 1fr);
          }
        `
      : css`
          @media screen and ${breakpoint('max-width', 'laptop')} {
            grid-template-columns: repeat(4, 1fr);
          }
        `}

  ${gridItemStyle}
`
