import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Heading } from "@amsterdam/asc-ui";

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { fetchAPI, parseFeatureList } from "../../lib/utils";

const Collection = ({ collection }) => {

  const seo = {
    metaTitle: collection.title,
    metaDescription: collection.teaser,
  };

  const featurelist = parseFeatureList(collection.features).map(item => (
    <li key={`feature-${item.slug}`}>
      <Link key={item.slug} href={item.path} >
        <a>{item.name}: {item.title}</a>
      </Link>
    </li>
  ))

  return (
    <Layout >
    <Seo seo={seo} />
      
      <h1>Dossier {collection.name}</h1>
      <ReactMarkdown source={collection.intro} escapeHtml={false} />
      
      <Heading forwardedAs="h3">Uitgelicht</Heading>
      <ul>{featurelist}</ul>

    </Layout>
  );
};

export async function getStaticPaths() {
  const collections = await fetchAPI("/collections");

  return {
    paths: collections.map((collection) => ({
      params: {
        slug: collection.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const collections = await fetchAPI(
    `/collections?slug=${params.slug}`
  );

  return {
    props: { collection: collections[0]},
    revalidate: 1,
  };
}

export default Collection;
