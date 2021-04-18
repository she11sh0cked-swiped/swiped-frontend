import '@fontsource/roboto'

import { ApolloProvider } from '@apollo/client'
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core'
import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import apolloClient from 'api/client'

import Navigation from './components/navigation/Navigation'
import Routes from './components/routes/Routes'
import SnackbarProvider from './components/snackbarProvider/SnackbarProvider'
import theme from './theme'

const App: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Router>
            <CssBaseline />
            <Navigation />
            <Toolbar />
            <Container maxWidth="sm">
              <Routes />
            </Container>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
