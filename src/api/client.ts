import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  ServerError,
  ServerParseError,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'

import app from 'store/App'

function handleGraphqlError(error: GraphQLError) {
  if (!error.message.startsWith('Context creation failed'))
    app.enqueueSnackbar(error.message, { variant: 'error' })

  console.log(`[GraphQL error]`, error)
}

type TApolloNetworkError = ServerError | ServerParseError

function handleNetworkError(error: TApolloNetworkError) {
  const code = error.statusCode

  switch (code) {
    case 400:
      app.router.replace('/login')
      break

    default:
      app.enqueueSnackbar(error.message, { variant: 'error' })
      break
  }

  console.log(`[Network error]`, { ...error })
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(handleGraphqlError)
  if (networkError) handleNetworkError(networkError as TApolloNetworkError)
})

const authLink = setContext(
  (_, { headers }: { headers: Record<string, string> }) => {
    const token = localStorage.getItem('token')
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
