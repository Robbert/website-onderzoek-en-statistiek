/* stylelint-disable */
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
  margin-bottom: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 40px;
  }
`

export const Button = styled(ButtonComponent)`
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
