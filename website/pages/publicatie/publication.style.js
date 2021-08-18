import styled from 'styled-components'
import {
  CustomHTMLBlock,
  Heading,
  themeColor,
  Paragraph,
  breakpoint,
  Accordion as ASCAccordion,
} from '@amsterdam/asc-ui'

import ContentContainer from '../../components/ContentContainer'

export const Container = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 44px;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: 1fr;
  }
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
  width: 100%;
`

export const MetaList = styled.ul`
  display: inline-block;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 28px;
`

export const MetaListItem = styled.li`
  display: inline-block;
  padding-right: 8px;
  margin-right: 8px;
  border-right: 1px solid ${themeColor('tint', 'level7')};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    border-right: none;
  }
`

export const Intro = styled(Paragraph)`
  padding: 16px 0 0 0;
  font-weight: 700;
`

export const Main = styled(CustomHTMLBlock)`
  padding: 16px 0 0 0;
`

export const Accordion = styled(ASCAccordion)`
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }
`
// TODO: this component only exists because you can't currently style AccordionWrapper
// Fix this in ASC and remove this component
export const AccordionWrapperWrapper = styled.div`
  margin-bottom: 24px;
`

export const CoverImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  img {
    width: 100%;
    max-width: 400px;
  }
`
