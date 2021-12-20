import styled, { css } from 'styled-components'
import { Icon as IconASC, breakpoint, themeColor } from '@amsterdam/asc-ui'

import Button from '../Button/Button'
import DownloadButtonComponent from '../DownloadButton/DownloadButton'

export const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  justify-content: flex-end;
  margin-bottom: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 56px;
  }
`

export const DownloadButton = styled(DownloadButtonComponent)`
  justify-content: end;
  grid-row: 1;
  padding-left: 10px;
  padding-right: 10px;

  :last-child {
    padding-right: 0;
  }
`

export const TranscriptButton = styled(Button)`
  grid-row: 1;
  padding-left: 10px;
  padding-right: 0;
  justify-self: end;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-row: auto;
  }
`

export const TranscriptContainer = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  grid-column: 1 / span 2;
  border: 2px solid ${themeColor('primary')};
  padding: 16px;
  margin-top: 8px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-column: auto;
  }
`

export const TranscriptIcon = styled(IconASC)`
  margin-right: 12px;
  transition: transform 0.3s ease;

  ${({ open }) => open && css`
    transform: rotate(180deg);
  `}
`
