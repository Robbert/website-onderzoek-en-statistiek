/* eslint-disable import/prefer-default-export */
/* eslint-disable indent */
import styled, { css } from 'styled-components'
import { themeColor } from '@amsterdam/asc-ui'

const unorderedBulletStyle = css`
  display: flex;
  align-items: baseline;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: ${themeColor('tint', 'level6')};
    margin-right: 24px;
    flex-shrink: 0;
  }
`

const orderedBulletStyle = css`
  display: flex;
  align-items: baseline;
  counter-increment: item;

  &::before {
    content: counter(item) '.';
    color: ${themeColor('tint', 'level6')};
    margin-right: 12px;
    flex-shrink: 0;
  }
`

export const ListItem = styled.li`
  ${({ variant }) => {
    switch (variant) {
      case 'unordered':
        return unorderedBulletStyle
      case 'ordered':
        return orderedBulletStyle
      default:
        return null
    }
  }}
`
