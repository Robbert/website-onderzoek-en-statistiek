import styled from 'styled-components'
import { Paragraph, breakpoint, themeColor } from '@amsterdam/asc-ui'

import ContainerComponent from '../../components/Container/Container'

export const Container = styled(ContainerComponent)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 36px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    grid-template-columns: 1fr;
  }
`

export const MainContent = styled.div`
  background-color: white;
  z-index: 1;
  padding: 24px;
`

export const SideBar = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 24px;
  margin-top: 44px;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: 0;
  }
`

export const Intro = styled(Paragraph)`
  padding: 16px 0 0 0;
`

export const Video = styled.video`
  object-fit: cover;
  width: 100%;
  margin-bottom: 48px;

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

export const ExternalVideoContainer = styled.div`
  padding: 56.25% 0 0 0;
  position: relative;
  margin-bottom: 48px;
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
  margin-bottom: 48px;
`
