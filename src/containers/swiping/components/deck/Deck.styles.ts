import { makeStyles } from '@material-ui/core'

export default makeStyles({
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
