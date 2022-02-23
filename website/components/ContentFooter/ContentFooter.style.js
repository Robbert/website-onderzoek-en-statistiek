import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import ParagraphComponent from '../Paragraph/Paragraph'
import ListComponent from '../List/List'

export const Container = styled.div`
  margin-top: 80px;
  margin-bottom: 120px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 40px;
    margin-bottom: 72px;
  }
`

export const Paragraph = styled(ParagraphComponent)`
  margin-bottom: 8px;
`

export const List = styled(ListComponent)`
  display: inline;
`

export const ListItem = styled.li`
  display: inline;

  &::after {
    content: ', ';
  }

  &:last-child::after {
    content: '.';
  }
`

export const ShareContainer = styled(ParagraphComponent)`
  display: flex;
  align-items: center;
`
