import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import { Heading, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import Related from '../../components/Related'
import { fetchAPI, getStrapiMedia, apolloClient } from '../../lib/utils'
import QUERY from './video.query.gql'
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
  shortTitle,
  intro,
  teaser,
  videoFile,
  subtitleFile,
  subtitleDefault,
  externalVideoSource,
  externalEmbedSource,
  related,
  teaserImage,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  return (
    <ContentContainer>
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
        video
      />
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
    </ContentContainer>
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
  const { data } = await apolloClient.query(
    {
      query: QUERY,
      variables: { slug: params.slug },
    },
  )
    .catch() // TODO: log this error in sentry

  return {
    props: data.videos[0],
    revalidate: 1,
  }
}

export default Video
