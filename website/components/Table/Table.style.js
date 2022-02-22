/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
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
      &:hover {
        background-color: white;
      }
    }
  }

  th {
    font-weight: 800;
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
    padding: 12px 16px;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    thead {
      display: none;
    }
    tr {
      display: block;
      border-bottom: none;
      margin-bottom: 40px;
    }
    td {
      display: block;
      padding-left: 0;
      width: 100%;
    }
  }
`
