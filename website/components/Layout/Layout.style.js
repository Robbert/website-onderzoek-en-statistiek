import styled from 'styled-components'

import Link from '../Link/Link'

export const SkipNavigationLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 502; // on top of header
  transform: translateY(-100%) translateX(-50%);
  transition: transform 0.3s;
  padding: 12px;
  background-color: white;

  &:focus {
    transform: translateY(0%) translateX(-50%);
  }
`

export const Container = styled.div`
  background-color: white;
  max-width: 1440px;
  margin: 0 auto;
`

export const Main = styled.main`
  padding-top: 56px;
  padding-bottom: 40px;
`
