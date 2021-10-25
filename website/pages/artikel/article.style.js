import styled from 'styled-components'
import {
  CustomHTMLBlock, Heading, Paragraph, breakpoint, themeColor,
} from '@amsterdam/asc-ui'

import ContainerComponent from '../../components/Container/Container'

export const ImageWrapper = styled.div`
  width: 100%;
  height: 360px;
  position: relative;
`

export const Container = styled(ContainerComponent)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 36px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: 1fr;
  }
`

export const MainContent = styled.div`
  margin-top: -80px;
  background-color: white;
  z-index: 1;
  padding: 24px;
`

export const SideBar = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 24px;
  margin-top: 44px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
  }
`

export const Title = styled(Heading)`
  padding: 16px 0 12px 0;
`

export const Intro = styled(Paragraph)`
  padding: 16px 0 0 0;
  font-weight: 700;
`

export const Body = styled(CustomHTMLBlock)`
  padding: 16px 0 0 0;
`
