import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map((graphQLError) =>
      console.log(`[GraphQL error]`, graphQLError)
    )

  if (networkError) console.log(`[Network error]`, networkError)
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
  },
  link: from([errorLink, new HttpLink()]),
  uri: '/graphql',
})

export default apolloClient
