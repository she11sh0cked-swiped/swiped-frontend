import { makeStyles } from '@material-ui/core'
import { common } from '@material-ui/core/colors'

export default makeStyles({
  root: {
    '& .MuiCardContent-root': {
      backgroundImage:
        'linear-gradient(0deg, rgba(0,0,0,0.666), rgba(0,0,0,0))',
      color: common.white,
    },
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
})
