import { themeColor, breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  height: 390px;
  margin-bottom: ${({ offSet }) => (offSet ? '104px' : '80px')};
`

export const ContentBlock = styled.div`
  position: absolute;
  width: 600px;
  max-width: calc(100% - 48px);
  padding: 24px;
  color: white;
  background-color: ${themeColor('primary', 'main')};
  top: ${({ offSet }) => (offSet ? 'unset' : 0)};
  bottom: ${({ offSet }) => (offSet ? '-56px' : 0)};
  left: ${({ offSet }) => (offSet ? '84px' : 0)};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    top: unset;
    bottom: -56px;
    left: 24px;
  }
`
