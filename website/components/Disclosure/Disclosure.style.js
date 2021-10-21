import styled from 'styled-components'
import { Icon as IconASC } from '@amsterdam/asc-ui'

export const Container = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

export const Icon = styled(IconASC)`
  margin-right: 16px;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  transition: transform 0.3s ease;
`
