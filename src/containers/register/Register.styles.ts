import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(4, 0, 2),
  },
  register: {
    float: 'right',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
