import React from 'react'
import Link from 'next/link'
import { Heading, List, ListItem } from '@amsterdam/asc-ui'
import { gql } from '@apollo/client'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { apolloClient } from '../../lib/utils'

import * as Styled from './dataset.style'

const Datasets = ({ data }) => (
  <Layout>
    <Seo />
    <Heading forwardedAs="h2">Datasets per thema</Heading>
    {data.map((theme) => (
      <Styled.Harmonica title={theme.title} key={theme.slug}>
        <List variant="bullet">
          {theme.datasets.map((item) => (
            <ListItem key={item.slug}>
              <Link href={`/dataset/${item.slug}`}>{item.title}</Link>
            </ListItem>
          ))}
        </List>
      </Styled.Harmonica>
    ))}
  </Layout>
)

export async function getStaticProps() {
  const query = gql`
    query getDatasetsByTheme {
      themes {
        title,
        slug,
        datasets {
          title,
          slug
        }
      }
    }
  `

  const { data } = await apolloClient.query({ query })

  return {
    props: { data: data.themes },
    revalidate: 1,
  }
}

export default Datasets
