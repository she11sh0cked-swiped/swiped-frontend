import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '#root': {
          height: '100%',
          overflow: 'hidden',
          position: 'fixed',
          width: '100%',
        },
      },
    },
  },
})
