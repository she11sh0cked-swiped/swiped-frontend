import '@fontsource/roboto'

import { Container, CssBaseline, Toolbar } from '@material-ui/core'
import { FC } from 'react'

import Navigation from './components/navigation/Navigation'
import Routes from './components/routes/Routes'

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />
      <Toolbar />
      <Container maxWidth="sm">
        <Routes />
      </Container>
    </>
  )
}

export default App
