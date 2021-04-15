import '@fontsource/roboto'

import { Container, CssBaseline, Toolbar } from '@material-ui/core'
import { observer } from 'mobx-react'
import { FC, lazy, Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import Navigation from './components/navigation/Navigation'
import useNotifier from './hooks/useNotifier'

const noRedirect: Record<string, boolean> = {
  '/login': true,
  '/register': true,
}

const App: FC = () => {
  useNotifier()

  const history = useHistory()

  useEffect(() => {
    const isTokenEmpty = sessionStorage.getItem('token') == null
    const isRedirect = !noRedirect[history.location.pathname]
    if (isTokenEmpty && isRedirect) history.replace('/login')
  }, [history])

  return (
    <>
      <CssBaseline />
      <Navigation {...app.navigation} />
      <Toolbar />
      <Container maxWidth="sm">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              component={lazy(() => import('containers/swiping/Swiping'))}
              exact
              path="/"
            />
            <Route
              component={lazy(() => import('containers/login/Login'))}
              exact
              path="/login"
            />
            <Route
              component={lazy(() => import('containers/register/Register'))}
              exact
              path="/register"
            />
            <Route
              component={lazy(() => import('containers/group/Group'))}
              exact
              path="/g/:groupId"
            />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
    </>
  )
}

export default observer(App)
