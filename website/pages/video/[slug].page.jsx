/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import Heading from '../../components/Heading/Heading'
import MarkdownToHtml from '../../components/MarkdownToHtml/MarkdownToHtml'
import Link from '../../components/Link/Link'
import {
  fetchAPI, getStrapiMedia, apolloClient, formatDate, normalizeBody, prependStrapiURL,
} from '../../lib/utils'
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
  teaser,
  squareImage,
  rectangularImage,
  publicationDate,
  transcript,
  intro,
  body,
  videoFile,
  subtitleFile,
  subtitleDefault,
  externalVideoSource,
  externalEmbedSource,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  return (
    <>
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(rectangularImage || squareImage)}
        video
      />
      <Styled.Container>
        <Styled.MainContent>
          <Heading gutterBottom={16}>
            {`Video ${title}`}
          </Heading>
          <span>{formatDate(publicationDate)}</span>
          {transcript && <MarkdownToHtml>{transcript}</MarkdownToHtml>}
          <Styled.Intro strong>{intro}</Styled.Intro>
          {body && normalizeBody(body).map((item, i) => {
            if (item.type === 'text') {
              return (<MarkdownToHtml key={`bodyItem${i}`}>{item.text}</MarkdownToHtml>)
            }
            if (item.type === 'linklist') {
              return (
                <ul key={`bodyItem${i}`}>
                  {item.links.map((link) => (
                    <li key={link.path}><Link href={link.path}>{link.title}</Link></li>
                  ))}
                </ul>
              )
            }
            if (item.type === 'visualisation') {
              return (
                <Image
                  key={`bodyItem${i}`}
                  src={prependStrapiURL(item.image.url)}
                  alt={item.description}
                  width={16}
                  height={9}
                  layout="responsive"
                />
              )
            }
            return null
          })}
          {videoFile?.url && (
            <LocalVideo
              videoSource={videoFile}
              subtitleSource={subtitleFile}
              enableSubtitleByDefault={subtitleDefault}
            />
          )}
          {externalVideoSource && <ExternalVideo source={externalVideoSource} />}
          {externalEmbedSource && <ExternalEmbed source={externalEmbedSource} />}
        </Styled.MainContent>
      </Styled.Container>
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
