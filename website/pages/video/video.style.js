import styled from 'styled-components'
import { themeSpacing } from '@amsterdam/asc-ui'

export const Video = styled.video`
  height: 100%;
  object-fit: cover;
  width: 100%;
  margin-bottom: ${themeSpacing(12)};

  video {
    // turn off play controls in iOS
    ::-webkit-media-controls-panel {
      -webkit-appearance: none;
      display: none !important;
    }
    ::-webkit-media-controls-play-button {
      -webkit-appearance: none;
      display: none !important;
    }
    ::-webkit-media-controls-start-playback-button {
      -webkit-appearance: none;
      display: none !important;
    }
  }
`

export const ExternalVideoContainer = styled.div`
  padding: 56.25% 0 0 0;
  position: relative;
  margin-bottom: ${themeSpacing(12)};
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
  height: 100%;
  min-height: 300px;
  margin-bottom: ${themeSpacing(12)};
`
