import styled from 'styled-components'
import {
  CustomHTMLBlock, Heading, themeColor, Paragraph,
} from '@amsterdam/asc-ui'

export const Anchor = styled.a`
  display: block; 
  margin-bottom: 16px;
  text-decoration: none;
  color: ${themeColor('tint', 'level7')};
`
export const Title = styled(Heading)`
  padding: 16px 0 12px 0;
`

export const Intro = styled(Paragraph)`
  padding: 16px 0 0 0;
  font-weight: 700;
`

export const Main = styled(CustomHTMLBlock)`
  padding: 16px 0 0 0;
`
