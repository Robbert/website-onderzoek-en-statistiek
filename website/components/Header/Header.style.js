import styled, { css, keyframes } from 'styled-components'
import { breakpoint } from '@amsterdam/asc-ui'

import { Grid, GridItem } from '../Grid/Grid.style'
import HeadingComponent from '../Heading/Heading'
import LinkComponent from '../Link/Link'

export const Container = styled(Grid)`
  position: ${({ sticky }) => (sticky ? 'sticky' : 'relative')};
  top: 0;
  align-items: center;
  background-color: white;

  /*
   * this z-index is set so the header is shown on top of the backdrop
   * 501 is a bit high, but this is because several external libraries we
   * use set a high z-index.
   */
  z-index: 501;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: flex;
    column-gap: normal;
  }
`

export const Heading = styled(HeadingComponent)`
  /*
    With css subgrids not yet implemented, this hacky code
    creates an 8 column wide subgrid of the main grid.
  */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 3%;
`

export const Link = styled(LinkComponent)`
  display: flex;
  align-items: center;
  line-height: 1;
  grid-column: ${({ withTitle }) =>
    withTitle ? 'auto / span 8' : 'auto / span 2'};

  ${({ withTitle }) =>
    withTitle &&
    css`
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      column-gap: 3%;
    `}

  text-decoration: none;
  font-size: inherit;

  :hover {
    text-decoration: none;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: flex;
    column-gap: normal;
  }
`

export const LargeLogo = styled.img`
  width: 134px;
  max-width: 100%;
  height: auto;
  grid-column: auto / span 2;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

export const SmallLogo = styled.img`
  height: 42px;
  margin-right: 18px;
  display: flex;

  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Text = styled.span`
  grid-column: auto / span 6;
  color: black;
  animation: ${fadeIn} 0.2s ease-in-out;
`

export const NavGridItem = styled(GridItem)`
  margin-left: auto;
`
