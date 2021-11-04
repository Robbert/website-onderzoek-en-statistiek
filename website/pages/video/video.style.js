import styled, { css } from 'styled-components'
import { Icon as IconASC, breakpoint } from '@amsterdam/asc-ui'

import { GridItem } from '../../components/Grid/Grid.style'

export const VideoGridItem = styled(GridItem)`
  ${({ wide }) => wide && css`
    margin-left: -32px;
    margin-right: -32px;

    @media screen and ${breakpoint('max-width', 'laptop')} {
      margin-left: -12px;
      margin-right: -12px;
    }
  `}
`

export const Video = styled.video`
  object-fit: cover;
  width: 100%;

  video {
    /* turn off play controls in iOS */
    ::-webkit-media-controls-panel {
      appearance: none;
      display: none !important;
    }

    ::-webkit-media-controls-play-button {
      appearance: none;
      display: none !important;
    }

    ::-webkit-media-controls-start-playback-button {
      appearance: none;
      display: none !important;
    }
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 80px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: 48px;
  }
`

export const Icon = styled(IconASC)`
  margin-right: 12px;
`

export const ExternalVideoContainer = styled.div`
  padding-top: calc((9 / 16) * 100%);
  position: relative;
`

export const ExternalVideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const ExternalEmbedIframe = styled.iframe`
  width: 100%;
  min-height: 300px;
  margin-bottom: 48px;
`
