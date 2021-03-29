import { makeStyles } from '@material-ui/core'
import { green, red } from '@material-ui/core/colors'

export default makeStyles({
  button: {
    boxShadow: '0px 20px 53px 0px rgba(0,0,0,0.3)',
    padding: '1em',
  },
  dislike: {
    color: red[400],
  },
  like: {
    color: green[400],
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
})
