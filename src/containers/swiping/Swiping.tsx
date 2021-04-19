import { IconButton } from '@material-ui/core'
import { Group } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { FC } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import app from 'store/App'

import Buttons from './components/buttons/Buttons'
import Deck, { IDeckControls } from './components/deck/NewDeck'
import useStyles from './Swiping.styles'

type IProps = RouteComponentProps

const Swiping: FC<IProps> = () => {
  const classes = useStyles()

  const [controls, setControls] = useState<IDeckControls>()

  useEffect(() => {
    app.navigation = {
      Right: (
        <IconButton component={Link} to="/groups">
          <Group />
        </IconButton>
      ),
    }
  }, [])

  return (
    <div className={classes.root}>
      <Deck registerControls={setControls} />
      <Buttons onDislike={controls?.dislike} onLike={controls?.like} />
    </div>
  )
}

export default Swiping
