import styled from 'styled-components'
import {
  CustomHTMLBlock, Heading, Paragraph, breakpoint, themeColor, Card, CardMedia, CardContent,
} from '@amsterdam/asc-ui'

import ContentContainer from '../../components/ContentContainer'

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

export const ImageWrapper = styled.div`
  width: 100%;
  height: 360px;
  position: relative;
`

export const Container = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 36px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: 1fr;
  }
`

export const ArticleContainer = styled.div`
  margin-top: -80px;
  background-color: white;
  z-index: 1;
  padding: 24px;
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
