import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map((graphQLError) =>
      console.log(`[GraphQL error]`, graphQLError)
    )

  if (networkError) console.log(`[Network error]`, networkError)
})

const authLink = setContext(
  (_, { headers }: { headers: Record<string, string> }) => {
    const token = sessionStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : undefined,
      },
    }
  }
)

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
  },
  link: from([authLink, errorLink, new HttpLink()]),
  uri: '/graphql',
})

export default apolloClient
