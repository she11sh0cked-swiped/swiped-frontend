import { IconButton } from '@material-ui/core'
import { Close, Favorite } from '@material-ui/icons'
import { FC } from 'react'

import useStyles from './Buttons.styles'

interface IProps {
  onDislike?(): void
  onLike?(): void
}

const Buttons: FC<IProps> = ({ onDislike, onLike }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={onDislike}>
        <Close className={classes.dislike} fontSize="large" />
      </IconButton>
      <IconButton className={classes.button} onClick={onLike}>
        <Favorite className={classes.like} fontSize="large" />
      </IconButton>
    </div>
  )
}

export default Buttons
