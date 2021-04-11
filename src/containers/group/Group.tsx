import { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import app from 'store/App'

import List from './components/list/List'

type IProps = RouteComponentProps<{ groupId: string }>

const Group: FC<IProps> = ({
  match: {
    params: { groupId },
  },
}) => {
  useEffect(() => {
    app.navigation = { title: groupId }
  }, [groupId])

  return (
    <div>
      <List groupId={groupId} />
    </div>
  )
}

export default Group
