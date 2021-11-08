import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import List from '../../components/List/List'

export const MetaList = styled(List)`
  margin-bottom: 40px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 60px
  }
`

export const MetaListItem = styled.li`
  display: inline;

  & ::after {
    content: " | ";
  }

  & :last-child::after {
    content: "";
  }
`
export const CoverImage = styled.div`
  border: 1px solid black;
  margin-bottom: 40px
`
