import React from "react";
import Link from "next/link";
import { Heading } from "@amsterdam/asc-ui";

import Layout from "../../components/Layout";
import Image from "../../components/Image";
import Seo from "../../components/Seo";
import { fetchAPI } from "../../lib/api";

const Articles = ({ articles }) => {
  
    const items = articles.map(item => (
        <div key={item.slug} style={{"display": "flex", "height": "120px"}}>
            <Image image={item.teaserImage} style={{"width": "80px", "height": "80px", "margin-right": "8px"}} />
            <div>
            <Link href={`/artikel/${item.slug}`}>
                {item.title}
            </Link>
            <p>{item.teaser}</p>
            </div>
        </div>
        ))
  
    return (
        <Layout>
            <Seo />
            <Heading forwardedAs="h2">Artikelen</Heading>
            {items}
        </Layout>
    );
};

export async function getStaticProps() {
    const articles = await fetchAPI("/articles");

    return {
        props: { articles },
        revalidate: 1,
    };
}

export default Articles;