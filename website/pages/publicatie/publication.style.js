import styled from 'styled-components'
import { breakpoint, themeColor } from '@amsterdam/asc-ui'

import List from '~/components/List/List'

export const MetaList = styled(List)`
  margin-bottom: 40px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 56px;
  }
`

export const MetaListItem = styled.li`
  display: inline;

  & ::after {
    content: ' | ';
  }

  & :last-child::after {
    content: '';
  }
`
export const CoverImage = styled.div`
  border: 2px solid ${themeColor('tint', 'level3')};
  margin-bottom: 40px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
