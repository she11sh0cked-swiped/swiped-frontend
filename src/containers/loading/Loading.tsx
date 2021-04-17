import { CircularProgress } from '@material-ui/core'
import { FC } from 'react'

import Center from 'components/center/Center'

const Loading: FC = () => {
  return (
    <Center>
      <CircularProgress />
    </Center>
  )
}

export default Loading
