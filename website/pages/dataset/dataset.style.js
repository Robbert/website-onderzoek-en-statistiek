import styled, { css } from 'styled-components'
import { breakpoint, themeColor } from '@amsterdam/asc-ui'

import HeadingComponent from '~/components/Heading/Heading'
import DownloadButtonComponent from '~/components/DownloadButton/DownloadButton'
import { fluidTypoStyle, typographyStyle } from '~/lib/typographyUtils'

export const Heading = styled(HeadingComponent)`
  margin-top: 40px;
`

export const Table = styled.table`
  width: 100%;
  margin-top: 40px;
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
    vertical-align: top;
    border-bottom: 1px solid ${themeColor('tint', 'level4')};
    &:hover {
      background-color: ${themeColor('tint', 'level2')};
    }
  }

  th:first-child, td:first-child {
    width: 48.75%;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 16px; 
    padding-right: 16px;
  }
  th:nth-child(2), td:nth-child(2) {
    padding-top: 12px;
    padding-bottom: 12px;
    width: 18% 
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    thead {
      display: none;
    }
    tr {
      border-bottom: none;
    }
    td {
      display: block;
      padding-left: 0; 
      width: 100%;
    }
    td:first-child {
      margin-top: 20px;
      padding-left: 0;
      padding-bottom: 0;
      font-weight: 800;
      width: 100%;
    }
    td:nth-child(2) {
      width: 100%;
      &:before {
        content: 'Categorie: ';
        display: inline;
        font-weight: 800;
      }
    }
  }
`
export const DownloadButton = styled(DownloadButtonComponent)`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding-left: 0;
  }
  `

export const DefinitionList = styled.dl`
  margin-top: 40px;
  font-weight: 500;
  color: ${themeColor('tint', 'level6')};
  ${fluidTypoStyle}
  ${typographyStyle}
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
  ${({ underline }) => underline && css`
    border-bottom: 1px solid ${themeColor('tint', 'level4')};
  `}

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: block;
    border-bottom: none;
    padding-top: 24px;
    padding-bottom: 0;
    padding-left: 0;
  }
`

export const Term = styled.dt`
  flex-basis: 30%;
  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 8px;
    font-weight: 800;
  }
`

export const Details = styled.dd`
  margin: 0;
  flex-basis: 70%;
`
