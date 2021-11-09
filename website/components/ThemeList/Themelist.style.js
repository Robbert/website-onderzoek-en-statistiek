import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import ParagraphComponent from '../Paragraph/Paragraph'
import ListComponent from '../List/List'

export const Paragraph = styled(ParagraphComponent)`
  margin-top: 80px;
  margin-bottom: 120px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 40px;
    margin-bottom: 72px;
  }
`

export const List = styled(ListComponent)`
  display: inline;
`

export const ListItem = styled.li`
  display: inline;

  & ::after {
    content: ", ";
  }

  & :last-child::after {
    content: ".";
  }
`
