import styled from 'styled-components'
import {
  Accordion, CustomHTMLBlock, themeColor, themeSpacing,
} from '@amsterdam/asc-ui'

export const Intro = styled(CustomHTMLBlock)`
  padding-top: ${themeSpacing(2)};
`

export const MetaData = styled.dl`
  font-size: 16px;
  border-top: 1px solid ${themeColor('tint', 'level4')};
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${themeSpacing(3, 0, 1, 0)};
  border-bottom: 1px solid ${themeColor('tint', 'level4')};
`
export const Key = styled.dt`
  width: calc(100% / 3);
`
export const Value = styled.dd`
  margin-left: auto;
  width: calc(100% * 2 / 3);
  padding: ${themeSpacing(0, 0, 2, 0)};
`

export const Harmonica = styled(Accordion)`
  margin-top: ${themeSpacing(3)};

  + div {
    width: 100%;
  }
`
