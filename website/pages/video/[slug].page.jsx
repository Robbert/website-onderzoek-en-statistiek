import { useRouter } from 'next/router'
import { Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import { Grid, GridItem } from '../../components/Grid/Grid.style'
import Heading from '../../components/Heading/Heading'
import Paragraph from '../../components/Paragraph/Paragraph'
import DownloadButton from '../../components/DownloadButton/DownloadButton'
import Details from '../../components/Details/Details'
import BodyContent from '../../components/BodyContent/BodyContent'
import ThemeList from '../../components/ThemeList/ThemeList'
import MarkdownToHtml from '../../components/MarkdownToHtml/MarkdownToHtml'
import {
  fetchAPI, getStrapiMedia, apolloClient, formatDate,
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
  wideVideo,
  subtitleDefault,
  externalVideoSource,
  externalEmbedSource,
  theme,
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
      <Grid>
        <GridItem colStart={{ small: 1, large: 2 }} colRange={{ small: 4, large: 10 }}>
          <Heading gutterBottom={16}>{title}</Heading>
          <Paragraph
            small
            gutterBottom={{ small: 60, large: 80 }}
          >
            {formatDate(publicationDate)}
          </Paragraph>
        </GridItem>

        <Styled.VideoGridItem
          colStart={{ small: 1, large: wideVideo ? 1 : 3 }}
          colRange={{ small: 4, large: wideVideo ? 12 : 8 }}
          wide={wideVideo}
        >
          {videoFile?.url ? (
            <LocalVideo
              videoSource={videoFile}
              subtitleSource={subtitleFile}
              enableSubtitleByDefault={subtitleDefault}
            />
          )
            : externalVideoSource && <ExternalVideo source={externalVideoSource} />}
        </Styled.VideoGridItem>

        <GridItem colStart={{ small: 1, large: 3 }} colRange={{ small: 4, large: 8 }}>
          <Styled.ButtonContainer>
            {videoFile?.url && (
              <DownloadButton
                url={getStrapiMedia(videoFile)}
                variant="textButton"
              >
                Download
              </DownloadButton>
            )}
            {transcript && (
              <Details title="Uitgeschreven tekst">
                <MarkdownToHtml>{transcript}</MarkdownToHtml>
              </Details>
            )}
          </Styled.ButtonContainer>
          {externalEmbedSource && <ExternalEmbed source={externalEmbedSource} />}
          <Paragraph intro gutterBottom={{ small: 36, large: 80 }}>{intro}</Paragraph>
        </GridItem>

        {body && <BodyContent content={body} />}

        <GridItem
          colStart={{ small: 1, large: 3 }}
          colRange={{ small: 4, large: 8 }}
          gutterBottom={{ small: 72, large: 120 }}
        >
          <ThemeList type="video" themes={theme} />
        </GridItem>
      </Grid>
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
