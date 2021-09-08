import {
  breakpoint,
  Header as HeaderASC,
  styles,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const HeaderWrapper = styled.section`
  width: 100%;

  /*
   * this z-index is set so the fly out menu is always shown on top of other content
   * 500 is a bit high, but this is because Leaflet (a map library we currently often use)
   * sets a z-index of 400.
   * */
  & #header {
    z-index: 500;
  }

  @media print {
    display: none;
  }
`

export const Header = styled(HeaderASC)`
  padding: 0;
  margin: 0 44px;

  a {
    /* Making sure the anchors in the header have a decent clickable area size */
    display: flex;
    height: 100%;
    align-items: start;
  }

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    margin: 0 32px;
  }

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin: 0 24px;
  }

  ${styles.HeaderTitleStyle} {
    @media screen and ${breakpoint('max-width', 'laptopM')} {
      margin-top: 8px;
    }

    @media screen and ${breakpoint('max-width', 'laptop')} {
      margin-top: 12px;
    }
  }

  ${styles.HeaderNavigationStyle} {
    @media screen and ${breakpoint('min-width', 'desktop')} {
      margin-left: 29px;
      margin-right: 29px;
    }

    @media screen and ${breakpoint('min-width', 'tabletM')} {
      justify-content: space-between;
    }
  }
`
