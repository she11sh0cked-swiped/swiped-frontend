import { makeStyles } from '@material-ui/core'
import { common } from '@material-ui/core/colors'

export default makeStyles({
  content: {
    backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.666), rgba(0,0,0,0))',
    bottom: 0,
    color: common.white,
    position: 'absolute',
    width: '100%',
  },
  info: {
    bottom: 0,
    margin: '0.5em',
    position: 'absolute',
    right: 0,
  },
  root: {
    '& > .MuiCardActionArea-root': {
      '& > .MuiCardMedia-root': {
        height: 'inherit',
      },
      height: 'inherit',
    },
    height: '100%',
    width: '100%',
  },
})
