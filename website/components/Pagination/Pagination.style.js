import styled, { css } from 'styled-components'
import { Icon as IconASC } from '@amsterdam/asc-ui'

import ButtonComponent from '../Button/Button'
import { calculateFluidStyle } from '../../lib/typographyUtils'

export const List = styled.ul`
  font-size: ${calculateFluidStyle(18, 24)};
  line-height: ${calculateFluidStyle(28, 40)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`

export const PageNumberButton = styled(ButtonComponent)`
  padding-left: 12px;
  padding-right: 12px;

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      font-weight: 800;
      cursor: default;
      :hover {
        text-decoration: none;
      }
    `}
`

export const Button = styled(ButtonComponent)`
  ${({ first }) =>
    first &&
    css`
      padding-left: 0;
    `}

  ${({ last }) =>
    last &&
    css`
      padding-right: 0;
    `}

  &:disabled {
    display: none;
  }
`

export const Icon = styled(IconASC)`
  margin-top: 5px;
  ${({ right }) =>
    right
      ? css`
          margin-left: 12px;
        `
      : css`
          margin-right: 12px;
        `}
`

export const Spacer = styled.li`
  padding-left: 12px;
  padding-right: 12px;
`
