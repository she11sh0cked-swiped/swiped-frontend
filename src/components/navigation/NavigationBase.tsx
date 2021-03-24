import { FC } from 'react'

import useStyles from './NavigationBase.styles'

const NavigationBase: FC = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default NavigationBase
