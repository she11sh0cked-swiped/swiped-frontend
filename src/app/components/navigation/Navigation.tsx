import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { AccountCircle, SvgIconComponent } from '@material-ui/icons'
import { observer } from 'mobx-react'
import { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

import app from 'store/App'

import useStyles from './Navigation.styles'

interface INavBase {
  icon: SvgIconComponent
}

interface INavClick extends INavBase {
  onClick: MouseEventHandler
  to?: never
}

interface INavLink extends INavBase {
  onClick?: never
  to: string
}

type INav = INavClick | INavLink

interface IProps {
  left?: INav
  right?: INav
}

const Navigation: FC = () => {
  const { left, right } = app.navigation

  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar>
        {left ? (
          <IconButton
            color="inherit"
            component={Link}
            edge="start"
            onClick={(left as INavClick).onClick}
            to={(left as INavLink).to}
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
          <IconButton
            color="inherit"
            component={Link}
            edge="end"
            onClick={(right as INavClick).onClick}
            to={(right as INavLink).to}
          >
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
export default observer(Navigation)
