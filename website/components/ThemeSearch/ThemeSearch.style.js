import { breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ButtonComponent from '../Button/Button'

export const Container = styled.div`
  margin-bottom: 120px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 72px;
  }
`

export const ButtonGroup = styled.div`
  margin-top: 8px;
  margin-bottom: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 40px;
  }
`

export const Button = styled(ButtonComponent)`
  padding-left: 0;

  &[aria-pressed='true'] {
    font-weight: 800;
    color: black;
    cursor: default;

    :hover,
    :focus {
      text-decoration: none;
    }
  }
`
