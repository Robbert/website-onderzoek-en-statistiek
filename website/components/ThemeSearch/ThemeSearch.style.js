/* stylelint-disable */
import { breakpoint } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ButtonComponent from '../Button/Button'

export const Container = styled.div`
  margin-bottom: 112px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 64px;
  }
`

export const ButtonGroup = styled.div`
  margin-bottom: 116px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 32px;
  }
`

export const Button = styled(ButtonComponent)`
  text-transform: capitalize;
  padding: 12px;

  &[aria-pressed='true'] {
    font-weight: 900;
    color: black;
    cursor: default;

    :hover,
    :focus {
      text-decoration: none;
    }
  }

  :first-child {
    padding-left: 0;
  }
`
