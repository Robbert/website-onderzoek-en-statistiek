import { useRouter } from 'next/router'
import { Heading, Paragraph, Spinner } from '@amsterdam/asc-ui'

import Seo from '../../components/Seo/Seo'
import {
  apolloClient, fetchAPI, getStrapiMedia, flattenFeatureList,
} from '../../lib/utils'
import HeroSection from '../../components/HeroSection/HeroSection'
import PageSection from '../../components/PageSection/PageSection'
import CardList from '../../components/CardList/CardList'
import ContentList from '../../components/ContentList/ContentList'
import Container from '../../components/Container/Container'
import LinkList from '../../components/LinkList/LinkList'
import QUERY from './collection.query.gql'

const Collection = ({
  title,
  shortTitle,
  teaser,
  teaserImage,
  intro,
  featured,
  collectionItems,
  linkList,
  email,
  phoneNumber,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div><Spinner /></div>
  }

  return (
    <>
      <Seo
        title={`Dossier: ${shortTitle || title}`}
        description={teaser}
        image={getStrapiMedia(teaserImage)}
      />
      <HeroSection title={`Dossier ${title}`}>
        <Paragraph color="bright">{intro}</Paragraph>
      </HeroSection>
      <PageSection title="Uitgelicht">
        <CardList
          columns={3}
          items={flattenFeatureList(featured)}
          hasTeaser={false}
          ratio={16 / 9}
          backgroundColor="level2"
          shadow
        />
      </PageSection>
      <ContentList title="Alles in dossier" list={flattenFeatureList(collectionItems)} />
      <Container>
        <Heading gutterBottom={32}>Zie ook</Heading>
        <LinkList links={flattenFeatureList(linkList)} />
        <Heading gutterBottom={32}>Heeft u een vraag over dit dossier?</Heading>
        <Paragraph>
          Neem contact met ons op via
          {' '}
          {email}
          {' '}
          of
          {' '}
          {phoneNumber}
        </Paragraph>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const collections = await fetchAPI('/collections')

  return {
    paths: collections.map(({ slug }) => ({
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
    props: data.collections[0],
    revalidate: 1,
  }
}

export default Collection
