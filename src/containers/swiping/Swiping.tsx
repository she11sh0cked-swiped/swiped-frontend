import { useState } from 'react'
import { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Buttons from './components/buttons/Buttons'
import Deck, { IDeckControls } from './components/deck/Deck'
import useStyles from './Swiping.styles'

type IProps = RouteComponentProps

const Swiping: FC<IProps> = () => {
  const classes = useStyles()

  const [controls, setControls] = useState<IDeckControls>()

  return (
    <div className={classes.root}>
      <Deck registerControls={setControls} />
      <Buttons onDislike={controls?.dislike} onLike={controls?.like} />
    </div>
  )
}

export default Swiping
