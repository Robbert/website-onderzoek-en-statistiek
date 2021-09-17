import styled, { css } from 'styled-components'
import {
  breakpoint,
  themeColor,
  Heading as HeadingASC,
  ListItem as ListItemASC,
} from '@amsterdam/asc-ui'

import Container from '../Container/Container'

export const Wrapper = styled.div`
  background-color: ${themeColor('tint', 'level2')};
`

export const Grid = styled(Container)`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 24px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    grid-template-columns: 1fr;
  }
`

export const ListContainer = styled.div`
  padding-top: 44px;
  padding-bottom: 44px;
  display: flex;
  flex-direction: column;

  /* if there are more than 3 lists... */
  ${({ listsLength }) => listsLength > 3 && css`
    /* ...add border-bottom to first row of content lists */
    &:nth-child(-n+2) {
      border-bottom: 2px solid;
    }

    /* ...add border-bottom to all rows of content cards except the last */
    @media screen and ${breakpoint('max-width', 'laptop')} {
      border-bottom: 2px solid
      &:last-child {
        border-bottom: none;
      }
    }
  `}
`

export const Heading = styled(HeadingASC)`
  text-transform: capitalize;
`

export const ListItem = styled(ListItemASC)`
  margin-bottom: 0;
`
