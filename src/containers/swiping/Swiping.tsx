import { ArrowBack } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import app from 'store/App'

import Buttons from './components/buttons/Buttons'
import Deck, { IDeckControls } from './components/deck/Deck'
import useStyles from './Swiping.styles'

type IProps = RouteComponentProps<{ groupId: string }>

const Swiping: FC<IProps> = ({
  match: {
    params: { groupId },
  },
}) => {
  const classes = useStyles()

  const [controls, setControls] = useState<IDeckControls>()

  useEffect(() => {
    app.navigation = {
      left: { icon: ArrowBack, to: `/${groupId}` },
      title: groupId,
    }
  }, [groupId])

  return (
    <div className={classes.root}>
      <Deck groupId={groupId} registerControls={setControls} />
      <Buttons onDislike={controls?.dislike} onLike={controls?.like} />
    </div>
  )
}

export default Swiping
