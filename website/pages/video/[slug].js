import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Heading } from "@amsterdam/asc-ui";

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { fetchAPI, parseFeatureList } from "../../lib/utils";

const Video = ({ video }) => {

  const seo = {
    metaTitle: video.title,
    metaDescription: video.teaser,
  };

  return (
    <Layout >

        <Seo seo={seo} />
      
        <h1>Video {video.name}</h1>
        <ReactMarkdown source={video.intro} escapeHtml={false} />

    </Layout>
  );
};

export async function getStaticPaths() {
  const videos = await fetchAPI("/videos");

  return {
    paths: videos.map((video) => ({
      params: {
        slug: video.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const videos = await fetchAPI(
    `/videos?slug=${params.slug}`
  );

  return {
    props: { video: videos[0]},
    revalidate: 1,
  };
}

export default Video;
