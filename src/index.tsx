import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { StrictMode } from 'react'
import { render } from 'react-dom'

import App from 'app/App'

import reportWebVitals from './reportWebVitals'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
})

render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
