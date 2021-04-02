import { makeStyles } from '@material-ui/core'

export default makeStyles({
  info: {
    bottom: 0,
    margin: '0.5em',
    position: 'absolute',
    right: 0,
  },
  root: {
    '& > div': {
      '& > div': {
        height: 'inherit',
      },
      height: '100%',
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1100,
    },
    position: 'relative',
  },
})
