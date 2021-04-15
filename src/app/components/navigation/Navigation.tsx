import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { AccountCircle, SvgIconComponent } from '@material-ui/icons'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import useStyles from './Navigation.styles'

interface IProps {
  left?: {
    icon: SvgIconComponent
    to: string
  }
  right?: {
    icon: SvgIconComponent
    to: string
  }
}

const Navigation: FC<IProps> = ({ left, right }) => {
  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar>
        {left ? (
          <IconButton
            color="inherit"
            component={Link}
            edge="start"
            to={left.to}
          >
            <left.icon />
          </IconButton>
        ) : (
          <IconButton edge="start" style={{ color: 'transparent' }}>
            <AccountCircle />
          </IconButton>
        )}
        <Typography className={classes.title} variant="h6">
          SWIPED
        </Typography>
        {right ? (
          <IconButton color="inherit" component={Link} edge="end" to={right.to}>
            <right.icon />
          </IconButton>
        ) : (
          <IconButton edge="end" style={{ color: 'transparent' }}>
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

export type { IProps as INavigation }
export default Navigation
