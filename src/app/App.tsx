import '@fontsource/roboto'

import {
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core'
import { observer } from 'mobx-react'
import { FC } from 'react'

import app from 'store/App'

import Navigation from './components/navigation/Navigation'
import theme from './theme'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation {...app.navigation} />
      <Toolbar />
      <Container maxWidth="sm">coming soon...</Container>
    </ThemeProvider>
  )
}

export default observer(App)
