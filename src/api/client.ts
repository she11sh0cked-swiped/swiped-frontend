import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  ServerError,
  ServerParseError,
} from '@apollo/client'
import { ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'

import app from 'store/App'
import { getOperationName } from 'utils/graphql'

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
      localStorage.removeItem('token')
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

const whiteList = ['user_login', 'user_createOne']

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  const operationName = getOperationName(operation.query)

  if (token == null && !whiteList.some((opName) => operationName === opName)) {
    const controller = new AbortController()
    operation.setContext({
      fetchOptions: { signal: controller.signal },
    })
    controller.abort()
    app.router.replace('/login')
  } else
    operation.setContext({
      headers: { authorization: token ? `Bearer ${token}` : undefined },
    })

  return forward(operation)
})

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
