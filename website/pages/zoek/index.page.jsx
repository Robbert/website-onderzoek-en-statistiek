import { useState } from 'react'
import {
  Heading, Spinner, themeSpacing, themeColor,
} from '@amsterdam/asc-ui'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import Link from 'next/link'

import Seo from '../../components/Seo'
import ContentContainer from '../../components/ContentContainer'
import { contentTypes } from '../../lib/utils'

const commonFilters = `
  { title_contains: $q }
  { teaser_contains: $q }
  { theme: { title_contains: $q } }
`

const fields = `
  title
  slug
  teaser
  teaserImage {
    url
  }
`

const query = gql`
  query getSearchResults($q: [String]) {
    articles(
      limit: 10
      where: {
        _or: [
          ${commonFilters}
          { intro_contains: $q }
          { body_contains: $q }
        ]
      }
    ) {
      ${fields}
    }
    collections(
      limit: 10
      where: {
        _or: [
          ${commonFilters}
          { intro_contains: $q }
        ]
      }
    ) {
      ${fields}
    }
    interactives(
      limit: 10
      where: {
        _or: [
          ${commonFilters}
        ]
      }
    ) {
      ${fields}
    }
    publications(
      limit: 10
      where: {
        _or: [
          ${commonFilters}
          { intro_contains: $q }
          { body_contains: $q }
        ]
      }
    ) {
      ${fields}
    }
    videos(
      limit: 10
      where: {
        _or: [
          ${commonFilters}
          { intro_contains: $q }
          { body_contains: $q }
        ]
      }
    ) {
      ${fields}
    }
    datasets(
      limit: 10
      where: {
        _or: [
          { title_contains: $q }
          { description_contains: $q }
          { theme: { title_contains: $q } }
        ]
      }
    ) {
      title
      slug
    }
  }
`

const SEARCH_TYPES = [
  'article',
  'collection',
  'interactive',
  'publication',
  'video',
  'dataset',
]

const StyledHeading = styled(Heading)`
  text-transform: capitalize;
`

const SpinnerContainer = styled.div`
  margin-top: ${themeSpacing(6)};
`

const Result = ({ title, data, type }) => (
  <>
    <StyledHeading as="h2">{title}</StyledHeading>
    <ul>
      {data.map(({ title: linkTitle, slug }) => (
        <li key={slug}>
          <Link href={`${type}/${slug}`}>
            <a>{linkTitle}</a>
          </Link>
        </li>
      ))}
    </ul>
  </>
)

const irrelevantWords = [
  'aan', 'achter', 'af', 'behalve', 'beneden', 'bij', 'binnen', 'boven',
  'buiten', 'door', 'in', 'langs', 'met', 'na', 'naar', 'naast', 'om', 'onder',
  'op', 'over', 'per', 'sinds', 'te', 'tegen', 'tot', 'tussen', 'uit', 'van', 'via',
  'volgens', 'voor', 'zonder', 'de', 'het', 'een',
]

const Results = ({ searchQuery }) => {
  const splitQuery = [
    searchQuery, // the original query
    ...searchQuery // and
      .split(' ') // the seperate words of the query
      .map((item) => item.replace(/[^a-z0-9]/gi, '')) // with only alphanumerical symbols
      .filter((i) => i) // without empty strings
      .filter((i) => !irrelevantWords.includes(i)), // without irrelevant words
  ]
  const { loading, error, data } = useQuery(
    query, {
      variables: { q: splitQuery },
    },
  )

  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner size={40} color={themeColor('primary')} />
      </SpinnerContainer>
    )
  }

  if (error) return `Error! ${error.message}`

  return (
    SEARCH_TYPES.map((type) => (
      data[`${type}s`].length > 0 && (
        <Result
          key={type}
          title={contentTypes[type].plural}
          data={data[`${type}s`]}
          type={contentTypes[type].name}
        />
      )
    ))
  )
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <ContentContainer>
      <Seo />
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <Results searchQuery={searchQuery} />
    </ContentContainer>
  )
}

export default Search
