import { useRouter } from 'next/router'
import {
  CustomHTMLBlock, Spinner, List, ListItem,
} from '@amsterdam/asc-ui'
import ReactMarkdown from 'react-markdown'

import Seo from '../../components/Seo/Seo'
import Heading from '../../components/Heading/Heading'
import InlineImage from '../../components/InlineImage/InlineImage'
import Link from '../../components/Link/Link'
import {
  fetchAPI, getStrapiMedia, apolloClient, formatDate, flattenFeatureList,
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
  teaserImage,
  publicationDate,
  transcript,
  intro,
  body,
  videoFile,
  subtitleFile,
  subtitleDefault,
  externalVideoSource,
  externalEmbedSource,
  linkList,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  const renderers = {
    image: (props) => <InlineImage {...props} />,
    paragraph: ({ children }) => {
      if (children[0]?.type?.name === 'image'
        || (children[0]?.type === 'a' && children[0]?.props?.children[0]?.type?.name === 'image')) {
        return children[0]
      }
      return <p>{children}</p>
    },
  }

  const flatLinkList = flattenFeatureList(linkList)

  return (
    <>
      <Seo
        title={shortTitle || title}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
        video
      />
      <Styled.Container>
        <Styled.MainContent>
          <Heading gutterBottom={16}>
            {`Video ${title}`}
          </Heading>
          <span>{formatDate(publicationDate)}</span>
          {transcript && (
            <CustomHTMLBlock>
              <ReactMarkdown
                source={transcript}
                escapeHtml={false}
                renderers={renderers}
              />
            </CustomHTMLBlock>
          )}
          <Styled.Intro strong>{intro}</Styled.Intro>
          {body && (
            <CustomHTMLBlock>
              <ReactMarkdown
                source={body}
                escapeHtml={false}
                renderers={renderers}
              />
            </CustomHTMLBlock>
          )}
          {videoFile?.url && (
            <LocalVideo
              videoSource={videoFile}
              subtitleSource={subtitleFile}
              enableSubtitleByDefault={subtitleDefault}
            />
          )}
          {externalVideoSource && <ExternalVideo source={externalVideoSource} />}
          {externalEmbedSource && <ExternalEmbed source={externalEmbedSource} />}
          {flatLinkList && flatLinkList.length > 0 && (
            <>
              <Heading styleAs="h5" gutterBottom={20}>Zie ook</Heading>
              <List>
                {flatLinkList.map(({ path, title: linkTitle }) => (
                  <ListItem key={path}>
                    <Link href={path} inList strong>
                      {linkTitle}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </>
          )}
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
