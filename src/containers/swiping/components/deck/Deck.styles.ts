import { makeStyles } from '@material-ui/core'

export default makeStyles({
  card: {
    '& > div': {
      height: '100%',
      width: '100%',
      willChange: 'transform',
    },
    height: '100%',
    position: 'absolute',
    touchAction: 'none',
    width: '100%',
    willChange: 'transform',
    zIndex: 1,
  },
})
