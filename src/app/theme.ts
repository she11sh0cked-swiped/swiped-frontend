import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '#root': {
          display: 'grid',
          gridTemplateRows: 'max-content auto',
          height: '100%',
          overflow: 'hidden',
          position: 'fixed',
          width: '100%',
        },
      },
    },
  },
})
