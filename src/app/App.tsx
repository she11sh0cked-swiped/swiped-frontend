import '@fontsource/roboto'

import {
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core'
import { observer } from 'mobx-react'
import { FC, lazy, Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import Navigation from './components/navigation/Navigation'
import theme from './theme'

const noRedirect: Record<string, boolean> = {
  '/login': true,
  '/register': true,
}

const App: FC = () => {
  const history = useHistory()

  useEffect(() => {
    const isTokenEmpty = sessionStorage.getItem('token') == null
    const isRedirect = !noRedirect[history.location.pathname]
    if (isTokenEmpty && isRedirect) history.replace('/login')
  }, [history])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation {...app.navigation} />
      <Toolbar />
      <Container maxWidth="sm">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              exact
              path="/"
              component={lazy(() => import('containers/swiping/Swiping'))}
            />
            <Route
              exact
              path="/login"
              component={lazy(() => import('containers/login/Login'))}
            />
            <Route
              exact
              path="/register"
              component={lazy(() => import('containers/register/Register'))}
            />
            <Route
              exact
              path="/g/:groupId"
              component={lazy(() => import('containers/group/Group'))}
            />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
    </ThemeProvider>
  )
}

export default observer(App)
