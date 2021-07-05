import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import { Heading, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import Related from '../../components/Related'
import { fetchAPI, getStrapiMedia } from '../../lib/utils'
import * as Styled from './video.style'

const LocalVideo = ({ videoSource, subtitleSource, enableSubtitleByDefault }) => {
  const videoSourceStrapi = getStrapiMedia(videoSource)
  const subtitleSourceStrapi = getStrapiMedia(subtitleSource)

  return (
    <Styled.Video
      crossOrigin="anonymous"
      preload="metadata"
      muted={false}
      controls
    >
      <source src={videoSourceStrapi} type={videoSource.mime} />
      {subtitleSource && (
      <track
        default={!!enableSubtitleByDefault}
        src={subtitleSourceStrapi}
        kind="subtitles"
        srcLang="nl"
        label="Dutch"
      />
      )}
    </Styled.Video>
  )
}

const ExternalVideo = ({ source }) => (
  <Styled.ExternalVideoContainer>
    <Styled.ExternalVideoIframe
      title="video-embed"
      src={source}
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  </Styled.ExternalVideoContainer>
)

const ExternalEmbed = ({ source }) => (
  <Styled.ExternalEmbedIframe
    title="other-embed"
    frameBorder="0"
    src={source}
  />
)

const Video = ({
  title,
  intro,
  teaser,
  videoFile,
  subtitleFile,
  subtitleDefault,
  externalVideoSource,
  externalEmbedSource,
  related,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const seo = {
    metaTitle: title,
    metaDescription: teaser,
  }

  return (
    <>
      <Seo seo={seo} />
      <Heading gutterBottom={40}>
        {`Video ${title}`}
      </Heading>
      <ReactMarkdown source={intro} escapeHtml={false} />
      {videoFile?.url
      && (
      <LocalVideo
        videoSource={videoFile}
        subtitleSource={subtitleFile}
        enableSubtitleByDefault={subtitleDefault}
      />
      )}
      {externalVideoSource && <ExternalVideo source={externalVideoSource} />}
      {externalEmbedSource && <ExternalEmbed source={externalEmbedSource} />}
      <Related data={related} />
    </>
  )
}

export async function getStaticPaths() {
  const videos = await fetchAPI('/videos?_limit=-1')

  return {
    paths: videos.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const videos = await fetchAPI(`/videos?slug=${params.slug}`)

  return {
    props: { ...videos[0] },
    revalidate: 1,
  }
}

export default Video
