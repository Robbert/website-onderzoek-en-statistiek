import React from "react";
import Link from "next/link";
import { Heading, Paragraph, Card, CardContent, CardMedia } from "@amsterdam/asc-ui";

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { fetchAPI } from "../../lib/utils";

const Interactives = ({ interactives }) => {
  const cards = interactives.map(item => (
      <Link key={item.slug} href={`/interactief/${item.slug}`} >
          <a>
              <Card horizontal>
                  <CardMedia maxWidth={144} >
                  </CardMedia>
                  <CardContent>
                      <Heading as="h4">{item.title}</Heading>
                      <Paragraph>{item.teaser}</Paragraph>
                  </CardContent>
              </Card>
          </a>
      </Link>
  ))

  return (
      <Layout>
          <Seo />
          <Heading forwardedAs="h2">Interactief</Heading>
          {cards}
      </Layout>
  );
};

export async function getStaticProps() {
  const interactives = await fetchAPI("/interactives");

  return {
      props: { interactives },
      revalidate: 1,
  };
}

export default Interactives;