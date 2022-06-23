import NextImage from 'next/image'
import { useRouter } from 'next/router'
import qs from 'qs'

import FallbackPage from '~/components/FallbackPage/FallbackPage'
import Seo from '~/components/Seo/Seo'
import { Grid, GridItem } from '~/components/Grid/Grid.style'
import Heading from '~/components/Heading/Heading'
import Paragraph from '~/components/Paragraph/Paragraph'
import BodyContent from '~/components/BodyContent/BodyContent'
import ContentFooter from '~/components/ContentFooter/ContentFooter'
import DownloadButton from '~/components/DownloadButton/DownloadButton'
import List from '~/components/List/List'
import Disclosure from '~/components/Disclosure/Disclosure'
import {
  fetchAPI,
  getStrapiMedia,
  PLACEHOLDER_IMAGE,
  formatDate,
  formatBytes,
  dateConfig,
} from '~/lib/utils'
import * as Styled from './publication.style'
import publicationQuery from './publication.query'

const DownloadButtons = ({ links }) => (
  <List>
    {links.map((file) => (
      <li key={file.url}>
        <Styled.DownloadButton
          url={getStrapiMedia(file)}
          variant="textButton"
          small
        >
          {`${file.name} (${formatBytes(file.size * 1000)})`}
        </Styled.DownloadButton>
      </li>
    ))}
  </List>
)

const Publication = ({
  title,
  shortTitle,
  teaser,
  publicationDate,
  formatPublicationDate,
  author,
  intro,
  body,
  file,
  coverImage,
  squareImage,
  rectangularImage,
  themes,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <FallbackPage />
  }

  const MAX_DOWNLOAD_LINKS = 3

  const fileSorter = (a, b) => a.name.localeCompare(b.name)
  const files = Array.isArray(file)
    ? file.sort(fileSorter)
    : [file].sort(fileSorter)

  return (
    <>
      <Seo
        title={shortTitle || title}
        description={teaser || intro}
        image={getStrapiMedia(rectangularImage || squareImage || coverImage)}
        article
      />

      <Grid>
        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 10 }}
        >
          <Heading gutterBottom={16}>{title}</Heading>
          <Styled.MetaList small gutterBottom={40}>
            <Styled.MetaListItem>Publicatie</Styled.MetaListItem>
            {author && <Styled.MetaListItem>{author}</Styled.MetaListItem>}
            {publicationDate && (
              <Styled.MetaListItem>
                {formatDate(publicationDate, dateConfig(formatPublicationDate))}
              </Styled.MetaListItem>
            )}
          </Styled.MetaList>
        </GridItem>

        <GridItem
          colStart={{ small: 1, large: 9 }}
          colRange={{ small: 4, large: 3 }}
          rowStart={2}
          gutterBottom={{ small: 56, large: 40 }}
        >
          {coverImage && (
            <Styled.CoverImage>
              <NextImage
                src={getStrapiMedia(coverImage)}
                alt=""
                width={coverImage.width}
                height={coverImage.height}
                layout="responsive"
                placeholder="blur"
                objectFit="cover"
                blurDataURL={PLACEHOLDER_IMAGE}
                priority
              />
            </Styled.CoverImage>
          )}
          {files.length === 1 && (
            <Styled.ButtonWrapper>
              <DownloadButton
                url={getStrapiMedia(files[0])}
                variant="primary"
                small
              >
                {`Download PDF (${formatBytes(files[0].size * 1000)})`}
              </DownloadButton>
            </Styled.ButtonWrapper>
          )}
        </GridItem>

        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 6 }}
          gutterBottom={40}
        >
          <Paragraph intro gutterBottom={files.length > 1 && 40}>
            {intro}
          </Paragraph>

          {files.length > 1 && (
            <>
              <Heading as="h2" styleAs="h5" gutterBottom={12}>
                Downloads
              </Heading>
              <DownloadButtons links={files.slice(0, MAX_DOWNLOAD_LINKS)} />
              {files.length > MAX_DOWNLOAD_LINKS && (
                <Disclosure
                  id="other_download_links"
                  url={router.asPath}
                  buttonVariant="textButton"
                  buttonStyle={{ padding: 0, margin: '8px 0' }}
                  buttonSmall
                >
                  <DownloadButtons links={files.slice(MAX_DOWNLOAD_LINKS)} />
                </Disclosure>
              )}
            </>
          )}
        </GridItem>

        {body && <BodyContent content={body} />}

        <GridItem
          colStart={{ small: 1, large: 2 }}
          colRange={{ small: 4, large: 6 }}
        >
          <ContentFooter type="publicatie" themes={themes} />
        </GridItem>
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const publications = await fetchAPI('/api/publications?fields=id').then(
    (metaResult) =>
      fetchAPI(
        `/api/publications?fields=slug&pagination[pageSize]=${metaResult.meta.pagination.total}`,
      ),
  )

  return {
    paths: publications.data.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const data = await fetchAPI(
    `/api/publications?${qs.stringify(
      {
        filters: { slug: { $eq: params.slug } },
        ...publicationQuery,
      },
      {
        encodeValuesOnly: true,
      },
    )}`,
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

export default Publication
