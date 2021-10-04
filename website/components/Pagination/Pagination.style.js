import styled, { css } from 'styled-components'
import { Button as ButtonASC, svgFill, themeColor } from '@amsterdam/asc-ui'

import { calculateFluidStyle } from '../../lib/typographyUtils'

export const List = styled.ul`
  font-size: ${calculateFluidStyle(18, 24, 320, 1920)};
  line-height: ${calculateFluidStyle(28, 40, 320, 1920)};
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
`

export const ListItem = styled.li`
  display: inline-flex;
  justify-content: center;

  /* make padding depend on font-size */
  padding: 0 0.3em;

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }
`

export const PageNumberButton = styled.button`
  font-weight: 400;
  cursor: pointer;
  appearance: none;
  border: none;
  background: none;
  text-align: center;
  color: ${themeColor('primary')};

  &:not(:disabled):hover {
    color: ${themeColor('secondary', 'main')};
  }

  ${({ isCurrent }) => isCurrent && css`
  font-weight: 800;
  `}
`

export const Button = styled(ButtonASC)`
  color: ${themeColor('primary')};
  font-weight: 400;
  font-size: inherit;
  line-height: inherit;

  &:disabled {
    display: none;
  }

  &:not(:disabled):hover {
    color: ${themeColor('secondary', 'main')};
    text-decoration: underline;
  }

  span {
    display: inline-block;
    height: inherit;
  }

  ${svgFill(themeColor('primary'))}
`
