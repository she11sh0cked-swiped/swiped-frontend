import { IconButton } from '@material-ui/core'
import { Group } from '@material-ui/icons'
import { useEffect, useRef } from 'react'
import { FC } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import app from 'store/App'

import Buttons from './components/buttons/Buttons'
import Deck, { IDeckRef } from './components/deck/Deck'
import useStyles from './Swiping.styles'

type IProps = RouteComponentProps

const Swiping: FC<IProps> = () => {
  const classes = useStyles()

  const deckRef = useRef<IDeckRef>(null)

  console.log(deckRef)

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
      <Deck ref={deckRef} />
      <Buttons
        onDislike={() => deckRef.current?.swipe('left')}
        onLike={() => deckRef.current?.swipe('right')}
      />
    </div>
  )
}

export default Swiping
