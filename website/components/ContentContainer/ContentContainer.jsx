import { breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const ContentContainer = styled.div`
  height: 100%;
  padding-left: 44px;
  padding-right: 44px;
  margin: 0 auto;

  @media screen and ${breakpoint('min-width', 'laptop')} and ${breakpoint('max-width', 'laptopM')} {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media screen and ${breakpoint('min-width', 'tabletM')} and ${breakpoint('max-width', 'laptop')} {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export default ContentContainer
