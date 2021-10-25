import styled from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import ContainerComponent from '../Container/Container'
import LinkComponent from '../Link/Link'

export const Container = styled(ContainerComponent)`
  position: ${({ sticky }) => (sticky ? 'sticky' : 'relative')};
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  /*
   * this z-index is set so the header is shown on top of the backdrop
   * 501 is a bit high, but this is because several external libraries we
   * use set a high z-index.
   */
  z-index: 501;
`

export const Heading = styled.h1`
  margin: 0;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    font-size: 18px;
  }
`

export const Link = styled(LinkComponent)`
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: inherit;

  :hover {
    text-decoration: none;
  }
`

const Logo = styled.img`
  height: 42px;
  margin-right: 100px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-right: 24px;
  }
`

export const LargeLogo = styled(Logo)`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

export const SmallLogo = styled(Logo)`
  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`

export const Text = styled.span`
  color: black;
`
