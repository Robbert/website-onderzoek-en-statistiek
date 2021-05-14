import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI, getStrapiURL } from "../../lib/api";
import Layout from "../../components/Layout";
import Image from "../../components/Image";
import Seo from "../../components/Seo";

const Article = ({ article }) => {

  const seo = {
    metaTitle: article.title,
    metaDescription: article.teaser,
    //shareImage: article.teaserImage,
    article: true,
  };

  console.log(article)

  return (
    <Layout >
    <Seo seo={seo} />
      <Image image={article.coverImage} style={{"width": "100%"}} />
      <h1>{article.title}</h1>
      <Moment locale="nl" format="D MMMM YYYY">{article.published_at}</Moment>
      <ReactMarkdown 
        source={article.body} 
        escapeHtml={false} 
        transformImageUri={src => getStrapiURL() + src}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}&status=published`
  );

  return {
    props: { article: articles[0]},
    revalidate: 1,
  };
}

export default Article;
