import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { observer } from 'mobx-react'
import { cloneElement, FC, ReactElement } from 'react'

import app from 'store/App'

import useStyles from './Navigation.styles'

interface IProps {
  Left?: ReactElement
  Right?: ReactElement
}
const commonProps = { color: 'inherit' }

const Navigation: FC = () => {
  const classes = useStyles()

  const { Left, Right } = app.navigation

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        {cloneElement(Left ?? <Box />, { ...commonProps, edge: 'start' })}
        <Typography className={classes.title} variant="h6">
          SWIPED
        </Typography>
        {cloneElement(Right ?? <Box />, { ...commonProps, edge: 'end' })}
      </Toolbar>
    </AppBar>
  )
}

export type { IProps as INavigation }
export default observer(Navigation)
