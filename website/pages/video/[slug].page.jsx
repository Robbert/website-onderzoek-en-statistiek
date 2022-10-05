import { useRouter } from 'next/router'
import Image from 'next/image'
import qs from 'qs'

import FallbackPage from '~/components/FallbackPage/FallbackPage'
import Seo from '~/components/Seo/Seo'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import VideoButtons from '~/components/VideoButtons/VideoButtons'
import BodyContent from '~/components/BodyContent/BodyContent'
import ContentFooter from '~/components/ContentFooter/ContentFooter'
import {
  fetchAPI,
  getStrapiMedia,
  formatDate,
  PLACEHOLDER_IMAGE,
} from '~/lib/utils'
import videoQuery from './video.query'
import * as Styled from './video.style'

const LocalVideo = ({
  videoSource,
  subtitleSource,
  enableSubtitleByDefault,
}) => {
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
  themes,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <FallbackPage />
  }

  return (
    <>
      <Seo
        title={shortTitle || title}
        description={teaser || intro}
        image={getStrapiMedia(rectangularImage || squareImage)}
        video
      />
      <Grid>
        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 10 }}
        >
          <Heading gutterBottom={16}>{title}</Heading>
          <Paragraph small gutterBottom={{ small: 56, large: 80 }}>
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
          ) : (
            externalVideoSource && (
              <ExternalVideo source={externalVideoSource} />
            )
          )}
        </Styled.VideoGridItem>

        <GridItem
          colStart={{ small: 1, large: 3 }}
          colRange={{ small: 4, large: 8 }}
        >
          <VideoButtons transcript={transcript} file={videoFile} />
          {externalEmbedSource && (
            <ExternalEmbed source={externalEmbedSource} />
          )}
          <Paragraph intro gutterBottom={{ small: 40, large: 80 }}>
            {intro}
          </Paragraph>
          {!videoFile?.url && !externalVideoSource && rectangularImage && (
            <Styled.ImageWrapper>
              <Image
                src={getStrapiMedia(rectangularImage)}
                alt=""
                width={rectangularImage.width}
                height={rectangularImage.height}
                layout="responsive"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_IMAGE}
                priority
              />
              {rectangularImage.caption &&
                /**
                 Strapi autofills the 'caption' field with the name of the file.
                 This regex checks if 'caption' doesn't end in an image extension.
                */
                !/\.(jpg|jpeg|png|webp|avif|gif|svg|ico)$/.test(
                  rectangularImage.caption,
                ) && <Paragraph small>{rectangularImage.caption}</Paragraph>}
            </Styled.ImageWrapper>
          )}
        </GridItem>

        {body && <BodyContent content={body} />}

        <GridItem
          colStart={{ small: 1, large: 3 }}
          colRange={{ small: 4, large: 8 }}
        >
          <ContentFooter type="video" themes={themes} />
        </GridItem>
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const videos = await fetchAPI('/api/videos?fields=id').then((metaResult) =>
    fetchAPI(
      `/api/videos?fields=slug&pagination[pageSize]=${metaResult.meta.pagination.total}`,
    ),
  )

  return {
    paths: videos.data.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params, preview }) {
  const data = await fetchAPI(
    `/api/videos?${qs.stringify(
      {
        filters: { slug: { $eq: params.slug } },
        ...videoQuery,
      },
      {
        encodeValuesOnly: true,
      },
    )}${preview ? '&publicationState=preview' : ''}`,
  )

  if (!data.data[0]) {
    return {
      notFound: true,
      revalidate: 1,
    }
  }

  return {
    props: data.data[0],
    revalidate: 1,
  }
}

export default Video
