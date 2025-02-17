import { makeStyles } from '@material-ui/core'

export default makeStyles({
  info: {
    bottom: 0,
    margin: '0.5em',
    position: 'absolute',
    right: 0,
  },
  root: {
    '& .MuiButtonBase-root': {
      '& .MuiCardContent-root': {
        bottom: 0,
        position: 'absolute',
        width: '100%',
      },
      height: 'inherit',
    },
    height: '100%',
  },
})
