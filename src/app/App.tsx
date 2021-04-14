import '@fontsource/roboto'

import {
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core'
import { observer } from 'mobx-react'
import { FC, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Loading from 'containers/loading/Loading'
import app from 'store/App'

import Navigation from './components/navigation/Navigation'
import theme from './theme'

const Group = lazy(() => import('containers/group/Group'))
const Swiping = lazy(() => import('containers/swiping/Swiping'))

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation {...app.navigation} />
      <Toolbar />
      <Container maxWidth="sm">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Swiping} />
            <Route exact path="/g/:groupId" component={Group} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
    </ThemeProvider>
  )
}

export default observer(App)
