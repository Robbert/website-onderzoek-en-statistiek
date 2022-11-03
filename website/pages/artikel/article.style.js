import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import CardListComponent from '~/components/CardList/CardList'
import { gridItemStyle, subgridStyle } from '~/components/Grid/Grid.style'

export const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 80px;

  p {
    margin-top: 8px;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 56px;
  }
`

export const CardList = styled(CardListComponent)`
  ${subgridStyle}
`

export const RelatedListItem = styled.li`
  ${gridItemStyle}
`
