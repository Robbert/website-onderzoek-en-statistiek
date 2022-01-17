import { breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const Container = styled.div`
  padding: ${({ verticalPadding = 20, horizontalPadding = 32 }) =>
    `${verticalPadding}px ${horizontalPadding}px`};

  @media screen and ${breakpoint('max-width', 'laptop')} {
    padding: ${({ verticalPadding = 20, horizontalPadding = 12 }) =>
      `${verticalPadding}px ${horizontalPadding}px`};
  }
`

export default Container
