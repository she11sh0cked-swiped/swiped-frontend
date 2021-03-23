import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { FC } from 'react'

import theme from './theme'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
