import styled from 'styled-components'
import { themeColor, Icon as IconASC } from '@amsterdam/asc-ui'

export const Details = styled.details`
  text-align: end;

  summary span {
    transition: transform 0.3s ease;
    transform: rotate(0);
  }

  &[open] > summary span {
    transition: transform 0.3s ease;
    transform: rotate(180deg);
  }
`

export const Icon = styled(IconASC)`
  margin-right: 14px;
`

export const Container = styled.div`
  text-align: left;
  border: 2px solid ${themeColor('primary')};
  padding: 16px;
  width: 100%;
`
