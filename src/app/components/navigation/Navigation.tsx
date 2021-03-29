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
  title?: string
}

const Navigation: FC<IProps> = ({ left, title }) => {
  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar>
        {left ? (
          <IconButton
            component={Link}
            to={left.to}
            edge="start"
            color="inherit"
          >
            <left.icon />
          </IconButton>
        ) : (
          <IconButton edge="start" style={{ color: 'transparent' }}>
            <AccountCircle />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <IconButton component={Link} to="/profile" edge="end" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export type { IProps as INavigation }
export default Navigation
