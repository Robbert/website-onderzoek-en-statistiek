import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

export const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 80px;

  p {
    margin-top: 12px;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 56px;
  }
`

export const RelatedListItem = styled.li`
  display: contents;
`
