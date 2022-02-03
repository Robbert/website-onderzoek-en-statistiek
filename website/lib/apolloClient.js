import { ApolloClient, InMemoryCache } from '@apollo/client'

import { prependStrapiURL } from './utils'

const apolloClient = new ApolloClient({
  uri: prependStrapiURL('/graphql'),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

export default apolloClient
