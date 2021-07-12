import styled from 'styled-components'
import {
  CustomHTMLBlock, Heading, Card, CardContent, CardMedia, themeColor, Paragraph,
} from '@amsterdam/asc-ui'

export const Anchor = styled.a`
  display: block; 
  margin-bottom: 16px;
  text-decoration: none;
  color: ${themeColor('tint', 'level7')};
`
export const ArticleCard = styled(Card)`
  align-items: flex-start;
`

export const Media = styled(CardMedia)` 
  align-self: flex-start;
`

export const Content = styled(CardContent)`
  padding: 0 16px 16px 0;
  margin-left: 16px;
  min-height: 144px;
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
`

export const Intro = styled(Paragraph)`
  padding: 16px 0 0 0;
  font-weight: 700;
`

export const Body = styled(CustomHTMLBlock)`
  padding: 16px 0 0 0;
`

export const Title = styled(Heading)`
  padding: 16px 0 12px 0;
`
