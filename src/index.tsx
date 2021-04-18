import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@material-ui/styles'
import { StrictMode } from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import apolloClient from 'api/client'
import App from 'app/App'
import SnackbarProvider from 'app/components/snackbarProvider/SnackbarProvider'
import theme from 'app/theme'

import reportWebVitals from './reportWebVitals'

const JSX = (
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
)

const rootElement = document.getElementById('root')

if (rootElement?.hasChildNodes()) hydrate(JSX, rootElement)
else render(JSX, rootElement)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
