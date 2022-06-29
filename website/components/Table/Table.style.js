/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components'
import { themeColor, breakpoint } from '@amsterdam/asc-ui'

import { fluidTypoStyle, typographyStyle } from '~/lib/typographyUtils'

export const Table = styled.table`
  width: 100%;
  font-weight: 500;
  border-collapse: collapse;
  color: ${themeColor('tint', 'level6')};

  ${fluidTypoStyle}
  ${typographyStyle}

  thead {
    tr {
      border-bottom: 1px solid ${themeColor('tint', 'level7')};
      &:hover {
        background-color: white;
      }
    }
  }

  th {
    font-weight: 500;
    text-align: left;
  }

  tr {
    border-bottom: 1px solid ${themeColor('tint', 'level4')};
    &:hover {
      background-color: ${themeColor('tint', 'level2')};
    }
  }

  th,
  td {
    padding: 8px 16px;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    thead {
      display: none;
    }
    tr {
      display: block;
      border-bottom: none;
      margin-bottom: 16px;
    }
    td {
      display: block;
      padding-left: 0;
      width: 100%;
    }
    th,
    td {
      padding: 4px 0px;
    }

    ${({ headerArray }) =>
      headerArray &&
      headerArray.map(
        (item, index) =>
          css`
            td:nth-of-type(${index + 1})::before {
              content: '${item}: ';
              font-weight: 800;
            }
          `,
      )}
  }
`
