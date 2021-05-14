import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/Layout";
import Image from "../../components/Image";
import Seo from "../../components/Seo";
import { getStrapiMedia } from "../../lib/media";

const Publication = ({ publication }) => {

  const seo = {
    metaTitle: publication.title,
    metaDescription: publication.description,
    shareImage: publication.image,
    publication: true,
  };

  const downloadUrl = getStrapiMedia(publication.file);

  console.log(publication.file.name)

  return (
    <Layout >
    <Seo seo={seo} />
      <Image image={publication.image} style={{"width": "200px"}} />
      <h1>{publication.title}</h1>
      <Moment format="MMM Do YYYY">{publication.published_at}</Moment>
      <ReactMarkdown source={publication.content} escapeHtml={false} />
      <p><a href={downloadUrl} download={publication.file.name}>download pdf</a></p>
    </Layout>
  );
};

export async function getStaticPaths() {
  const publications = await fetchAPI("/publications");

  return {
    paths: publications.map((publication) => ({
      params: {
        slug: publication.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const publications = await fetchAPI(
    `/publications?slug=${params.slug}&status=published`
  );

  return {
    props: { publication: publications[0]},
    revalidate: 1,
  };
}

export default Publication;
