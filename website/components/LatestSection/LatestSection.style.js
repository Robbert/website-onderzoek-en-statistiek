import {
  themeColor, breakpoint, Heading as HeadingASC,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ContentContainer from '../ContentContainer/ContentContainer'

export const Wrapper = styled.div`
  background-color: ${themeColor('tint', 'level2')};
`

export const Grid = styled(ContentContainer)`
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

  /* Add border-bottom to first row of content cards */
  &:nth-child(-n+3) {
    border-bottom: 2px solid;
  }

  /* Add border-bottom to first and second rows of content cards */
  @media screen and ${breakpoint('max-width', 'laptop')} {
    &:nth-child(-n+4) {
      border-bottom: 2px solid;
    }
  }

  /* Add border-bottom to all rows of content cards except the last */
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    border-bottom: 2px solid;

    &:last-child {
      border-bottom: none;
    }
  }
`

export const Heading = styled(HeadingASC)`
  text-transform: capitalize;
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ListItem = styled.li`
  margin-bottom: 0;
`
