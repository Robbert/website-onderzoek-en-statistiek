import { useState } from 'react'
import { ChevronDown } from '@amsterdam/asc-assets'

import MarkdownToHtml from '../MarkdownToHtml/MarkdownToHtml'
import { getStrapiMedia } from '../../lib/utils'
import * as Styled from './VideoButtons.style'

const VideoButtons = ({ file, transcript }) => {
  const [transcriptOpen, setTranscriptOpen] = useState(false)

  return (
    <Styled.ButtonContainer>
      {file?.url && (
        <Styled.DownloadButtonContainer>
          <Styled.DownloadButton
            url={getStrapiMedia(file)}
            variant="textButton"
            type="video"
            iconSize={24}
            small
          >
            Download
          </Styled.DownloadButton>
        </Styled.DownloadButtonContainer>
      )}
      {transcript && (
        <>
          <Styled.TranscriptButton
            type="button"
            variant="textButton"
            aria-controls="transcript"
            aria-expanded={transcriptOpen}
            onClick={() => setTranscriptOpen(!transcriptOpen)}
            small
          >
            <Styled.TranscriptIcon size={24} open={transcriptOpen}>
              <ChevronDown />
            </Styled.TranscriptIcon>
            Uitgeschreven tekst
          </Styled.TranscriptButton>
          <Styled.TranscriptContainer id="transcript" open={transcriptOpen}>
            <MarkdownToHtml>{transcript}</MarkdownToHtml>
          </Styled.TranscriptContainer>
        </>
      )}
    </Styled.ButtonContainer>
  )
}

export default VideoButtons
