import React from "react";
import Link from "next/link";
import { Heading } from "@amsterdam/asc-ui";

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { fetchAPI } from "../../lib/utils";

const Collections = ({ collections }) => {
  
    const items = collections.map(item => <li key={item.slug}><Link href={"/dossier/" + item.slug}>{item.title}</Link></li>)
  
    return (
        <Layout>
            <Seo />
            <Heading forwardedAs="h2">Dossiers</Heading>
            <ul>
                {items}
            </ul>
        </Layout>
    );
};

export async function getStaticProps() {
    const collections = await fetchAPI("/collections");

    return {
        props: { collections },
        revalidate: 1,
    };
}

export default Collections;