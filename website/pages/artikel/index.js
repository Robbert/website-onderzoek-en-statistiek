import React from "react";
import Link from "next/link";
import { Heading, Paragraph, Card, CardContent, CardMedia } from "@amsterdam/asc-ui";

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { fetchAPI } from "../../lib/utils";

import styles from "./article.module.css";

const Articles = ({ articles }) => {
  
    const cards = articles.map(item => (

        <Link key={item.slug} href={`/artikel/${item.slug}`} >
            <a className={styles.card}>
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
            <Heading forwardedAs="h2">Artikelen</Heading>
            {cards}
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