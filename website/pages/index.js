import React from "react";
import { Heading } from "@amsterdam/asc-ui";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { fetchAPI } from "../lib/api";

const Home = ({ themes, homepage }) => {

  const items = themes.map(item => (
    <div key={`theme-${item.id}`}>
      {item.name}
    </div>
  ))

  return (
    <Layout>
      <Seo seo={homepage.seo} />
      <Heading forwardedAs="h2">Voorpagina</Heading>
      <Heading forwardedAs="h3">Thema's</Heading>
      {items}
    </Layout>
  );
};

export async function getStaticProps() {
  const [ themes, homepage] = await Promise.all([
    fetchAPI("/themes"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { themes, homepage },
    revalidate: 1,
  };
}

export default Home;
