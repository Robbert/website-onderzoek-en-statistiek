import styled, { css } from 'styled-components'
import { breakpoint, themeColor } from '@amsterdam/asc-ui'

import DownloadButtonComponent from '../../components/DownloadButton/DownloadButton'
import { fluidTypoStyle, typographyStyle } from '../../lib/typographyUtils'

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
  padding-top: 10px;
  padding-bottom: 9px;
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

export const Resource = styled.div`
  display: flex;
  margin-bottom: 9px;
  margin-right: 16px;
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: block;
  }
`

export const ResourceTitle = styled.div`
  flex-basis: 58%;
`
export const DownloadButton = styled(DownloadButtonComponent)`
  padding-top: 0;
  margin-left: 4px;
  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding-top: 10px;
    padding-left: 0;
  }
  `
